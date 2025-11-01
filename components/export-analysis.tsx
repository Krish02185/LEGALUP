"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Share2, Copy, Check } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface ExportAnalysisProps {
  documentName: string
  analysis: any
}

export function ExportAnalysis({ documentName, analysis }: ExportAnalysisProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null)
  const { toast } = useToast()

  const handleExportPDF = () => {
    // In production, use a library like jsPDF or html2pdf
    toast({
      title: "Export starting",
      description: "Your PDF is being generated...",
    })
    // Simulate PDF generation
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Analysis downloaded as PDF",
      })
    }, 1000)
  }

  const handleCopyText = () => {
    const textContent = generateTextContent()
    navigator.clipboard.writeText(textContent)
    setCopiedFormat("text")
    setTimeout(() => setCopiedFormat(null), 2000)
    toast({
      title: "Copied",
      description: "Analysis copied to clipboard",
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Legal Analysis",
          text: `Analysis of ${documentName}`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Share failed:", error)
      }
    } else {
      toast({
        title: "Share not supported",
        description: "Your browser doesn't support sharing",
        variant: "destructive",
      })
    }
  }

  const generateTextContent = (): string => {
    return `
Legal Document Analysis: ${documentName}

SUMMARY:
${analysis?.summary || ""}

KEY POINTS:
${analysis?.keyPoints?.map((p: any) => `- ${p.point} (${p.importance})`).join("\n") || ""}

HIGHLIGHTS:
${analysis?.highlights?.map((h: any) => `- ${h.text}: ${h.reason}`).join("\n") || ""}

PROS:
${
  analysis?.prosAndCons
    ?.filter((item: any) => item.type === "pro")
    .map((p: any) => `- ${p.title}: ${p.description}`)
    .join("\n") || ""
}

CONS:
${
  analysis?.prosAndCons
    ?.filter((item: any) => item.type === "con")
    .map((p: any) => `- ${p.title}: ${p.description}`)
    .join("\n") || ""
}

RISKS:
${analysis?.risks?.map((r: any) => `- ${r.risk} (${r.severity})`).join("\n") || ""}

OBLIGATIONS:
${analysis?.obligations?.map((o: any) => `- ${o}`).join("\n") || ""}
    `.trim()
  }

  return (
    <Card className="p-6 border-border bg-secondary/30">
      <h3 className="font-semibold text-foreground mb-4">Export & Share</h3>
      <div className="grid grid-cols-3 gap-3">
        <Button
          onClick={handleExportPDF}
          variant="outline"
          size="sm"
          className="border-border hover:bg-primary/10 text-foreground flex items-center justify-center gap-2 bg-transparent"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">PDF</span>
        </Button>
        <Button
          onClick={handleCopyText}
          variant="outline"
          size="sm"
          className="border-border hover:bg-primary/10 text-foreground flex items-center justify-center gap-2 bg-transparent"
        >
          {copiedFormat === "text" ? (
            <>
              <Check className="h-4 w-4" />
              <span className="hidden sm:inline">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          size="sm"
          className="border-border hover:bg-primary/10 text-foreground flex items-center justify-center gap-2 bg-transparent"
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
    </Card>
  )
}
