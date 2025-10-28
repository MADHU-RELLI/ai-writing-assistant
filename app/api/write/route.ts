import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.error("[v0] API Error: GROQ_API_KEY environment variable is not set")
      return Response.json(
        { error: "Groq API key is not configured. Please set GROQ_API_KEY in .env.local" },
        { status: 500 },
      )
    }

    const { text, tone, action } = await request.json()

    if (!text || !tone || !action) {
      return Response.json({ error: "Missing required fields: text, tone, action" }, { status: 400 })
    }

    const prompts: Record<string, string> = {
      improve: `Improve the following text by enhancing clarity, grammar, and style while maintaining the original meaning. Keep the tone ${tone}.`,
      expand: `Expand the following text with more details and examples while maintaining a ${tone} tone. Make it more comprehensive.`,
      summarize: `Summarize the following text concisely while keeping the key points. Use a ${tone} tone.`,
      brainstorm: `Generate creative ideas and suggestions based on the following text. Use a ${tone} tone and provide multiple perspectives.`,
    }

    const prompt = `${prompts[action] || prompts.improve}\n\nText: ${text}`

    console.log("[v0] API Request - Model: meta-llama/llama-4-scout-17b-16e-instruct, Prompt length:", prompt.length)

    const { text: output } = await generateText({
      model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
      prompt,
      temperature: 0.7,
    })

    console.log("[v0] API Success - Output length:", output.length)
    return Response.json({ output })
  } catch (error) {
    console.error("[v0] API Error:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Full error object:", error)

    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return Response.json(
      {
        error: "Failed to generate content. Please try again.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 },
    )
  }
}
