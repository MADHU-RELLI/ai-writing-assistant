"use client"

import { Button } from "@/components/ui/button"
import { Copy, Download } from "lucide-react"
import { useState } from "react"

interface OutputPanelProps {
  output: string
  isLoading: boolean
}

export default function OutputPanel({ output, isLoading }: OutputPanelProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(output))
    element.setAttribute("download", "output.txt")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="w-96 flex flex-col gap-4 min-w-0">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Output</h2>
        {output && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleCopy} className="gap-2 bg-transparent">
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button size="sm" variant="outline" onClick={handleDownload} className="gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 p-6 bg-card border border-border rounded-xl overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-muted-foreground">Generating...</p>
            </div>
          </div>
        ) : output ? (
          <p className="text-foreground whitespace-pre-wrap font-mono text-sm leading-relaxed">{output}</p>
        ) : (
          <p className="text-muted-foreground text-center h-full flex items-center justify-center">
            Your AI-generated output will appear here
          </p>
        )}
      </div>
    </div>
  )
}
