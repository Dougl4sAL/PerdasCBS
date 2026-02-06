import type { LossData } from "@/app/actions/losses" // MUDANÇA: Usar LossData

// Interface atualizada para usar os tipos corretos se necessário,
// mas a estrutura de LossData é compatível com o que era usado antes.
export interface AnalyticsData {
  totalLosses: number
  totalQuantity: number
  lossesByReason: Record<string, number>
  lossesByLocation: Record<string, number>
  lossesByHelper: Record<string, number>
  averageLossPerRecord: string // Mudado para string para formatar "X.XX"
  topReasons: Array<{ reason: string; count: number }>
  topLocations: Array<{ location: string; count: number }>
  topHelpers: Array<{ helper: string; count: number }>
}

export function calculateAnalytics(losses: LossData[]): AnalyticsData {
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