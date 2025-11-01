"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from "lucide-react"

interface PDFViewerProps {
  fileName: string
  fileUrl?: string
  onClose?: () => void
}

export function PDFViewer({ fileName, fileUrl, onClose }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  return (
    <Card className="p-4 border-border bg-card space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h3 className="font-semibold text-foreground truncate">{fileName}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="text-muted-foreground hover:text-foreground"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs text-muted-foreground w-12 text-center">{zoom}%</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setZoom(Math.min(200, zoom + 10))}
            className="text-muted-foreground hover:text-foreground"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border" />
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Viewer placeholder */}
      <div className="bg-secondary/30 rounded-lg p-8 min-h-96 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-muted-foreground text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <p className="text-muted-foreground text-sm">PDF preview would be displayed here</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-border hover:bg-secondary"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-border hover:bg-secondary"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Page info */}
      <div className="text-center text-xs text-muted-foreground">Use the controls above to navigate and zoom</div>
    </Card>
  )
}
