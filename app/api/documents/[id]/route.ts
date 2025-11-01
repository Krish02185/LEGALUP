import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In demo, just return mock data
    // In production, fetch from database
    const document = {
      id,
      fileName: "Document.pdf",
      category: "Business",
      analysis: {},
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      document,
    })
  } catch (error) {
    console.error("[v0] Document fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch document" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // In production, delete from database
    return NextResponse.json({
      success: true,
      message: `Document ${id} deleted successfully`,
    })
  } catch (error) {
    console.error("[v0] Document delete error:", error)
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }
}
