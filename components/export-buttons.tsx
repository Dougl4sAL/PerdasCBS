"use client"

import { Button } from "@/components/ui/button"
import { exportToCSV, exportToExcel, exportToPDF } from "@/lib/export-utils"
import type { Loss } from "@/lib/mock-data"

interface ExportButtonsProps {
  losses: Loss[]
  isFiltered?: boolean
}

export function ExportButtons({ losses, isFiltered = false }: ExportButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button onClick={() => exportToCSV(losses)} variant="outline" size="sm" className="text-xs md:text-sm">
        Exportar CSV
      </Button>
      <Button onClick={() => exportToExcel(losses)} variant="outline" size="sm" className="text-xs md:text-sm">
        Exportar Excel
      </Button>
      <Button
        onClick={() => exportToPDF(losses, isFiltered)}
        variant="outline"
        size="sm"
        className="text-xs md:text-sm"
      >
        Exportar PDF
      </Button>
    </div>
  )
}
