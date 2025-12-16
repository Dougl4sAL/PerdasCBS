import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import type { Loss } from "./mock-data"

function formatDate(date: Date = new Date()): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function calculateHectoPerda(quantidade: number, hectoUnid: string): number {
  const hectoValue = Number.parseFloat(hectoUnid.replace(",", "."))
  return quantidade * hectoValue
}

function calculatePrecoPerda(quantidade: number, precoUnid: string): number {
  const precoValue = Number.parseFloat(precoUnid.replace(",", "."))
  return quantidade * precoValue
}

export function exportToCSV(losses: Loss[]): void {
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
    calculateHectoPerda(loss.quantidade, loss.hectoUnid).toFixed(2),
    calculatePrecoPerda(loss.quantidade, loss.precoUnid).toFixed(2),
    loss.local,
    loss.area,
    loss.ajudante,
    loss.motivo,
    loss.data,
  ])

  const csvContent = [headers.join(","), ...data.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `Relatorio_Perdas_${formatDate()}.csv`)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToExcel(losses: Loss[]): void {
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
    calculateHectoPerda(loss.quantidade, loss.hectoUnid).toFixed(2),
    calculatePrecoPerda(loss.quantidade, loss.precoUnid).toFixed(2),
    loss.local,
    loss.area,
    loss.ajudante,
    loss.motivo,
    loss.data,
  ])

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data])
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Perdas")

  const colWidths = [
    { wch: 12 }, // Código
    { wch: 12 }, // Quantidade
    { wch: 35 }, // Descrição
    { wch: 12 }, // Fator Hecto
    { wch: 12 }, // Hecto Perda
    { wch: 12 }, // Preço Perda
    { wch: 15 }, // Local
    { wch: 15 }, // Área
    { wch: 20 }, // Ajudante
    { wch: 15 }, // Motivo
    { wch: 12 }, // Data
  ]
  worksheet["!cols"] = colWidths

  XLSX.writeFile(workbook, `Relatorio_Perdas_${formatDate()}.xlsx`)
}

export function exportToPDF(losses: Loss[], isFiltered = false): void {
  if (losses.length === 0) {
    alert("Nenhum dado para exportar")
    return
  }

  const doc = new jsPDF("landscape") // Changed to landscape for more columns
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const currentDate = new Date().toLocaleDateString("pt-BR")

  // Title
  const titleText = isFiltered ? "Relatório de Perdas (Filtrado)" : "Relatório de Perdas"
  doc.setFontSize(18)
  doc.setFont(undefined, "bold")
  doc.text(titleText, pageWidth / 2, 20, { align: "center" })

  // Date
  doc.setFontSize(10)
  doc.setFont(undefined, "normal")
  doc.text(`Data do Relatório: ${currentDate}`, pageWidth / 2, 30, { align: "center" })

  const headers = [
    ["Cód", "Qty", "Descrição", "F.Hecto", "H.Perda", "P.Perda", "Local", "Área", "Ajud.", "Motivo", "Data"],
  ]

  const data = losses.map((loss) => [
    loss.codigo,
    String(loss.quantidade),
    loss.descricao.substring(0, 25),
    loss.fatorHecto,
    calculateHectoPerda(loss.quantidade, loss.hectoUnid).toFixed(2),
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
      fillColor: [70, 130, 180],
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    didDrawPage: (data) => {
      // Footer
      const pageCount = (doc as any).internal.getNumberOfPages()
      const footerY = pageHeight - 10
      doc.setFontSize(8)
      doc.text(`Página ${data.pageNumber}/${pageCount}`, pageWidth / 2, footerY, { align: "center" })
    },
  })

  doc.save(`Relatorio_Perdas_${formatDate()}.pdf`)
}
