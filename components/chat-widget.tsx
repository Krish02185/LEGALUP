"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send, MessageCircle, X, Minimize2, Maximize2, Loader2, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Legal Uplifter AI Assistant. Ask me anything about your documents.",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          conversationHistory: messages,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Chat error:", error)
      toast({
        title: "Error",
        description: "Failed to get AI response.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/50 text-accent-foreground transition-all duration-300 transform hover:scale-110 z-50 animate-floatBounce"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 w-96 max-w-[calc(100%-32px)] flex flex-col transition-all duration-300 z-50 ${
        isMinimized ? "h-16" : "max-h-[600px]"
      } bg-card border border-accent/30 rounded-2xl shadow-2xl shadow-accent/20 overflow-hidden backdrop-blur-sm`}
    >
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/20 to-accent/20 border-b border-accent/20">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-accent/10 animate-glow">
            <MessageCircle className="h-5 w-5 text-accent" />
          </div>
          <div>
            <span className="font-bold text-foreground text-sm">Legal Assistant</span>
            <p className="text-xs text-accent/80">Real-time AI Chat</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-muted-foreground hover:text-accent"
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-accent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeInUp`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-xl text-sm backdrop-blur-sm transition-all duration-300 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none shadow-md shadow-primary/20"
                      : "bg-secondary/80 text-foreground rounded-bl-none border border-accent/20 shadow-md shadow-accent/10"
                  }`}
                >
                  <p className="leading-relaxed">{msg.content}</p>
                  {msg.role === "assistant" && (
                    <button
                      onClick={() => copyMessage(msg.content, msg.id)}
                      className="mt-2 text-xs opacity-70 hover:opacity-100 flex items-center gap-1 transition-opacity"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="h-3 w-3 text-accent" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fadeInUp">
                <div className="bg-secondary/80 text-foreground px-4 py-3 rounded-xl border border-accent/20 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-accent" />
                  <span className="text-sm">Analyzing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="border-t border-accent/20 p-4 bg-secondary/30 backdrop-blur-sm">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
                placeholder="Ask anything..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-lg bg-input border border-accent/20 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 transition-all"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="sm"
                className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-accent/50 text-accent-foreground transition-all"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
