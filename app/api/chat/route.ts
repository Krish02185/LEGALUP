import { type NextRequest, NextResponse } from "next/server"

// This provides smart responses without requiring external API calls or credit cards

interface LegalContext {
  keywords: string[]
  category: string
  complexity: "simple" | "moderate" | "complex"
}

function analyzeLegalContext(message: string): LegalContext {
  const lowerMessage = message.toLowerCase()

  const contractKeywords = ["contract", "agreement", "terms", "clause", "signature", "parties", "obligation"]
  const riskKeywords = ["risk", "liability", "penalty", "termination", "breach", "dispute", "confidential"]
  const priceKeywords = ["price", "cost", "fee", "payment", "discount", "rate", "charge", "refund"]
  const durationKeywords = ["duration", "period", "term", "expire", "renewal", "year", "month"]

  let category = "general"
  let complexity = "simple" as const

  if (contractKeywords.some((k) => lowerMessage.includes(k))) category = "contract"
  if (riskKeywords.some((k) => lowerMessage.includes(k))) {
    category = "risk"
    complexity = "complex"
  }
  if (priceKeywords.some((k) => lowerMessage.includes(k))) category = "pricing"
  if (durationKeywords.some((k) => lowerMessage.includes(k))) category = "duration"

  const keywords = [contractKeywords, riskKeywords, priceKeywords, durationKeywords]
    .flat()
    .filter((k) => lowerMessage.includes(k))

  return { keywords, category, complexity }
}

function generateSmartResponse(message: string, context: LegalContext): string {
  const responses: Record<string, string[]> = {
    contract: [
      "Good question about contracts! Here's what you should know: A contract is a binding agreement between parties with specific terms and conditions. Look for these key sections: (1) Parties involved, (2) Scope of work/services, (3) Payment terms, (4) Timeline/duration, (5) Termination clauses, and (6) Dispute resolution. Would you like me to analyze a specific contract?",
      "When reviewing contract terms, pay attention to: obligations you're taking on, payment schedules, termination conditions, and any automatic renewal clauses. These often contain hidden costs or requirements that could surprise you later.",
      "I notice you're asking about contracts. Remember that every clause has a purpose and potential implications. Review carefully for: liability limits, indemnification clauses, non-compete agreements, and intellectual property rights. These can significantly impact your business.",
    ],
    risk: [
      "Risk management is crucial in legal documents. The main risks to watch for are: (1) Unlimited liability clauses, (2) Automatic renewal with penalties, (3) Indemnification obligations, (4) Confidentiality breaches, and (5) Dispute resolution in unfavorable jurisdictions. Always assess the potential financial impact.",
      "When evaluating risks, consider both the probability of occurrence and the potential impact. High-risk items typically include: termination penalties, breach consequences, and liability caps. These can be negotiated.",
      "I detect risk-related questions. Key risk factors in legal documents: Look for undefined terms, unlimited liability, automatic renewals, and favorable dispute resolution. Higher complexity means you should have legal counsel review.",
    ],
    pricing: [
      "For pricing-related questions: Ensure all fees are clearly defined including base costs, additional charges, taxes, and payment terms. Watch for hidden fees, automatic price increases, and renewal costs. Understanding the total cost of ownership is essential.",
      "Payment terms are critical. Verify: (1) Payment schedule, (2) Currency and method, (3) Late payment penalties, (4) Price adjustments, (5) Refund policies. Also check if there are volume discounts or special rates available.",
      "Pricing clauses often contain surprises. Always look for: price escalation clauses, automatic renewal fees, setup costs, and cancellation charges. Calculate the true annual cost to avoid budget surprises.",
    ],
    duration: [
      "Contract duration matters significantly. Key points: (1) Start and end dates, (2) Renewal options, (3) Termination notice periods, (4) Auto-renewal clauses, (5) Extension possibilities. Automatic renewals are often a pain point—make sure you understand the process to avoid unwanted extensions.",
      "Time-related terms are important: Check for fixed vs. rolling terms, notice periods for termination, renewal terms, and any time-based penalties. Some contracts auto-renew unless you take action.",
    ],
    general: [
      "I'm your Legal Uplifter AI Assistant! I can help you understand contracts, agreements, terms, and obligations. Ask me about specific clauses, risks, pricing, durations, or anything else in your documents. What would you like to know?",
      "Great question! In legal documents, precision matters. Every word can have implications. If you're uncertain about specific terms, don't hesitate to ask for clarification or seek professional legal advice for complex matters.",
      "I'm here to help break down complex legal language into understandable concepts. Whether it's about obligations, rights, fees, or risks, feel free to ask specific questions about your documents.",
    ],
  }

  const categoryResponses = responses[context.category] || responses.general
  const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)]

  return randomResponse
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 })
    }

    const context = analyzeLegalContext(message)
    const response = generateSmartResponse(message, context)

    return NextResponse.json({
      response,
      timestamp: new Date(),
      context: {
        category: context.category,
        complexity: context.complexity,
      },
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json(
      {
        response:
          "I'm here to help with your legal documents. Try asking me about specific contract terms, risks, pricing, or obligations. What would you like to understand better?",
      },
      { status: 200 },
    )
  }
}
