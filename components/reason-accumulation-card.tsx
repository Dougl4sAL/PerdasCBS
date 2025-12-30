{/*"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import type { Loss } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

interface ReasonAccumulationCardProps {
  losses: Loss[]
}

const REASON_COLORS: Record<string, string> = {
  Vencimento: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  Quebra: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  Furo: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  Falta: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  "Micro Furo": "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
  "Mal Cheio": "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  Vazada: "bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20",
  "Def. Rótulo": "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
  Amassada: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  "Blow Out": "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
  Vazia: "bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/20",
  Quebrada: "bg-orange-600/10 text-orange-800 dark:text-orange-300 border-orange-600/20",
  Estufada: "bg-lime-500/10 text-lime-700 dark:text-lime-400 border-lime-500/20",
  Inventário: "bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20",
}

export function ReasonAccumulationCard({ losses }: ReasonAccumulationCardProps) {
  const reasonTotals = useMemo(() => {
    const totals: Record<string, { count: number; value: number }> = {}

    losses.forEach((loss) => {
      const precoPerda = loss.quantidade * Number.parseFloat(loss.precoUnid.replace(",", "."))

      if (!totals[loss.motivo]) {
        totals[loss.motivo] = { count: 0, value: 0 }
      }

      totals[loss.motivo].count += 1
      totals[loss.motivo].value += precoPerda
    })

    return Object.entries(totals)
      .map(([motivo, data]) => ({
        motivo,
        count: data.count,
        value: data.value,
      }))
      .sort((a, b) => b.value - a.value)
  }, [losses])

  const totalValue = useMemo(() => {
    return reasonTotals.reduce((acc, item) => acc + item.value, 0)
  }, [reasonTotals])

  return (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border/30">
        <h2 className="text-base md:text-lg font-semibold text-foreground">Acumulado Total por Motivo</h2>
        <p className="text-xs text-muted-foreground mt-1">Valor total perdido segmentado por cada motivo de perda</p>
      </div>

      <div className="p-4 md:p-6">
        <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-xs text-muted-foreground mb-1">Total Geral de Perdas</p>
          <p className="text-2xl font-bold text-foreground">R$ {totalValue.toFixed(2)}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {reasonTotals.map(({ motivo, count, value }) => {
            const percentage = ((value / totalValue) * 100).toFixed(1)
            return (
              <div
                key={motivo}
                className="p-4 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className={`${REASON_COLORS[motivo] || "bg-gray-500/10 text-gray-700"}`}>
                    {motivo}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{count} ocorrências</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xl font-bold text-foreground">R$ {value.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">{percentage}% do total</p>
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
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