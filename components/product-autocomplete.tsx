"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PRODUCTS } from "@/lib/mock-data"
import { normalizeString } from "@/lib/search-utils"
import type { Product } from "@/lib/mock-data"

interface ProductAutocompleteProps {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  searchBy: "codigo" | "descricao"
  onProductSelect?: (product: Product) => void
}

/**
 * Campo de busca com sugestoes de produtos por codigo ou descricao.
 */
export function ProductAutocomplete({
  id,
  label,
  placeholder,
  value,
  onChange,
  searchBy,
  onProductSelect,
}: ProductAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  /**
   * Atualiza lista de sugestoes conforme texto digitado.
   */
  useEffect(() => {
    if (!value) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    const normalized = normalizeString(value)
    const filtered = PRODUCTS.filter((product) => {
      if (searchBy === "codigo") {
        return product.codigo.includes(value)
      } else {
        return normalizeString(product.descricao).includes(normalized)
      }
    }).slice(0, 20) // Limit to 8 suggestions

    setSuggestions(filtered)
    setIsOpen(filtered.length > 0)
  }, [value, searchBy])

  /**
   * Fecha a lista quando o usuario clica fora do componente.
   */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  /**
   * Aplica o produto escolhido e fecha a lista.
   */
  const handleSelectSuggestion = (product: Product) => {
    if (searchBy === "codigo") {
      onChange(product.codigo)
    } else {
      onChange(product.descricao)
    }
    setIsOpen(false)

    // Chama callback externo se fornecido para passar o produto selecionado
    if (onProductSelect) {
      onProductSelect(product)
    }
  }
  // Renderiza o campo de input e a lista de sugestoes quando aberta 
  return (
    <div ref={containerRef} className="space-y-2 relative">
      <Label htmlFor={id} className="text-xs md:text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value && setSuggestions(suggestions.length > 0 ? suggestions : [])}
          className="h-9 md:h-10 bg-input border-border/50 focus:border-primary/50 text-sm transition-colors"
          autoComplete="off"
        />

        {isOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border/50 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
            {suggestions.map((product, index) => (
              <button
                key={`${product.codigo}-${index}`}
                onClick={() => handleSelectSuggestion(product)}
                className="w-full px-3 py-2 text-left hover:bg-muted transition-colors border-b border-border/20 last:border-b-0 text-xs md:text-sm"
              >
                <div className="font-medium text-foreground">{product.codigo}</div>
                <div className="text-xs text-muted-foreground truncate">{product.descricao}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
