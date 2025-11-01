"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, File, X, Check, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DocumentFile {
  file: File
  id: string
  status: "pending" | "processing" | "completed" | "error"
  progress: number
  textContent?: string
  pageCount?: number
  error?: string
}

interface DocumentUploaderProps {
  onAnalysisStart?: (files: DocumentFile[]) => void
  category?: string
}

export function DocumentUploader({ onAnalysisStart, category }: DocumentUploaderProps) {
  const [files, setFiles] = useState<DocumentFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const extractTextFromPDF = useCallback(async (file: File): Promise<{ text: string; pageCount: number }> => {
    try {
      // Try to extract text using browser's built-in capabilities
      const arrayBuffer = await file.arrayBuffer()
      const text = extractPDFText(new Uint8Array(arrayBuffer))

      return {
        text: text || `[PDF Document: ${file.name}]\nContent could not be extracted. Please review the original PDF.`,
        pageCount: 1,
      }
    } catch (error) {
      console.error("[v0] PDF extraction error:", error)
      return {
        text: `[PDF Document: ${file.name}]\nContent extraction failed. Analysis based on filename.`,
        pageCount: 1,
      }
    }
  }, [])

  const extractPDFText = (data: Uint8Array): string => {
    try {
      // Convert PDF binary data to string and extract text
      let text = ""
      const decoder = new TextDecoder()

      // Look for text streams in PDF
      const dataStr = decoder.decode(data)

      // Extract text content from PDF streams (simple regex-based approach)
      const textMatches = dataStr.match(/BT\s*[\s\S]*?ET/g) || []
      const content = textMatches.join(" ")

      // Also try to find readable text
      const readableMatches = dataStr.match(/$$([^)]*)$$/g) || []
      text = readableMatches.map((m) => m.slice(1, -1)).join(" ")

      // Fallback: extract any printable text
      if (!text) {
        text = dataStr
          .split("")
          .map((char) => (char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126 ? char : " "))
          .join("")
          .replace(/\s+/g, " ")
          .trim()
      }

      return text.slice(0, 5000) // Limit to first 5000 characters
    } catch (error) {
      console.error("[v0] PDF text extraction failed:", error)
      return ""
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const newFiles = Array.from(e.dataTransfer.files)
    handleFiles(newFiles)
  }

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      if (file.type === "application/pdf") return true
      if (file.type.startsWith("image/")) return true
      if (file.type === "text/plain") return true
      return false
    })

    if (validFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, image, or text files only",
        variant: "destructive",
      })
      return
    }

    const documentFiles: DocumentFile[] = validFiles.map((file) => ({
      file,
      id: Math.random().toString(36),
      status: "pending",
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...documentFiles])
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const processFiles = async () => {
    if (files.length === 0) return

    setIsAnalyzing(true)
    const updatedFiles = [...files]

    try {
      for (let i = 0; i < updatedFiles.length; i++) {
        const docFile = updatedFiles[i]
        docFile.status = "processing"
        docFile.progress = 25
        setFiles([...updatedFiles])

        try {
          let textContent = ""
          let pageCount = 1

          if (docFile.file.type === "application/pdf") {
            const result = await extractTextFromPDF(docFile.file)
            textContent = result.text
            pageCount = result.pageCount
          } else if (docFile.file.type.startsWith("image/")) {
            textContent = `[Image document: ${docFile.file.name}]\nImage content analysis not yet available. Please convert to PDF or text.`
          } else if (docFile.file.type === "text/plain") {
            textContent = await docFile.file.text()
          }

          docFile.textContent = textContent
          docFile.pageCount = pageCount
          docFile.progress = 60
          setFiles([...updatedFiles])

          // Send to backend for AI analysis
          const formData = new FormData()
          formData.append("file", docFile.file)
          formData.append("category", category || "citizen")
          formData.append("textContent", textContent)

          const response = await fetch("/api/analyze", {
            method: "POST",
            body: formData,
          })

          if (!response.ok) {
            throw new Error("Analysis failed")
          }

          docFile.progress = 100
          docFile.status = "completed"
          setFiles([...updatedFiles])
        } catch (error) {
          docFile.status = "error"
          docFile.error = error instanceof Error ? error.message : "Processing failed"
          setFiles([...updatedFiles])

          toast({
            title: "Processing error",
            description: docFile.error,
            variant: "destructive",
          })
        }
      }

      const completedFiles = updatedFiles.filter((f) => f.status === "completed")
      if (completedFiles.length > 0) {
        onAnalysisStart?.(completedFiles)
        toast({
          title: "Success",
          description: `${completedFiles.length} document(s) analyzed successfully`,
        })
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Upload Document</h2>
        <p className="text-muted-foreground">Upload a PDF, image, or text file for AI-powered legal analysis</p>
      </div>

      <Card
        className={`border-2 border-dashed transition-all p-12 text-center cursor-pointer ${
          isDragging ? "border-accent bg-accent/10" : "border-border hover:border-accent/50 bg-card"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.txt,image/*"
          onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center">
          <div className="p-3 rounded-lg bg-primary/10 mb-4">
            <Upload className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Drag and drop your document</h3>
          <p className="text-sm text-muted-foreground">or click to browse (PDF, TXT, JPG, PNG)</p>
        </div>
      </Card>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground">Documents ({files.length})</h3>
          <div className="space-y-3">
            {files.map((file) => (
              <Card key={file.id} className="p-4 border-border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {file.status === "completed" && <Check className="h-5 w-5 text-green-400" />}
                      {file.status === "processing" && <Loader2 className="h-5 w-5 text-accent animate-spin" />}
                      {file.status === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
                      {file.status === "pending" && <File className="h-5 w-5 text-accent" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{file.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        {file.pageCount && ` • ${file.pageCount} pages`}
                      </p>
                      {file.error && <p className="text-xs text-destructive mt-1">{file.error}</p>}
                    </div>
                  </div>
                  {file.status !== "processing" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {file.status === "processing" && (
                  <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-accent h-full transition-all duration-300"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}
              </Card>
            ))}
          </div>

          <Button
            onClick={processFiles}
            disabled={isAnalyzing || files.every((f) => f.status !== "pending")}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Documents...
              </>
            ) : (
              "Analyze Documents"
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
