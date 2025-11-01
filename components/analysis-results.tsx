"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Info, TrendingDown, Lightbulb, FileText } from "lucide-react"
import { useState } from "react"

interface ProCon {
  title: string
  description: string
  type: "pro" | "con"
  impact: "high" | "medium" | "low"
}

interface AnalysisData {
  documentName: string
  category: string
  summary: string
  keyPoints: Array<{ point: string; importance: "high" | "medium" | "low" }>
  highlights: Array<{ text: string; reason: string }>
  prosAndCons: ProCon[]
  obligations: string[]
  risks: Array<{ risk: string; severity: "critical" | "high" | "medium" | "low" }>
}

interface AnalysisResultsProps {
  data?: AnalysisData
}

export function AnalysisResults({ data }: AnalysisResultsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    summary: true,
  })

  const mockData: AnalysisData = {
    documentName: "Service Agreement.pdf",
    category: "Business",
    summary:
      "This is a comprehensive service agreement between Client and Service Provider, outlining deliverables, payment terms, and confidentiality obligations. The contract runs for 36 months with automatic renewal clauses and includes early termination penalties of 20% of remaining contract value.",
    keyPoints: [
      { point: "36-month contract term starting January 1, 2025", importance: "high" },
      { point: "Monthly payment of $5,000 due on the 1st of each month", importance: "high" },
      { point: "Automatic renewal for consecutive 12-month periods", importance: "high" },
      { point: "Either party may terminate with 90 days written notice", importance: "medium" },
      { point: "20% early termination penalty applies", importance: "high" },
      { point: "Mutual confidentiality obligations for 5 years post-termination", importance: "medium" },
    ],
    highlights: [
      { text: "Auto-renewal clause present", reason: "May lead to unexpected renewals if not actively canceled" },
      { text: "Early termination penalty: 20% of remaining value", reason: "Significant financial commitment" },
      { text: "90-day notice requirement", reason: "Must plan ahead for termination" },
      { text: "Confidentiality extends 5 years post-termination", reason: "Long-term legal obligation" },
    ],
    prosAndCons: [
      {
        title: "Clear Payment Terms",
        description: "Monthly payments of $5,000 on fixed dates provide predictability",
        type: "pro",
        impact: "high",
      },
      {
        title: "Auto-Renewal Clause",
        description: "Automatic renewal may lock you into unwanted continuation",
        type: "con",
        impact: "high",
      },
      {
        title: "Early Termination Option",
        description: "Flexibility to exit the contract exists, though with penalties",
        type: "pro",
        impact: "medium",
      },
      {
        title: "Termination Penalties",
        description: "20% penalty on remaining contract value is a significant cost",
        type: "con",
        impact: "high",
      },
      {
        title: "Extended Confidentiality",
        description: "5-year post-termination confidentiality protects both parties",
        type: "pro",
        impact: "medium",
      },
      {
        title: "Long 90-Day Notice Period",
        description: "Requires planning 3 months in advance to exit",
        type: "con",
        impact: "medium",
      },
    ],
    obligations: [
      "Pay $5,000 monthly by the 1st of each month",
      "Maintain confidentiality of all shared information",
      "Provide 90 days written notice for termination",
      "Comply with all applicable laws and regulations",
      "Provide monthly performance reports",
    ],
    risks: [
      {
        risk: "Auto-renewal without active cancellation could extend the agreement indefinitely",
        severity: "critical",
      },
      { risk: "Early termination penalty of 20% is substantial", severity: "high" },
      { risk: "90-day notice requirement requires advance planning", severity: "medium" },
      { risk: "Confidentiality obligations extend 5 years beyond contract end", severity: "medium" },
      { risk: "Payment obligations begin immediately upon signing", severity: "high" },
    ],
  }

  const analysisData = data || mockData

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Analysis Results</h2>
        <p className="text-muted-foreground">{analysisData.documentName}</p>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-secondary">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="proscons">Pros & Cons</TabsTrigger>
          <TabsTrigger value="keypoints">Key Points</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="obligations">Obligations</TabsTrigger>
        </TabsList>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-4">
          <Card className="p-6 border-border bg-card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 mt-1">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-3">Document Summary</h3>
                <p className="text-muted-foreground leading-relaxed">{analysisData.summary}</p>
              </div>
            </div>
          </Card>

          {/* Highlights */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Important Highlights</h3>
            {analysisData.highlights.map((highlight, idx) => (
              <Card key={idx} className="p-4 border-border bg-accent/5 border-accent/20">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">{highlight.text}</p>
                    <p className="text-sm text-muted-foreground mt-1">{highlight.reason}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Pros & Cons Tab */}
        <TabsContent value="proscons" className="space-y-4">
          <div className="space-y-4">
            {/* Pros */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                Pros
              </h3>
              {analysisData.prosAndCons
                .filter((item) => item.type === "pro")
                .map((pro, idx) => (
                  <Card key={idx} className="p-4 border-border bg-card hover:border-green-400/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-green-400/10 mt-1">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-foreground">{pro.title}</h4>
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                              pro.impact === "high"
                                ? "bg-green-400/20 text-green-300"
                                : pro.impact === "medium"
                                  ? "bg-blue-400/20 text-blue-300"
                                  : "bg-gray-400/20 text-gray-300"
                            }`}
                          >
                            {pro.impact.toUpperCase()} IMPACT
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{pro.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>

            {/* Cons */}
            <div className="space-y-3 mt-8">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Cons
              </h3>
              {analysisData.prosAndCons
                .filter((item) => item.type === "con")
                .map((con, idx) => (
                  <Card key={idx} className="p-4 border-border bg-card hover:border-destructive/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-destructive/10 mt-1">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-foreground">{con.title}</h4>
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                              con.impact === "high"
                                ? "bg-destructive/20 text-destructive"
                                : con.impact === "medium"
                                  ? "bg-orange-400/20 text-orange-300"
                                  : "bg-yellow-400/20 text-yellow-300"
                            }`}
                          >
                            {con.impact.toUpperCase()} IMPACT
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{con.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        {/* Key Points Tab */}
        <TabsContent value="keypoints" className="space-y-4">
          <div className="space-y-3">
            {analysisData.keyPoints.map((point, idx) => (
              <Card key={idx} className="p-4 border-border bg-card">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 mt-1">
                    <Info className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-foreground">{point.point}</p>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                          point.importance === "high"
                            ? "bg-red-400/20 text-red-300"
                            : point.importance === "medium"
                              ? "bg-yellow-400/20 text-yellow-300"
                              : "bg-green-400/20 text-green-300"
                        }`}
                      >
                        {point.importance.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Risks Tab */}
        <TabsContent value="risks" className="space-y-4">
          <div className="space-y-3">
            {analysisData.risks.map((risk, idx) => (
              <Card
                key={idx}
                className={`p-4 border-border bg-card ${
                  risk.severity === "critical"
                    ? "border-destructive/50 bg-destructive/5"
                    : risk.severity === "high"
                      ? "border-orange-400/50 bg-orange-400/5"
                      : "border-yellow-400/50 bg-yellow-400/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      risk.severity === "critical"
                        ? "bg-destructive/10"
                        : risk.severity === "high"
                          ? "bg-orange-400/10"
                          : "bg-yellow-400/10"
                    }`}
                  >
                    <TrendingDown
                      className={`h-5 w-5 ${
                        risk.severity === "critical"
                          ? "text-destructive"
                          : risk.severity === "high"
                            ? "text-orange-400"
                            : "text-yellow-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-foreground">{risk.risk}</p>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                          risk.severity === "critical"
                            ? "bg-destructive/20 text-destructive"
                            : risk.severity === "high"
                              ? "bg-orange-400/20 text-orange-300"
                              : "bg-yellow-400/20 text-yellow-300"
                        }`}
                      >
                        {risk.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Obligations Tab */}
        <TabsContent value="obligations" className="space-y-4">
          <div className="space-y-3">
            {analysisData.obligations.map((obligation, idx) => (
              <Card key={idx} className="p-4 border-border bg-card">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-foreground">{obligation}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
