"use client"

import { useState, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { LossForm } from "@/components/loss-form"
import { SearchBox } from "@/components/search-box"
import { LossesTable } from "@/components/losses-table"
import { AdvancedFilter } from "@/components/advanced-filter"
import { normalizeString } from "@/lib/search-utils"
import { MOCK_LOSSES, type Loss } from "@/lib/mock-data"
import { DashboardHeader } from "@/components/dashboard-header"
import { loadLossesFromStorage, saveLossesToStorage } from "@/lib/storage-utils"
import { isToday } from "@/lib/date-utils"

export default function Home() {
  const [losses, setLosses] = useState<Loss[]>(MOCK_LOSSES)
  const [searchCode, setSearchCode] = useState("")
  const [searchDescription, setSearchDescription] = useState("")
  const [filteredLosses, setFilteredLosses] = useState<Loss[]>(MOCK_LOSSES)
  const [isLoaded, setIsLoaded] = useState(false)

  const todayLosses = useMemo(() => {
    return losses.filter((loss) => isToday(loss.data))
  }, [losses])

  useEffect(() => {
    const storedLosses = loadLossesFromStorage()
    if (storedLosses && storedLosses.length > 0) {
      setLosses(storedLosses)
      const todayData = storedLosses.filter((loss) => isToday(loss.data))
      setFilteredLosses(todayData)
    } else {
      setLosses(MOCK_LOSSES)
      const todayData = MOCK_LOSSES.filter((loss) => isToday(loss.data))
      setFilteredLosses(todayData)
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      saveLossesToStorage(losses)
    }
  }, [losses, isLoaded])

  const searchFilteredLosses = useMemo(() => {
    return filteredLosses.filter((loss) => {
      const codeMatch = searchCode === "" || loss.codigo.includes(searchCode)
      const descMatch =
        searchDescription === "" || normalizeString(loss.descricao).includes(normalizeString(searchDescription))
      return codeMatch && descMatch
    })
  }, [filteredLosses, searchCode, searchDescription])

  const handleAddLoss = (newLoss: Loss) => {
    const updatedLosses = [newLoss, ...losses]
    setLosses(updatedLosses)
    if (isToday(newLoss.data)) {
      setFilteredLosses([newLoss, ...filteredLosses])
    }
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

  const handleAdvancedFilter = (filtered: Loss[]) => {
    setFilteredLosses(filtered)
  }

  const handleClearFilters = () => {
    setFilteredLosses(todayLosses)
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Perdas de Hoje</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{todayLosses.length}</p>
            </div>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Resultados Encontrados</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{searchFilteredLosses.length}</p>
            </div>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors sm:col-span-2 lg:col-span-1">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Total em Quantidade</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                {todayLosses.reduce((acc, loss) => acc + loss.quantidade, 0)}
              </p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="lg:col-span-1 h-fit bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow w-auto border-0">
            <div className="p-4 md:p-6 border-b border-border/30">
              <h2 className="text-base md:text-lg font-semibold text-foreground">Nova Perda</h2>
              <p className="text-xs text-muted-foreground mt-1">Registre uma nova perda no sistema</p>
            </div>
            <LossForm onAddLoss={handleAddLoss} />
          </Card>

          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <AdvancedFilter
              losses={todayLosses}
              onFilterChange={handleAdvancedFilter}
              onClearFilters={handleClearFilters}
            />

            <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-4 md:p-6">
                <h2 className="text-base md:text-lg font-semibold text-foreground mb-4">Buscar Perdas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <SearchBox placeholder="Buscar por Código..." value={searchCode} onChange={setSearchCode} />
                  <SearchBox
                    placeholder="Buscar por Descrição..."
                    value={searchDescription}
                    onChange={setSearchDescription}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-4 font-medium">
                  {searchFilteredLosses.length} resultado{searchFilteredLosses.length !== 1 ? "s" : ""} encontrado
                  {searchFilteredLosses.length !== 1 ? "s" : ""}
                </p>
              </div>
            </Card>

            {searchFilteredLosses.length === 0 && todayLosses.length === 0 ? (
              <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="p-8 md:p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <span className="text-3xl">📦</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-2">Ainda não houve registro de perdas hoje</p>
                  <p className="text-sm text-muted-foreground">
                    Registre a primeira perda do dia usando o formulário ao lado
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="p-4 md:p-6 border-b border-border/30">
                  <h2 className="text-base md:text-lg font-semibold text-foreground">Perdas de Hoje</h2>
                  <p className="text-xs text-muted-foreground mt-1">Registros do dia atual</p>
                </div>
                <LossesTable
                  losses={searchFilteredLosses}
                  onUpdateLoss={handleUpdateLoss}
                  onDeleteLoss={handleDeleteLoss}
                  isFiltered={filteredLosses.length !== todayLosses.length}
                />
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
