"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import type { LossData } from "@/app/actions/losses" // MUDANÇA
import { Badge } from "@/components/ui/badge"

interface LocationLossesCardProps {
  losses: LossData[] // MUDANÇA
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
      // Normaliza a chave do local (caso haja pequenas variações, ou usa o próprio valor)
      const localKey = loss.local as keyof typeof totals
      
      if (totals[localKey]) {
        // Conversão segura de strings numéricas "0,00" -> float
        const hectoUnid = Number.parseFloat(loss.hectoUnid?.replace(",", ".") || "0")
        const precoUnid = Number.parseFloat(loss.precoUnid?.replace(",", ".") || "0")
        
        totals[localKey].count += 1
        totals[localKey].hectolitros += loss.quantidade * hectoUnid
        totals[localKey].valorReais += loss.quantidade * precoUnid
      }
    })

    return totals
  }, [losses])

  const grandTotals = useMemo(() => {
    return Object.values(locationTotals).reduce(
      (acc, curr) => ({
        hectolitros: acc.hectolitros + curr.hectolitros,
        valorReais: acc.valorReais + curr.valorReais,
      }),
      { hectolitros: 0, valorReais: 0 },
    )
  }, [locationTotals])

  return (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border/30">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground">Perdas por Localização</h2>
          <p className="text-xs text-muted-foreground mt-1">Comparativo de impacto entre setores</p>
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(locationTotals).map(([location, data]) => {
            const hectoPercentage =
              grandTotals.hectolitros > 0 ? ((data.hectolitros / grandTotals.hectolitros) * 100).toFixed(1) : "0.0"
            const valorPercentage =
              grandTotals.valorReais > 0 ? ((data.valorReais / grandTotals.valorReais) * 100).toFixed(1) : "0.0"

            return (
              <div
                key={location}
                className="relative overflow-hidden rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/30 transition-all duration-300 group"
              >
                <div className={`absolute top-0 left-0 w-1 h-full ${LOCATION_COLORS[location]?.split(" ")[0] || "bg-gray-500"}`} />
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className={LOCATION_COLORS[location]}>
                      {location}
                    </Badge>
                    <span className="text-xs font-medium text-muted-foreground bg-background/50 px-2 py-1 rounded-full border border-border/50">
                      {data.count} registros
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="text-xs text-muted-foreground">Volume (HL)</p>
                        <p className="text-xs font-medium text-foreground">{hectoPercentage}%</p>
                      </div>
                      <p className="text-xl font-bold text-primary mb-2">{data.hectolitros.toFixed(3)} HL</p>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${hectoPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border/30">
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="text-xs text-muted-foreground">Valor Financeiro</p>
                        <p className="text-xs font-medium text-foreground">{valorPercentage}%</p>
                      </div>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">
                        R$ {data.valorReais.toFixed(2)}
                      </p>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-500"
                          style={{ width: `${valorPercentage}%` }}
                        />
                      </div>
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