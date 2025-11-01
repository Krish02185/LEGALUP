import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo (replace with database)
const documents = new Map<string, any>()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")

    let results = Array.from(documents.values())

    if (category) {
      results = results.filter((doc) => doc.category === category)
    }

    return NextResponse.json({
      success: true,
      documents: results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      count: results.length,
    })
  } catch (error) {
    console.error("[v0] Documents fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fileName, category, analysis } = body

    if (!fileName || !category || !analysis) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const documentId = `doc_${Date.now()}`
    const document = {
      id: documentId,
      fileName,
      category,
      analysis,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    documents.set(documentId, document)

    return NextResponse.json({
      success: true,
      document,
      message: "Document saved successfully",
    })
  } catch (error) {
    console.error("[v0] Document save error:", error)
    return NextResponse.json({ error: "Failed to save document" }, { status: 500 })
  }
}
