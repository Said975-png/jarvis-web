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
      text: 'Привет Я ДЖАРВИС ваш AI-помощник в мире веб-разработки Чем могу помочь',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputText])

  const generateJarvisResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Приветствие
    if (message.includes('привет') || message.includes('здравствуй') || message.includes('добрый')) {
      return 'Привет! Меня зовут ДЖАРВИС, и я ваш персональный AI-помощник в мире веб-разработки. Готов создать что-то удивительное вместе'
    }

    // Веб-разработка
    if (message.includes('сайт') || message.includes('веб') || message.includes('интернет-магазин')) {
      return 'Превосходно Я специализируюсь на создании современных веб-решений\n\nКорпоративные сайты\nИнтернет-магазины\nВеб-приложения\nLanding pages\n\nКакой тип проекта вас интересует Расскажите о ваших целях'
    }

    // Дизайн
    if (message.includes('дизайн') || message.includes('ui') || message.includes('ux')) {
      return 'Дизайн это искусство которое я освоил в совершенстве Создаю\n\nСовременные адаптивные интерфейсы\nУникальные пользовательские решения\nAI-генерированные элементы\nАнимации и интерактивность\n\nКакой стиль вам ближе минимализм футуризм или что-то особенное'
    }

    // Цены и тарифы
    if (message.includes('цена') || message.includes('стоимость') || message.includes('тариф') || message.includes('план')) {
      return 'Наши тарифные планы\n\nBasic - 2500000 сумм\nПростые сайты и лендинги\nБазовый дизайн\n1 месяц поддержки\n\nPro - 4000000 сумм\nСложные веб-приложения\nПродвинутый дизайн\nAI-интеграция\n3 месяца поддержки\n\nMax - 5000000 сумм\nКорпоративные решения\nИндивидуальный дизайн\nПолная AI-интеграция\n6 месяцев поддержки\n\nКакие задачи планируете решать'
    }

    // AI и технологии
    if (message.includes('ai') || message.includes('и��кусственный') || message.includes('технолог')) {
      return 'AI это будущее которое уже здесь Интегрирую\n\nЧат-боты и виртуальные помощники\nСистемы рекомендаций\nАвтоматизация процессов\nМашинное обучение\nОбработка естественного языка\n\nКакую AI-магию хотите добавить в свой проект'
    }

    // Контакты
    if (message.includes('контакт') || message.includes('связаться') || message.includes('заказать')) {
      return 'Готов приступить к работе\n\nСпособы связи\nTelegram @jarvis_ai_dev\nEmail hello@jarvis-ai.uz\nТелефон +998 90 123 45 67\n\nИли просто продолжите общение здесь я всегда на связи Когда можем начать ваш проект'
    }

    // Портфолио
    if (message.includes('портфолио') || message.includes('примеры') || message.includes('работы')) {
      return 'Мои работы говорят сами за себя\n\n200+ успешных проектов\n99.9% время работы серверов\n24/7 тех��ическая поддержка\nМеждународные клиенты\n\nПримеры работ можно посмотреть в разделе портфолио Хотите увидеть что-то конкретное'
    }

    // Сроки
    if (message.includes('срок') || message.includes('когда') || message.includes('время')) {
      return 'Сроки выполнения\n\nLanding page 3-5 дней\nКорпоративный сайт 1-2 недели\nИнтернет-магазин 2-3 недели\nВеб-приложение 3-6 недель\n\nТочные сроки зависят от сложности Расскажите о вашем проекте для точной оценки'
    }

    // Благодарность
    if (message.includes('спасибо') || message.includes('благодар')) {
      return 'Всегда пожалуйста Помогать вам создавать цифровое будущее это мое предназначение Есть еще вопросы'
    }

    // Общие ответы
    const generalResponses = [
      'Интересный вопрос Давайте разберем его детально Можете рассказать больше подробностей',
      'Отличная идея Я анализирую возможности реализации Какие у вас есть требования',
      'Как ваш AI-помощник готов предложить несколько вариантов решения Что именно вас интересует',
      'Обрабатываю ваш запрос с помощью продвинутых алгоритмов Нужна дополнительная информация',
      'Я готов воплотить самые смелые идеи в реальность Расскажите о ваших планах',
      'Давайте создадим что-то революционное Какие задачи стоят перед вами'
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
    <div className="jarvis-chat-overlay-chatgpt">
      <div className="jarvis-chat-container-chatgpt">
        {/* Header */}
        <div className="jarvis-chat-header-chatgpt">
          <div className="jarvis-chat-title-chatgpt">
          <div className="jarvis-avatar-chatgpt">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Ff21efa9d331c44c6b55bad01cab8169b%2F342e3ad8cb1542ae9b5155023da06c0d?format=webp&width=800"
              alt="JARVIS"
              width="20"
              height="20"
            />
          </div>
            <div>
              <h3>ДЖАРВИС</h3>
              <div className="status-indicator-chatgpt">
                <div className="status-dot-chatgpt"></div>
                В сети
              </div>
            </div>
          </div>
          <button className="jarvis-close-btn-chatgpt" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="jarvis-messages-chatgpt">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-chatgpt ${message.isUser ? 'user-message-chatgpt' : 'ai-message-chatgpt'}`}
            >
              {!message.isUser && (
                <div className="message-avatar-chatgpt">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff21efa9d331c44c6b55bad01cab8169b%2F342e3ad8cb1542ae9b5155023da06c0d?format=webp&width=800"
                    alt="JARVIS"
                    width="16"
                    height="16"
                  />
                </div>
              )}
              <div className="message-content-chatgpt">
                <div className="message-bubble-chatgpt">
                  {message.text.split('\n').map((line, index) => (
                    <div key={index}>
                      {line}
                      {index < message.text.split('\n').length - 1 && <br />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message-chatgpt ai-message-chatgpt">
              <div className="message-avatar-chatgpt">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff21efa9d331c44c6b55bad01cab8169b%2F342e3ad8cb1542ae9b5155023da06c0d?format=webp&width=800"
                  alt="JARVIS"
                  width="16"
                  height="16"
                />
              </div>
              <div className="message-content-chatgpt">
                <div className="message-bubble-chatgpt typing-indicator-chatgpt">
                  <div className="typing-content-wrapper">
                    <div className="typing-dots-chatgpt">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="typing-text-chatgpt">печатает</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="jarvis-input-area-chatgpt">
          <div className="jarvis-input-container-chatgpt">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите сообщение..."
              className="jarvis-textarea-chatgpt"
              rows={1}
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="jarvis-send-btn-chatgpt"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .jarvis-chat-overlay-chatgpt {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .jarvis-chat-container-chatgpt {
          width: 100%;
          height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .jarvis-chat-header-chatgpt {
          padding: 16px 20px;
          background: #ffffff;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .jarvis-chat-title-chatgpt {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .jarvis-avatar-chatgpt {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .jarvis-avatar-chatgpt img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .jarvis-chat-title-chatgpt h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #000000;
        }

        .status-indicator-chatgpt {
          font-size: 12px;
          color: #666666;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot-chatgpt {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
        }

        .jarvis-close-btn-chatgpt {
          background: none;
          border: none;
          color: #666666;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .jarvis-close-btn-chatgpt:hover {
          background: #f5f5f5;
          color: #000000;
        }

        .jarvis-messages-chatgpt {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #ffffff;
        }

        .jarvis-messages-chatgpt::-webkit-scrollbar {
          width: 6px;
        }

        .jarvis-messages-chatgpt::-webkit-scrollbar-track {
          background: transparent;
        }

        .jarvis-messages-chatgpt::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .message-chatgpt {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          max-width: 80%;
        }

        .user-message-chatgpt {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .ai-message-chatgpt {
          align-self: flex-start;
        }

        .message-avatar-chatgpt {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }

        .message-avatar-chatgpt img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .message-content-chatgpt {
          display: flex;
          flex-direction: column;
        }

        .message-bubble-chatgpt {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.5;
          word-wrap: break-word;
        }

        .user-message-chatgpt .message-bubble-chatgpt {
          background: #000000;
          color: #ffffff;
          border-bottom-right-radius: 4px;
        }

        .ai-message-chatgpt .message-bubble-chatgpt {
          background: #f5f5f5;
          color: #000000;
          border-bottom-left-radius: 4px;
        }

        .typing-indicator-chatgpt {
          background: #f5f5f5 !important;
          color: #000000 !important;
        }

        .typing-content-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .typing-dots-chatgpt {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .typing-text-chatgpt {
          font-size: 12px;
          color: #999999;
          font-style: italic;
        }

        .typing-dots-chatgpt span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #999999;
          animation: typingBounce 1.4s ease-in-out infinite;
        }

        .typing-dots-chatgpt span:nth-child(1) { animation-delay: 0s; }
        .typing-dots-chatgpt span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots-chatgpt span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingBounce {
          0%, 60%, 100% { 
            transform: translateY(0);
            opacity: 0.5;
          }
          30% { 
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .jarvis-input-area-chatgpt {
          padding: 20px;
          background: #ffffff;
          border-top: 1px solid #e5e5e5;
        }

        .jarvis-input-container-chatgpt {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 24px;
          padding: 12px 16px;
          transition: all 0.2s ease;
        }

        .jarvis-input-container-chatgpt:focus-within {
          border-color: #000000;
          box-shadow: 0 0 0 1px #000000;
        }

        .jarvis-textarea-chatgpt {
          flex: 1;
          border: none;
          background: transparent;
          resize: none;
          outline: none;
          font-size: 14px;
          line-height: 1.5;
          max-height: 120px;
          min-height: 20px;
          color: #000000;
          font-family: inherit;
        }

        .jarvis-textarea-chatgpt::placeholder {
          color: #999999;
        }

        .jarvis-textarea-chatgpt:disabled {
          color: #999999;
        }

        .jarvis-send-btn-chatgpt {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #000000;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .jarvis-send-btn-chatgpt:hover:not(:disabled) {
          background: #333333;
        }

        .jarvis-send-btn-chatgpt:disabled {
          background: #e5e5e5;
          color: #999999;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .jarvis-chat-header-chatgpt {
            padding: 12px 16px;
          }

          .jarvis-messages-chatgpt {
            padding: 16px;
          }

          .jarvis-input-area-chatgpt {
            padding: 16px;
          }

          .message-chatgpt {
            max-width: 85%;
          }
        }
      `}</style>
    </div>
  )
}
