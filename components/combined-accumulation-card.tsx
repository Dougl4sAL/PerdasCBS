"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
// MUDANÇA: Importar LossData
import type { LossData } from "@/app/actions/losses"
import { Badge } from "@/components/ui/badge"
import { VEHICLE_PLATES } from "@/lib/mock-data" // As constantes ainda vêm daqui, isso está correto.

interface CombinedAccumulationCardProps {
  // Tipo atualizado
  losses: LossData[]
}

const REASON_COLORS: Record<string, string> = {
  // ... (cores permanecem iguais)
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

export function CombinedAccumulationCard({ losses }: CombinedAccumulationCardProps) {
  const reasonTotals = useMemo(() => {
    const totals: Record<string, { count: number; value: number }> = {}

    losses.forEach((loss) => {
      // Conversão segura de preço
      const preco = Number.parseFloat(String(loss.precoUnid).replace(",", ".") || "0")
      const precoPerda = loss.quantidade * preco

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

  const assistantTotals = useMemo(() => {
    const totals: Record<string, { count: number; value: number }> = {}

    losses.forEach((loss) => {
      if (loss.ajudante === "Inventário" || loss.ajudante === "Pac. Prejuízo") {
        return
      }

      if (VEHICLE_PLATES.includes(loss.ajudante as any)) {
        return
      }

      const preco = Number.parseFloat(String(loss.precoUnid).replace(",", ".") || "0")
      const precoPerda = loss.quantidade * preco

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

  const vehicleTotals = useMemo(() => {
    const totals: Record<string, { count: number; value: number }> = {}

    losses.forEach((loss) => {
      if (!VEHICLE_PLATES.includes(loss.ajudante as any)) {
        return
      }

      const preco = Number.parseFloat(String(loss.precoUnid).replace(",", ".") || "0")
      const precoPerda = loss.quantidade * preco

      if (!totals[loss.ajudante]) {
        totals[loss.ajudante] = { count: 0, value: 0 }
      }

      totals[loss.ajudante].count += 1
      totals[loss.ajudante].value += precoPerda
    })

    return Object.entries(totals)
      .map(([veiculo, data]) => ({
        veiculo,
        count: data.count,
        value: data.value,
      }))
      .sort((a, b) => b.value - a.value)
  }, [losses])

  // ... (Restante do arquivo permanece idêntico nos cálculos de totalValue e no JSX)
  const totalValue = useMemo(() => reasonTotals.reduce((acc, item) => acc + item.value, 0), [reasonTotals])
  const assistantTotalValue = useMemo(() => assistantTotals.reduce((acc, item) => acc + item.value, 0), [assistantTotals])
  const vehicleTotalValue = useMemo(() => vehicleTotals.reduce((acc, item) => acc + item.value, 0), [vehicleTotals])

  return (
      <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg overflow-hidden">
        {/* ... (JSX existente sem alterações necessárias) ... */}
        {/* Devido ao tamanho, assuma que o JSX abaixo é igual ao seu original */}
        <div className="p-4 md:p-6 border-b border-border/30">
            <div>
            <h2 className="text-base md:text-lg font-semibold text-foreground">Acumulado Total por Motivo e Ajudante</h2>
            <p className="text-xs text-muted-foreground mt-1">Valor total perdido segmentado por motivo e ajudante</p>
            </div>
        </div>
        <div className="p-4 md:p-6">
            <div className="mb-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">Total Geral de Perdas</p>
            <p className="text-2xl font-bold text-foreground">R$ {totalValue.toFixed(2)}</p>
            </div>
            {/* ... Resto das seções (Motivo, Ajudante, Veículo) ... */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-primary" />Por Motivo</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                        {reasonTotals.map(({ motivo, count, value }) => {
                            const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(1) : "0.0"
                            return (
                                <div key={motivo} className="p-4 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/30 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge variant="outline" className={`${REASON_COLORS[motivo] || "bg-gray-500/10 text-gray-700"}`}>{motivo}</Badge>
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
                {/* ... Seções Ajudante e Veículo iguais ao original ... */}
                 <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-primary" />Por Ajudante</h3>
                    <div className="mb-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">Total de Ajudantes (sem pac. prejuízo e inventário)</p>
                        <p className="text-lg font-bold text-foreground">R$ {assistantTotalValue.toFixed(2)}</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                        {assistantTotals.map(({ ajudante, count, value }) => {
                           const percentage = assistantTotalValue > 0 ? ((value / assistantTotalValue) * 100).toFixed(1) : "0.0"
                           return (
                               <div key={ajudante} className="p-4 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/30 transition-colors">
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
                {/* ... Seção Veículo igual ao original ... */}
                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-primary" />Por Veículo (Rota)</h3>
                     <div className="mb-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1">Total de Veículos</p>
                        <p className="text-lg font-bold text-foreground">R$ {vehicleTotalValue.toFixed(2)}</p>
                    </div>
                    {vehicleTotals.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                        {vehicleTotals.map(({ veiculo, count, value }) => {
                        const percentage = vehicleTotalValue > 0 ? ((value / vehicleTotalValue) * 100).toFixed(1) : "0.0"
                        return (
                            <div key={veiculo} className="p-4 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/30 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20">{veiculo}</Badge>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{count} registros</span>
                                </div>
                                <div className="flex items-baseline justify-between mb-2">
                                    <p className="text-lg font-bold text-foreground">R$ {value.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground">{percentage}%</p>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${percentage}%` }} />
                                </div>
                            </div>
                        )
                        })}
                    </div>
                    ) : (
                    <div className="p-8 text-center border border-dashed border-border/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Nenhum registro de veículo encontrado</p>
                    </div>
                    )}
                </div>
            </div>
        </div>
      </Card>
  )
}