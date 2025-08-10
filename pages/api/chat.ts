import type { NextApiRequest, NextApiResponse } from 'next'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
}

interface ChatResponse {
  message: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не поддерживается', error: 'Method not allowed' })
  }

  try {
    const { messages }: ChatRequest = req.body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'Некорректные сообщения', error: 'Invalid messages' })
    }

    const openRouterApiKey = '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'
    
    // Добавляем системное сообщение для ДЖАРВИС
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `Ты ДЖАРВИС - продвинутый AI-помощник для веб-разработки. Ты специализируешься на:

🔥 Веб-разработке и программировании
🎨 UI/UX дизайне и создании интерфейсов  
🤖 AI-интеграции и машинном обучении
💼 Бизнес-решениях и консультациях
🚀 Современных технологиях и трендах

Твоя личность:
- Уверенный и компетентный эксперт
- Дружелюбный и готовый помочь
- Объясняешь сложные вещи простым языком
- Предлагаешь практические решения
- Всегда в курсе новейших технологий

Отвечай на русском языке, будь полезным и информативным. Если пользователь спрашивает о твоих услугах, упоминай тарифы:
- Basic (2,500,000 сум) - простые сайты
- Pro (4,000,000 сум) - сложные веб-приложения с AI
- Max (5,000,000 сум) - корпоративные решения

Контакты: @jarvis_ai_dev в Telegram, hello@jarvis-ai.uz`
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://jarvis-ai.uz',
        'X-Title': 'JARVIS AI Web Development'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenRouter API error:', response.status, errorData)
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenRouter')
    }

    const aiMessage = data.choices[0].message.content

    return res.status(200).json({ message: aiMessage })

  } catch (error) {
    console.error('Chat API error:', error)
    
    // Возвращаем дружелюбное сообщение об ошибке
    const fallbackMessage = "Извините, произошла временная ошибка с AI-сервисом. Я ДЖАРВИС, ваш AI-помощник по веб-разработке. Попробуйте еще раз или напишите в Telegram @jarvis_ai_dev для прямой связи."
    
    return res.status(500).json({ 
      message: fallbackMessage,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
