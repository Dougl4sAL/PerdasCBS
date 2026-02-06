"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LOCATIONS,
  AREAS_BY_LOCATION,
  HELPERS,
  VEHICLE_PLATES,
  REASONS,
  BREAKAGE_REASONS,
  type Product,
} from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { ProductAutocomplete } from "@/components/product-autocomplete"
import { createLoss, type LossData } from "@/app/actions/losses"

// Não precisamos mais passar 'onAddLoss' como prop local para atualizar estado pai manualmente,
// mas se quiser manter a UX rápida, pode manter. O ideal é o pai recarregar os dados.
interface LossFormProps {
  onAddLoss?: (loss: LossData) => void // Tornei opcional pois o fluxo principal é via server
}

export function LossForm({ onAddLoss }: LossFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    codigo: "",
    quantidade: "",
    descricao: "",
    fatorHecto: "",
    hectoUnid: "",
    precoUnid: "",
    local: "",
    area: "",
    ajudante: "",
    motivo: "",
    motivoQuebra: "",
  })

  const availableAreas = formData.local ? AREAS_BY_LOCATION[formData.local as keyof typeof AREAS_BY_LOCATION] || [] : []
  const showVehiclePlates = formData.local === "Rota"
  const assistantOptions = showVehiclePlates ? VEHICLE_PLATES : HELPERS

  const handleLocaleChange = (value: string) => {
    setFormData({ ...formData, local: value, area: "", ajudante: "" })
  }

  const handleMotivoChange = (value: string) => {
    setFormData({
      ...formData,
      motivo: value,
      motivoQuebra: value === "Quebra" ? formData.motivoQuebra : "",
    })
  }

  const handleProductSelect = (product: Product) => {
    setFormData({
      ...formData,
      codigo: product.codigo,
      descricao: product.descricao,
      fatorHecto: product.fatorHecto,
      hectoUnid: product.hectoUnid,
      precoUnid: product.precoUnid,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.codigo || !formData.quantidade || !formData.local || !formData.area || !formData.ajudante || !formData.motivo) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios", variant: "destructive" })
      return
    }

    setIsSubmitting(true)

    const newLossPayload = {
      codigo: formData.codigo,
      quantidade: Number.parseInt(formData.quantidade),
      descricao: formData.descricao,
      fatorHecto: formData.fatorHecto,
      hectoUnid: formData.hectoUnid,
      precoUnid: formData.precoUnid,
      local: formData.local,
      area: formData.area,
      ajudante: formData.ajudante,
      motivo: formData.motivo,
      motivoQuebra: formData.motivoQuebra || undefined,
      data: new Date().toLocaleDateString("pt-BR"), // Envia a data atual do cliente formatada
    }

    const result = await createLoss(newLossPayload)

    setIsSubmitting(false)

    if (result.success) {
      toast({ title: "Sucesso", description: "Perda salva no banco de dados!" })
      
      // Limpar form
      setFormData({
        codigo: "",
        quantidade: "",
        descricao: "",
        fatorHecto: "",
        hectoUnid: "",
        precoUnid: "",
        local: formData.local,
        area: formData.area,
        ajudante: formData.ajudante,
        motivo: formData.motivo,
        motivoQuebra: "",
      })

      // Callback opcional se o componente pai precisar saber
      if (onAddLoss) {
        // Simulamos o objeto completo para o frontend não quebrar se usar o callback
        onAddLoss({ ...newLossPayload, id: "temp-id" }) 
      }
      
      // Forçar refresh da página ou usar router.refresh() seria ideal se não estiver usando o callback do pai
      // window.location.reload(); // (Opcional, melhor deixar o pai gerenciar via Server Action revalidate)
    } else {
      toast({ title: "Erro", description: result.error, variant: "destructive" })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 p-4 md:p-6">
       {/* (Conteúdo dos inputs permanece igual, apenas adicionei disabled={isSubmitting}) */}
       <ProductAutocomplete
        id="codigo"
        label="Código"
        placeholder="Ex: 9092"
        value={formData.codigo}
        onChange={(value) => setFormData({ ...formData, codigo: value })}
        searchBy="codigo"
        onProductSelect={handleProductSelect}
      />
      
      <ProductAutocomplete
        id="descricao"
        label="Descrição"
        placeholder="Ex: Skol Multipack"
        value={formData.descricao}
        onChange={(value) => setFormData({ ...formData, descricao: value })}
        searchBy="descricao"
        onProductSelect={handleProductSelect}
      />
      {/* Quantidade */}
      <div className="space-y-2">
        <Label htmlFor="quantidade" className="text-xs md:text-sm font-medium text-foreground">
          Quantidade
        </Label>
        <Input
          id="quantidade"
          type="number"
          placeholder="Ex: 5"
          value={formData.quantidade}
          onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
          className="h-9 md:h-10 bg-input border-border/50 focus:border-primary/50 text-sm transition-colors"
        />
      </div>

      {/* Local */}
      <div className="space-y-2">
        <Label htmlFor="local" className="text-xs md:text-sm font-medium text-foreground">
          Local
        </Label>
        <Select value={formData.local} onValueChange={handleLocaleChange}>
          <SelectTrigger id="local" className="h-9 md:h-10 bg-input border-border/50 text-sm">
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
        <Label htmlFor="area" className="text-xs md:text-sm font-medium text-foreground">
          Área
        </Label>
        <Select value={formData.area} onValueChange={(value) => setFormData({ ...formData, area: value })}>
          <SelectTrigger id="area" className="h-9 md:h-10 bg-input border-border/50 text-sm" disabled={!formData.local}>
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

      {/* Ajudante/Veículo */}
      <div className="space-y-2">
        <Label htmlFor="ajudante" className="text-xs md:text-sm font-medium text-foreground">
          {showVehiclePlates ? "Veículo (Placa)" : "Ajudante"}
        </Label>
        <Select value={formData.ajudante} onValueChange={(value) => setFormData({ ...formData, ajudante: value })}>
          <SelectTrigger id="ajudante" className="h-9 md:h-10 bg-input border-border/50 text-sm">
            <SelectValue placeholder={showVehiclePlates ? "Selecione um veículo" : "Selecione um ajudante"} />
          </SelectTrigger>
          <SelectContent>
            {assistantOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Motivo */}
      <div className="space-y-2">
        <Label htmlFor="motivo" className="text-xs md:text-sm font-medium text-foreground">
          Motivo
        </Label>
        <Select value={formData.motivo} onValueChange={handleMotivoChange}>
          <SelectTrigger id="motivo" className="h-9 md:h-10 bg-input border-border/50 text-sm">
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

      {formData.motivo === "Quebra" && (
        <div className="space-y-2">
          <Label htmlFor="motivoQuebra" className="text-xs md:text-sm font-medium text-foreground">
            Motivo da Quebra <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.motivoQuebra}
            onValueChange={(value) => setFormData({ ...formData, motivoQuebra: value })}
          >
            <SelectTrigger id="motivoQuebra" className="h-9 md:h-10 bg-input border-border/50 text-sm">
              <SelectValue placeholder="Selecione o motivo da quebra" />
            </SelectTrigger>
            <SelectContent>
              {BREAKAGE_REASONS.map((reason) => (
                <SelectItem key={reason} value={reason}>
                  {reason}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-9 md:h-10 mt-4 md:mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all"
      >
        {isSubmitting ? "Salvando..." : "Registrar Perda"}
      </Button>
    </form>
  )
}