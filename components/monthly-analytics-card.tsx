"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { LossData } from "@/app/actions/losses" // MUDANÇA
import type { GlobalFilterCriteria } from "@/components/advanced-filter"

interface MonthlyAnalyticsCardProps {
  losses: LossData[] // MUDANÇA
  filterCriteria?: GlobalFilterCriteria
}

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

export function MonthlyAnalyticsCard({ losses, filterCriteria }: MonthlyAnalyticsCardProps) {
  const monthlyData = useMemo(() => {
    // Inicializa estrutura para todos os meses
    const data = MONTHS.map((month, index) => ({
      month,
      monthNumber: (index + 1).toString().padStart(2, "0"),
      hectoPerda: 0,
      precoPerda: 0,
    }))

    losses.forEach((loss) => {
      // Data vem como "DD/MM/YYYY" do backend
      const [day, month, year] = loss.data.split("/")
      
      // Se tiver filtro de ano, respeita o filtro, senão pega tudo (ou o ano atual se preferir filtrar na query)
      // Como o componente recebe 'losses' que já podem estar filtradas pela page, aqui só agrupamos.
      
      const monthIndex = Number.parseInt(month) - 1
      if (monthIndex >= 0 && monthIndex < 12) {
        const hecto = Number.parseFloat(loss.hectoUnid?.replace(",", ".") || "0")
        const preco = Number.parseFloat(loss.precoUnid?.replace(",", ".") || "0")
        
        data[monthIndex].hectoPerda += loss.quantidade * hecto
        data[monthIndex].precoPerda += loss.quantidade * preco
      }
    })

    return data
  }, [losses])

  // Configuração do gráfico
  const chartConfig = {
    hectoPerda: {
      label: "Hectolitros",
      color: "hsl(var(--primary))",
    },
    precoPerda: {
      label: "Valor (R$)",
      color: "hsl(var(--destructive))", // Ou green, dependendo da semântica desejada
    },
  }

  return (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg mb-6 overflow-hidden">
      <div className="p-4 md:p-6">
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-6">Evolução Mensal</h2>
        
        <div className="h-[300px] w-full mb-8">
           {/* Recharts simples para evitar complexidade com ChartContainer se não estiver totalmente configurado */}
           <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                <XAxis 
                    dataKey="month" 
                    tickFormatter={(value) => value.substring(0, 3)} 
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                />
                <YAxis yAxisId="left" stroke="var(--primary)" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="var(--destructive)" fontSize={12} />
                <Tooltip 
                    contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px" }}
                    itemStyle={{ fontSize: "12px" }}
                />
                <Legend />
                <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="hectoPerda" 
                    name="Volume (HL)" 
                    stroke="var(--primary)" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                />
                <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="precoPerda" 
                    name="Valor (R$)" 
                    stroke="#16a34a" // Green-600
                    strokeWidth={2}
                    dot={{ r: 4 }}
                />
              </LineChart>
           </ResponsiveContainer>
        </div>

        <div className="border-t border-border/30 pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Detalhamento Mensal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {monthlyData.map((data) => (
              <div
                key={data.month}
                className="p-4 rounded-lg border border-border/50 hover:border-border transition-colors bg-muted/20"
              >
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-foreground">{data.month}</h3>
                    <span className="text-[10px] text-muted-foreground bg-background px-2 py-0.5 rounded-full border border-border/50">
                        {data.monthNumber}
                    </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs text-muted-foreground">Volume</p>
                    <p className="text-sm font-bold text-primary">{data.hectoPerda.toFixed(2)} HL</p>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs text-muted-foreground">Financeiro</p>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">
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