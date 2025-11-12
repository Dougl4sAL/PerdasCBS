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

export default function Home() {
  const [losses, setLosses] = useState<Loss[]>(MOCK_LOSSES)
  const [searchCode, setSearchCode] = useState("")
  const [searchDescription, setSearchDescription] = useState("")
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

  useEffect(() => {
    if (isLoaded) {
      saveLossesToStorage(losses)
    }
  }, [losses, isLoaded])

  // Search filter based on code and description
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
    setFilteredLosses(updatedLosses)
  }

  const handleUpdateLoss = (updatedLoss: Loss) => {
    const updatedLosses = losses.map((loss) => (loss.id === updatedLoss.id ? updatedLoss : loss))
    setLosses(updatedLosses)
    setFilteredLosses(updatedLosses)
  }

  const handleDeleteLoss = (id: string) => {
    const updatedLosses = losses.filter((loss) => loss.id !== id)
    setLosses(updatedLosses)
    setFilteredLosses(updatedLosses)
  }

  const handleAdvancedFilter = (filtered: Loss[]) => {
    setFilteredLosses(filtered)
  }

  const handleClearFilters = () => {
    setFilteredLosses(losses)
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Total de Perdas</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{losses.length}</p>
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
                {losses.reduce((acc, loss) => acc + loss.quantidade, 0)}
              </p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Form Section */}
          <Card className="lg:col-span-1 h-fit bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow w-auto border-0">
            <div className="p-4 md:p-6 border-b border-border/30">
              <h2 className="text-base md:text-lg font-semibold text-foreground">Nova Perda</h2>
              <p className="text-xs text-muted-foreground mt-1">Registre uma nova perda no sistema</p>
            </div>
            <LossForm onAddLoss={handleAddLoss} />
          </Card>

          {/* Search and Results Section */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Advanced Filter */}
            <AdvancedFilter losses={losses} onFilterChange={handleAdvancedFilter} onClearFilters={handleClearFilters} />

            {/* Search Section */}
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

            {/* Results Table */}
            <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <LossesTable
                losses={searchFilteredLosses}
                onUpdateLoss={handleUpdateLoss}
                onDeleteLoss={handleDeleteLoss}
              />
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
