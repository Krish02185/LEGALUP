"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Trash2, Share2 } from "lucide-react"
import { useState } from "react"

interface DocumentRecord {
  id: string
  name: string
  category: string
  analyzedDate: Date
  risks: number
  highlights: number
}

interface DocumentHistoryProps {
  onSelectDocument?: (doc: DocumentRecord) => void
}

export function DocumentHistory({ onSelectDocument }: DocumentHistoryProps) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([
    {
      id: "1",
      name: "Service Agreement.pdf",
      category: "Business",
      analyzedDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      risks: 4,
      highlights: 3,
    },
    {
      id: "2",
      name: "Lease Agreement.pdf",
      category: "Citizen",
      analyzedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      risks: 2,
      highlights: 5,
    },
    {
      id: "3",
      name: "Employment Contract.pdf",
      category: "Business",
      analyzedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      risks: 3,
      highlights: 4,
    },
  ])

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffHours < 24) {
      return `${diffHours}h ago`
    } else if (diffDays < 7) {
      return `${diffDays}d ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Recent Documents</h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {documents.length === 0 ? (
          <Card className="p-4 border-border bg-card text-center">
            <p className="text-sm text-muted-foreground">No documents analyzed yet</p>
          </Card>
        ) : (
          documents.map((doc) => (
            <Card
              key={doc.id}
              className="p-4 border-border bg-card hover:border-accent/50 transition-all cursor-pointer group"
              onClick={() => onSelectDocument?.(doc)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-lg bg-primary/10 mt-1 flex-shrink-0">
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{doc.category}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{formatDate(doc.analyzedDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive">
                        {doc.risks} risks
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                        {doc.highlights} highlights
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Share2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeDocument(doc.id)
                    }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
