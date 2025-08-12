import type { NextApiRequest, NextApiResponse } from 'next'

interface TestRequest {
  model: string
  message: string
}

interface TestResponse {
  message?: string
  error?: string
  model?: string
  usage?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TestResponse>
) {
  const timestamp = new Date().toISOString()
  
  console.log(`[${timestamp}] === MODEL TESTER API ===`)
  console.log(`Method: ${req.method}`)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { model, message }: TestRequest = req.body

    if (!model || !message) {
      return res.status(400).json({ error: 'Model and message are required' })
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY
    console.log(`[${timestamp}] Testing model: ${model}`)
    console.log(`[${timestamp}] API Key available:`, !!openRouterApiKey)
    console.log(`[${timestamp}] Message:`, message.substring(0, 100))

    if (!openRouterApiKey) {
      console.log(`[${timestamp}] No API key - returning mock response`)
      return res.status(200).json({
        message: `[DEMO MODE] Тестирование модели ${model}: ${message}`,
        model,
        error: 'API ключ не настроен - демо режим'
      })
    }

    // Системное сообщение для тестирования
    const systemMessage = {
      role: 'system' as const,
      content: 'Ты помощник для тестирования. Отвечай кратко и по делу на русском языке. Не используй markdown форматирование.'
    }

    const requestBody = {
      model,
      messages: [
        systemMessage,
        {
          role: 'user' as const,
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }

    console.log(`[${timestamp}] === OpenRouter REQUEST ===`)
    console.log(`Model: ${model}`)
    console.log(`Max tokens: ${requestBody.max_tokens}`)

    const requestStartTime = Date.now()
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://jarvis-ai.uz',
        'X-Title': 'JARVIS AI Model Tester'
      },
      body: JSON.stringify(requestBody)
    })

    const requestDuration = Date.now() - requestStartTime
    console.log(`[${timestamp}] === OpenRouter RESPONSE ===`)
    console.log(`Status: ${response.status}`)
    console.log(`Duration: ${requestDuration}ms`)

    if (!response.ok) {
      const errorData = await response.text()
      console.error(`[${timestamp}] API Error:`, response.status, errorData)
      
      // Обработка специфичных ошибок
      if (response.status === 402) {
        return res.status(200).json({
          error: 'Недостаточно кредитов на аккаунте OpenRouter',
          model
        })
      } else if (response.status === 401) {
        return res.status(200).json({
          error: 'Неверный API ключ OpenRouter',
          model
        })
      } else if (response.status === 429) {
        return res.status(200).json({
          error: 'Превышен лимит запросов',
          model
        })
      } else if (response.status === 400) {
        return res.status(200).json({
          error: 'Модель не поддерживается или неверный запрос',
          model
        })
      }

      return res.status(200).json({
        error: `OpenRouter API error: ${response.status} - ${errorData}`,
        model
      })
    }

    const data = await response.json()
    console.log(`[${timestamp}] Response data:`, {
      choices: data.choices?.length || 0,
      usage: data.usage || 'no usage data'
    })

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return res.status(200).json({
        error: 'Неверный ответ от модели',
        model
      })
    }

    let aiMessage = data.choices[0].message.content

    // Очищаем от markdown
    aiMessage = aiMessage
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/^\*\s+/gm, '• ')
      .replace(/\*/g, '')
      .replace(/#/g, '')

    console.log(`[${timestamp}] === SUCCESS ===`)
    console.log(`Response length: ${aiMessage?.length || 0}`)
    console.log(`Response preview: ${aiMessage?.substring(0, 100)}...`)

    return res.status(200).json({
      message: aiMessage,
      model,
      usage: data.usage
    })

  } catch (error) {
    console.error(`[${timestamp}] === CRITICAL ERROR ===`)
    console.error('Error:', error instanceof Error ? error.message : String(error))
    
    return res.status(200).json({
      error: error instanceof Error ? error.message : 'Unknown error',
      model: req.body.model
    })
  }
}
