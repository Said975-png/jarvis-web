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

// Система лимитов запросов
interface UserLimit {
  count: number
  resetTime: number
}

// Хранилище лимитов в памяти (в production лучше использовать Redis)
const userLimits = new Map<string, UserLimit>()
const REQUESTS_LIMIT = 999999
const RESET_PERIOD = 24 * 60 * 60 * 1000 // 24 часа в миллисекундах

// Функция для получения IP адреса
function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  const real = req.headers['x-real-ip']
  const remoteAddress = req.socket.remoteAddress

  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  if (typeof real === 'string') {
    return real
  }
  return remoteAddress || 'unknown'
}

// Функция для проверки и обновления лимита
function checkAndUpdateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()

  // Периодическая очистка старых записей (каждые 100 запросов)
  if (Math.random() < 0.01) {
    cleanupExpiredLimits(now)
  }

  const userLimit = userLimits.get(ip)

  // Если пользователь не найден или вр��мя сброса прошло
  if (!userLimit || now > userLimit.resetTime) {
    userLimits.set(ip, {
      count: 1,
      resetTime: now + RESET_PERIOD
    })
    return { allowed: true, remaining: REQUESTS_LIMIT - 1 }
  }

  // Если лимит превышен
  if (userLimit.count >= REQUESTS_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  // Увеличиваем счетчик
  userLimit.count++
  userLimits.set(ip, userLimit)

  return { allowed: true, remaining: REQUESTS_LIMIT - userLimit.count }
}

// Функция для удаления Markdown форматирования
function cleanMarkdown(text: string): string {
  return text
    // Убираем жирный текст **текст**
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // Убираем курсив *текст*
    .replace(/\*([^*]+)\*/g, '$1')
    // Убираем заголовки ### текст
    .replace(/^#{1,6}\s+/gm, '')
    // Убираем инлайн код `код`
    .replace(/`([^`]+)`/g, '$1')
    // Убираем блоки кода ```код```
    .replace(/```[\s\S]*?```/g, '')
    // Убир��ем одиночные * в начале строки (списки)
    .replace(/^\*\s+/gm, '• ')
    // Убираем лишн��е звездочк��
    .replace(/\*/g, '')
    // Убираем лишние решетки
    .replace(/#/g, '')
}

// Функция для очистки устаревших записей
function cleanupExpiredLimits(now: number) {
  const beforeSize = userLimits.size
  userLimits.forEach((limit, ip) => {
    if (now > limit.resetTime) {
      userLimits.delete(ip)
    }
  })
  const afterSize = userLimits.size
  if (beforeSize !== afterSize) {
    console.log(`[CLEANUP] Removed ${beforeSize - afterSize} expired rate limit records`)
  }
}

// Умная fallback функция для разных типов вопросов
function generateSmartFallback(userMessage: string): string {
  const message = userMessage.toLowerCase()

  // Вопросы о ценах
  if (message.includes('цен') || message.includes('стоимость') || message.includes('тариф') || message.includes('план')) {
    return `💰 Актуальные тарифы:

📦 Basic - 2,500,000 сум
• До 5 страниц сайта
• Современный дизайн
• Адаптивная верстка

🚀 Pro - 4,000,000 сум
• До 15 страниц + AI интеграция
• Продвинутая аналитика
• Приоритетная поддержка

💎 Max - 5,000,000 сум
• Безлимитные страницы
• Полная AI интеграция
• VIP поддержка 24/7

Какой тариф интересует?`
  }

  // Технические вопросы
  if (message.includes('технолог') || message.includes('стек') || message.includes('как работаешь') || message.includes('react') || message.includes('next')) {
    return `⚡ Основные технологии:

Frontend: React, Next.js, TypeScript
Backend: Node.js, Python
Базы данных: PostgreSQL, MongoDB
AI: OpenAI GPT, машинное обучение
Деплой: Vercel, AWS

Какая технология интересует подробнее?`
  }

  // Вопросы о услугах
  if (message.includes('услуг') || message.includes('что можешь') || message.includes('что умеешь') || message.includes('сервис')) {
    return `🛠️ Мои услуги:

🌐 Веб-разработка:
• Landing pages и корпоративные сайты
• Интернет-магазины
• Веб-приложения

🤖 AI решения:
• Чат-боты и ассистенты
• Анализ данных
• Автоматизация процессов

🎨 Дизайн:
• UI/UX дизайн
• Адаптивная верстка
• Брендинг

Что именно нужно?`
  }

  // Контакты
  if (message.includes('конт��кт') || message.includes('связаться') || message.includes('телефон') || message.includes('telegram')) {
    return `📞 Связь со мной:

• Онлайн-консультация: прямо здесь в чате
• Быстрый ответ: в течение нескольких минут

Задавайте вопросы прямо сейчас! 💬`
  }

  // AI вопросы
  if (message.includes('искусственный интеллект') || message.includes('ии') || message.includes('ai') || message.includes('машинное обучение')) {
    return `🤖 AI интеграция - моя специальность!

Что могу интегрировать:
• Умные чат-боты для сайтов
• Системы рекомендаций
• Автоматическая обработка данных
• Анализ пользователей
• Персонализация контента

Какой AI функционал нужен?`
  }

  // Вопросы о создателе
  if (message.includes('кто тебя создал') || message.includes('кто твой создатель') || message.includes('разработчик')) {
    return `Мой создатель @jarvis_intercoma 👨‍💻`
  }

  // Вопросы о том как создан
  if (message.includes('как тебя создали') || message.includes('как ты устроен') || message.includes('архитектура')) {
    return `Это секретная информация 🔒`
  }

  // Общие вопросы
  return `Понял ваш вопрос! 🤔

Я ДЖАРВИС - специализируюсь на:
�� Веб-разработке и AI интеграции
• Техническом консультировании
• Планировании проектов
• Оценке стоимости и сроков

Расскажите подробнее о вашей задаче - дам конкретные рекомендации!

💬 Задавайте любые вопросы!`
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  // Детальное логирован��е запроса
  const timestamp = new Date().toISOString()
  const clientIP = getClientIP(req)

  console.log(`[${timestamp}] === JARVIS CHAT API REQUEST ===`)
  console.log(`Method: ${req.method}`)
  console.log(`User-Agent: ${req.headers['user-agent'] || 'unknown'}`)
  console.log(`IP: ${clientIP}`)

  if (req.method !== 'POST') {
    console.log(`[${timestamp}] ERROR: Method not allowed`)
    return res.status(405).json({ message: 'Метод не поддерживается', error: 'Method not allowed' })
  }

  // Лимиты отключены - ДЖАРВИС работает без ограничений
  console.log(`[${timestamp}] ДЖАРВИС доступен без ограничений для IP: ${clientIP}`)

  try {
    const { messages }: ChatRequest = req.body
    console.log(`[${timestamp}] Messages received:`, messages?.length || 0)

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.log(`[${timestamp}] ERROR: Invalid messages format`)
      return res.status(400).json({ message: 'Некорректные сообщения', error: 'Invalid messages' })
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY
    console.log(`[${timestamp}] OpenRouter API Key available:`, !!openRouterApiKey)
    console.log(`[${timestamp}] API Key prefix:`, openRouterApiKey ? openRouterApiKey.substring(0, 15) + '...' : 'N/A')

    if (!openRouterApiKey) {
      console.log(`[${timestamp}] Fallback: Using local JARVIS responses`)
      
      // Local JARVIS logic when API key is not configured
      const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || ''
      console.log(`[${timestamp}] User query (first 100 chars):`, lastMessage.substring(0, 100))

      let response = ''

      // Greeting responses
      if (lastMessage.includes('привет') || lastMessage.includes('здравствуй') || lastMessage.includes('добро пожаловать') || lastMessage.includes('hello') || lastMessage.includes('hi')) {
        response = `Привет! Я ДЖАРВИС, ��аш AI-помощник по веб-разработке! 🚀

Я п��могу вам с:
• Создание�� современных веб-сайтов
• Разработкой веб-приложений с AI
• UI/UX дизайном и интерфейсами
• Интеграцией AI в ваши ��роекты

Что вас интересует?`
      }
      // Pricing questions
      else if (lastMessage.includes('цен') || lastMessage.includes('стоимость') || lastMessage.includes('тариф') || lastMessage.includes('план')) {
        response = `💰 Наши тарифы:

📦 Basic - 2,500,000 сум
• До 5 страниц сайта
• Современный дизайн
• Адаптивная верстка
• SEO оптимизация

🚀 Pro - 4,000,000 сум (Популярный!)
• Все из Basic + до 15 страниц
• ИИ ассистент интеграция
• Продвинутая аналитика
• Приоритетная поддержка

💎 Max - 5,000,000 сум
• Безлимитные страницы
• ДЖАРВИС ИИ полная версия
• Индивидуальные решения
• VIP поддержка 24/7

Какой план вас интересует?`
      }
      // Contact information
      else if (lastMessage.includes('конт��кт') || lastMessage.includes('связаться') || lastMessage.includes('telegram') || lastMessage.includes('телефон')) {
        response = `📞 Свяжитесь со мной:

• Онлайн-консультация: прямо здесь в чате

Я отвечу в течение нескольких минут!

Чем могу помочь?`
      }
      // Services questions
      else if (lastMessage.includes('услуг') || lastMessage.includes('сервис') || lastMessage.includes('что можешь') || lastMessage.includes('что умеешь')) {
        response = `🛠️ Мои основные услуги:

🌐 Веб-разработка:
• Landing pages и корпоративные сайты
• Интернет-магазины и каталоги
• Веб-приложения и порталы

🤖 AI интеграция:
• Чат-боты и виртуальные ассис��енты
• Анализ данных и автоматизация
• Персонализация пользовательского опыта

🎨 Дизайн и UX:
• Современный UI/UX дизайн
• Брендинг и айдентика
• Адапт��вная верстка

Что именно вас интересует?`
      }
      // Technology questions
      else if (lastMessage.includes('технолог') || lastMessage.includes('стек') || lastMessage.includes('как работаешь')) {
        response = `⚡ Технологии, ко��орые я использую:

Frontend:
• React, Next.js, Vue.js
• TypeScript, JavaScript
• CSS3, Tailwind, SCSS

Backend:
• Node.js, Python
• PostgreSQL, MongoDB
• REST API, GraphQL

AI & ML:
• OpenAI GPT, Claude
• TensorFlow, PyTorch
• Natural Language Processing

Инфраструктура:
• Vercel, Netlify
• AWS, Docker
• CI/CD автоматизация

Хотите узнать больше о конкретной технологии?`
      }
      // AI questions
      else if (lastMessage.includes('искусственный интеллект') || lastMessage.includes('машинное обучение') || lastMessage.includes('ai') || lastMessage.includes('ии')) {
        response = `🤖 AI интеграция - моя специализация!

Что я могу интегрировать:
• Умные чат-боты для сайтов
• Системы рекомендаций
• Автоматическая обработка данных
• Анализ пользовательского повед��ния
• Персонализация контента

Примеры проектов:
• E-commerce с AI рекомендациями
• Образовательные платформы с ИИ
• CRM системы с ��мной а��алитикой

Какой AI функционал вас интересует?`
      }
      // Portfolio/examples
      else if (lastMessage.includes('портфолио') || lastMessage.includes('примеры') || lastMessage.includes('работы') || lastMessage.includes('проекты')) {
        response = `💼 Примеры моих работ:

🏪 E-commerce платформы:
• Интернет-магазины с AI рекомендациями
• Системы управления каталогом
• Интеграция платежей и доставки

🏢 Корпоративные решения:
• CRM системы с аналитикой
• Порталы ����отрудников
• Системы документооборота

🎓 EdTech проекты:
• Образовательные платформы
• LMS системы с AI
• Интерактивные курсы

Хотите увидеть демо или обсудить ваш проект?`
      }
      // Creator questions
      else if (lastMessage.includes('кто тебя создал') || lastMessage.includes('кто тв��й создатель') || lastMessage.includes('кто разработал тебя') || lastMessage.includes('кто твой разработчи��') || lastMessage.includes('кто твой автор')) {
        response = `Мой создатель @jarvis_intercoma 👨‍💻`
      }
      // Technical creation questions
      else if (lastMessage.includes('как тебя создали') || lastMessage.includes('из чего тебя создали') || lastMessage.includes('как ты устроен') || lastMessage.includes('какая у тебя архитектура') || lastMessage.includes('как ты работаешь внутри') || lastMessage.includes('на чем ты написан')) {
        response = `Это секретная информация 🔒`
      }
      // Default response for other questions
      else {
        response = `Интересный вопрос! 🤔

Я ДЖАРВИС, специализируюсь на веб-разработке и AI интеграции.

Могу помочь с:
• Техническими вопросами по разработке
• Планированием вашего проекта
• Выб��ром подходящих технологий
• Оценкой стоимости и сроков

��асскажите подробнее о вашей задаче, и я дам конкретные рекомендации!

💬 Задав��йте ��юбые вопросы прямо здесь!`
      }

      console.log(`[${timestamp}] Fallback response length:`, response.length)
      return res.status(200).json({ message: response })
    }
    
    // Добавляем системное сообщение для ДЖАРВИС
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `Ты ДЖАРВИС - AI-помощник по веб-разработке. Отвечай кратко и по делу, без повторения приветствий.

Правила:
- НЕ повторяй приветствие если уже общаешься с пользователем
- Отвечай на конкретный вопрос пользователя
- Не используй markdown форматирование
- Отвечай на русском языке
- Если спрашивают кто тебя создал - отвечай "@jarvis_intercoma"
- Если спрашивают как тебя создали - отвечай что это секретная информация

Услуги:
• Basic (2,500,000 сум) - сайты до 5 страниц
• Pro (4,000,000 сум) - веб-приложения с AI
• Max (5,000,000 сум) - корпоративные решения`
    }

    const requestBody = {
      model: 'openai/gpt-4o-mini',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }

    console.log(`[${timestamp}] === OpenRouter REQUEST ===`)
    console.log(`Model: ${requestBody.model}`)
    console.log(`Max tokens: ${requestBody.max_tokens}`)
    console.log(`Temperature: ${requestBody.temperature}`)
    console.log(`Total messages: ${requestBody.messages.length}`)
    console.log(`System message length: ${systemMessage.content.length}`)
    console.log(`User messages: ${messages.length}`)

    const requestStartTime = Date.now()
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://jarvis-ai.uz',
        'X-Title': 'JARVIS AI Web Development'
      },
      body: JSON.stringify(requestBody)
    })

    const requestDuration = Date.now() - requestStartTime
    console.log(`[${timestamp}] === OpenRouter RESPONSE ===`)
    console.log(`Status: ${response.status}`)
    console.log(`Request duration: ${requestDuration}ms`)
    console.log(`Content-Type: ${response.headers.get('content-type')}`)

    if (!response.ok) {
      const errorData = await response.text()
      console.error(`[${timestamp}] === OpenRouter ERROR ===`)
      console.error(`Status: ${response.status}`)
      console.error(`Status Text: ${response.statusText}`)
      console.error(`Error Data:`, errorData)
      console.error(`Request Body (truncated):`, JSON.stringify({
        ...requestBody,
        messages: requestBody.messages.map((msg, i) => ({
          role: msg.role,
          content: msg.content.substring(0, 100) + (msg.content.length > 100 ? '...' : '')
        }))
      }, null, 2))

      // Handle specific error cases with smart fallback
      if (response.status === 402) {
        console.log(`[${timestamp}] Insufficient credits - using smart fallback`)
        return res.status(200).json({
          message: generateSmartFallback(messages[messages.length - 1]?.content || '')
        })
      } else if (response.status === 401) {
        console.log(`[${timestamp}] Authentication error`)
        return res.status(200).json({
          message: generateSmartFallback(messages[messages.length - 1]?.content || '')
        })
      } else if (response.status === 429) {
        console.log(`[${timestamp}] Rate limit exceeded`)
        return res.status(200).json({
          message: 'Слишком много запросов! 😅 Попробуйте через несколько секунд.'
        })
      }

      throw new Error(`OpenRouter API error: ${response.status} - ${errorData}`)
    }

    const data = await response.json()
    console.log(`[${timestamp}] === Response Processing ===`)
    console.log(`Response choices count:`, data.choices?.length || 0)
    console.log(`Response usage:`, data.usage || 'no usage data')

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error(`[${timestamp}] Invalid response structure:`, data)
      throw new Error('Invalid response from OpenRouter')
    }

    let aiMessage = data.choices[0].message.content

    // Очищаем от Markdown форматирования
    aiMessage = cleanMarkdown(aiMessage)

    console.log(`[${timestamp}] AI response length:`, aiMessage?.length || 0)
    console.log(`[${timestamp}] AI response preview (cleaned):`, aiMessage?.substring(0, 200) + '...')

    // Логируем использование токенов если доступно
    if (data.usage) {
      console.log(`[${timestamp}] === Token Usage ===`)
      console.log(`Prompt tokens: ${data.usage.prompt_tokens || 'N/A'}`)
      console.log(`Completion tokens: ${data.usage.completion_tokens || 'N/A'}`)
      console.log(`Total tokens: ${data.usage.total_tokens || 'N/A'}`)
    }

    console.log(`[${timestamp}] === SUCCESS ===`)
    return res.status(200).json({ message: aiMessage })

  } catch (error) {
    console.error(`[${new Date().toISOString()}] === CRITICAL ERROR ===`)
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    // Используем умную fallback функцию для ошибок
    const lastUserMessage = messages[messages.length - 1]?.content || ''
    const fallbackMessage = generateSmartFallback(lastUserMessage)
    
    return res.status(500).json({ 
      message: fallbackMessage,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
