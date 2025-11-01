import { type NextRequest, NextResponse } from "next/server"
import { analyzeDocument } from "@/lib/pdf-analyzer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const category = formData.get("category") as string
    const textContent = formData.get("textContent") as string

    if (!file || !textContent) {
      return NextResponse.json({ error: "Missing required fields: file and textContent" }, { status: 400 })
    }

    // Validate file
    const validTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 50MB limit" }, { status: 400 })
    }

    // Perform document analysis
    const analysis = analyzeDocument(textContent, category)

    return NextResponse.json({
      success: true,
      fileName: file.name,
      category,
      fileSize: file.size,
      analysis: {
        summary: analysis.summary,
        keyPoints: analysis.keyPoints.slice(0, 6),
        highlights: analysis.highlights.slice(0, 4),
        prosAndCons: analysis.prosAndCons.slice(0, 6),
        obligations: analysis.obligations.slice(0, 5),
        risks: analysis.risks.slice(0, 5),
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Analysis error:", error)
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 })
  }
}
