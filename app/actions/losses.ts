"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { format, parse } from "date-fns"
import { ptBR } from "date-fns/locale"

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

// Helper para converter formato do banco para o frontend
function mapToFrontend(loss: any): LossData {
  return {
    ...loss,
    motivoQuebra: loss.motivoQuebra || undefined,
    data: format(loss.data, "dd/MM/yyyy", { locale: ptBR }),
  }
}

export async function getLosses(): Promise<LossData[]> {
  try {
    const losses = await db.loss.findMany({
      orderBy: { createdAt: "desc" },
    })
    return losses.map(mapToFrontend)
  } catch (error) {
    console.error("Erro ao buscar perdas:", error)
    return []
  }
}

export async function createLoss(data: Omit<LossData, "id">) {
  console.log("Tentando criar perda:", data) // Log para debug

  try {
    // Tenta converter a data, se falhar usa a data de hoje
    let dateObject: Date;
    try {
        dateObject = parse(data.data, "dd/MM/yyyy", new Date());
    } catch (e) {
        console.log("Erro de data, usando Data Atual");
        dateObject = new Date();
    }

    await db.loss.create({
      data: {
        codigo: data.codigo,
        descricao: data.descricao,
        quantidade: data.quantidade,
        fatorHecto: data.fatorHecto,
        hectoUnid: data.hectoUnid,
        precoUnid: data.precoUnid,
        local: data.local,
        area: data.area,
        ajudante: data.ajudante,
        motivo: data.motivo,
        motivoQuebra: data.motivoQuebra,
        data: dateObject,
      },
    })
    
    revalidatePath("/dashboard")
    revalidatePath("/")
    return { success: true }
    
  } catch (error) {
    // ESSE LOG VAI TE MOSTRAR O ERRO REAL NO TERMINAL
    console.error("ERRO CRÍTICO AO SALVAR:", error) 
    return { success: false, error: "Falha ao criar registro: " + String(error) }
  }
}

export async function updateLoss(id: string, data: Partial<LossData>) {
  try {
    const updateData: any = { ...data }
    
    if (data.data) {
      updateData.data = parse(data.data, "dd/MM/yyyy", new Date())
    }

    if (updateData.motivoQuebra === undefined) delete updateData.motivoQuebra

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