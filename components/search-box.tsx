"use client"

import { Input } from "@/components/ui/input"

interface SearchBoxProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

/**
 * Campo de busca simples com icone e botao para limpar.
 */
export function SearchBox({ placeholder, value, onChange }: SearchBoxProps) {
  return (
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none flex items-center justify-center text-sm">
        🔍
      </div>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-10 bg-input border-border/50 focus:border-primary/50 transition-all h-10"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors text-sm font-bold"
        >
          ✕
        </button>
      )}
    </div>
  )
}
