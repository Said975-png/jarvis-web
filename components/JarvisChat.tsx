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
    const responses = [
      'Интересный вопрос! Я анализирую ваш запрос и готовлю оптимальное решение.',
      'Как ваш AI-помощник, рекомендую рассмотреть несколько вариантов подхода к этой задаче.',
      'Основываясь на моих алгоритмах, вот что я могу предложить для решения вашей задачи.',
      'Отличная идея! Позвольте мне проанализировать возможности реализации.',
      'Я обрабатываю ваш запрос с помощью продвинутых AI-алгоритмов. Вот мои рекомендации.',
      'Как продвинутый AI-ассистент, я готов помочь вам с этим вопросом.',
    ]
    
    if (userMessage.toLowerCase().includes('сайт') || userMessage.toLowerCase().includes('веб')) {
      return 'Отлично! Я специализируюсь на создании современных веб-решений. Расскажите подробнее о вашем проекте — какой функционал вам нужен?'
    }
    
    if (userMessage.toLowerCase().includes('дизайн')) {
      return 'Дизайн — это моя сильная сторона! Я создаю современные, адаптивные интерфейсы с использованием AI-технологий. Какой стиль вам больше нравится?'
    }
    
    if (userMessage.toLowerCase().includes('цена') || userMessage.toLowerCase().includes('стоимость')) {
      return 'У нас есть три тарифных плана: Basic (2.5М сумм), Pro (4М сумм) и Max (5М сумм). Каждый план включает разный набор возможностей. Какие задачи вы планируете решать?'
    }
    
    return responses[Math.floor(Math.random() * responses.length)]
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
