"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { AdvancedFilter } from "@/components/advanced-filter"
import { LossesTable } from "@/components/losses-table"
import { MonthlyAnalyticsCard } from "@/components/monthly-analytics-card"
import { TopProductsCard } from "@/components/top-products-card"
import { DailyBreakageAnalytics } from "@/components/daily-breakage-analytics"
import { ReasonAccumulationCard } from "@/components/reason-accumulation-card"
import { AssistantAccumulationCard } from "@/components/assistant-accumulation-card"
import { calculateAnalytics } from "@/lib/analytics-utils"
import { MOCK_LOSSES, type Loss } from "@/lib/mock-data"
import { DashboardHeader } from "@/components/dashboard-header"
import { loadLossesFromStorage } from "@/lib/storage-utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardPage() {
  const [losses, setLosses] = useState<Loss[]>(MOCK_LOSSES)
  const [filteredLosses, setFilteredLosses] = useState<Loss[]>(MOCK_LOSSES)
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>("all")

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

  const availableYears = useMemo(() => {
    const years = new Set<number>()
    losses.forEach((loss) => {
      const [day, month, year] = loss.data.split("/")
      years.add(Number.parseInt(year))
    })
    return Array.from(years).sort((a, b) => b - a)
  }, [losses])

  const yearFilteredLosses = useMemo(() => {
    if (selectedYearFilter === "all") {
      return filteredLosses
    }
    return filteredLosses.filter((loss) => {
      const [day, month, year] = loss.data.split("/")
      return year === selectedYearFilter
    })
  }, [filteredLosses, selectedYearFilter])

  const analytics = calculateAnalytics(yearFilteredLosses)

  const globalTotals = useMemo(() => {
    const totalHectoPerda = yearFilteredLosses.reduce((acc, loss) => {
      const hecto = Number.parseFloat(
        loss.hectoUnid?.replace(",", ".") ?? "0"
      )
      return acc + loss.quantidade * hecto
    }, 0)

    const totalPrecoPerda = yearFilteredLosses.reduce((acc, loss) => {
      const preco = Number.parseFloat(
        loss.precoUnid?.replace(",", ".") ?? "0"
      )
      return acc + loss.quantidade * preco
    }, 0)

    return {
      hectoPerda: totalHectoPerda.toFixed(3),
      precoPerda: totalPrecoPerda.toFixed(2),
    }
  }, [yearFilteredLosses])

  const handleAdvancedFilter = (filtered: Loss[]) => {
    setFilteredLosses(filtered)
  }

  const handleClearFilters = () => {
    setFilteredLosses(losses)
    setSelectedYearFilter("all")
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
              <p className="text-xs text-muted-foreground mt-2">
                {selectedYearFilter === "all" ? "registros no sistema" : `registrado de ${selectedYearFilter}`}
              </p>
            </div>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Quantidade Total</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{analytics.totalQuantity}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedYearFilter === "all" ? "unidades perdidas" : `unid perdidas de ${selectedYearFilter}`}
              </p>
            </div>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Média por Registro</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{analytics.averageLossPerRecord}</p>
              <p className="text-xs text-muted-foreground mt-2">unidades/registro
                {selectedYearFilter === "all" ? "unidades/registro total" : `média acumulado de ${selectedYearFilter}`}
              </p>
            </div>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Motivos Únicos</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {Object.keys(analytics.lossesByReason).length}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedYearFilter === "all" ? "tipos de perdas total" : `tipos acumulados de ${selectedYearFilter}`}
              </p>
            </div>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">
                Total Hecto Perdidos (Geral)
              </p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{globalTotals.hectoPerda} HL</p>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedYearFilter === "all" ? "acumulado histórico" : `acumulado de ${selectedYearFilter}`}
              </p>
            </div>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Valor Total Perdido (Geral)</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">R$ {globalTotals.precoPerda}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {selectedYearFilter === "all"
                  ? "acumulado financeiro histórico"
                  : `acumulado financeiro de ${selectedYearFilter}`}
              </p>
            </div>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="mb-8 flex gap-2">
          <Button asChild variant="outline" className="text-sm bg-transparent">
            <a href="/">Voltar para Principal</a>
          </Button>
        </div>

        <div className="mb-8">
          <DailyBreakageAnalytics losses={losses} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ReasonAccumulationCard losses={yearFilteredLosses} />
          <AssistantAccumulationCard losses={yearFilteredLosses} />
        </div>

        <div className="mb-8">
          <MonthlyAnalyticsCard losses={filteredLosses} />
        </div>

        <div className="mb-8">
          <TopProductsCard losses={yearFilteredLosses} />
        </div>

        <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden mb-8">
          <div className="p-4 md:p-6 border-b border-border/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base md:text-lg font-semibold text-foreground">Histórico Completo de Perdas</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedYearFilter === "all"
                    ? "Todas as perdas registradas no sistema"
                    : `Perdas registradas em ${selectedYearFilter}`}
                </p>
              </div>
              <Select value={selectedYearFilter} onValueChange={setSelectedYearFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Filtrar por ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tudo</SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <LossesTable
            losses={yearFilteredLosses}
            onUpdateLoss={handleUpdateLoss}
            onDeleteLoss={handleDeleteLoss}
            isFiltered={yearFilteredLosses.length !== losses.length}
          />
        </Card>

        {/* Analytics Charts */}
        <AnalyticsCharts analytics={analytics} />
      </div>
    </main>
  )
}
