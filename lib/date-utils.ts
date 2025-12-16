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

export function getTodayString(): string {
  return new Date().toLocaleDateString("pt-BR")
}
