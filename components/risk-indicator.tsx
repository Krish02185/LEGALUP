"use client"

interface RiskIndicatorProps {
  level: "critical" | "high" | "medium" | "low"
  showLabel?: boolean
}

const riskColors = {
  critical: "bg-red-500/20 border-red-500/50 text-red-400",
  high: "bg-orange-500/20 border-orange-500/50 text-orange-400",
  medium: "bg-yellow-500/20 border-yellow-500/50 text-yellow-400",
  low: "bg-green-500/20 border-green-500/50 text-green-400",
}

const riskDots = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
}

export function RiskIndicator({ level, showLabel = true }: RiskIndicatorProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${riskColors[level]}`}>
      <div className={`h-2 w-2 rounded-full ${riskDots[level]}`} />
      {showLabel && <span className="text-xs font-semibold uppercase">{level}</span>}
    </div>
  )
}
