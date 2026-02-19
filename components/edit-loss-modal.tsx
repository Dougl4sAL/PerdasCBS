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
import {
  LOCATIONS,
  AREAS_BY_LOCATION,
  HELPERS,
  REASONS,
  BREAKAGE_REASONS,
  PREJUIZOS,
  PREJUIZO_BY_LOCATION,
  PREJUIZO_BY_REASON,
  getPrejuizoByCodigo,
} from "@/lib/mock-data"
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

/**
 * Modal de edicao de perdas.
 * Carrega o registro selecionado e devolve os dados atualizados ao componente pai.
 */
export function EditLossModal({ loss, isOpen, onClose, onSave }: EditLossModalProps) {
  const { toast } = useToast()
  // Estado tipado corretamente
  const [formData, setFormData] = useState<LossData | null>(null)

  useEffect(() => {
    if (loss) {
      setFormData({
        ...loss,
        prejuizoCodigo: loss.prejuizoCodigo ?? "",
        prejuizoNome: loss.prejuizoNome ?? "",
      })
    }
  }, [loss])

  if (!formData) return null

  const availableAreas = formData.local ? AREAS_BY_LOCATION[formData.local as keyof typeof AREAS_BY_LOCATION] || [] : []

  /**
   * Resolve o prejuízo com base no local (prioridade) e no motivo.
   */
  const derivePrejuizoCodigo = (localValue: string, motivoValue: string) => {
    const localCode = PREJUIZO_BY_LOCATION[localValue as keyof typeof PREJUIZO_BY_LOCATION]
    if (localCode) return localCode
    return PREJUIZO_BY_REASON[motivoValue] ?? ""
  }

  const resolvePrejuizoSelection = (localValue: string, motivoValue: string) => {
    const codigo = derivePrejuizoCodigo(localValue, motivoValue)
    const option = getPrejuizoByCodigo(codigo)
    return { codigo: option?.codigo ?? "", nome: option?.nome ?? "" }
  }

  const handlePrejuizoChange = (codigo: string) => {
    const option = getPrejuizoByCodigo(codigo)
    setFormData({
      ...formData,
      prejuizoCodigo: codigo,
      prejuizoNome: option?.nome ?? "",
    })
  }

  /**
   * Atualiza o local e limpa a area para evitar combinacao invalida.
   */
  const handleLocaleChange = (value: string) => {
    const nextPrejuizo = resolvePrejuizoSelection(value, formData.motivo)
    setFormData({
      ...formData,
      local: value,
      area: "",
      prejuizoCodigo: nextPrejuizo.codigo,
      prejuizoNome: nextPrejuizo.nome,
    })
  }

  /**
   * Atualiza o motivo e aplica o prejuízo correspondente.
   */
  const handleMotivoChange = (value: string) => {
    const nextPrejuizo = resolvePrejuizoSelection(formData.local, value)
    setFormData({
      ...formData,
      motivo: value,
      motivoQuebra: value === "Quebra" ? formData.motivoQuebra : "",
      prejuizoCodigo: nextPrejuizo.codigo,
      prejuizoNome: nextPrejuizo.nome,
    })
  }

  /**
   * Valida campos obrigatorios e envia os dados para salvar.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.codigo ||
      !formData.quantidade ||
      !formData.descricao ||
      !formData.local ||
      !formData.area ||
      !formData.ajudante ||
      !formData.motivo ||
      !formData.prejuizoCodigo
    ) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      })
      return
    }

    const payload: LossData = {
      ...formData,
      prejuizoNome: formData.prejuizoNome || getPrejuizoByCodigo(formData.prejuizoCodigo)?.nome || "",
    }

    onSave(payload)
    // O fechamento do modal agora é controlado pelo pai após o sucesso da API, 
    // mas manter aqui para feedback imediato é aceitável se o pai gerenciar o loading.
    // Para ser seguro, deixamos o pai fechar ou fechamos aqui se não houver loading state.
    // onClose() -> Removido daqui, idealmente o pai fecha. 
    // Mas para manter compatibilidade com seu código anterior:
    onClose() 
  }

  // Formulario de edição com campos pré-preenchidos e atualizados dinamicamente
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

          {/* Campos Hecto e Preço - apenas leitura */}
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
            <Select value={formData.motivo} onValueChange={handleMotivoChange}>
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

          {/* Prejuízo */}
          <div className="space-y-2">
            <Label htmlFor="edit-prejuizo" className="text-sm font-medium">
              Prejuízo <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.prejuizoCodigo ?? ""} onValueChange={handlePrejuizoChange}>
              <SelectTrigger id="edit-prejuizo" className="h-10">
                <SelectValue placeholder="Selecione um prejuízo" />
              </SelectTrigger>
              <SelectContent>
                {PREJUIZOS.map((item) => (
                  <SelectItem key={item.codigo} value={item.codigo}>
                    {`${item.codigo} - ${item.nome}`}
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
