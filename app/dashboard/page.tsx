"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { AdvancedFilter } from "@/components/advanced-filter"
import { LossesTable } from "@/components/losses-table"
import { calculateAnalytics } from "@/lib/analytics-utils"
import { MOCK_LOSSES, type Loss } from "@/lib/mock-data"
import { DashboardHeader } from "@/components/dashboard-header"
import { loadLossesFromStorage } from "@/lib/storage-utils"

export default function DashboardPage() {
  const [losses, setLosses] = useState<Loss[]>(MOCK_LOSSES)
  const [filteredLosses, setFilteredLosses] = useState<Loss[]>(MOCK_LOSSES)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const storedLosses = loadLossesFromStorage()
    if (storedLosses && storedLosses.length > 0) {
      setLosses(storedLosses)
      setFilteredLosses(storedLosses)
    } else {
      setLosses(MOCK_LOSSES)
      setFilteredLosses(MOCK_LOSSES)
    }
    setIsLoaded(true)
  }, [])

  const analytics = calculateAnalytics(filteredLosses)

  const globalTotals = useMemo(() => {
    const totalHectoPerda = filteredLosses.reduce((acc, loss) => {
      const hecto = Number.parseFloat(
        loss.hectoUnid?.replace(",", ".") ?? "0"
      )
      return acc + loss.quantidade * hecto
    }, 0)

    const totalPrecoPerda = filteredLosses.reduce((acc, loss) => {
      const preco = Number.parseFloat(
        loss.precoUnid?.replace(",", ".") ?? "0"
      )
      return acc + loss.quantidade * preco
    }, 0)

    return {
      hectoPerda: totalHectoPerda.toFixed(2),
      precoPerda: totalPrecoPerda.toFixed(2),
    }
  }, [filteredLosses])

  const handleAdvancedFilter = (filtered: Loss[]) => {
    setFilteredLosses(filtered)
  }

  const handleClearFilters = () => {
    setFilteredLosses(losses)
  }

  const handleUpdateLoss = (updatedLoss: Loss) => {
    const updatedLosses = losses.map((loss) => (loss.id === updatedLoss.id ? updatedLoss : loss))
    setLosses(updatedLosses)
    setFilteredLosses(filteredLosses.map((loss) => (loss.id === updatedLoss.id ? updatedLoss : loss)))
  }

  const handleDeleteLoss = (id: string) => {
    const updatedLosses = losses.filter((loss) => loss.id !== id)
    setLosses(updatedLosses)
    setFilteredLosses(filteredLosses.filter((loss) => loss.id !== id))
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Dashboard Analítico</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Análise detalhada de todo o histórico de perdas de estoque
          </p>
        </div>

        {/* Advanced Filter */}
        <AdvancedFilter losses={losses} onFilterChange={handleAdvancedFilter} onClearFilters={handleClearFilters} />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Total de Perdas</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{analytics.totalLosses}</p>
              <p className="text-xs text-muted-foreground mt-2">registros no sistema</p>
            </div>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Quantidade Total</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{analytics.totalQuantity}</p>
              <p className="text-xs text-muted-foreground mt-2">unidades perdidas</p>
            </div>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Média por Registro</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{analytics.averageLossPerRecord}</p>
              <p className="text-xs text-muted-foreground mt-2">unidades/registro</p>
            </div>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Motivos Únicos</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {Object.keys(analytics.lossesByReason).length}
              </p>
              <p className="text-xs text-muted-foreground mt-2">tipos de perdas</p>
            </div>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">
                Total Hecto Perdidos (Geral)
              </p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{globalTotals.hectoPerda} HL</p>
              <p className="text-xs text-muted-foreground mt-2">acumulado histórico</p>
            </div>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Valor Total Perdido (Geral)</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">R$ {globalTotals.precoPerda}</p>
              <p className="text-xs text-muted-foreground mt-2">acumulado financeiro histórico</p>
            </div>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="mb-8 flex gap-2">
          <Button asChild variant="outline" className="text-sm bg-transparent">
            <a href="/">Voltar para Principal</a>
          </Button>
        </div>

        <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden mb-8">
          <div className="p-4 md:p-6 border-b border-border/30">
            <h2 className="text-base md:text-lg font-semibold text-foreground">Histórico Completo de Perdas</h2>
            <p className="text-xs text-muted-foreground mt-1">Todas as perdas registradas no sistema</p>
          </div>
          <LossesTable
            losses={filteredLosses}
            onUpdateLoss={handleUpdateLoss}
            onDeleteLoss={handleDeleteLoss}
            isFiltered={filteredLosses.length !== losses.length}
          />
        </Card>

        {/* Analytics Charts */}
        <AnalyticsCharts analytics={analytics} />
      </div>
    </main>
  )
}
