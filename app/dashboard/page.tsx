"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { AdvancedFilter, type GlobalFilterCriteria } from "@/components/advanced-filter"
import { LossesTable } from "@/components/losses-table"
import { MonthlyAnalyticsCard } from "@/components/monthly-analytics-card"
import { TopProductsCard } from "@/components/top-products-card"
import { DailyBreakageAnalytics } from "@/components/daily-breakage-analytics"
import { CombinedAccumulationCard } from "@/components/combined-accumulation-card"
import { LocationLossesCard } from "@/components/location-losses-card"
import { PrejuizoAccumulationCard } from "@/components/prejuizo-accumulation-card"
import { calculateAnalytics } from "@/lib/analytics-utils"
import { DashboardHeader } from "@/components/dashboard-header"
// Importar Actions e Tipo
import { getLosses, type LossData } from "@/app/actions/losses"
import { toast } from "@/hooks/use-toast"

/**
 * Tela de dashboard.
 * Consolida filtros, metricas e graficos para analise das perdas.
 */
export default function DashboardPage() {
  const [losses, setLosses] = useState<LossData[]>([])
  const [filteredLosses, setFilteredLosses] = useState<LossData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [filterCriteria, setFilterCriteria] = useState<GlobalFilterCriteria>({
    location: "",
    area: "",
    helper: "",
    reason: "",
    startDate: "",
    endDate: "",
    year: "",
    month: "",
  })

  // Função para buscar dados atualizados
  /**
   * Busca os dados mais recentes no servidor.
   */
  const fetchLosses = async () => {
    try {
      const data = await getLosses()
      setLosses(data)
      setFilteredLosses(data) // Inicialmente, filtrados = total
    } catch (error) {
      toast({
         title: "Erro",
         description: "Não foi possível carregar os dados.",
         variant: "destructive"
      })
    } finally {
      setIsLoaded(true)
    }
  }

  /**
   * Executa apenas no primeiro carregamento da pagina.
   */
  useEffect(() => {
    fetchLosses()
  }, [])

  // Efeito para reaplicar filtros quando 'losses' mudar (ex: após insert/update)
  useEffect(() => {
    // Se não houver filtros ativos, apenas atualiza
    // Se algum filtro estiver ativo, mantemos o resultado atual.
    const hasFilters = Object.values(filterCriteria).some(v => v !== "")
    if (!hasFilters) {
        setFilteredLosses(losses)
    }
    // Nota: A lógica real de reaplicar filtros complexos deveria estar aqui 
    // ou no componente AdvancedFilter, mas para manter simples:
    // O usuário verá os dados novos e poderá refiltrar se necessário.
  }, [losses])


  /**
   * Filtra por ano para alimentar os graficos mensais.
   */
  const yearOnlyFilteredLosses = useMemo(() => {
    if (!filterCriteria.year) {
      return losses
    }
    return losses.filter((loss) => {
      const [day, month, year] = loss.data.split("/")
      return year === filterCriteria.year
    })
  }, [losses, filterCriteria.year])

  const analytics = calculateAnalytics(filteredLosses)

  /**
   * Calcula os totais gerais de volume e valor para os registros visiveis.
   */
  const globalTotals = useMemo(() => {
    const totalHectoPerda = filteredLosses.reduce((acc, loss) => {
      const hecto = Number.parseFloat(loss.hectoUnid?.replace(",", ".") ?? "0")
      return acc + loss.quantidade * hecto
    }, 0)

    const totalPrecoPerda = filteredLosses.reduce((acc, loss) => {
      const preco = Number.parseFloat(loss.precoUnid?.replace(",", ".") ?? "0")
      return acc + loss.quantidade * preco
    }, 0)

    return {
      hectoPerda: totalHectoPerda.toFixed(3),
      precoPerda: totalPrecoPerda.toFixed(2),
    }
  }, [filteredLosses])

  /**
   * Recebe os resultados do filtro avancado e aplica na tela.
   */
  const handleAdvancedFilter = (filtered: LossData[], criteria: GlobalFilterCriteria) => {
    setFilteredLosses(filtered)
    setFilterCriteria(criteria)
  }

  /**
   * Limpa filtros e volta para a lista completa.
   */
  const handleClearFilters = () => {
    setFilteredLosses(losses)
    setFilterCriteria({
      location: "",
      area: "",
      helper: "",
      reason: "",
      startDate: "",
      endDate: "",
      year: "",
      month: "",
    })
  }

  // Callback chamado após uma atualização ou exclusão bem-sucedida
  /**
   * Atualiza os dados apos editar ou excluir registros.
   */
  const handleDataChanged = () => {
    fetchLosses() // Recarrega tudo do servidor
  }
  
  // Renderização condicional para mostrar loading enquanto os dados estão sendo carregados
  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center gap-2">
                 <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                 <p className="text-muted-foreground">Sincronizando com o banco de dados...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const hasActiveFilters = Object.values(filterCriteria).some((value) => value !== "")

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Dashboard Analítico</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Análise detalhada de todo o histórico de perdas (Online via Neon DB)
          </p>
        </div>

        <AdvancedFilter losses={losses} onFilterChange={handleAdvancedFilter} onClearFilters={handleClearFilters} />

        {/* Cards de métricas principais - sempre visíveis, mas com dados atualizados conforme filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Total de Perdas</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{analytics.totalLosses}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {hasActiveFilters ? "registros filtrados" : "registros no banco"}
              </p>
            </div>
          </Card>

          {/*Métrica calculada: quantidade total perdida (soma de quantidade) */}
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Quantidade Total</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{analytics.totalQuantity}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {hasActiveFilters ? "unidades filtradas" : "unidades perdidas"}
              </p>
            </div>
          </Card>

          {/*Métrica calculada: média de perda por registro */}
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Média por Registro</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{analytics.averageLossPerRecord}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {hasActiveFilters ? "unidades/registro filtrada" : "unidades/registro"}
              </p>
            </div>
          </Card>

          {/*Métrica calculada: motivos únicos de perda */}
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Motivos Únicos</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {Object.keys(analytics.lossesByReason).length}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {hasActiveFilters ? "tipos de perda filtrada" : "tipos de perdas"}
              </p>
            </div>
          </Card>

          {/*Métrica calculada: total de hectolitros perdidos */}
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Total Hecto Perdidos</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{globalTotals.hectoPerda} HL</p>
              <p className="text-xs text-muted-foreground mt-2">
                {hasActiveFilters ? "acumulado do período" : "acumulado"}
              </p>
            </div>
          </Card>

          {/*Métrica calculada: valor total perdido */}
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Valor Total Perdido</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">R$ {globalTotals.precoPerda}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {hasActiveFilters ? "acumulado do período" : "acumulado financeiro"}
              </p>
            </div>
          </Card>
        </div>

        {/* Ações rápidas */}
        <div className="mb-8 flex gap-2">
          {/* Botão para voltar à página principal */}
          <Button asChild variant="outline" className="text-sm bg-transparent">
            <a href="/">Voltar para Principal</a>
          </Button>
           {/* Botão de Refresh manual para o banco */}
           <Button variant="ghost" onClick={fetchLosses} className="text-sm">
            🔄 Atualizar Dados
          </Button>
        </div>

        {/* Restante dos cards com as analises */}
        <div className="grid grid-cols-1 gap-8">
            <DailyBreakageAnalytics losses={filteredLosses} />
            <CombinedAccumulationCard losses={filteredLosses} />
            <PrejuizoAccumulationCard losses={filteredLosses} />
            <LocationLossesCard losses={filteredLosses} />
            <MonthlyAnalyticsCard losses={yearOnlyFilteredLosses} filterCriteria={filterCriteria} />
            <TopProductsCard losses={filteredLosses} />
            <AnalyticsCharts analytics={analytics} />
        </div>

        {/* Tabela de perdas - sempre visível, mas com dados filtrados conforme critérios */}
        <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden mb-8 mt-8">
          <div className="p-4 md:p-6 border-b border-border/30">
            <div>
              <h2 className="text-base md:text-lg font-semibold text-foreground">Histórico Completo de Perdas</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {hasActiveFilters ? "Perdas filtradas" : "Todas as perdas registradas no sistema"}
              </p>
            </div>
          </div>
          {/* A tabela recebe os dados filtrados*/}
          <LossesTable
            losses={filteredLosses}
            onDataChange={handleDataChanged} 
            isFiltered={filteredLosses.length !== losses.length}
          />
        </Card>

      </div>
    </main>
  )
}
