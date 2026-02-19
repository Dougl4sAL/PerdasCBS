"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LossData } from "@/app/actions/losses"
import { getPrejuizoByCodigo } from "@/lib/mock-data"

const COLOR_PALETTE = [
  "bg-primary/10 text-primary border-primary/30",
  "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
  "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
  "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20",
]

interface PrejuizoResumo {
  codigo: string
  nome: string
  count: number
  valorTotal: number
  hectoTotal: number
}

/**
 * Card de estratificação por prejuízo (código + nome).
 * Segue o mesmo estilo do combined-accumulation-card.
 */
export function PrejuizoAccumulationCard({ losses }: { losses: LossData[] }) {
  const resumo = useMemo<PrejuizoResumo[]>(() => {
    const mapa = new Map<string, PrejuizoResumo>()

    losses.forEach((loss) => {
      const codigo = loss.prejuizoCodigo || "-"
      const nome =
        loss.prejuizoNome ||
        getPrejuizoByCodigo(loss.prejuizoCodigo || "")?.nome ||
        "Sem prejuízo vinculado"

      const hectoValue = Number.parseFloat(String(loss.hectoUnid).replace(",", ".") || "0")
      const precoValue = Number.parseFloat(String(loss.precoUnid).replace(",", ".") || "0")

      const hectoTotal = loss.quantidade * hectoValue
      const valorTotal = loss.quantidade * precoValue

      const atual = mapa.get(codigo) ?? {
        codigo,
        nome,
        count: 0,
        valorTotal: 0,
        hectoTotal: 0,
      }

      atual.count += 1
      atual.valorTotal += valorTotal
      atual.hectoTotal += hectoTotal

      mapa.set(codigo, atual)
    })

    return Array.from(mapa.values()).sort((a, b) => b.valorTotal - a.valorTotal)
  }, [losses])

  const totalValor = useMemo(
    () => resumo.reduce((acc, item) => acc + item.valorTotal, 0),
    [resumo],
  )
  const totalHecto = useMemo(
    () => resumo.reduce((acc, item) => acc + item.hectoTotal, 0),
    [resumo],
  )

  return (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border/30">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground">Estratificação por Prejuízo</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Quantidade de ocorrências, valor total e hecto total por código de prejuízo
          </p>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="px-3 py-2 rounded-lg border border-border/50 bg-muted/30">
            <p className="text-[11px] text-muted-foreground mb-1">Valor total</p>
            <p className="text-lg font-bold text-foreground">R$ {totalValor.toFixed(2)}</p>
          </div>
          <div className="px-3 py-2 rounded-lg border border-border/50 bg-muted/30">
            <p className="text-[11px] text-muted-foreground mb-1">Hecto total</p>
            <p className="text-lg font-bold text-foreground">{totalHecto.toFixed(3)} HL</p>
          </div>
          <div className="px-3 py-2 rounded-lg border border-border/50 bg-muted/30">
            <p className="text-[11px] text-muted-foreground mb-1">Prejuízos únicos</p>
            <p className="text-lg font-bold text-foreground">{resumo.length}</p>
          </div>
        </div>

        {resumo.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground border border-dashed border-border/50 rounded-lg">
            Nenhum registro para estratificar
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {resumo.map((item, index) => {
              const percentage = totalValor > 0 ? ((item.valorTotal / totalValor) * 100).toFixed(1) : "0.0"
              const badgeColor = COLOR_PALETTE[index % COLOR_PALETTE.length]

              return (
                <div
                  key={`${item.codigo}-${index}`}
                  className="p-4 rounded-lg border border-border/40 bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className={`text-xs font-semibold ${badgeColor}`}>
                      {item.codigo}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">{item.count} ocorrências</span>
                  </div>
                  <p className="text-sm text-foreground font-medium mb-2 truncate">{item.nome}</p>
                  <div className="flex items-baseline justify-between mb-1">
                    <p className="text-xl font-bold text-foreground">R$ {item.valorTotal.toFixed(2)}</p>
                    <span className="text-xs text-muted-foreground">{percentage}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-2">
                    <span>{item.hectoTotal.toFixed(3)} HL</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}
