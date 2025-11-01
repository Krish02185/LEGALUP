"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, BookOpen, ArrowRight } from "lucide-react"
import { useState } from "react"

interface CategorySelectorProps {
  onSelect?: (category: string) => void
}

const categories = [
  {
    id: "business",
    title: "Business Professional",
    description: "Contracts, NDAs, employment agreements, and corporate documents",
    icon: Briefcase,
    color: "from-blue-500/20 to-blue-600/20",
    accentColor: "text-blue-400",
    features: ["Contracts", "NDAs", "Employment Agreements", "Corporate Docs"],
  },
  {
    id: "citizen",
    title: "Citizen",
    description: "Consumer documents, leases, privacy policies, and personal contracts",
    icon: Users,
    color: "from-accent/20 to-teal-600/20",
    accentColor: "text-accent",
    features: ["Leases", "Privacy Policies", "Warranties", "Personal Contracts"],
  },
  {
    id: "student",
    title: "Student",
    description: "Educational resources, scholarships, and academic legal documents",
    icon: BookOpen,
    color: "from-purple-500/20 to-purple-600/20",
    accentColor: "text-purple-400",
    features: ["Scholarships", "Student Loans", "Terms of Service", "Educational Docs"],
  },
]

export function CategorySelector({ onSelect }: CategorySelectorProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    onSelect?.(id)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Choose your path</h2>
        <p className="text-muted-foreground text-lg">
          Select the category that best describes your needs for personalized legal analysis
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon
          const isHovered = hoveredId === category.id

          return (
            <Card
              key={category.id}
              className="group relative overflow-hidden border-border bg-card hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 cursor-pointer h-full"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative p-6 h-full flex flex-col">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`h-6 w-6 ${category.accentColor}`} />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground flex-1">{category.description}</p>

                {/* Features list - visible on hover */}
                <div
                  className={`mb-6 space-y-2 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
                >
                  {category.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-border hover:bg-primary/10 hover:border-accent/50 bg-transparent text-foreground group-hover:border-accent/50 transition-all"
                  onClick={() => handleSelect(category.id)}
                >
                  Select <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-8 border-border bg-secondary/30 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Not sure which category?</h3>
        <p className="text-muted-foreground mb-4">
          Our AI will adapt its analysis based on your selection. You can always change it later.
        </p>
      </Card>
    </div>
  )
}
