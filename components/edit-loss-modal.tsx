"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { type Loss, LOCATIONS, AREAS_BY_LOCATION, HELPERS, REASONS } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

interface EditLossModalProps {
  loss: Loss | null
  isOpen: boolean
  onClose: () => void
  onSave: (loss: Loss) => void
}

export function EditLossModal({ loss, isOpen, onClose, onSave }: EditLossModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<Loss | null>(null)

  useEffect(() => {
    if (loss) {
      setFormData(loss)
    }
  }, [loss])

  if (!formData) return null

  const availableAreas = formData.local ? AREAS_BY_LOCATION[formData.local as keyof typeof AREAS_BY_LOCATION] || [] : []

  const handleLocaleChange = (value: string) => {
    setFormData({
      ...formData,
      local: value,
      area: "",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.codigo ||
      !formData.quantidade ||
      !formData.descricao ||
      !formData.local ||
      !formData.area ||
      !formData.ajudante ||
      !formData.motivo
    ) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      })
      return
    }

    onSave(formData)
    onClose()

    toast({
      title: "Sucesso",
      description: "Perda atualizada com sucesso",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Perda</DialogTitle>
          <DialogDescription>Atualize as informações do registro de perda</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Código */}
          <div className="space-y-2">
            <Label htmlFor="edit-codigo" className="text-sm font-medium">
              Código
            </Label>
            <Input
              id="edit-codigo"
              value={formData.codigo}
              onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
              placeholder="Ex: 9092"
              className="h-10"
            />
          </div>

          {/* Quantidade */}
          <div className="space-y-2">
            <Label htmlFor="edit-quantidade" className="text-sm font-medium">
              Quantidade
            </Label>
            <Input
              id="edit-quantidade"
              type="number"
              value={formData.quantidade}
              onChange={(e) => setFormData({ ...formData, quantidade: Number.parseInt(e.target.value) })}
              placeholder="Ex: 5"
              className="h-10"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="edit-descricao" className="text-sm font-medium">
              Descrição
            </Label>
            <Input
              id="edit-descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Ex: Skol Multipack"
              className="h-10"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="edit-fatorHecto" className="text-sm font-medium">
                Fator Hecto
              </Label>
              <Input
                id="edit-fatorHecto"
                value={formData.fatorHecto}
                onChange={(e) => setFormData({ ...formData, fatorHecto: e.target.value })}
                placeholder="0,12"
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-hectoUnid" className="text-sm font-medium">
                Hecto Unid
              </Label>
              <Input
                id="edit-hectoUnid"
                value={formData.hectoUnid}
                onChange={(e) => setFormData({ ...formData, hectoUnid: e.target.value })}
                placeholder="0,01"
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-precoUnid" className="text-sm font-medium">
                Preço Unid
              </Label>
              <Input
                id="edit-precoUnid"
                value={formData.precoUnid}
                onChange={(e) => setFormData({ ...formData, precoUnid: e.target.value })}
                placeholder="4,07"
                className="h-10"
              />
            </div>
          </div>

          {/* Local */}
          <div className="space-y-2">
            <Label htmlFor="edit-local" className="text-sm font-medium">
              Local
            </Label>
            <Select value={formData.local} onValueChange={handleLocaleChange}>
              <SelectTrigger id="edit-local" className="h-10">
                <SelectValue placeholder="Selecione um local" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Área */}
          <div className="space-y-2">
            <Label htmlFor="edit-area" className="text-sm font-medium">
              Área
            </Label>
            <Select value={formData.area} onValueChange={(value) => setFormData({ ...formData, area: value })}>
              <SelectTrigger id="edit-area" className="h-10" disabled={!formData.local}>
                <SelectValue placeholder={formData.local ? "Selecione uma área" : "Selecione um local primeiro"} />
              </SelectTrigger>
              <SelectContent>
                {availableAreas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ajudante */}
          <div className="space-y-2">
            <Label htmlFor="edit-ajudante" className="text-sm font-medium">
              Ajudante
            </Label>
            <Select value={formData.ajudante} onValueChange={(value) => setFormData({ ...formData, ajudante: value })}>
              <SelectTrigger id="edit-ajudante" className="h-10">
                <SelectValue placeholder="Selecione um ajudante" />
              </SelectTrigger>
              <SelectContent>
                {HELPERS.map((helper) => (
                  <SelectItem key={helper} value={helper}>
                    {helper}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Motivo */}
          <div className="space-y-2">
            <Label htmlFor="edit-motivo" className="text-sm font-medium">
              Motivo
            </Label>
            <Select value={formData.motivo} onValueChange={(value) => setFormData({ ...formData, motivo: value })}>
              <SelectTrigger id="edit-motivo" className="h-10">
                <SelectValue placeholder="Selecione um motivo" />
              </SelectTrigger>
              <SelectContent>
                {REASONS.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
