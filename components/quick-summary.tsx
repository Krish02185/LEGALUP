"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, TrendingUp, Clock } from "lucide-react"

interface QuickSummaryProps {
  documentName: string
  category: string
  risksCount: number
  readingTime: number
  analysisDate: Date
}

export function QuickSummary({ documentName, category, risksCount, readingTime, analysisDate }: QuickSummaryProps) {
  const getRiskBadgeColor = () => {
    if (risksCount > 3) return "destructive"
    if (risksCount > 1) return "default"
    return "secondary"
  }

  const formatTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="p-4 border-border bg-card sticky top-24">
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Current Document</p>
          <h4 className="font-semibold text-foreground text-sm truncate" title={documentName}>
            {documentName}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">{category}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground">Risk Level</span>
            </div>
            <Badge variant={getRiskBadgeColor()} className="text-xs">
              {risksCount} risks
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground">Reading Time</span>
            </div>
            <span className="text-xs font-medium text-foreground">{readingTime} min</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span className="text-xs text-muted-foreground">Analyzed</span>
            </div>
            <span className="text-xs text-muted-foreground">{formatTime(analysisDate)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
