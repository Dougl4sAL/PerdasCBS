"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Loss } from "@/lib/mock-data"

interface MonthlyAnalyticsCardProps {
  losses: Loss[]
}

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export function MonthlyAnalyticsCard({ losses }: MonthlyAnalyticsCardProps) {
  const availableYears = useMemo(() => {
    const years = new Set<number>()
    losses.forEach((loss) => {
      const [day, month, year] = loss.data.split("/")
      years.add(Number.parseInt(year))
    })
    return Array.from(years).sort((a, b) => b - a)
  }, [losses])

  const [selectedYear, setSelectedYear] = useState<string>(
    availableYears.length > 0 ? availableYears[0].toString() : new Date().getFullYear().toString(),
  )

  const monthlyData = useMemo(() => {
    const data = MONTHS.map((month, index) => ({
      month,
      monthNumber: index + 1,
      hectoPerda: 0,
      precoPerda: 0,
    }))

    losses.forEach((loss) => {
      const [day, month, year] = loss.data.split("/")
      if (year === selectedYear) {
        const monthIndex = Number.parseInt(month) - 1
        if (monthIndex >= 0 && monthIndex < 12) {
          const hectoValue = Number.parseFloat(loss.hectoUnid.replace(",", "."))
          const precoValue = Number.parseFloat(loss.precoUnid.replace(",", "."))
          data[monthIndex].hectoPerda += loss.quantidade * hectoValue
          data[monthIndex].precoPerda += loss.quantidade * precoValue
        }
      }
    })

    return data
  }, [losses, selectedYear])

  return (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base md:text-lg font-semibold text-foreground">Análise Mensal</h2>
            <p className="text-xs text-muted-foreground mt-1">Acumulado de perdas por mês</p>
          </div>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Selecione o ano" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {monthlyData.map((data) => (
            <div
              key={data.month}
              className="p-4 rounded-lg border border-border/50 hover:border-border transition-colors bg-muted/20"
            >
              <h3 className="text-sm font-semibold text-foreground mb-3">{data.month}</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Hectolitros</p>
                  <p className="text-lg font-bold text-primary">{data.hectoPerda.toFixed(3)} HL</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Valor em Reais</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    R$ {data.precoPerda.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
