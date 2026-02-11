/**
 * Verifica se uma data no formato dd/MM/yyyy corresponde ao dia atual.
 */
export function isToday(dateString: string): boolean {
  const today = new Date()
  const [day, month, year] = dateString.split("/")
  const date = new Date(Number(year), Number(month) - 1, Number(day))

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

/**
 * Retorna a data de hoje formatada para pt-BR.
 */
export function getTodayString(): string {
  return new Date().toLocaleDateString("pt-BR")
}
