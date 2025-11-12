import type { Loss } from "./mock-data"

export interface AnalyticsData {
  totalLosses: number
  totalQuantity: number
  lossesByReason: Record<string, number>
  lossesByLocation: Record<string, number>
  lossesByHelper: Record<string, number>
  averageLossPerRecord: number
  topReasons: Array<{ reason: string; count: number }>
  topLocations: Array<{ location: string; count: number }>
  topHelpers: Array<{ helper: string; count: number }>
}

export function calculateAnalytics(losses: Loss[]): AnalyticsData {
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

    // Sum quantities
    totalQuantity += loss.quantidade
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
    .slice(0, 5)

  return {
    totalLosses: losses.length,
    totalQuantity,
    lossesByReason,
    lossesByLocation,
    lossesByHelper,
    averageLossPerRecord: losses.length > 0 ? Math.round(totalQuantity / losses.length) : 0,
    topReasons,
    topLocations,
    topHelpers,
  }
}
