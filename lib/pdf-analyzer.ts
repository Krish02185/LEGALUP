export interface PDFAnalysis {
  summary: string
  keyPoints: Array<{ point: string; importance: "high" | "medium" | "low" }>
  highlights: Array<{ text: string; reason: string }>
  prosAndCons: Array<{
    title: string
    description: string
    type: "pro" | "con"
    impact: "high" | "medium" | "low"
  }>
  obligations: string[]
  risks: Array<{ risk: string; severity: "critical" | "high" | "medium" | "low" }>
}

// Legal document keywords for analysis
const LEGAL_KEYWORDS = {
  obligations: ["shall", "must", "required", "obligated", "responsible", "bound", "liable", "required to"],
  risks: ["liability", "penalty", "breach", "default", "termination", "cancellation", "automatic", "forfeit"],
  payments: ["payment", "fee", "cost", "price", "amount", "invoice", "bill", "compensation"],
  termination: ["termination", "terminate", "cancel", "expiration", "renewal", "notice", "end date"],
  confidentiality: ["confidential", "proprietary", "secret", "private", "disclosure"],
}

export function analyzeDocument(text: string, category: string): PDFAnalysis {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || []
  const words = text.toLowerCase().split(/\W+/)

  return {
    summary: generateSummary(text, sentences),
    keyPoints: extractKeyPoints(text, sentences, category),
    highlights: extractHighlights(text, sentences),
    prosAndCons: generateProsCons(text, category),
    obligations: extractObligations(text, sentences),
    risks: extractRisks(text, sentences),
  }
}

function generateSummary(text: string, sentences: string[]): string {
  // Find the most important sentences using keyword density
  const importantSentences = sentences
    .filter((s) => s.length > 20)
    .sort((a, b) => countLegalKeywords(b) - countLegalKeywords(a))
    .slice(0, 3)

  const summary = importantSentences.join(" ").trim()
  return summary.length > 50 ? summary.substring(0, 500) + "..." : summary
}

function extractKeyPoints(
  text: string,
  sentences: string[],
  category: string,
): Array<{ point: string; importance: "high" | "medium" | "low" }> {
  const keyPoints: Array<{ point: string; importance: "high" | "medium" | "low" }> = []

  // Extract sentences with high legal keyword density
  sentences.forEach((sentence) => {
    const keywordCount = countLegalKeywords(sentence)
    if (keywordCount >= 2) {
      const cleaned = sentence.trim()
      if (cleaned.length > 20 && cleaned.length < 200) {
        const importance =
          keywordCount >= 4 ? ("high" as const) : keywordCount >= 2 ? ("medium" as const) : ("low" as const)

        keyPoints.push({
          point: cleaned,
          importance,
        })
      }
    }
  })

  // Add category-specific key points
  if (category === "business") {
    keyPoints.push({
      point: "Document contains contract terms and conditions",
      importance: "high",
    })
  } else if (category === "citizen") {
    keyPoints.push({
      point: "Review consumer rights and protections",
      importance: "high",
    })
  }

  return keyPoints.slice(0, 6)
}

function extractHighlights(text: string, sentences: string[]): Array<{ text: string; reason: string }> {
  const highlights: Array<{ text: string; reason: string }> = []

  // Check for auto-renewal
  if (text.toLowerCase().includes("automatic renewal") || text.toLowerCase().includes("auto-renew")) {
    highlights.push({
      text: "Auto-renewal clause detected",
      reason: "May continue the agreement automatically unless actively canceled",
    })
  }

  // Check for termination fees
  if (text.toLowerCase().includes("termination fee") || text.toLowerCase().includes("early termination")) {
    highlights.push({
      text: "Early termination penalties found",
      reason: "Exiting the agreement early may incur costs",
    })
  }

  // Check for confidentiality
  if (text.toLowerCase().includes("confidential")) {
    highlights.push({
      text: "Confidentiality obligations",
      reason: "Information must be kept confidential during and after agreement",
    })
  }

  // Check for payment terms
  if (
    text.toLowerCase().includes("payment") ||
    text.toLowerCase().includes("fee") ||
    text.toLowerCase().includes("cost")
  ) {
    highlights.push({
      text: "Financial terms clearly specified",
      reason: "Review payment schedule and amounts carefully",
    })
  }

  return highlights.slice(0, 4)
}

function generateProsCons(
  text: string,
  category: string,
): Array<{ title: string; description: string; type: "pro" | "con"; impact: "high" | "medium" | "low" }> {
  const prosCons: Array<{
    title: string
    description: string
    type: "pro" | "con"
    impact: "high" | "medium" | "low"
  }> = []

  // Check for clear payment terms
  if (text.match(/\$\d+|monthly|quarterly|annual/i)) {
    prosCons.push({
      title: "Clear Financial Terms",
      description: "Payment amounts and schedules are explicitly stated",
      type: "pro",
      impact: "high",
    })
  }

  // Check for auto-renewal (con)
  if (text.toLowerCase().includes("automatic renewal")) {
    prosCons.push({
      title: "Automatic Renewal",
      description: "Agreement may automatically renew without explicit action",
      type: "con",
      impact: "high",
    })
  }

  // Check for termination flexibility (pro)
  if (text.toLowerCase().includes("either party") && text.toLowerCase().includes("terminate")) {
    prosCons.push({
      title: "Flexible Termination",
      description: "Both parties have the option to terminate the agreement",
      type: "pro",
      impact: "high",
    })
  }

  // Check for termination penalties (con)
  if (text.toLowerCase().includes("penalty") || text.toLowerCase().includes("forfeiture")) {
    prosCons.push({
      title: "Termination Penalties",
      description: "Early termination may result in financial penalties",
      type: "con",
      impact: "high",
    })
  }

  // Check for confidentiality (pro)
  if (text.toLowerCase().includes("confidential")) {
    prosCons.push({
      title: "Confidentiality Protection",
      description: "Proprietary information is protected from disclosure",
      type: "pro",
      impact: "medium",
    })
  }

  // Check for long notice periods (con)
  if (text.match(/\d+\s*days.*notice/i) || text.match(/\d+\s*months.*notice/i)) {
    prosCons.push({
      title: "Extended Notice Period",
      description: "Requires advance notice before termination or changes",
      type: "con",
      impact: "medium",
    })
  }

  return prosCons.slice(0, 6)
}

function extractObligations(text: string, sentences: string[]): string[] {
  const obligations: string[] = []

  sentences.forEach((sentence) => {
    const lower = sentence.toLowerCase()

    // Check for obligation keywords
    if (LEGAL_KEYWORDS.obligations.some((keyword) => lower.includes(keyword))) {
      const cleaned = sentence.trim()
      if (cleaned.length > 15 && cleaned.length < 200) {
        obligations.push(cleaned)
      }
    }

    // Check for specific common obligations
    if (lower.includes("payment")) {
      obligations.push(sentence.trim())
    }
    if (lower.includes("confidential")) {
      obligations.push(sentence.trim())
    }
    if (lower.includes("comply")) {
      obligations.push(sentence.trim())
    }
  })

  // Add default obligations
  if (obligations.length === 0) {
    obligations.push("Review and comply with all stated terms and conditions")
    obligations.push("Maintain confidentiality of sensitive information")
  }

  return obligations.slice(0, 5)
}

function extractRisks(
  text: string,
  sentences: string[],
): Array<{ risk: string; severity: "critical" | "high" | "medium" | "low" }> {
  const risks: Array<{ risk: string; severity: "critical" | "high" | "medium" | "low" }> = []

  // Check for critical risks
  if (text.toLowerCase().includes("automatic renewal")) {
    risks.push({
      risk: "Auto-renewal clause may extend the agreement automatically without explicit action",
      severity: "critical",
    })
  }

  // Check for high-severity risks
  if (text.toLowerCase().includes("termination fee") || text.toLowerCase().includes("early termination penalty")) {
    risks.push({
      risk: "Early termination penalties could result in significant financial liability",
      severity: "high",
    })
  }

  if (text.toLowerCase().includes("indemnif")) {
    risks.push({
      risk: "Indemnification clauses may require covering third-party claims",
      severity: "high",
    })
  }

  // Check for medium-severity risks
  if (text.match(/\d+\s*days.*notice/i)) {
    risks.push({
      risk: "Extended notice periods require advance planning for termination",
      severity: "medium",
    })
  }

  if (text.toLowerCase().includes("confidential")) {
    risks.push({
      risk: "Confidentiality obligations may extend beyond contract term",
      severity: "medium",
    })
  }

  // Check for liability limitations
  if (text.toLowerCase().includes("liability")) {
    risks.push({
      risk: "Review liability limitations and insurance requirements",
      severity: "medium",
    })
  }

  return risks.slice(0, 5)
}

function countLegalKeywords(text: string): number {
  const lower = text.toLowerCase()
  let count = 0

  Object.values(LEGAL_KEYWORDS).forEach((keywords) => {
    keywords.forEach((keyword) => {
      if (lower.includes(keyword)) {
        count++
      }
    })
  })

  return count
}
