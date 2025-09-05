"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

interface Tool {
  "Key Tool": string
  "Use Case": string
  Comments: string
  Pricing: string
  "Ranking/Insight": string
}

interface ChatbotProps {
  tools: Tool[]
}

export function Chatbot({ tools }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your AI marketing tools assistant. I can help you find the perfect tools for your needs. What are you looking to accomplish?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "Find lead generation tools",
        "Show me content creation tools",
        "What's the best CRM under $100?",
        "Compare workflow automation tools",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()
    let response = ""
    let suggestions: string[] = []

    // Lead generation queries
    if (lowerMessage.includes("lead") || lowerMessage.includes("prospecting")) {
      const leadTools = tools.filter(
        (tool) =>
          tool["Use Case"].toLowerCase().includes("lead") || tool["Use Case"].toLowerCase().includes("prospecting"),
      )

      if (leadTools.length > 0) {
        response = `I found ${leadTools.length} lead generation tools for you:\n\n`
        leadTools.slice(0, 3).forEach((tool) => {
          response += `🎯 **${tool["Key Tool"]}** - ${tool["Use Case"]}\n${tool["Comments"]}\n💰 ${tool["Pricing"]}\n\n`
        })
        if (leadTools.length > 3) {
          response += `And ${leadTools.length - 3} more tools available!`
        }
      } else {
        response =
          "I don't see specific lead generation tools in our current database, but I can help you find other marketing tools!"
      }

      suggestions = ["Show me CRM tools", "Find content creation tools", "What about email marketing?"]
    }

    // Content creation queries
    else if (lowerMessage.includes("content") || lowerMessage.includes("writing") || lowerMessage.includes("copy")) {
      const contentTools = tools.filter(
        (tool) =>
          tool["Use Case"].toLowerCase().includes("content") || tool["Use Case"].toLowerCase().includes("writing"),
      )

      response = `Here are the best content creation tools:\n\n`
      contentTools.slice(0, 3).forEach((tool) => {
        response += `✍️ **${tool["Key Tool"]}** - ${tool["Use Case"]}\n${tool["Comments"]}\n💰 ${tool["Pricing"]}\n\n`
      })

      suggestions = ["Find design tools", "Show me video creation tools", "What about social media tools?"]
    }

    // CRM queries
    else if (lowerMessage.includes("crm") || lowerMessage.includes("customer")) {
      const crmTools = tools.filter(
        (tool) => tool["Use Case"].toLowerCase().includes("crm") || tool["Use Case"].toLowerCase().includes("customer"),
      )

      response = `Here are the CRM and customer management tools:\n\n`
      crmTools.slice(0, 3).forEach((tool) => {
        response += `👥 **${tool["Key Tool"]}** - ${tool["Use Case"]}\n${tool["Comments"]}\n💰 ${tool["Pricing"]}\n\n`
      })

      suggestions = ["Find automation tools", "Show me analytics tools", "What about email tools?"]
    }

    // Price-based queries
    else if (lowerMessage.includes("free") || lowerMessage.includes("cheap") || lowerMessage.includes("budget")) {
      const budgetTools = tools.filter(
        (tool) =>
          tool["Pricing"].toLowerCase().includes("free") ||
          tool["Pricing"].includes("$0") ||
          (tool["Pricing"].match(/\$(\d+)/) && Number.parseInt(tool["Pricing"].match(/\$(\d+)/)![1]) < 50),
      )

      response = `Here are some budget-friendly options:\n\n`
      budgetTools.slice(0, 3).forEach((tool) => {
        response += `💸 **${tool["Key Tool"]}** - ${tool["Use Case"]}\n${tool["Comments"]}\n💰 ${tool["Pricing"]}\n\n`
      })

      suggestions = ["Show premium tools", "Find mid-range options", "What's most popular?"]
    }

    // Comparison queries
    else if (lowerMessage.includes("compare") || lowerMessage.includes("vs") || lowerMessage.includes("difference")) {
      response = "I can help you compare tools! Here are some popular comparisons:\n\n"
      const popularTools = tools.slice(0, 4)
      popularTools.forEach((tool, index) => {
        response += `${index + 1}. **${tool["Key Tool"]}** - ${tool["Use Case"]}\n   ${tool["Pricing"]} | ${tool["Ranking/Insight"]}\n\n`
      })

      suggestions = ["Tell me about specific tools", "Show me by category", "What's trending?"]
    }

    // Default response
    else {
      response = `I can help you find the perfect marketing tools! We have ${tools.length} tools across categories like:\n\n🎯 Lead Generation\n✍️ Content Creation\n👥 CRM & Customer Management\n⚡ Workflow Automation\n📊 Analytics & Data\n📧 Email Marketing\n\nWhat specific challenge are you trying to solve?`

      suggestions = [
        "Find lead generation tools",
        "Show me content tools",
        "What's under $50?",
        "Compare popular tools",
      ]
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: "bot",
      timestamp: new Date(),
      suggestions,
    }
  }

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim()
    if (!messageToSend) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(messageToSend)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center bg-blue-600 hover:bg-blue-700`}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">AI Tools Assistant</span>
              <Badge variant="secondary" className="bg-blue-500 text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                AI
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-blue-700">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      {message.sender === "user" && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <div className="text-sm whitespace-pre-line">{message.content}</div>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 mr-1 mb-1 bg-transparent"
                            onClick={() => handleSendMessage(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about marketing tools..."
                className="flex-1"
              />
              <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
