import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic"

// GET - listar perdas
export async function GET() {
  try {
    const losses = await prisma.loss.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(losses)
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar perdas" },
      { status: 500 }
    )
  }
}

// POST - criar perda
export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (!data.codigo || !data.quantidade || !data.local) {
      return NextResponse.json(
        { error: "Dados obrigatórios ausentes" },
        { status: 400 }
      )
    }

    const loss = await prisma.loss.create({
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
        data: new Date(data.data),
      },
    })

    return NextResponse.json(loss, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar perda" },
      { status: 500 }
    )
  }
}

