import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
// MUDANÇA: Importar o tipo correto da Server Action
import type { LossData } from "@/app/actions/losses"

// Funções auxiliares mantidas
/**
 * Gera string de data para usar no nome dos arquivos exportados.
 */
function formatDate(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${day}-${month}-${year}`
}

/**
 * Calcula volume perdido (HL) para um registro.
 */
function calculateHectoPerda(quantidade: number, hectoUnid: string): number {
  const hectoValue = Number.parseFloat(String(hectoUnid).replace(",", ".") || "0")
  return quantidade * hectoValue
}

/**
 * Calcula valor perdido (R$) para um registro.
 */
function calculatePrecoPerda(quantidade: number, precoUnid: string): number {
  const precoValue = Number.parseFloat(String(precoUnid).replace(",", ".") || "0")
  return quantidade * precoValue
}

// MUDANÇA: Tipo LossData nos argumentos
/**
 * Exporta os dados para CSV.
 */
export function exportToCSV(losses: LossData[]): void {
  if (losses.length === 0) {
    alert("Nenhum dado para exportar")
    return
  }

  const headers = [
    "Código",
    "Quantidade",
    "Prejuízo",
    "Descrição",
    "Fator Hecto",
    "Hecto Perda",
    "Preço Perda",
    "Local",
    "Área",
    "Ajudante",
    "Motivo",
    "Motivo Quebra",
    "Data",
  ]

  const data = losses.map((loss) => [
    loss.codigo,
    loss.quantidade,
    loss.prejuizoCodigo ?? "-",
    loss.descricao,
    loss.fatorHecto,
    calculateHectoPerda(loss.quantidade, loss.hectoUnid).toFixed(4).replace(".", ","),
    calculatePrecoPerda(loss.quantidade, loss.precoUnid).toFixed(2).replace(".", ","),
    loss.local,
    loss.area,
    loss.ajudante,
    loss.motivo,
    loss.motivoQuebra ?? "-",
    loss.data,
  ])

  const ws = XLSX.utils.aoa_to_sheet([headers, ...data])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Perdas")
  XLSX.writeFile(wb, `relatorio_perdas_${formatDate()}.csv`)
}

/**
 * Exporta os dados para arquivo Excel.
 */
export function exportToExcel(losses: LossData[]): void {
  if (losses.length === 0) {
    alert("Nenhum dado para exportar")
    return
  }

  const data = losses.map((loss) => ({
    Código: loss.codigo,
    Quantidade: loss.quantidade,
    Prejuízo: loss.prejuizoCodigo ?? "-",
    Descrição: loss.descricao,
    "Fator Hecto": loss.fatorHecto,
    "Hecto Perda": calculateHectoPerda(loss.quantidade, loss.hectoUnid),
    "Preço Perda": calculatePrecoPerda(loss.quantidade, loss.precoUnid),
    Local: loss.local,
    Área: loss.area,
    Ajudante: loss.ajudante,
    Motivo: loss.motivo,
    MotivoQuebra: loss.motivoQuebra ?? "-",
    Data: loss.data,
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "Perdas")
  XLSX.writeFile(wb, `relatorio_perdas_${formatDate()}.xlsx`)
}

/**
 * Exporta os dados para PDF com tabela.
 */
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
  doc.setFont("helvetica", "bold")
  
  const titleText = isFiltered ? "Relatório de Perdas (Filtrado)" : "Relatório Geral de Perdas"
  doc.text(titleText, pageWidth / 2, 20, { align: "center" })

  // Date
  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text(`Data do Relatório: ${currentDate}`, pageWidth / 2, 30, { align: "center" })

  const headers = [
    ["Cód", "Qti", "Prej.", "Descrição", "F.Hecto", "H.Perda", "P.Perda", "Local", "Área", "Ajud.", "Motivo", "Motivo Quebra", "Data"],
  ]

  const data = losses.map((loss) => [
    loss.codigo,
    String(loss.quantidade),
    loss.prejuizoCodigo ?? "-",
    loss.descricao.substring(0, 25),
    loss.fatorHecto,
    calculateHectoPerda(loss.quantidade, loss.hectoUnid).toFixed(4),
    calculatePrecoPerda(loss.quantidade, loss.precoUnid).toFixed(2),
    loss.local,
    loss.area.substring(0, 10),
    loss.ajudante.substring(0, 12),
    loss.motivo,
    loss.motivoQuebra ?? "-",
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
