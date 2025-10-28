"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Wand2, CheckCircle, Lightbulb } from "lucide-react"

interface WritingEditorProps {
  value: string
  onChange: (value: string) => void
  tone: string
  onToneChange: (tone: string) => void
  onGenerate: (action: string) => void
  isLoading: boolean
}

export default function WritingEditor({
  value,
  onChange,
  tone,
  onToneChange,
  onGenerate,
  isLoading,
}: WritingEditorProps) {
  const tones = [
    { id: "professional", label: "Professional", icon: "💼" },
    { id: "casual", label: "Casual", icon: "😊" },
    { id: "creative", label: "Creative", icon: "✨" },
    { id: "academic", label: "Academic", icon: "📚" },
  ]

  const actions = [
    { id: "improve", label: "Improve", icon: Sparkles },
    { id: "expand", label: "Expand", icon: Wand2 },
    { id: "summarize", label: "Summarize", icon: CheckCircle },
    { id: "brainstorm", label: "Brainstorm", icon: Lightbulb },
  ]

  return (
    <div className="flex-1 flex flex-col gap-4 min-w-0">
      <div className="flex gap-2 flex-wrap">
        {tones.map((t) => (
          <button
            key={t.id}
            onClick={() => onToneChange(t.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              tone === t.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            <span className="mr-2">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing or paste your content here..."
        className="flex-1 p-6 bg-card border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground font-mono text-sm"
      />

      <div className="flex gap-2 flex-wrap">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.id}
              onClick={() => onGenerate(action.id)}
              disabled={isLoading || !value.trim()}
              className="gap-2"
              variant={action.id === "improve" ? "default" : "outline"}
            >
              <Icon className="w-4 h-4" />
              {action.label}
            </Button>
          )
        })}
      </div>

      <div className="text-xs text-muted-foreground">
        {value.length} characters • {Math.ceil(value.length / 5)} words
      </div>
    </div>
  )
}
