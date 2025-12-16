import type { Loss } from "./mock-data"

const STORAGE_KEY = "stock_losses_data"

export function loadLossesFromStorage(): Loss[] | null {
  try {
    if (typeof window === "undefined") return null
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("Erro ao carregar dados do armazenamento local:", error)
    return null
  }
}

export function saveLossesToStorage(losses: Loss[]): void {
  try {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(losses))
  } catch (error) {
    console.error("Erro ao salvar dados no armazenamento local:", error)
  }
}

export function createBackupFile(losses: Loss[]): void {
  try {
    const timestamp = new Date().toISOString().split("T")[0]
    const data = {
      exportDate: new Date().toLocaleString("pt-BR"),
      totalRecords: losses.length,
      losses: losses,
    }
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `backup_perdas_${timestamp}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error("Erro ao criar backup:", error)
  }
}

export function clearStorage(): void {
  try {
    if (typeof window === "undefined") return
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Erro ao limpar armazenamento:", error)
  }
}

clearStorage()