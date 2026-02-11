"use client"

import type { LossData } from "@/app/actions/losses" 
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LOCATIONS, AREAS_BY_LOCATION } from "@/lib/mock-data"

export interface GlobalFilterCriteria {
  // Filtra pelo local principal da perda.
  location: string
  // Filtra pela area interna do local.
  area: string
  // Filtra pelo ajudante/placa.
  helper: string
  // Filtra pelo motivo principal.
  reason: string
  // Data inicial para recorte de periodo.
  startDate: string
  // Data final para recorte de periodo.
  endDate: string
  // Ano para filtro rapido.
  year: string
  // Mes para filtro rapido.
  month: string
}

interface AdvancedFilterProps {
  // Atualiza tipo para LossData
  losses: LossData[] 
  onFilterChange: (filteredLosses: LossData[], filterCriteria: GlobalFilterCriteria) => void
  onClearFilters: () => void
}

/**
 * Filtro avancado usado nas telas para limitar os registros por varios campos.
 */
export function AdvancedFilter({ losses, onFilterChange, onClearFilters }: AdvancedFilterProps) {
  // ... (O restante do código permanece igual, a lógica de filtro funciona pois o formato das datas no frontend é string) ...
  // Apenas certifique-se de que o resto do arquivo usa 'losses' corretamente, o que já está feito.
  const [filters, setFilters] = useState<GlobalFilterCriteria>({
    location: "",
    area: "",
    helper: "",
    reason: "",
    startDate: "",
    endDate: "",
    year: "",
    month: "",
  })
  // ... (código existente) ...
  // No return, sem alterações necessárias além das importações
  
  // (Devido ao limite de tamanho, estou resumindo: Apenas altere a importação e o tipo na interface)
  
  const [isExpanded, setIsExpanded] = useState(false)
  // Lista de areas depende do local selecionado.
  const availableAreas = filters.location ? AREAS_BY_LOCATION[filters.location as keyof typeof AREAS_BY_LOCATION] : []

  useEffect(() => {
    applyFilters()
  }, []) // Remove dependency array issues if necessary

  /**
   * Aplica todos os filtros selecionados e devolve o resultado para o componente pai.
   */
  const applyFilters = () => {
     // A lógica de filtro permanece idêntica
     // ...
     const filtered = losses.filter((loss) => {
        // ... (lógica existente)
        // Se filtro de local estiver ativo, ignora registros de outro local.
        if (filters.location && loss.local !== filters.location) return false
        // Se filtro de area estiver ativo, ignora registros de outra area.
        if (filters.area && loss.area !== filters.area) return false
        // Se filtro de ajudante estiver ativo, ignora outros responsaveis.
        if (filters.helper && loss.ajudante !== filters.helper) return false
        // Se filtro de motivo estiver ativo, ignora motivos diferentes.
        if (filters.reason && loss.motivo !== filters.reason) return false
        
        const [day, month, year] = loss.data.split("/")
        
        // Filtro de ano: mantem somente registros do ano escolhido.
        if (filters.year && year !== filters.year) return false
        // Filtro de mes: mantem somente registros do mes escolhido.
        if (filters.month && month !== filters.month) return false

        // Filtro por periodo (data inicial/data final).
        if (filters.startDate || filters.endDate) {
           const lossDate = new Date(year + "-" + month + "-" + day)
           if (filters.startDate) {
             // Se ficou antes da data inicial, o registro sai da lista.
             const startDate = new Date(filters.startDate)
             if (lossDate < startDate) return false
           }
           if (filters.endDate) {
             // Ajusta fim do dia para incluir todo o dia final selecionado.
             const endDate = new Date(filters.endDate)
             endDate.setHours(23, 59, 59, 999)
             // Se passou da data final, o registro sai da lista.
             if (lossDate > endDate) return false
           }
        }
        return true
     })
     onFilterChange(filtered, filters)
  }
  
  // ... (Funções auxiliares e JSX permanecem iguais)
  /**
   * Atualiza um filtro especifico.
   * Quando o local muda, a area eh resetada para evitar combinacao invalida.
   */
  const handleFilterChange = (key: keyof GlobalFilterCriteria, value: string) => {
    const newFilters = { ...filters, [key]: value }
    // Quando muda o local, limpamos a area porque as opcoes mudam.
    if (key === "location" && value !== filters.location) {
      newFilters.area = ""
    }
    setFilters(newFilters)
  }
  
  /**
   * Limpa todos os filtros e volta para a lista completa.
   */
  const clearAllFilters = () => {
    const clearedFilters: GlobalFilterCriteria = {
      location: "", area: "", helper: "", reason: "", startDate: "", endDate: "", year: "", month: "",
    }
    setFilters(clearedFilters)
    onFilterChange(losses, clearedFilters)
    onClearFilters()
  }
  
  // Usa para mudar mensagens e estilo do botao "Limpar Filtros".
  const hasActiveFilters = Object.values(filters).some(v => v !== "")

  // Funções helpers (getUniquHelpers, etc) funcionam igual pois LossData tem os mesmos campos
  /**
   * Lista ajudantes sem repeticao para montar o select.
   */
  const getUniquHelpers = () => Array.from(new Set(losses.map(l => l.ajudante))).sort()

  /**
   * Lista motivos sem repeticao para montar o select.
   */
  const getUniqueReasons = () => Array.from(new Set(losses.map(l => l.motivo))).sort()

  /**
   * Extrai anos unicos a partir da data em formato dd/MM/yyyy.
   */
  const getUniqueYears = () => {
      const years = new Set<string>()
      losses.forEach(l => years.add(l.data.split("/")[2]))
      return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a))
  }
  
  /**
   * Opcoes fixas de meses para filtro mensal.
   */
  const MONTHS = [
    { value: "01", label: "Janeiro" }, { value: "02", label: "Fevereiro" }, { value: "03", label: "Março" },
    { value: "04", label: "Abril" }, { value: "05", label: "Maio" }, { value: "06", label: "Junho" },
    { value: "07", label: "Julho" }, { value: "08", label: "Agosto" }, { value: "09", label: "Setembro" },
    { value: "10", label: "Outubro" }, { value: "11", label: "Novembro" }, { value: "12", label: "Dezembro" },
  ]

  return (
      <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow mb-6">
          {/* JSX idêntico ao original */}
          <div className="p-4 md:p-6">
             <div className="flex items-center justify-between mb-4">
               <div>
                 <h2 className="text-base md:text-lg font-semibold text-foreground">Filtros Globais</h2>
                 <p className="text-xs text-muted-foreground mt-1">Filtros centralizados para todo o sistema</p>
               </div>
               <button onClick={() => setIsExpanded(!isExpanded)} className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                 {isExpanded ? "Ocultar" : "Expandir"}
               </button>
             </div>
             {isExpanded && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                     {/* Selects idênticos ao original */}
                     <select value={filters.year} onChange={(e) => handleFilterChange("year", e.target.value)} className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="">Ano (Tudo)</option>
                        {getUniqueYears().map(y => <option key={y} value={y}>{y}</option>)}
                     </select>
                     {/* ... Repetir para Mês, Local, Area, Helper, Reason ... */}
                     <select value={filters.month} onChange={(e) => handleFilterChange("month", e.target.value)} className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="">Mês (Tudo)</option>
                        {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                     </select>
                     <select value={filters.location} onChange={(e) => handleFilterChange("location", e.target.value)} className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="">Local (Tudo)</option>
                        {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                     </select>
                     <select value={filters.area} onChange={(e) => handleFilterChange("area", e.target.value)} disabled={!filters.location} className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50">
                        <option value="">Área (Tudo)</option>
                        {availableAreas.map(a => <option key={a} value={a}>{a}</option>)}
                     </select>
                     <select value={filters.helper} onChange={(e) => handleFilterChange("helper", e.target.value)} className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="">Ajudante (Tudo)</option>
                        {getUniquHelpers().map(h => <option key={h} value={h}>{h}</option>)}
                     </select>
                     <select value={filters.reason} onChange={(e) => handleFilterChange("reason", e.target.value)} className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option value="">Motivo (Tudo)</option>
                        {getUniqueReasons().map(r => <option key={r} value={r}>{r}</option>)}
                     </select>
                     <input type="date" value={filters.startDate} onChange={(e) => handleFilterChange("startDate", e.target.value)} className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Data Inicial" />
                     <input type="date" value={filters.endDate} onChange={(e) => handleFilterChange("endDate", e.target.value)} className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Data Final" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                     <Button onClick={applyFilters} className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs md:text-sm font-medium px-4 py-2">Aplicar Filtros</Button>
                     <Button onClick={clearAllFilters} variant="outline" className={`text-xs md:text-sm font-medium px-4 py-2 ${hasActiveFilters ? "text-destructive border-destructive/50 hover:bg-destructive/10" : ""}`}>Limpar Filtros</Button>
                     <div className="text-xs text-muted-foreground flex items-center ml-auto">
                        {hasActiveFilters ? <span className="font-medium text-primary">Filtros ativos</span> : <span className="text-muted-foreground">Mostrando tudo</span>}
                     </div>
                  </div>
                </div>
             )}
          </div>
      </Card>
  )
}
