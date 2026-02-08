"use server"

import { revalidatePath } from "next/cache"
import { format, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Motivo } from "@prisma/client"
import { Prisma } from "@prisma/client"
import { db } from "@/lib/db"

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
  data: string
}

function stripDiacritics(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function normalizeKey(value: string) {
  return stripDiacritics(value).replace(/[^a-z0-9]/gi, "").toLowerCase()
}

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
  inventário: Motivo.INVENTARIO,
  inventrio: Motivo.INVENTARIO,
  defrtulo: Motivo.DEF_ROTULO,
  outro: Motivo.OUTRO,
}

function motivoToEnum(value: string): Motivo {
  const key = normalizeKey(value)
  return motivoEnumMap[key] ?? Motivo.OUTRO
}

function motivoToLabel(value: Motivo) {
  return motivoLabelMap[value] ?? motivoLabelMap[Motivo.OUTRO]
}

function toDecimal(value?: string, fallback = "0") {
  return new Prisma.Decimal((value ?? fallback).replace(",", "."))
}

// Converte do formato do banco para o formato do frontend
function parseClientDate(value: string) {
  const parsed = parse(value, "dd/MM/yyyy", new Date())
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed
}

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
    data: format(loss.data, "dd/MM/yyyy", { locale: ptBR }),
  }
}

export async function getLosses(): Promise<LossData[]> {
  try {
    const losses = await db.loss.findMany({
      include: { local: true, area: true, ajudante: true, motivoQuebra: true },
      orderBy: { createdAt: "desc" },
    })
    return losses.map(mapToFrontend)
  } catch (error) {
    console.error("Erro ao buscar perdas:", error)
    return []
  }
}

async function resolveDimensions(data: Omit<LossData, "id"> | Partial<LossData>) {
  const [local, area, helper, breakReason] = await Promise.all([
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
  ])

  return { local, area, helper, breakReason }
}

export async function createLoss(data: Omit<LossData, "id">) {
  try {
    const { local, area, helper, breakReason } = await resolveDimensions(data)

    if (!local || !area || !helper) {
      return { success: false, error: "Local, área e ajudante são obrigatórios." }
    }

    const dateObject = parseClientDate(data.data)

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
        localId: local?.id ?? undefined,
        areaId: area?.id ?? undefined,
        ajudanteId: helper?.id ?? undefined,
        data: dateObject,
      },
    })

    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("ERRO CRÍTICO AO SALVAR:", error)
    return { success: false, error: "Falha ao criar registro: " + String(error) }
  }
}

export async function updateLoss(id: string, data: Partial<LossData>) {
  try {
    const updateData: any = {}

    if (data.codigo) updateData.codigo = data.codigo
    if (data.descricao) updateData.descricao = data.descricao
    if (data.quantidade !== undefined) updateData.quantidade = data.quantidade
    if (data.fatorHecto) updateData.fatorHecto = toDecimal(data.fatorHecto)
    if (data.hectoUnid) updateData.hectoUnid = toDecimal(data.hectoUnid)
    if (data.precoUnid) updateData.precoUnid = toDecimal(data.precoUnid)
    if (data.motivo) updateData.motivo = motivoToEnum(data.motivo)
    if (data.data) updateData.data = parseClientDate(data.data)

    const { local, area, helper, breakReason } = await resolveDimensions(data)
    if (local) updateData.localId = local.id
    if (area) updateData.areaId = area.id
    if (helper) updateData.ajudanteId = helper.id
    if (data.motivoQuebra !== undefined) {
      updateData.motivoQuebraId = breakReason?.id ?? null
    }

    await db.loss.update({
      where: { id },
      data: updateData,
    })
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Erro ao atualizar perda:", error)
    return { success: false, error: "Falha ao atualizar registro: " + String(error) }
  }
}

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
