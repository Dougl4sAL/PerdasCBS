{/*"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import type { Loss } from "@/lib/mock-data"

interface AssistantAccumulationCardProps {
  losses: Loss[]
}

export function AssistantAccumulationCard({ losses }: AssistantAccumulationCardProps) {
  const assistantTotals = useMemo(() => {
    const totals: Record<string, { count: number; value: number }> = {}

    losses.forEach((loss) => {
      const precoPerda = loss.quantidade * Number.parseFloat(loss.precoUnid.replace(",", "."))

      if (!totals[loss.ajudante]) {
        totals[loss.ajudante] = { count: 0, value: 0 }
      }

      totals[loss.ajudante].count += 1
      totals[loss.ajudante].value += precoPerda
    })

    return Object.entries(totals)
      .map(([ajudante, data]) => ({
        ajudante,
        count: data.count,
        value: data.value,
      }))
      .sort((a, b) => b.value - a.value)
  }, [losses])

  const totalValue = useMemo(() => {
    return assistantTotals.reduce((acc, item) => acc + item.value, 0)
  }, [assistantTotals])

  return (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border/30">
        <h2 className="text-base md:text-lg font-semibold text-foreground">Acumulado Total por Ajudante</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Valor total perdido segmentado por cada ajudante responsável
        </p>
      </div>

      <div className="p-4 md:p-6">
        <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-xs text-muted-foreground mb-1">Total Geral de Perdas</p>
          <p className="text-2xl font-bold text-foreground">R$ {totalValue.toFixed(2)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 space-y-1">
          {assistantTotals.map(({ ajudante, count, value }) => {
            const percentage = ((value / totalValue) * 100).toFixed(1)
            return (
              <div
                key={ajudante}
                className="p-4 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-sm text-foreground truncate">{ajudante}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{count} registros</span>
                </div>
                <div className="flex items-baseline justify-between mb-2">
                  <p className="text-lg font-bold text-foreground">R$ {value.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{percentage}%</p>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${percentage}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
*/}