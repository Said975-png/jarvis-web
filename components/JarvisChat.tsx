import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface JarvisChatProps {
  isOpen: boolean
  onClose: () => void
}

export default function JarvisChat({ isOpen, onClose }: JarvisChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я ДЖАРВИС — ваш AI-помощник. Чем могу помочь?',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateJarvisResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Приветствие
    if (message.includes('привет') || message.includes('здравствуй') || message.includes('добрый')) {
      return '👋 Привет! Меня зовут ДЖАРВИС, и я ваш персональный AI-помощник в мире веб-разработки. Готов создать что-то удивительное вместе!'
    }

    // Веб-разработка
    if (message.includes('сайт') || message.includes('веб') || message.includes('интернет-магазин')) {
      return '🚀 Превосходно! Я специализируюсь на создании современных веб-решений:\n\n• Корпоративные сайты\n• Интернет-магазины\n• Веб-приложения\n• Landing pages\n\nКакой тип проекта вас интересует? Расскажите о ваших целях!'
    }

    // Дизайн
    if (message.includes('дизайн') || message.includes('ui') || message.includes('ux')) {
      return '🎨 Дизайн — это искусство, которое я освоил в совершенстве! Создаю:\n\n• Современные адаптивные интерфейсы\n• Уникальные пользовательские решения\n• AI-генерированные элементы\n• Анимации и интерактивность\n\nКакой стиль вам ближе: минимализм, футуризм или что-то особенное?'
    }

    // Цены и тарифы
    if (message.includes('цена') || message.includes('стоимость') || message.includes('тариф') || message.includes('план')) {
      return '💰 Наши тарифные планы:\n\n🥉 **Basic** - 2.5М сумм\n• Простые сайты и лендинги\n• Базовый дизайн\n• 1 месяц поддержки\n\n🥈 **Pro** - 4М сумм\n• Сложные веб-приложения\n• Продвинутый дизайн\n• AI-интеграция\n• 3 месяца поддержки\n\n🥇 **Max** - 5М сумм\n• Корпоративные решения\n• Индивидуальный дизайн\n• Полная AI-интеграция\n• 6 месяцев поддержки\n\nКакие задачи планируете решать?'
    }

    // AI и технологии
    if (message.includes('ai') || message.includes('искусственный') || message.includes('технолог')) {
      return '🤖 AI — это будущее, которое уже здесь! Интегрирую:\n\n• Чат-боты и виртуальные помощники\n• Системы рекомендаций\n• Автоматизация процессов\n• Машинное обучение\n• Обработка естественного языка\n\nКакую AI-магию хотите добавить в свой проект?'
    }

    // Контакты
    if (message.includes('контакт') || message.includes('связаться') || message.includes('заказать')) {
      return '📞 Готов приступить к работе!\n\n**Способы связи:**\n• Telegram: @jarvis_ai_dev\n• Email: hello@jarvis-ai.uz\n• Телефон: +998 90 123 45 67\n\nИли просто продолжите общение здесь — я всегда на связи! Когда можем начать ваш проект?'
    }

    // Портфолио
    if (message.includes('портфолио') || message.includes('примеры') || message.includes('работы')) {
      return '🏆 Мои работы говорят сами за себя:\n\n• **200+** успешных проектов\n• **99.9%** время работы серверов\n• **24/7** техническая поддержка\n• **Международные** клиенты\n\nПримеры работ можно посмотреть в разделе портфолио. Хотите увидеть что-то конкретное?'
    }

    // Сроки
    if (message.includes('срок') || message.includes('когда') || message.includes('время')) {
      return '⏱️ Сроки выполнения:\n\n• **Landing page**: 3-5 дней\n• **Корпоративный сайт**: 1-2 недели\n• **Интернет-магазин**: 2-3 недели\n• **Веб-приложение**: 3-6 недель\n\nТочные сроки зависят от сложности. Расскажите о вашем проекте для точной оценки!'
    }

    // Благодарность
    if (message.includes('спасибо') || message.includes('благодар')) {
      return '😊 Всегда пожалуйста! Помогать вам создавать цифровое будущее — это мое предназначение. Есть еще вопросы?'
    }

    // Общие ответы
    const generalResponses = [
      '🤔 Интересный вопрос! Давайте разберем его детально. Можете рассказать больше подробностей?',
      '💡 Отличная идея! Я анализирую возможности реализации. Какие у вас есть требования?',
      '🎯 Как ваш AI-помощник, готов предложить несколько вариантов решения. Что именно вас интересует?',
      '⚡ Обрабатываю ваш запрос с помощью продвинутых алгоритмов. Нужна дополнительная информация.',
      '🔥 Я готов воплотить самые смелые идеи в реальность! Расскажите о ваших планах.',
      '🚀 Давайте создадим что-то революционное! Какие задачи стоят перед вами?'
    ]

    return generalResponses[Math.floor(Math.random() * generalResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Симуляция обработки AI
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateJarvisResponse(inputText),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="jarvis-chat-overlay">
      <div className="jarvis-chat-container">
        {/* Header */}
        <div className="jarvis-chat-header">
          <div className="jarvis-chat-title">
            <div className="jarvis-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3>ДЖАРВИС AI</h3>
              <span className="status-indicator">В сети</span>
            </div>
          </div>
          <button className="jarvis-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="jarvis-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
            >
              {!message.isUser && (
                <div className="message-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              <div className="message-content">
                <div className="message-bubble">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message ai-message">
              <div className="message-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="message-content">
                <div className="message-bubble typing-indicator">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="jarvis-input-area">
          <div className="jarvis-input-container">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите сообщение ДЖАРВИС..."
              className="jarvis-textarea"
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="jarvis-send-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="jarvis-input-hint">
            ДЖАРВИС может помочь с веб-разработкой, дизайном и AI-решениями
          </div>
        </div>
      </div>
    </div>
  )
}
