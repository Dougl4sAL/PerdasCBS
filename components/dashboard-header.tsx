"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  const pathname = usePathname()
  const isDashboard = pathname === "/dashboard"

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <div className="w-5 h-5 flex items-center justify-center text-primary font-bold text-lg">📦</div>
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-foreground">Controle de Estoque</h1>
            <p className="text-xs text-muted-foreground">Gerenciamento de Perdas</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild variant={isDashboard ? "outline" : "ghost"} size="sm" className="text-xs md:text-sm">
            <a href="/">Principal</a>
          </Button>
          <Button asChild variant={isDashboard ? "ghost" : "outline"} size="sm" className="text-xs md:text-sm">
            <a href="/dashboard">Dashboard</a>
          </Button>
        </div>
      </div>
    </header>
  )
}
