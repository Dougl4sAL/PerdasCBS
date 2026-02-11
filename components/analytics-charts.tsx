"use client"

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Card } from "@/components/ui/card"
import type { AnalyticsData } from "@/lib/analytics-utils"

interface AnalyticsChartsProps {
  analytics: AnalyticsData
}

/**
 * Paleta de cores base para os graficos e indicadores.
 */
const COLORS = ["#4683b4", "#ed6c75", "#fdb858", "#90ee90", "#e986d4", "#87ceeb"]

/**
 * Bloco de graficos do dashboard (pizza, barras e resumo).
 */
export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {/* Losses by Reason - Pie Chart */}
      <Card className="bg-card/80 backdrop-blur border-border/50 p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Perdas por Motivo</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={analytics.topReasons} dataKey="count" nameKey="reason" cx="50%" cy="50%" outerRadius={100} label>
              {analytics.topReasons.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Losses by Location - Bar Chart */}
      <Card className="bg-card/80 backdrop-blur border-border/50 p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Perdas por Local</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.topLocations}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="location" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
            <Bar dataKey="count" fill="#4683b4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Helpers */}
      <Card className="bg-card/80 backdrop-blur border-border/50 p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Ajudantes com Mais Perdas</h3>
        <div className="space-y-3">
          {analytics.topHelpers.map((helper, index) => (
            <div key={helper.helper} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm text-foreground">{helper.helper}</span>
              </div>
              <span className="text-sm font-semibold text-primary">{helper.count} perdas</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Stats Summary */}
      <Card className="bg-card/80 backdrop-blur border-border/50 p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Resumo Geral</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/30">
            <span className="text-sm text-muted-foreground">Total de Perdas</span>
            <span className="text-lg font-bold text-primary">{analytics.totalLosses}</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-border/30">
            <span className="text-sm text-muted-foreground">Quantidade Total</span>
            <span className="text-lg font-bold text-primary">{analytics.totalQuantity}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Média por Registro</span>
            <span className="text-lg font-bold text-primary">{analytics.averageLossPerRecord}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
