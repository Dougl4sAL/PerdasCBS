"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { Loss } from "@/lib/mock-data"
import type { GlobalFilterCriteria } from "@/components/advanced-filter"

interface MonthlyAnalyticsCardProps {
  losses: Loss[]
  filterCriteria?: GlobalFilterCriteria
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

export function MonthlyAnalyticsCard({ losses, filterCriteria }: MonthlyAnalyticsCardProps) {
  const monthlyData = useMemo(() => {
    const data = MONTHS.map((month, index) => ({
      month,
      monthNumber: (index + 1).toString().padStart(2, "0"),
      hectoPerda: 0,
      precoPerda: 0,
    }))

    losses.forEach((loss) => {
      const [day, month, year] = loss.data.split("/")
      const monthIndex = Number.parseInt(month) - 1
      if (monthIndex >= 0 && monthIndex < 12) {
        const hectoValue = Number.parseFloat(loss.hectoUnid.replace(",", "."))
        const precoValue = Number.parseFloat(loss.precoUnid.replace(",", "."))
        data[monthIndex].hectoPerda += loss.quantidade * hectoValue
        data[monthIndex].precoPerda += loss.quantidade * precoValue
      }
    })

    return data
  }, [losses])

  return (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border/30">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground">Análise Mensal</h2>
          <p className="text-xs text-muted-foreground mt-1">Acumulado de perdas por mês</p>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-4">Evolução Mensal de Perdas</h3>
          <ChartContainer
            config={{
              hectoPerda: {
                label: "Hectolitros (HL)",
                // Cor origianl para ser usada em hectolitros
                color: "hsl(var(--chart-1))",
              },
              precoPerda: {
                label: "Valor (R$)",
                // Cor origianl para ser usada em reais
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="monthNumber"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  label={{ value: "Mês", position: "insideBottom", offset: -5, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  yAxisId="left"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  label={{
                    value: "Hectolitros (HL)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  label={{
                    value: "Valor (R$)",
                    angle: 90,
                    position: "insideRight",
                    fill: "hsl(var(--muted-foreground))",
                  }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="hectoPerda"
                  // stroke="var(--color-hectoPerda)"
                  // Cambiarra na cor, alterar para variavel CSS depois
                  stroke="#0EA5E9"
                  name="Hectolitros (HL)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="precoPerda"
                  // stroke="var(--color-precoPerda)"
                  // Cambiarra na cor, alterar para variavel CSS depois
                  stroke="#22C55E"
                  name="Valor (R$)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="border-t border-border/30 pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Detalhamento Mensal</h3>
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
                    <p className="text-lg font-bold text-primary">{data.hectoPerda.toFixed(2)} HL</p>
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
      </div>
    </Card>
  )
}
