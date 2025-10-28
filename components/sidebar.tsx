"use client"

import { History } from "lucide-react"

interface HistoryItem {
  input: string
  output: string
  tone: string
}

interface SidebarProps {
  history: HistoryItem[]
  onSelectHistory: (item: HistoryItem) => void
}

export default function Sidebar({ history, onSelectHistory }: SidebarProps) {
  return (
    <div className="w-64 bg-card border-r border-border flex flex-col overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <History className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">History</h3>
        </div>
        <p className="text-xs text-muted-foreground">Your recent generations</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">
            No history yet. Start writing to see your generations here.
          </div>
        ) : (
          <div className="divide-y divide-border">
            {history.map((item, idx) => (
              <button
                key={idx}
                onClick={() => onSelectHistory(item)}
                className="w-full p-4 text-left hover:bg-muted transition-colors group"
              >
                <p className="text-xs font-medium text-primary mb-1 capitalize">{item.tone}</p>
                <p className="text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {item.input.substring(0, 50)}...
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
