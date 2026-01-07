"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import type { Loss } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

interface LocationLossesCardProps {
  losses: Loss[]
}

const LOCATION_COLORS: Record<string, string> = {
  Armazém: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
  Puxada: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  Rota: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
}

export function LocationLossesCard({ losses }: LocationLossesCardProps) {
  const locationTotals = useMemo(() => {
    const totals: Record<string, { count: number; hectolitros: number; valorReais: number }> = {
      Armazém: { count: 0, hectolitros: 0, valorReais: 0 },
      Puxada: { count: 0, hectolitros: 0, valorReais: 0 },
      Rota: { count: 0, hectolitros: 0, valorReais: 0 },
    }

    losses.forEach((loss) => {
      const hectoValue = Number.parseFloat(loss.hectoUnid.replace(",", "."))
      const precoValue = Number.parseFloat(loss.precoUnid.replace(",", "."))

      const hectolitros = loss.quantidade * hectoValue
      const valorReais = loss.quantidade * precoValue

      if (totals[loss.local]) {
        totals[loss.local].count += 1
        totals[loss.local].hectolitros += hectolitros
        totals[loss.local].valorReais += valorReais
      }
    })

    return Object.entries(totals)
      .map(([local, data]) => ({
        local,
        count: data.count,
        hectolitros: data.hectolitros,
        valorReais: data.valorReais,
      }))
      .sort((a, b) => b.valorReais - a.valorReais)
  }, [losses])

  const totalHectolitros = useMemo(() => {
    return locationTotals.reduce((acc, item) => acc + item.hectolitros, 0)
  }, [locationTotals])

  const totalValorReais = useMemo(() => {
    return locationTotals.reduce((acc, item) => acc + item.valorReais, 0)
  }, [locationTotals])

  return (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border/30">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground">Perdas por Local</h2>
          <p className="text-xs text-muted-foreground mt-1">Análise de perdas segmentada por local de ocorrência</p>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Total Hectolitros Perdidos</p>
            <p className="text-2xl font-bold text-foreground">{totalHectolitros.toFixed(3)} HL</p>
          </div>
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Total Valor em Reais Perdido</p>
            <p className="text-2xl font-bold text-foreground">R$ {totalValorReais.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {locationTotals.map(({ local, count, hectolitros, valorReais }) => {
            const hectoPercentage = totalHectolitros > 0 ? ((hectolitros / totalHectolitros) * 100).toFixed(1) : "0.0"
            const valorPercentage = totalValorReais > 0 ? ((valorReais / totalValorReais) * 100).toFixed(1) : "0.0"

            return (
              <div
                key={local}
                className="p-5 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className={`${LOCATION_COLORS[local]} text-sm font-semibold`}>
                    {local}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{count} registros</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Hectolitros</p>
                      <p className="text-xs text-muted-foreground">{hectoPercentage}%</p>
                    </div>
                    <p className="text-xl font-bold text-primary mb-2">{hectolitros.toFixed(3)} HL</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${hectoPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="border-t border-border/30 pt-3">
                    <div className="flex items-baseline justify-between mb-1">
                      <p className="text-xs text-muted-foreground">Valor em Reais</p>
                      <p className="text-xs text-muted-foreground">{valorPercentage}%</p>
                    </div>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                      R$ {valorReais.toFixed(2)}
                    </p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${valorPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
