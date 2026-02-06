"use client"

import { useState, useMemo, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { LossForm } from "@/components/loss-form"
import { SearchBox } from "@/components/search-box"
import { LossesTable } from "@/components/losses-table"
import { AdvancedFilter, type GlobalFilterCriteria } from "@/components/advanced-filter"
import { normalizeString } from "@/lib/search-utils"
import { DashboardHeader } from "@/components/dashboard-header"
import { isToday } from "@/lib/date-utils"
import { useToast } from "@/hooks/use-toast"

// Importações da nova API
import { getLosses, createLoss, updateLoss, deleteLoss, type LossData } from "@/app/actions/losses"

export default function Home() {
  const { toast } = useToast()
  // Estado inicial vazio, pois virá do banco
  const [losses, setLosses] = useState<LossData[]>([])
  const [searchCode, setSearchCode] = useState("")
  const [searchDescription, setSearchDescription] = useState("")
  const [filteredLosses, setFilteredLosses] = useState<LossData[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Função para buscar dados do banco
  const fetchLosses = async () => {
    try {
      const data = await getLosses()
      setLosses(data)
      // Inicialmente, filtra apenas os de hoje para exibição padrão, ou todos se preferir
      // Mantendo a lógica original: mostra perdas de hoje no carregamento
      const todayData = data.filter((loss) => isToday(loss.data))
      setFilteredLosses(todayData)
    } catch (error) {
      console.error("Erro ao buscar dados", error)
      toast({ title: "Erro", description: "Falha ao carregar dados.", variant: "destructive" })
    } finally {
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    fetchLosses()
  }, [])

  // Removido useEffect de salvar no storage

  const todayLosses = useMemo(() => {
    return losses.filter((loss) => isToday(loss.data))
  }, [losses])

  const searchFilteredLosses = useMemo(() => {
    return filteredLosses.filter((loss) => {
      const codeMatch = searchCode === "" || loss.codigo.includes(searchCode)
      const descMatch =
        searchDescription === "" || normalizeString(loss.descricao).includes(normalizeString(searchDescription))
      return codeMatch && descMatch
    })
  }, [filteredLosses, searchCode, searchDescription])

  const todayTotals = useMemo(() => {
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

  // Callbacks atualizados para usar a API (embora os componentes filhos agora gerenciem muito disso, 
  // manteremos a estrutura para atualizar a lista localmente após a ação)
  
  const handleDataChanged = () => {
    fetchLosses()
  }

  // O LossForm agora salva direto no banco, mas podemos usar esse callback 
  // para forçar atualização da lista aqui na Home
  const handleAddLoss = async (newLoss: any) => {
     // Apenas recarrega os dados, pois o form já salvou no banco
     fetchLosses()
  }

  // O LossesTable agora lida com delete/update internamente e chama onDataChange
  // Então essas funções abaixo servem mais para passar props compatíveis se necessário,
  // mas o ideal é que a Table use o onDataChange.
  
  // Atualizamos a lógica para compatibilidade com os componentes filhos
  const handleAdvancedFilter = (filtered: LossData[], criteria: GlobalFilterCriteria) => {
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
            <div className="flex flex-col items-center gap-2">
                 <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                 <p className="text-muted-foreground">Carregando dados...</p>
            </div>
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
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">
                Total Hectolitros Perdidos Hoje
              </p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{todayTotals.hectoPerda} HL</p>
              <p className="text-xs text-muted-foreground mt-2">acumulado do dia</p>
            </div>
          </Card>
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-border/80 transition-colors">
            <div className="p-4 md:p-6">
              <p className="text-xs md:text-sm text-muted-foreground font-medium mb-2">Valor Total Perdido Hoje</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">R$ {todayTotals.precoPerda}</p>
              <p className="text-xs text-muted-foreground mt-2">acumulado financeiro do dia</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="lg:col-span-1 h-fit bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow w-auto border-0">
            <div className="p-4 md:p-6 border-b border-border/30">
              <h2 className="text-base md:text-lg font-semibold text-foreground">Nova Perda</h2>
              <p className="text-xs text-muted-foreground mt-1">Registre uma nova perda no sistema</p>
            </div>
            {/* onAddLoss aqui serve apenas para disparar o refresh da lista */}
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
                {/* Tabela atualizada para usar o callback de refresh */}
                <LossesTable
                  losses={searchFilteredLosses}
                  onDataChange={handleDataChanged}
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