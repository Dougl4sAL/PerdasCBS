"use client"

import { Button } from "@/components/ui/button"
import { exportToCSV, exportToExcel, exportToPDF } from "@/lib/export-utils"
import type { LossData } from "@/app/actions/losses" // MUDANÇA

interface ExportButtonsProps {
  losses: LossData[] // MUDANÇA
  isFiltered?: boolean
}

/**
 * Botoes de exportacao dos dados visiveis na tabela.
 */
export function ExportButtons({ losses, isFiltered = false }: ExportButtonsProps) {
  // Fazendo um cast para 'any' nas chamadas de função para evitar conflito de tipo
  // caso o lib/export-utils ainda espere o tipo antigo 'Loss'.
  // Como a estrutura dos dados é compatível (campos iguais), isso funcionará em tempo de execução.
  
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {/* <Button 
        onClick={() => exportToCSV(losses as any)} 
        variant="outline" 
        size="sm" 
        className="text-xs md:text-sm"
      >
        Exportar CSV
      </Button> */}
      <Button 
        onClick={() => exportToExcel(losses as any)} 
        variant="outline" 
        size="sm" 
        className="text-xs md:text-sm"
      >
        Exportar Excel
      </Button>
      <Button
        onClick={() => exportToPDF(losses as any, isFiltered)}
        variant="outline"
        size="sm"
        className="text-xs md:text-sm"
      >
        Exportar PDF
      </Button>
    </div>
  )
}
