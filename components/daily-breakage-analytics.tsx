"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"
// MUDANÇA: Importar LossData
import type { LossData } from "@/app/actions/losses"
import { BREAKAGE_REASONS, HELPERS, PRODUCTS } from "@/lib/mock-data"

interface DailyBreakageAnalyticsProps {
  // Tipo atualizado
  losses: LossData[]
}

/**
 * Tabela diaria de perdas por quebra.
 * Exibe acumulado geral, por tipo de quebra e por ajudante.
 */
export function DailyBreakageAnalytics({ losses }: DailyBreakageAnalyticsProps) {
  /**
   * Mantem apenas registros cujo motivo principal eh "Quebra".
   */
  const filteredLosses = useMemo(() => {
    return losses.filter((loss) => loss.motivo === "Quebra")
  }, [losses])

  // Ajuste no tipo da função de filtro
  /**
   * Soma valores por dia do mes.
   * Pode receber uma funcao para segmentar por categoria.
   */
  const calculateDailyData = (filterFn?: (loss: LossData) => boolean) => {
    const dailyTotals: Record<number, number> = {}
    let monthTotal = 0

    const lossesToProcess = filterFn ? filteredLosses.filter(filterFn) : filteredLosses

    lossesToProcess.forEach((loss) => {
      const [day] = loss.data.split("/")
      const dayNum = Number.parseInt(day)
      // Conversão segura de preço
      const preco = Number.parseFloat(String(loss.precoUnid).replace(",", ".") || "0")
      const precoPerda = loss.quantidade * preco

      dailyTotals[dayNum] = (dailyTotals[dayNum] || 0) + precoPerda
      monthTotal += precoPerda
    })

    return { dailyTotals, monthTotal }
  }

  // O restante do arquivo permanece igual, a lógica de filtragem é compatível
  /**
   * Acumulado geral de todas as quebras.
   */
  const generalBreakageData = calculateDailyData()

  /**
   * Acumulado filtrado para regra de marketplace.
   */
  const marketplaceBreakageData = useMemo(() => {
    return calculateDailyData((loss) => {
      // Nota: PRODUCTS vem do mock-data, certifique-se que os códigos lá batem com o banco
      const product = PRODUCTS.find((p) => p.codigo === loss.codigo)
      return loss.codigo.startsWith("9") // regra provisória mantida
    })
  }, [filteredLosses])

  /**
   * Acumulado separado por tipo de motivo de quebra.
   */
  const breakageReasonData = useMemo(() => {
    return BREAKAGE_REASONS.map((reason) => {
      return {
        reason,
        data: calculateDailyData((loss) => loss.motivoQuebra === reason),
      }
    })
  }, [filteredLosses])

  /**
   * Acumulado separado por ajudante.
   */
  const helperBreakageData = useMemo(() => {
    return HELPERS.filter((helper) => filteredLosses.some((loss) => loss.ajudante === helper))
      .map((helper) => {
        return {
          helper,
          data: calculateDailyData((loss) => loss.ajudante === helper),
        }
      })
      .sort((a, b) => b.data.monthTotal - a.data.monthTotal)
  }, [filteredLosses])

  // Componente DataRow (interno) permanece igual
  /**
   * Linha interna da tabela diaria com valores por dia.
   */
  const DataRow = ({
    label,
    data,
    isHighlight = false,
  }: { label: string; data: { dailyTotals: Record<number, number>; monthTotal: number }; isHighlight?: boolean }) => (
    <div className={`flex border-b border-border/30 ${isHighlight ? "bg-primary/5" : ""}`}>
      <div className="sticky left-0 bg-card z-10 min-w-[200px] p-3 border-r border-border/30 font-medium text-sm flex items-center">
        <span className="truncate">{label}</span>
      </div>
      <div className="min-w-[120px] p-3 border-r border-border/30 font-bold text-sm bg-muted/30">
        R$ {data.monthTotal.toFixed(2)}
      </div>
      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
        <div key={day} className="min-w-[100px] p-3 border-r border-border/30 text-sm text-center">
          {data.dailyTotals[day] ? `R$ ${data.dailyTotals[day].toFixed(2)}` : "-"}
        </div>
      ))}
    </div>
  )

  return (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg overflow-hidden">
        {/* JSX igual ao original */}
        <div className="p-4 md:p-6 border-b border-border/30">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground">Análise Diária de Quebras</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Valor perdido por dia em quebras com segmentação detalhada
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="flex bg-muted/30 border-b border-border/30 font-semibold text-xs">
            <div className="sticky left-0 bg-muted/30 z-20 min-w-[200px] p-3 border-r border-border/30">Categoria</div>
            <div className="min-w-[120px] p-3 border-r border-border/30">Acumulado</div>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <div key={day} className="min-w-[100px] p-3 border-r border-border/30 text-center">
                Dia {day}
              </div>
            ))}
          </div>
          <DataRow label="Geral - Todas as Quebras" data={generalBreakageData} isHighlight />
          <DataRow label="Marketplace - Quebras" data={marketplaceBreakageData} />
          <div className="bg-secondary/10 p-2 border-b border-border/30">
            <p className="text-xs font-semibold text-muted-foreground px-3">Por Tipo de Quebra</p>
          </div>
          {breakageReasonData.map(({ reason, data }) => (
            <DataRow key={reason} label={reason} data={data} />
          ))}
          <div className="bg-secondary/10 p-2 border-b border-border/30">
            <p className="text-xs font-semibold text-muted-foreground px-3">Por Ajudante</p>
          </div>
          {helperBreakageData.map(({ helper, data }) => (
            <DataRow key={helper} label={helper} data={data} />
          ))}
        </div>
      </div>
    </Card>
  )
}
