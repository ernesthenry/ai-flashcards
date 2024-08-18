import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const apiKey = process.env.OPENAI_API_KEY

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req) {
  try {
    const openai = new OpenAI({ apiKey })
    const data = await req.text()

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Use the correct model name
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
    })

    // Log the entire response for debugging
    console.log('OpenAI API response:', completion)

    // Parse the JSON response from the OpenAI API
    const flashcards = JSON.parse(completion.choices[0].message.content)

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)
  } catch (error) {
    console.error('Error generating flashcards:', error)
    return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 })
  }
}
