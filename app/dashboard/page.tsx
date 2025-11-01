"use client"

import { useState, useCallback } from "react"
import { CategorySelector } from "@/components/category-selector"
import { DocumentUploader } from "@/components/document-uploader"
import { AnalysisResults } from "@/components/analysis-results"
import { ChatAssistant } from "@/components/chat-assistant"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Menu, X, ArrowLeft, Trash2, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AnalysisState {
  documentName: string
  category: string
  textContent: string
}

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [activeStep, setActiveStep] = useState<"category" | "upload" | "results">("category")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [analysisData, setAnalysisData] = useState<AnalysisState | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(true)
  const { toast } = useToast()

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category)
    setActiveStep("upload")
  }, [])

  const handleAnalysisStart = useCallback(
    (files: any[]) => {
      if (files.length > 0) {
        const firstFile = files[0]
        setAnalysisData({
          documentName: firstFile.file.name,
          category: selectedCategory,
          textContent: firstFile.textContent || "",
        })
        setActiveStep("results")

        toast({
          title: "Analysis Complete",
          description: `Successfully analyzed ${firstFile.file.name}`,
        })
      }
    },
    [selectedCategory, toast],
  )

  const handleReset = useCallback(() => {
    setSelectedCategory("")
    setActiveStep("category")
    setAnalysisData(null)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
              <span className="text-lg font-bold text-foreground hidden sm:inline">Legal Uplifter</span>
            </div>
          </div>

          {analysisData && (
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-sm text-muted-foreground hidden md:inline">{analysisData.documentName}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                New Analysis
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          {isSidebarOpen && (
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <Card className="p-4 border-border bg-secondary/30">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-4">Progress</p>
                  <div className="space-y-2">
                    {[
                      { id: "category", label: "Category", step: 1 },
                      { id: "upload", label: "Upload", step: 2 },
                      { id: "results", label: "Results", step: 3 },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveStep(item.id as any)}
                        disabled={activeStep !== item.id && activeStep !== "results"}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center gap-3 ${
                          activeStep === item.id
                            ? "bg-primary/20 text-accent border border-accent/50 shadow-lg shadow-accent/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/30 text-xs font-semibold">
                          {item.step}
                        </span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </Card>

                {analysisData && (
                  <Card className="p-4 border-border bg-accent/5 border-accent/20">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Current Document</h4>
                    <p className="text-xs text-muted-foreground truncate mb-3">{analysisData.documentName}</p>
                    <p className="text-xs text-accent font-medium mb-3">Category: {analysisData.category}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      className="w-full border-accent/50 hover:bg-accent/10 text-accent bg-transparent"
                    >
                      <Trash2 className="h-3 w-3 mr-2" />
                      Clear
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {activeStep === "category" && !analysisData && <CategorySelector onSelect={handleCategorySelect} />}

              {activeStep === "upload" && !analysisData && (
                <DocumentUploader onAnalysisStart={handleAnalysisStart} category={selectedCategory} />
              )}

              {activeStep === "results" && analysisData && <AnalysisResults data={undefined} />}

              {!analysisData && activeStep === "category" && (
                <Card className="p-12 border-border bg-secondary/30 text-center">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Ready to analyze?</h3>
                    <p className="text-muted-foreground">
                      Start by selecting your category to get personalized analysis tailored to your needs.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Assistant */}
      <ChatAssistant
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        context={analysisData?.textContent}
        documentName={analysisData?.documentName}
      />

      {/* Floating Chat Toggle Button */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg z-40"
          title="Open chat assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
