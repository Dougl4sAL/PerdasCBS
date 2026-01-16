"use client"

import { useState } from "react"
import type { LossData } from "@/app/actions/losses" // Use o novo tipo
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExportButtons } from "./export-buttons"
import { EditLossModal } from "./edit-loss-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteLoss, updateLoss } from "@/app/actions/losses"
import { useToast } from "@/hooks/use-toast"

interface LossesTableProps {
  losses: LossData[]
  onDataChange: () => void // Substitui onDeleteLoss e onUpdateLoss individuais
  isFiltered?: boolean
}

const REASON_COLORS: Record<string, string> = {
  Vencimento: "bg-red-500/10 text-red-700 dark:text-red-400",
  Quebra: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  Furo: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  Falta: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  Inventário: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
}

// ... Funções calculateHectoPerda e calculatePrecoPerda iguais ...
function calculateHectoPerda(quantidade: number, hectoUnid: string): number {
  const hectoValue = Number.parseFloat(hectoUnid?.replace(",", ".") || "0")
  return quantidade * hectoValue
}

function calculatePrecoPerda(quantidade: number, precoUnid: string): number {
  const precoValue = Number.parseFloat(precoUnid?.replace(",", ".") || "0")
  return quantidade * precoValue
}

export function LossesTable({ losses, onDataChange, isFiltered = false }: LossesTableProps) {
  const { toast } = useToast()
  const [editingLoss, setEditingLoss] = useState<LossData | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deletingLossId, setDeletingLossId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleEditClick = (loss: LossData) => {
    setEditingLoss(loss)
    setIsEditModalOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setDeletingLossId(id)
  }

  const handleConfirmDelete = async () => {
    if (deletingLossId) {
      setIsLoading(true)
      const result = await deleteLoss(deletingLossId)
      setIsLoading(false)
      setDeletingLossId(null)

      if (result.success) {
        toast({ title: "Sucesso", description: "Registro excluído." })
        onDataChange()
      } else {
        toast({ title: "Erro", description: "Falha ao excluir.", variant: "destructive" })
      }
    }
  }

  const handleSaveEdit = async (updatedLoss: LossData) => {
      // O Modal de Edição deve retornar o objeto atualizado
      const result = await updateLoss(updatedLoss.id, updatedLoss)
      if (result.success) {
          toast({ title: "Sucesso", description: "Registro atualizado." })
          onDataChange()
          setIsEditModalOpen(false)
      } else {
          toast({ title: "Erro", description: "Falha ao atualizar.", variant: "destructive" })
      }
  }

  if (!losses || losses.length === 0) {
    return (
      <div className="p-8 md:p-12 text-center">
        <p className="text-muted-foreground text-sm font-medium">Nenhuma perda encontrada</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Export buttons */}
      <div className="p-4 md:p-6 border-b border-border/30 bg-muted/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Opções de Exportação</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {isFiltered ? "Exporte os dados filtrados" : "Exporte todos os dados"}
            </p>
          </div>
          {/* Precisa adaptar ExportButtons para aceitar LossData se houver erro de tipo, mas a estrutura é identica */}
          <ExportButtons losses={losses} isFiltered={isFiltered} />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 bg-muted/30 hover:bg-muted/30">
               {/* Cabeçalhos iguais ao original */}
               <TableHead>Código</TableHead>
               <TableHead>Qtd</TableHead>
               <TableHead>Descrição</TableHead>
               <TableHead>Local</TableHead>
               <TableHead>Motivo</TableHead>
               <TableHead>Data</TableHead>
               <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {losses.map((loss) => (
                <TableRow key={loss.id} className="border-border/20 hover:bg-muted/20 transition-colors">
                  <TableCell className="font-mono text-xs md:text-sm font-semibold text-primary">{loss.codigo}</TableCell>
                  <TableCell>{loss.quantidade}</TableCell>
                  <TableCell>{loss.descricao}</TableCell>
                  <TableCell>{loss.local}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs font-medium ${REASON_COLORS[loss.motivo]}`}>
                      {loss.motivo}
                    </Badge>
                  </TableCell>
                  <TableCell>{loss.data}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditClick(loss)}>✏️</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(loss.id)}>🗑️</Button>
                    </div>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <EditLossModal
        loss={editingLoss}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit} // Passa a função que chama a API
      />

      <AlertDialog open={deletingLossId !== null} onOpenChange={(open) => !open && setDeletingLossId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Perda?</AlertDialogTitle>
            <AlertDialogDescription>Ação irreversível.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDelete} disabled={isLoading} className="bg-destructive hover:bg-destructive/90">
            {isLoading ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}