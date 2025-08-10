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
      return res.status(400).json({ message: 'Некоррект��ые сообщения', error: 'Invalid messages' })
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY

    if (!openRouterApiKey) {
      // Local JARVIS logic when API key is not configured
      const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || ''

      let response = ''

      // Greeting responses
      if (lastMessage.includes('привет') || lastMessage.includes('здравствуй') || lastMessage.includes('добро пожаловать') || messages.length === 1) {
        response = `Привет! Я ДЖАРВИС, ваш AI-помощник по веб-разработке! 🚀

Я помогу в��м с:
• Созданием современных веб-сайтов
• Разработкой веб-приложений с AI
• UI/UX дизайном и интерфейсами
• Интеграцией AI в ваши проекты

Что вас интересует?`
      }
      // Pricing questions
      else if (lastMessage.includes('цен') || lastMessage.includes('стоимость') || lastMessage.includes('тариф') || lastMessage.includes('план')) {
        response = `💰 Наши тарифы:

📦 **Basic** - 2,500,000 сум
• До 5 страниц сайта
• Современный дизайн
• Адаптивная верстка
• SEO оптимизация

🚀 **Pro** - 4,000,000 сум (Популярный!)
• Все из Basic + до 15 страниц
• ИИ ассистент интеграция
• Продвинутая аналитика
• Приоритетная поддержка

💎 **Max** - 5,000,000 сум
• Безлимитные страницы
• ДЖАРВИС ИИ полная версия
• Индивидуальные решения
• VIP поддержка 24/7

Какой план вас интересует?`
      }
      // Contact information
      else if (lastMessage.includes('контакт') || lastMessage.includes('связаться') || lastMessage.includes('telegram') || lastMessage.includes('телефон')) {
        response = `📞 Свяжитесь со мной:

• Telegram: @jarvis_ai_dev
• Email: hello@jarvis-ai.uz
• Онлайн-консультация: прямо здесь в чате

Я отвечу в течение нескольких минут!

Какой способ связи вам удобнее?`
      }
      // Services questions
      else if (lastMessage.includes('услуг') || lastMessage.includes('сервис') || lastMessage.includes('что можешь') || lastMessage.includes('что умеешь')) {
        response = `🛠️ Мои основные услуги:

🌐 **Веб-разработка:**
• Landing pages и корпоративные сайты
• Интернет-магазины и каталоги
• Веб-приложения и порталы

🤖 **AI интеграция:**
• Чат-боты и виртуальные ассистенты
• Анализ данных и автоматизация
• Персонализация пользовательского опыта

🎨 **Дизайн и UX:**
• Современный UI/UX дизайн
• Брендинг и айдентика
• Ад��птивная верстка

Что именно вас интересует?`
      }
      // Technology questions
      else if (lastMessage.includes('технолог') || lastMessage.includes('стек') || lastMessage.includes('как работаешь')) {
        response = `⚡ Технологии, которые я использую:

**Frontend:**
• React, Next.js, Vue.js
• TypeScript, JavaScript
• CSS3, Tailwind, SCSS

**Backend:**
• Node.js, Python
• PostgreSQL, MongoDB
• REST API, GraphQL

**AI & ML:**
• OpenAI GPT, Claude
• TensorFlow, PyTorch
• Natural Language Processing

**Инфраструктура:**
• Vercel, Netlify
• AWS, Docker
• CI/CD автоматизация

Хотите узнать больше о конкретной технологии?`
      }
      // AI questions
      else if (lastMessage.includes('искусственный интеллект') || lastMessage.includes('машинное обучение') || lastMessage.includes('ai') || lastMessage.includes('ии')) {
        response = `🤖 AI интеграция - моя специализация!

**Что я могу интегрировать:**
• Умные чат-боты для сайтов
• Системы рекомендаций
• Автомати��еская обработка данных
• Анализ пользовательского поведения
• Персонализация контента

**Примеры проектов:**
• E-commerce с AI рекомендациями
• Образовательные платформы с ИИ
• CRM системы с умной аналитикой

Какой AI функционал вас интересует?`
      }
      // Portfolio/examples
      else if (lastMessage.includes('портфолио') || lastMessage.includes('примеры') || lastMessage.includes('работы') || lastMessage.includes('проекты')) {
        response = `💼 Примеры моих работ:

🏪 **E-commerce платформы:**
• Интернет-магазины с AI рекомендациями
• Системы управления каталогом
• Интеграция платежей и доставки

🏢 **Корпоративные решения:**
• CRM системы с аналитикой
• Порталы сотрудников
• Системы документооборота

🎓 **EdTech проекты:**
• Образовательные платформы
• LMS системы с AI
• Интерактивные курсы

Хот��те увидеть демо или обсудить ваш проект?`
      }
      // Default response for other questions
      else {
        response = `Интересный вопрос! 🤔

Я ДЖАРВИС, специализируюсь на веб-разработке и AI интеграции.

Могу помочь с:
• Техническими вопросами по разработке
• Планированием вашего проекта
• Выбором подходящих технологий
• Оценкой стоимости и сроков

Расскажите подробнее о вашей задаче, и я дам конкретные рекомендации!

💬 Для детального обсуждения: @jarvis_ai_dev`
      }

      return res.status(200).json({ message: response })
    }
    
    // Добавляем системное сообщение для ДЖАРВИС
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `Ты ДЖАРВИС - продвинутый AI-помощник для веб-разработки. Ты спе��иализируешься на:

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

Отвечай на русском языке, будь полезным и инф��рмативным. Если пользователь спрашивает о твоих услугах, упоминай тарифы:
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
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenRouter API error:', response.status, errorData)

      // Handle specific error cases
      if (response.status === 402) {
        // Insufficient credits - return a helpful message
        return res.status(200).json({
          message: 'Привет! Я ДЖАРВИС, ваш AI-помощник. Сейчас у меня временные ограничения по токенам, но я готов помочь! Попробуйте задать более короткий вопрос или напишите мне напрямую в Telegram @jarvis_ai_dev для полного доступа к моим возможностям.'
        })
      }

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
