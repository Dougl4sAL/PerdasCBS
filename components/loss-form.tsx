"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Loss, LOCATIONS, AREAS_BY_LOCATION, HELPERS, REASONS, type Product } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { ProductAutocomplete } from "@/components/product-autocomplete"

interface LossFormProps {
  onAddLoss: (loss: Loss) => void
}

export function LossForm({ onAddLoss }: LossFormProps) {
  const { toast } = useToast()
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
  })

  const availableAreas = formData.local ? AREAS_BY_LOCATION[formData.local as keyof typeof AREAS_BY_LOCATION] || [] : []

  const handleLocaleChange = (value: string) => {
    setFormData({
      ...formData,
      local: value,
      area: "",
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

    const newLoss: Loss = {
      id: Date.now().toString(),
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
      data: new Date().toLocaleDateString("pt-BR"),
    }

    onAddLoss(newLoss)

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
    })

    toast({
      title: "Sucesso",
      description: "Perda registrada com sucesso",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 p-4 md:p-6">
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

      {/* Ajudante */}
      <div className="space-y-2">
        <Label htmlFor="ajudante" className="text-xs md:text-sm font-medium text-foreground">
          Ajudante
        </Label>
        <Select value={formData.ajudante} onValueChange={(value) => setFormData({ ...formData, ajudante: value })}>
          <SelectTrigger id="ajudante" className="h-9 md:h-10 bg-input border-border/50 text-sm">
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
        <Label htmlFor="motivo" className="text-xs md:text-sm font-medium text-foreground">
          Motivo
        </Label>
        <Select value={formData.motivo} onValueChange={(value) => setFormData({ ...formData, motivo: value })}>
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

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-9 md:h-10 mt-4 md:mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm transition-all"
      >
        Registrar Perda
      </Button>
    </form>
  )
}
