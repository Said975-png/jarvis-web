import { useState, useRef, useEffect } from 'react'
import { ChatHistoryManager, ChatSession, Message } from '../lib/chatHistory'
import { useTheme } from '../contexts/ThemeContext'

interface ChatGPTProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatGPT({ isOpen, onClose }: ChatGPTProps) {
  const { isDarkTheme } = useTheme()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я ДЖАРВИС, ваш AI-помощник. Чем могу помочь?',
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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [inputText])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const generateJarvisResponse = async (userMessage: string, conversationHistory: Message[]): Promise<string> => {
    try {
      const apiMessages = conversationHistory
        .filter(msg => msg.text !== 'Привет! Я ДЖАРВИС, ваш AI-помощник. Чем могу помочь?')
        .map(msg => ({
          role: msg.isUser ? 'user' as const : 'assistant' as const,
          content: msg.text
        }))

      apiMessages.push({
        role: 'user',
        content: userMessage
      })

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      return data.message
    } catch (error) {
      console.error('Error calling AI API:', error)
      return 'Извините, у меня временные проблемы с подключением. Попробуйте ещё раз.'
    }
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    const currentInput = inputText
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInputText('')
    setIsTyping(true)

    try {
      const aiText = await generateJarvisResponse(currentInput, updatedMessages)
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        isUser: false,
        timestamp: new Date()
      }
      
      const finalMessages = [...updatedMessages, aiResponse]
      setMessages(finalMessages)
    } catch (error) {
      console.error('Error generating AI response:', error)
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Извините, произошла ошибка. Попробуйте еще раз.',
        isUser: false,
        timestamp: new Date()
      }
      
      const finalMessages = [...updatedMessages, errorResponse]
      setMessages(finalMessages)
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="giga-chat-overlay">
      <div className="giga-chat-container">
        <div className="giga-chat-header">
          <div className="giga-header-content">
            <div className="giga-logo">
              <div className="giga-logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="giga-logo-text">ДЖАРВИС AI</span>
            </div>
            <button className="giga-close-btn" onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="giga-chat-main">
          <div className="giga-chat-messages">
            {messages.map((message, index) => (
              <div key={message.id} className={`giga-message ${message.isUser ? 'giga-message-user' : 'giga-message-ai'}`}>
                <div className="giga-message-content">
                  <div className="giga-message-avatar">
                    {message.isUser ? (
                      <div className="giga-user-avatar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="giga-ai-avatar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="giga-message-bubble">
                    <div className="giga-message-text">
                      {message.text.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="giga-message giga-message-ai">
                <div className="giga-message-content">
                  <div className="giga-message-avatar">
                    <div className="giga-ai-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  <div className="giga-message-bubble">
                    <div className="giga-typing-indicator">
                      <div className="giga-typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="giga-chat-input-area">
            <div className="giga-input-container">
              <div className="giga-input-wrapper">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Введите сообщение..."
                  className="giga-chat-input"
                  rows={1}
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="giga-send-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13"/>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .giga-chat-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
        }

        .giga-chat-container {
          width: 100%;
          height: 100vh;
          background: rgba(15, 20, 25, 0.95);
          border-radius: 0;
          border: none;
          backdrop-filter: blur(20px);
          box-shadow: none;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .giga-chat-header {
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 20px 24px;
        }

        .giga-header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .giga-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .giga-logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .giga-logo-text {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .giga-close-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 8px;
          width: 40px;
          height: 40px;
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .giga-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.05);
        }

        .giga-chat-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .giga-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .giga-chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .giga-chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .giga-chat-messages::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .giga-chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .giga-message {
          display: flex;
          width: 100%;
        }

        .giga-message-user {
          justify-content: flex-end;
        }

        .giga-message-ai {
          justify-content: flex-start;
        }

        .giga-message-content {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          max-width: 80%;
        }

        .giga-message-user .giga-message-content {
          flex-direction: row-reverse;
        }

        .giga-message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .giga-user-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .giga-ai-avatar {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .giga-message-bubble {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 16px 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          max-width: 100%;
        }

        .giga-message-user .giga-message-bubble {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .giga-message-text {
          color: #ffffff;
          line-height: 1.6;
          font-size: 15px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .giga-message-text p {
          margin: 0 0 12px 0;
          word-wrap: break-word;
        }

        .giga-message-text p:last-child {
          margin-bottom: 0;
        }

        .giga-typing-indicator {
          display: flex;
          align-items: center;
          padding: 4px 0;
        }

        .giga-typing-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .giga-typing-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #667eea;
          animation: gigaTyping 1.4s ease-in-out infinite;
        }

        .giga-typing-dots span:nth-child(1) { animation-delay: 0s; }
        .giga-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .giga-typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes gigaTyping {
          0%, 60%, 100% {
            transform: scale(0.8);
            opacity: 0.4;
          }
          30% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        .giga-chat-input-area {
          padding: 20px 24px 24px 24px;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .giga-input-container {
          max-width: 100%;
          margin: 0 auto;
        }

        .giga-input-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          padding: 16px 20px;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        .giga-input-wrapper:focus-within {
          border-color: #667eea;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
        }

        .giga-chat-input {
          flex: 1;
          border: none;
          background: transparent;
          resize: none;
          outline: none;
          font-size: 15px;
          line-height: 1.5;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          min-height: 24px;
          max-height: 120px;
          padding: 0;
        }

        .giga-chat-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .giga-send-btn {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .giga-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .giga-send-btn:disabled {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.3);
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @media (max-width: 768px) {
          .giga-chat-overlay {
            padding: 0;
          }

          .giga-chat-container {
            width: 100%;
            height: 100vh;
            border-radius: 0;
            max-width: none;
          }

          .giga-chat-header {
            padding: 16px 20px;
          }

          .giga-chat-messages {
            padding: 16px;
          }

          .giga-message-content {
            max-width: 90%;
          }

          .giga-chat-input-area {
            padding: 16px 20px 20px 20px;
          }
        }

        @media (max-width: 480px) {
          .giga-logo-text {
            font-size: 16px;
          }

          .giga-message-content {
            max-width: 95%;
          }

          .giga-message-bubble {
            padding: 12px 16px;
          }

          .giga-message-text {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}
