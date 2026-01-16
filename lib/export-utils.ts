import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
// MUDANÇA: Importar o tipo correto da Server Action
import type { LossData } from "@/app/actions/losses"

// Funções auxiliares mantidas
function formatDate(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${day}-${month}-${year}`
}

function calculateHectoPerda(quantidade: number, hectoUnid: string): number {
  const hectoValue = Number.parseFloat(String(hectoUnid).replace(",", ".") || "0")
  return quantidade * hectoValue
}

function calculatePrecoPerda(quantidade: number, precoUnid: string): number {
  const precoValue = Number.parseFloat(String(precoUnid).replace(",", ".") || "0")
  return quantidade * precoValue
}

// MUDANÇA: Tipo LossData nos argumentos
export function exportToCSV(losses: LossData[]): void {
  if (losses.length === 0) {
    alert("Nenhum dado para exportar")
    return
  }

  const headers = [
    "Código",
    "Quantidade",
    "Descrição",
    "Fator Hecto",
    "Hecto Perda",
    "Preço Perda",
    "Local",
    "Área",
    "Ajudante",
    "Motivo",
    "Data",
  ]

  const data = losses.map((loss) => [
    loss.codigo,
    loss.quantidade,
    loss.descricao,
    loss.fatorHecto,
    calculateHectoPerda(loss.quantidade, loss.hectoUnid).toFixed(4).replace(".", ","),
    calculatePrecoPerda(loss.quantidade, loss.precoUnid).toFixed(2).replace(".", ","),
    loss.local,
    loss.area,
    loss.ajudante,
    loss.motivo,
    loss.data,
  ])

  const ws = XLSX.utils.aoa_to_sheet([headers, ...data])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Perdas")
  XLSX.writeFile(wb, `relatorio_perdas_${formatDate()}.csv`)
}

export function exportToExcel(losses: LossData[]): void {
  if (losses.length === 0) {
    alert("Nenhum dado para exportar")
    return
  }

  const data = losses.map((loss) => ({
    Código: loss.codigo,
    Quantidade: loss.quantidade,
    Descrição: loss.descricao,
    "Fator Hecto": loss.fatorHecto,
    "Hecto Perda": calculateHectoPerda(loss.quantidade, loss.hectoUnid),
    "Preço Perda": calculatePrecoPerda(loss.quantidade, loss.precoUnid),
    Local: loss.local,
    Área: loss.area,
    Ajudante: loss.ajudante,
    Motivo: loss.motivo,
    Data: loss.data,
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Perdas")
  XLSX.writeFile(wb, `relatorio_perdas_${formatDate()}.xlsx`)
}

export function exportToPDF(losses: LossData[], isFiltered = false): void {
  if (losses.length === 0) {
    alert("Nenhum dado para exportar")
    return
  }

  const doc = new jsPDF()
  const currentDate = new Date().toLocaleDateString("pt-BR")

  // Header
  const pageWidth = doc.internal.pageSize.getWidth()
  doc.setFontSize(18)
  doc.setFont(undefined, "bold")
  
  const titleText = isFiltered ? "Relatório de Perdas (Filtrado)" : "Relatório Geral de Perdas"
  doc.text(titleText, pageWidth / 2, 20, { align: "center" })

  // Date
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.text(`Data do Relatório: ${currentDate}`, pageWidth / 2, 30, { align: "center" })

  const headers = [
    ["Cód", "Qti", "Descrição", "F.Hecto", "H.Perda", "P.Perda", "Local", "Área", "Ajud.", "Motivo", "Data"],
  ]

  const data = losses.map((loss) => [
    loss.codigo,
    String(loss.quantidade),
    loss.descricao.substring(0, 25),
    loss.fatorHecto,
    calculateHectoPerda(loss.quantidade, loss.hectoUnid).toFixed(4),
    calculatePrecoPerda(loss.quantidade, loss.precoUnid).toFixed(2),
    loss.local,
    loss.area.substring(0, 10),
    loss.ajudante.substring(0, 12),
    loss.motivo,
    loss.data,
  ])

  autoTable(doc, {
    head: headers,
    body: data,
    startY: 40,
    margin: 10,
    styles: {
      fontSize: 7,
      cellPadding: 2,
      halign: "left",
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  })

  doc.save(`relatorio_perdas_${formatDate()}.pdf`)
}