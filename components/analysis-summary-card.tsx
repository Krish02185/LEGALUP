"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AnalysisSummaryCardProps {
  documentName: string
  category: string
  risksCount: number
  highlightsCount: number
  readingTime: number
}

export function AnalysisSummaryCard({
  documentName,
  category,
  risksCount,
  highlightsCount,
  readingTime,
}: AnalysisSummaryCardProps) {
  const riskLevel = risksCount > 3 ? "high" : risksCount > 1 ? "medium" : "low"

  return (
    <Card className="p-6 border-border bg-secondary/30">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground mb-1">{documentName}</h3>
          <p className="text-sm text-muted-foreground">Category: {category}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{risksCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Risks Found</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{highlightsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Key Highlights</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{readingTime}</div>
            <p className="text-xs text-muted-foreground mt-1">Min Read</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Risk Level</span>
            <span
              className={`font-semibold ${riskLevel === "high" ? "text-destructive" : riskLevel === "medium" ? "text-yellow-400" : "text-green-400"}`}
            >
              {riskLevel.toUpperCase()}
            </span>
          </div>
          <Progress value={riskLevel === "high" ? 100 : riskLevel === "medium" ? 50 : 25} className="h-1.5" />
        </div>
      </div>
    </Card>
  )
}
