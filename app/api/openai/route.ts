import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key not configured on server' }, { status: 500 })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => null)
      return NextResponse.json({ error: err?.error?.message || 'OpenAI API error' }, { status: 500 })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || null
    return NextResponse.json({ content })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || 'Unknown error' }, { status: 500 })
  }
}
