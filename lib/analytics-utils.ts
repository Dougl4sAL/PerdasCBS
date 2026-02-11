import type { LossData } from "@/app/actions/losses" // MUDANÇA: Usar LossData

// Interface atualizada para usar os tipos corretos se necessário,
// mas a estrutura de LossData é compatível com o que era usado antes.
export interface AnalyticsData {
  // Quantidade total de registros no recorte atual.
  totalLosses: number
  // Soma de unidades perdidas no recorte atual.
  totalQuantity: number
  // Mapa: motivo -> quantidade de registros.
  lossesByReason: Record<string, number>
  // Mapa: local -> quantidade de registros.
  lossesByLocation: Record<string, number>
  // Mapa: ajudante -> quantidade de registros.
  lossesByHelper: Record<string, number>
  // Media de unidades por registro (string para facilitar exibicao formatada).
  averageLossPerRecord: string // Mudado para string para formatar "X.XX"
  // Top motivos mais frequentes.
  topReasons: Array<{ reason: string; count: number }>
  // Ranking de locais por quantidade de registros.
  topLocations: Array<{ location: string; count: number }>
  // Top ajudantes com mais registros.
  topHelpers: Array<{ helper: string; count: number }>
}

/**
 * Calcula indicadores e rankings usados no dashboard.
 */
export function calculateAnalytics(losses: LossData[]): AnalyticsData {
  // Objetos acumuladores para contagem por categoria.
  const lossesByReason: Record<string, number> = {}
  const lossesByLocation: Record<string, number> = {}
  const lossesByHelper: Record<string, number> = {}
  let totalQuantity = 0

  losses.forEach((loss) => {
    // Count by reason
    lossesByReason[loss.motivo] = (lossesByReason[loss.motivo] || 0) + 1

    // Count by location
    lossesByLocation[loss.local] = (lossesByLocation[loss.local] || 0) + 1

    // Count by helper
    lossesByHelper[loss.ajudante] = (lossesByHelper[loss.ajudante] || 0) + 1

    // Sum quantities (garantindo que é número)
    totalQuantity += Number(loss.quantidade)
  })

  // Calculate top items
  const topReasons = Object.entries(lossesByReason)
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const topLocations = Object.entries(lossesByLocation)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)

  const topHelpers = Object.entries(lossesByHelper)
    .map(([helper, count]) => ({ helper, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5) // Limit to top 5 helpers

  // Evita divisao por zero quando nao ha registro no recorte atual.
  const averageLossPerRecord = losses.length > 0 ? (totalQuantity / losses.length).toFixed(1) : "0"

  return {
    totalLosses: losses.length,
    totalQuantity,
    lossesByReason,
    lossesByLocation,
    lossesByHelper,
    averageLossPerRecord,
    topReasons,
    topLocations,
    topHelpers,
  }
}
