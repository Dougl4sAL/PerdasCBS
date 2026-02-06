"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProductAutocomplete } from "@/components/product-autocomplete"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
// Mantemos os arrays de opções do mock-data, mas removemos o tipo Loss antigo
import { LOCATIONS, AREAS_BY_LOCATION, HELPERS, REASONS, BREAKAGE_REASONS } from "@/lib/mock-data"
// Importamos o tipo correto da nossa Server Action
import type { LossData } from "@/app/actions/losses"
import { useToast } from "@/hooks/use-toast"

interface EditLossModalProps {
  // Atualizado para aceitar LossData
  loss: LossData | null
  isOpen: boolean
  onClose: () => void
  onSave: (loss: LossData) => void
}

export function EditLossModal({ loss, isOpen, onClose, onSave }: EditLossModalProps) {
  const { toast } = useToast()
  // Estado tipado corretamente
  const [formData, setFormData] = useState<LossData | null>(null)

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
    // O fechamento do modal agora é controlado pelo pai após o sucesso da API, 
    // mas manter aqui para feedback imediato é aceitável se o pai gerenciar o loading.
    // Para ser seguro, deixamos o pai fechar ou fechamos aqui se não houver loading state.
    // onClose() -> Removido daqui, idealmente o pai fecha. 
    // Mas para manter compatibilidade com seu código anterior:
    onClose() 
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
            <ProductAutocomplete
              id="edit-codigo"
              label="Código"
              placeholder="Ex: 9092"
              searchBy="codigo"
              value={formData.codigo}
              onChange={(value) =>
                setFormData({ ...formData, codigo: value })
              }
              onProductSelect={(product) =>
                setFormData({
                  ...formData,
                  codigo: product.codigo,
                  descricao: product.descricao,
                  precoUnid: product.precoUnid,
                  fatorHecto: product.fatorHecto,
                  hectoUnid: product.hectoUnid,
                })
              }
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
            <ProductAutocomplete
              id="edit-descricao"
              label="Descrição"
              placeholder="Ex: Skol Multipack"
              searchBy="descricao"
              value={formData.descricao}
              onChange={(value) =>
                setFormData({ ...formData, descricao: value })
              }
              onProductSelect={(product) =>
                setFormData({
                  ...formData,
                  codigo: product.codigo,
                  descricao: product.descricao,
                  precoUnid: product.precoUnid,
                  fatorHecto: product.fatorHecto,
                  hectoUnid: product.hectoUnid,
                })
              }
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
                readOnly
                className="h-10 cursor-not-allowed"
                placeholder="Preenchido automaticamente"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-hectoUnid" className="text-sm font-medium">
                Hecto Unid
              </Label>
              <Input
                id="edit-hectoUnid"
                value={formData.hectoUnid}
                readOnly
                className="h-10 cursor-not-allowed"
                placeholder="Preenchido automaticamente"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-precoUnid" className="text-sm font-medium">
                Preço Unid
              </Label>
              <Input
                id="edit-precoUnid"
                value={formData.precoUnid}
                readOnly
                className="h-10 cursor-not-allowed"
                placeholder="Preenchido automaticamente"
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

          {/* Motivo Quebra */}
          <div className="space-y-2">
            <Label htmlFor="edit-motivo-quebra" className="text-sm font-medium">
              Motivo Quebra
            </Label>
            <Select value={formData.motivoQuebra} onValueChange={(value) => setFormData({ ...formData, motivoQuebra: value })}>
              <SelectTrigger id="edit-motivo-quebra" className="h-10">
                <SelectValue placeholder="Selecione um motivo" />
              </SelectTrigger>
              <SelectContent>
                {BREAKAGE_REASONS.map((breakage_reasons) => (
                  <SelectItem key={breakage_reasons} value={breakage_reasons}>
                    {breakage_reasons}
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