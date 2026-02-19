"use server"

import { revalidatePath } from "next/cache"
import { ptBR } from "date-fns/locale"
import * as dfTz from "date-fns-tz"
import { Prisma, Motivo } from "@prisma/client"
import { db } from "@/lib/db"
import { getPrejuizoByCodigo } from "@/lib/mock-data"

/**
 * Estrutura de dados usada entre backend e frontend para representar uma perda.
 */
export type LossData = {
  id: string
  codigo: string
  quantidade: number
  descricao: string
  fatorHecto: string
  hectoUnid: string
  precoUnid: string
  local: string
  area: string
  ajudante: string
  motivo: string
  motivoQuebra?: string
  prejuizoCodigo?: string | null
  prejuizoNome?: string | null
  data: string
}

/**
 * Remove acentos para facilitar comparacoes e buscas normalizadas.
 */
function stripDiacritics(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/**
 * Gera uma chave canonica (sem acentos, sem simbolos e em lowercase).
 */
function normalizeKey(value: string) {
  return stripDiacritics(value).replace(/[^a-z0-9]/gi, "").toLowerCase()
}

/**
 * Mapa de exibicao: enum de motivo -> label amigavel para UI.
 */
const motivoLabelMap: Record<Motivo, string> = {
  [Motivo.VENCIMENTO]: "Vencimento",
  [Motivo.QUEBRA]: "Quebra",
  [Motivo.FURO]: "Furo",
  [Motivo.FALTA]: "Falta",
  [Motivo.MICRO_FURO]: "Micro Furo",
  [Motivo.MAL_CHEIO]: "Mal Cheio",
  [Motivo.VAZADA]: "Vazada",
  [Motivo.DEF_ROTULO]: "Def. Rótulo",
  [Motivo.AMASSADA]: "Amassada",
  [Motivo.BLOW_OUT]: "Blow Out",
  [Motivo.VAZIA]: "Vazia",
  [Motivo.QUEBRADA]: "Quebrada",
  [Motivo.ESTUFADA]: "Estufada",
  [Motivo.INVENTARIO]: "Inventário",
  [Motivo.OUTRO]: "Outro",
}

/**
 * Mapa de entrada: variacoes de texto -> enum persistido no banco.
 */
const motivoEnumMap: Record<string, Motivo> = {
  vencimento: Motivo.VENCIMENTO,
  quebra: Motivo.QUEBRA,
  furo: Motivo.FURO,
  falta: Motivo.FALTA,
  microfuro: Motivo.MICRO_FURO,
  malcheio: Motivo.MAL_CHEIO,
  vazada: Motivo.VAZADA,
  defrotulo: Motivo.DEF_ROTULO,
  amassada: Motivo.AMASSADA,
  blowout: Motivo.BLOW_OUT,
  vazia: Motivo.VAZIA,
  quebrada: Motivo.QUEBRADA,
  estufada: Motivo.ESTUFADA,
  inventario: Motivo.INVENTARIO,
  "inventário": Motivo.INVENTARIO,
  inventrio: Motivo.INVENTARIO,
  defrtulo: Motivo.DEF_ROTULO,
  outro: Motivo.OUTRO,
}

/**
 * Converte texto de motivo para enum, com fallback seguro para OUTRO.
 */
function motivoToEnum(value: string): Motivo {
  const key = normalizeKey(value)
  // Mantemos OUTRO como fallback para nao perder registros por variacao de texto.
  return motivoEnumMap[key] ?? Motivo.OUTRO
}

/**
 * Converte enum de motivo para label de exibicao, com fallback.
 */
function motivoToLabel(value: Motivo) {
  return motivoLabelMap[value] ?? motivoLabelMap[Motivo.OUTRO]
}

/**
 * Converte string decimal para Prisma.Decimal aceitando virgula ou ponto.
 */
function toDecimal(value?: string, fallback = "0") {
  return new Prisma.Decimal((value ?? fallback).replace(",", "."))
}

/**
 * Converte a data do cliente (dd/MM/yyyy) para Date em UTC.
 * O campo `data` no banco e @db.Date (sem hora), entao UTC evita deslocamento de dia.
 */
function parseClientDate(value: string) {
  const [day, month, year] = value.split("/").map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

/**
 * Mapeia o registro do banco para o formato usado na interface.
 */
function mapToFrontend(loss: any): LossData {
  return {
    id: loss.id,
    codigo: loss.codigo,
    quantidade: loss.quantidade,
    descricao: loss.descricao,
    fatorHecto: loss.fatorHecto.toString(),
    hectoUnid: loss.hectoUnid.toString(),
    precoUnid: loss.precoUnid.toString(),
    local: loss.local?.name ?? "",
    area: loss.area?.name ?? "",
    ajudante: loss.ajudante?.name ?? "",
    motivo: motivoToLabel(loss.motivo),
    motivoQuebra: loss.motivoQuebra?.name ?? undefined,
    prejuizoCodigo: loss.prejuizo?.codigo?.toString() ?? null,
    prejuizoNome: loss.prejuizo?.nome ?? null,
    // Formatamos em UTC porque o campo no banco eh date-only (@db.Date).
    data: dfTz.formatInTimeZone(loss.data, "UTC", "dd/MM/yyyy", { locale: ptBR }),
  }
}

/**
 * Busca todas as perdas com seus relacionamentos e entrega no formato de frontend.
 */
export async function getLosses(): Promise<LossData[]> {
  try {
    const losses = await db.loss.findMany({
      include: { local: true, area: true, ajudante: true, motivoQuebra: true, prejuizo: true },
      orderBy: { createdAt: "desc" },
    })
    return losses.map(mapToFrontend)
  } catch (error) {
    console.error("Erro ao buscar perdas:", error)
    return []
  }
}

/**
 * Resolve o prejuízo (codigo + nome) garantindo que exista na tabela de dimensão.
 */
async function resolvePrejuizo(data: Partial<LossData>) {
  const codigoString = data.prejuizoCodigo
  const codigo = codigoString ? Number.parseInt(String(codigoString), 10) : undefined
  if (!codigo) return null

  const nomeCanonico =
    data.prejuizoNome ??
    getPrejuizoByCodigo(codigoString)?.nome ??
    `Prejuízo ${codigo}`

  return db.prejuizo.upsert({
    where: { codigo },
    update: { nome: nomeCanonico },
    create: { codigo, nome: nomeCanonico },
  })
}

/**
 * Resolve dimensoes relacionadas (local, area, ajudante e motivo de quebra).
 * Se nao existir, cria automaticamente por `upsert`.
 */
async function resolveDimensions(data: Omit<LossData, "id"> | Partial<LossData>) {
  // Executa consultas em paralelo para reduzir tempo de salvamento/edicao.
  const [local, area, helper, breakReason, prejuizo] = await Promise.all([
    data.local
      ? db.location.upsert({ where: { name: data.local }, update: {}, create: { name: data.local } })
      : null,
    data.area ? db.area.upsert({ where: { name: data.area }, update: {}, create: { name: data.area } }) : null,
    data.ajudante
      ? db.helper.upsert({ where: { name: data.ajudante }, update: {}, create: { name: data.ajudante } })
      : null,
    data.motivoQuebra
      ? db.breakReason.upsert({
          where: { name: data.motivoQuebra },
          update: {},
          create: { name: data.motivoQuebra },
        })
      : null,
    resolvePrejuizo(data),
  ])

  return { local, area, helper, breakReason, prejuizo }
}

/**
 * Cria uma nova perda no banco com normalizacao de dados numericos e de data.
 */
export async function createLoss(data: Omit<LossData, "id">) {
  try {
    const { local, area, helper, breakReason, prejuizo } = await resolveDimensions(data)
    
    // Verificação para saber se os campos não estão limpos ou nulos.
    if (!local || !area || !helper) {
      return { success: false, error: "Local, área e ajudante são obrigatórios." }
    }
    if (!prejuizo) {
      return { success: false, error: "Prejuízo é obrigatório." }
    }
    // Converte a data do cliente para o formato Date em UTC, garantindo que o dia seja salvo corretamente.
    const dateObject = parseClientDate(data.data)

    // Salva a perda com os relacionamentos e campos convertidos.
    await db.loss.create({
      data: {
        codigo: data.codigo,
        descricao: data.descricao,
        quantidade: data.quantidade,
        fatorHecto: toDecimal(data.fatorHecto),
        hectoUnid: toDecimal(data.hectoUnid),
        precoUnid: toDecimal(data.precoUnid),
        motivo: motivoToEnum(data.motivo),
        motivoQuebraId: breakReason?.id ?? null,
        prejuizoCodigo: prejuizo.codigo,
        localId: local?.id ?? undefined,
        areaId: area?.id ?? undefined,
        ajudanteId: helper?.id ?? undefined,
        data: dateObject,
      },
    })
    // Revalida as rotas que consomem os dados de perdas para refletir a nova adição.
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("ERRO CRÍTICO AO SALVAR:", error)
    return { success: false, error: "Falha ao criar registro: " + String(error) }
  }
}

/**
 * Atualiza parcialmente uma perda existente, alterando apenas campos informados.
 */
export async function updateLoss(id: string, data: Partial<LossData>) {
  try {
    const updateData: any = {}

    // Cada if abaixo atualiza somente campos enviados.
    // Isso evita apagar informacoes antigas com valores vazios.
    if (data.codigo) updateData.codigo = data.codigo
    if (data.descricao) updateData.descricao = data.descricao
    if (data.quantidade !== undefined) updateData.quantidade = data.quantidade
    if (data.fatorHecto) updateData.fatorHecto = toDecimal(data.fatorHecto)
    if (data.hectoUnid) updateData.hectoUnid = toDecimal(data.hectoUnid)
    if (data.precoUnid) updateData.precoUnid = toDecimal(data.precoUnid)
    if (data.motivo) updateData.motivo = motivoToEnum(data.motivo)
    if (data.data) updateData.data = parseClientDate(data.data)

    const { local, area, helper, breakReason, prejuizo } = await resolveDimensions(data)
    if (local) updateData.localId = local.id
    if (area) updateData.areaId = area.id
    if (helper) updateData.ajudanteId = helper.id

    if (data.prejuizoCodigo !== undefined || data.prejuizoNome !== undefined) {
      if (!prejuizo) {
        return { success: false, error: "Prejuízo é obrigatório." }
      }
      updateData.prejuizoCodigo = prejuizo.codigo
    }

    // Atualiza motivoQuebra apenas quando esse campo vier no payload.
    // Se vier undefined, mantemos o valor atual no banco.
    if (data.motivoQuebra !== undefined) {
      updateData.motivoQuebraId = breakReason?.id ?? null
    }

    // Realiza a atualização parcial no banco.
    // O Prisma irá atualizar somente os campos presentes em `updateData`.
    await db.loss.update({
      where: { id },
      data: updateData,
    })
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Erro ao atualizar perda:", error)
    return { success: false, error: "Falha ao atualizar registro" }
  }
}

/**
 * Remove uma perda pelo ID e revalida as rotas que consomem esses dados.
 */
export async function deleteLoss(id: string) {
  try {
    await db.loss.delete({
      where: { id },
    })
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Erro ao deletar perda:", error)
    return { success: false, error: "Falha ao deletar registro" }
  }
}
