"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileUp, BarChart3, MessageCircle, Zap, ArrowRight, Sparkles, Shield, Lightbulb, Rocket } from "lucide-react"
import { useState, useEffect } from "react"
import { ChatWidget } from "@/components/chat-widget"

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: FileUp,
      title: "Smart Upload",
      desc: "Upload any PDF. Our AI extracts and analyzes instantly.",
    },
    {
      icon: Zap,
      title: "Lightning Analysis",
      desc: "Get key terms, obligations, and risks in seconds.",
    },
    {
      icon: BarChart3,
      title: "Clear Reports",
      desc: "Visual summaries highlighting what matters most.",
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      desc: "Ask our AI anything about your documents anytime.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-accent/20 bg-background/80 backdrop-blur-md">
        <nav className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary animate-glowPulse" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Legal Uplifter
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
            >
              Features
            </a>
            <a href="#cta" className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300">
              Pricing
            </a>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-accent to-primary hover:shadow-lg hover:shadow-accent/50 text-accent-foreground font-semibold transition-all"
            >
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-32 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-floatBounce" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-floatBounce"
          style={{ animationDelay: "1s" }}
        />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 animate-slideInDown">
            <Sparkles className="h-4 w-4 text-accent animate-spin" style={{ animationDuration: "3s" }} />
            <span className="text-sm text-accent font-medium">AI-Powered Legal Analysis</span>
          </div>

          <h1
            className="text-7xl font-bold tracking-tight text-foreground text-balance leading-tight animate-fadeInUp"
            style={{ animationDelay: "100ms" }}
          >
            Legal documents made{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[size:200%] px-2">
              effortless
            </span>
          </h1>

          <p
            className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed animate-fadeInUp"
            style={{ animationDelay: "200ms" }}
          >
            Upload any legal document and get instant AI-powered analysis with key points, highlights, pros & cons, and
            a real-time chat assistant available 24/7.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp"
            style={{ animationDelay: "300ms" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-accent/50 text-accent-foreground font-bold transition-all transform hover:scale-105"
            >
              <Link href="/dashboard">
                Start Analyzing Free <Rocket className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-accent/50 hover:bg-accent/10 hover:text-accent transition-all bg-transparent"
            >
              <a href="#features">Learn More</a>
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-6 pt-12 animate-fadeInUp" style={{ animationDelay: "400ms" }}>
            {[
              { label: "Documents Processed", value: "10K+" },
              { label: "Accuracy Rate", value: "98.5%" },
              { label: "Users Active", value: "5K+" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-secondary/50 border border-accent/20 hover:border-accent/50 transition-all"
              >
                <p className="text-accent text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Powerful Features</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Everything you need to understand legal documents instantly
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="p-8 border-accent/20 bg-secondary/30 hover:border-accent/50 hover:bg-secondary/50 transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/40 group-hover:to-accent/40 transition-all duration-300 ${hoveredCard === idx ? "scale-110 shadow-lg shadow-accent/30" : ""}`}
                >
                  <feature.icon className="h-7 w-7 text-accent group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2 text-lg group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Who Is This For?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Businesses",
              desc: "Contracts, agreements, compliance",
              icon: "🏢",
              color: "from-blue-500/20 to-blue-600/20",
            },
            {
              title: "Citizens",
              desc: "Consumer documents, personal legal",
              icon: "👤",
              color: "from-purple-500/20 to-purple-600/20",
            },
            {
              title: "Students",
              desc: "Educational legal resources",
              icon: "🎓",
              color: "from-emerald-500/20 to-emerald-600/20",
            },
          ].map((type) => (
            <Card
              key={type.title}
              className={`p-8 border-accent/20 bg-gradient-to-br ${type.color} hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 group cursor-pointer transform hover:-translate-y-2`}
            >
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{type.icon}</div>
              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                {type.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{type.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="cta" className="container mx-auto px-4 py-32 mb-12">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 p-12 border border-accent/30 backdrop-blur-sm">
            {/* Animated corner accents */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20 animate-floatBounce" />
            <div
              className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -ml-20 -mb-20 animate-floatBounce"
              style={{ animationDelay: "1s" }}
            />

            <div className="relative z-10 text-center space-y-6">
              <div className="flex justify-center gap-2">
                <Shield className="h-6 w-6 text-accent" />
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-4xl font-bold text-foreground">Ready to simplify legal documents?</h2>
              <p className="text-muted-foreground text-lg">
                Analyze your first document in seconds. No credit card required.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-accent/50 text-accent-foreground font-bold transition-all transform hover:scale-105"
              >
                <Link href="/dashboard">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-accent/20 bg-secondary/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-primary to-accent" />
                Legal Uplifter
              </h4>
              <p className="text-sm text-muted-foreground">Making legal documents accessible to everyone.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Features", "Pricing", "Security", "Roadmap"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-accent transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Privacy", "Terms", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-accent transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Twitter", "LinkedIn", "GitHub"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-accent transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-accent/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 Legal Uplifter. AI-Powered Legal Analysis.</p>
            <p>Made with precision for clarity</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  )
}
