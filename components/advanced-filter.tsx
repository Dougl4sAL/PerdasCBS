"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LOCATIONS, AREAS_BY_LOCATION, type Loss } from "@/lib/mock-data"

interface FilterCriteria {
  location: string
  area: string
  helper: string
  reason: string
  startDate: string
  endDate: string
}

interface AdvancedFilterProps {
  losses: Loss[]
  onFilterChange: (filteredLosses: Loss[]) => void
  onClearFilters: () => void
}

export function AdvancedFilter({ losses, onFilterChange, onClearFilters }: AdvancedFilterProps) {
  const [filters, setFilters] = useState<FilterCriteria>({
    location: "",
    area: "",
    helper: "",
    reason: "",
    startDate: "",
    endDate: "",
  })

  const [isExpanded, setIsExpanded] = useState(false)

  const availableAreas = filters.location ? AREAS_BY_LOCATION[filters.location as keyof typeof AREAS_BY_LOCATION] : []

  const applyFilters = () => {
    const filtered = losses.filter((loss) => {
      if (filters.location && loss.local !== filters.location) return false
      if (filters.area && loss.area !== filters.area) return false
      if (filters.helper && loss.ajudante !== filters.helper) return false
      if (filters.reason && loss.motivo !== filters.reason) return false

      // Date range filtering
      if (filters.startDate || filters.endDate) {
        const lossDate = new Date(loss.data.split("/").reverse().join("-"))
        if (filters.startDate) {
          const startDate = new Date(filters.startDate)
          if (lossDate < startDate) return false
        }
        if (filters.endDate) {
          const endDate = new Date(filters.endDate)
          endDate.setHours(23, 59, 59, 999)
          if (lossDate > endDate) return false
        }
      }

      return true
    })

    onFilterChange(filtered)
  }

  const handleFilterChange = (key: keyof FilterCriteria, value: string) => {
    const newFilters = { ...filters, [key]: value }

    if (key === "location" && value !== filters.location) {
      newFilters.area = ""
    }

    setFilters(newFilters)
  }

  const clearAllFilters = () => {
    setFilters({
      location: "",
      area: "",
      helper: "",
      reason: "",
      startDate: "",
      endDate: "",
    })
    onClearFilters()
  }

  const hasActiveFilters =
    filters.location || filters.area || filters.helper || filters.reason || filters.startDate || filters.endDate

  const getUniquHelpers = () => {
    const uniqueHelpers = new Set(losses.map((loss) => loss.ajudante))
    return Array.from(uniqueHelpers).sort()
  }

  const getUniqueReasons = () => {
    const uniqueReasons = new Set(losses.map((loss) => loss.motivo))
    return Array.from(uniqueReasons).sort()
  }

  return (
    <Card className="bg-card/80 backdrop-blur border-border/50 shadow-lg hover:shadow-xl transition-shadow mb-6">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-semibold text-foreground">Filtros Avançados</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {isExpanded ? "Ocultar" : "Expandir"}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            {/* Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
              {/* Location Filter */}
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Local</option>
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              {/* Area Filter */}
              <select
                value={filters.area}
                onChange={(e) => handleFilterChange("area", e.target.value)}
                disabled={!filters.location}
                className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Área</option>
                {availableAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>

              {/* Helper Filter */}
              <select
                value={filters.helper}
                onChange={(e) => handleFilterChange("helper", e.target.value)}
                className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Ajudante</option>
                {getUniquHelpers().map((helper) => (
                  <option key={helper} value={helper}>
                    {helper}
                  </option>
                ))}
              </select>

              {/* Reason Filter */}
              <select
                value={filters.reason}
                onChange={(e) => handleFilterChange("reason", e.target.value)}
                className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Motivo</option>
                {getUniqueReasons().map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>

              {/* Start Date */}
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange("startDate", e.target.value)}
                className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Data Inicial"
              />

              {/* End Date */}
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                className="px-3 py-2 text-xs md:text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Data Final"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                onClick={applyFilters}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs md:text-sm font-medium px-4 py-2"
              >
                Aplicar Filtros
              </Button>
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className={`text-xs md:text-sm font-medium px-4 py-2 ${hasActiveFilters ? "text-destructive border-destructive/50 hover:bg-destructive/10" : ""}`}
              >
                Limpar Filtros
              </Button>
              <div className="text-xs text-muted-foreground flex items-center ml-auto">
                {hasActiveFilters && <span className="font-medium text-primary">Filtro ativo</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
