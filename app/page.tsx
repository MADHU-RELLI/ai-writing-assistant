"use client"

import { useState } from "react"
import WritingEditor from "@/components/writing-editor"
import OutputPanel from "@/components/output-panel"
import Sidebar from "@/components/sidebar"

export default function Home() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [tone, setTone] = useState("professional")
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<Array<{ input: string; output: string; tone: string }>>([])

  const handleGenerate = async (action: string) => {
    if (!input.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, tone, action }),
      })

      const data = await response.json()
      setOutput(data.output)
      setHistory([{ input, output: data.output, tone }, ...history.slice(0, 9)])
    } catch (error) {
      console.error("Error:", error)
      setOutput("Error generating content. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        history={history}
        onSelectHistory={(item) => {
          setInput(item.input)
          setOutput(item.output)
          setTone(item.tone)
        }}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border bg-card px-8 py-6">
          <h1 className="text-3xl font-bold text-foreground">AI Writing Assistant</h1>
          <p className="text-muted-foreground mt-1">Enhance your writing with AI-powered suggestions</p>
        </header>

        <div className="flex-1 flex gap-6 overflow-hidden p-8">
          <WritingEditor
            value={input}
            onChange={setInput}
            tone={tone}
            onToneChange={setTone}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <OutputPanel output={output} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
