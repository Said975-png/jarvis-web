import { useState, useRef, useEffect } from 'react'
import { ChatHistoryManager, ChatSession, Message } from '../lib/chatHistory'

interface JarvisChatProps {
  isOpen: boolean
  onClose: () => void
}

export default function JarvisChatEnhanced({ isOpen, onClose }: JarvisChatProps) {
  const [chatManager] = useState(() => ChatHistoryManager.getInstance())
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
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
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputText])

  useEffect(() => {
    if (isOpen) {
      loadChatHistory()
    }
  }, [isOpen])

  const loadChatHistory = () => {
    const allSessions = chatManager.getAllSessions()
    setSessions(allSessions)
    
    if (allSessions.length > 0) {
      const latestSession = allSessions[0]
      setCurrentSessionId(latestSession.id)
      setMessages(latestSession.messages)
    } else {
      createNewChat()
    }
  }

  const createNewChat = () => {
    const newSession = chatManager.createNewSession()
    setSessions(chatManager.getAllSessions())
    setCurrentSessionId(newSession.id)
    setMessages(newSession.messages)
  }

  const selectChat = (sessionId: string) => {
    const session = chatManager.getSession(sessionId)
    if (session) {
      setCurrentSessionId(sessionId)
      setMessages(session.messages)
    }
  }

  const deleteChat = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    chatManager.deleteSession(sessionId)
    const updatedSessions = chatManager.getAllSessions()
    setSessions(updatedSessions)
    
    if (sessionId === currentSessionId) {
      if (updatedSessions.length > 0) {
        const nextSession = updatedSessions[0]
        setCurrentSessionId(nextSession.id)
        setMessages(nextSession.messages)
      } else {
        createNewChat()
      }
    }
  }

  const generateJarvisResponse = async (userMessage: string, conversationHistory: Message[]): Promise<string> => {
    try {
      const apiMessages = conversationHistory
        .filter(msg => msg.text !== 'Привет! Я ДЖАРВИС, ваш AI-помощник в мире веб-разработки. Чем могу помочь?')
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
      
      const fallbackResponses = [
        'Извините, у меня временные проблемы с подключением к AI-серверу. Попробуйте еще раз через несколько секунд.',
        'Сейчас испытываю технические трудности, но я ДЖАРВИС и готов помочь! Попробуйте переформулировать вопрос.',
        'Произошла ошибка связи, но не волнуйтесь - я здесь. Напишите мне в Telegram @jarvis_ai_dev для прямой связи.',
      ]
      
      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
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
      
      // Update session in storage
      chatManager.updateSession(currentSessionId, finalMessages)
      setSessions(chatManager.getAllSessions())
    } catch (error) {
      console.error('Error generating AI response:', error)
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Извините, произошла ошибка. Попробуйте еще раз или напишите мне в Telegram @jarvis_ai_dev',
        isUser: false,
        timestamp: new Date()
      }
      
      const finalMessages = [...updatedMessages, errorResponse]
      setMessages(finalMessages)
      chatManager.updateSession(currentSessionId, finalMessages)
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

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Сегодня'
    if (diffDays === 1) return 'Вчера'
    if (diffDays < 7) return `${diffDays} дн. назад`
    return date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })
  }

  if (!isOpen) return null

  return (
    <div className="jarvis-chat-overlay">
      <div className="jarvis-chat-container">
        {/* Sidebar */}
        <div className={`jarvis-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <button 
              className="new-chat-btn"
              onClick={createNewChat}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {!sidebarCollapsed && 'Новый чат'}
            </button>
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div className="chat-history">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`chat-item ${session.id === currentSessionId ? 'active' : ''}`}
                onClick={() => selectChat(session.id)}
              >
                <div className="chat-title">
                  {!sidebarCollapsed && session.title}
                </div>
                {!sidebarCollapsed && (
                  <>
                    <div className="chat-date">
                      {formatDate(session.updatedAt)}
                    </div>
                    <button 
                      className="delete-chat-btn"
                      onClick={(e) => deleteChat(session.id, e)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="jarvis-main-chat">
          {/* Header */}
          <div className="jarvis-chat-header">
            <div className="jarvis-chat-title">
              <div className="jarvis-avatar">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff21efa9d331c44c6b55bad01cab8169b%2F342e3ad8cb1542ae9b5155023da06c0d?format=webp&width=800"
                  alt="JARVIS"
                  width="20"
                  height="20"
                />
              </div>
              <div>
                <h3>ДЖАРВИС</h3>
                <div className="status-indicator">
                  <div className="status-dot"></div>
                  В сети
                </div>
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
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2Ff21efa9d331c44c6b55bad01cab8169b%2F342e3ad8cb1542ae9b5155023da06c0d?format=webp&width=800"
                      alt="JARVIS"
                      width="20"
                      height="20"
                    />
                  </div>
                )}
                <div className="message-content">
                  <div className="message-bubble">
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
              <div className="message ai-message">
                <div className="message-avatar">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Ff21efa9d331c44c6b55bad01cab8169b%2F342e3ad8cb1542ae9b5155023da06c0d?format=webp&width=800"
                    alt="JARVIS"
                    width="16"
                    height="16"
                  />
                </div>
                <div className="message-content">
                  <div className="message-bubble typing-indicator">
                    <div className="typing-content-wrapper">
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span className="typing-text">печатает</span>
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
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                className="jarvis-textarea"
                rows={1}
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="jarvis-send-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .jarvis-chat-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .jarvis-chat-container {
          width: 100%;
          height: 100vh;
          background: #ffffff;
          display: flex;
          overflow: hidden;
        }

        /* Sidebar Styles */
        .jarvis-sidebar {
          width: 280px;
          background: #f8f9fa;
          border-right: 1px solid #e5e5e5;
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
        }

        .jarvis-sidebar.collapsed {
          width: 60px;
        }

        .sidebar-header {
          padding: 16px;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .new-chat-btn {
          flex: 1;
          padding: 12px;
          background: #000000;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .new-chat-btn:hover {
          background: #333333;
        }

        .sidebar-toggle {
          padding: 8px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 6px;
          color: #666666;
          transition: all 0.2s ease;
        }

        .sidebar-toggle:hover {
          background: #e5e5e5;
          color: #000000;
        }

        .chat-history {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
        }

        .chat-history::-webkit-scrollbar {
          width: 6px;
        }

        .chat-history::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-history::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .chat-item {
          padding: 12px;
          margin-bottom: 4px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
        }

        .chat-item:hover {
          background: #e5e5e5;
        }

        .chat-item.active {
          background: #000000;
          color: #ffffff;
        }

        .chat-title {
          font-size: 14px;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .chat-date {
          font-size: 12px;
          opacity: 0.7;
        }

        .delete-chat-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0;
          padding: 4px;
          border-radius: 4px;
          color: currentColor;
          transition: all 0.2s ease;
        }

        .chat-item:hover .delete-chat-btn {
          opacity: 1;
        }

        .delete-chat-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Main Chat Styles */
        .jarvis-main-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .jarvis-chat-header {
          padding: 16px 20px;
          background: #ffffff;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .jarvis-chat-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .jarvis-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .jarvis-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .jarvis-chat-title h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px 0;
          color: #000000;
        }

        .status-indicator {
          font-size: 12px;
          color: #666666;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
        }

        .jarvis-close-btn {
          background: none;
          border: none;
          color: #666666;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .jarvis-close-btn:hover {
          background: #f5f5f5;
          color: #000000;
        }

        .jarvis-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #ffffff;
        }

        .jarvis-messages::-webkit-scrollbar {
          width: 6px;
        }

        .jarvis-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .jarvis-messages::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .message {
          display: flex;
          gap: 8px;
          align-items: flex-start;
          max-width: 80%;
        }

        .user-message {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .ai-message {
          align-self: flex-start;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }

        .message-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .message-content {
          display: flex;
          flex-direction: column;
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.5;
          word-wrap: break-word;
        }

        .user-message .message-bubble {
          background: #000000;
          color: #ffffff;
          border-bottom-right-radius: 4px;
        }

        .ai-message .message-bubble {
          background: #f5f5f5;
          color: #000000;
          border-bottom-left-radius: 4px;
        }

        .typing-indicator {
          background: #f5f5f5 !important;
          color: #000000 !important;
        }

        .typing-content-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .typing-text {
          font-size: 12px;
          color: #999999;
          font-style: italic;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #999999;
          animation: typingBounce 1.4s ease-in-out infinite;
        }

        .typing-dots span:nth-child(1) { animation-delay: 0s; }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

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

        .jarvis-input-area {
          padding: 20px;
          background: #ffffff;
          border-top: 1px solid #e5e5e5;
        }

        .jarvis-input-container {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 24px;
          padding: 12px 16px;
          transition: all 0.2s ease;
        }

        .jarvis-input-container:focus-within {
          border-color: #000000;
          box-shadow: 0 0 0 1px #000000;
        }

        .jarvis-textarea {
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

        .jarvis-textarea::placeholder {
          color: #999999;
        }

        .jarvis-textarea:disabled {
          color: #999999;
        }

        .jarvis-send-btn {
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

        .jarvis-send-btn:hover:not(:disabled) {
          background: #333333;
        }

        .jarvis-send-btn:disabled {
          background: #e5e5e5;
          color: #999999;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .jarvis-sidebar {
            width: 260px;
          }

          .jarvis-sidebar.collapsed {
            width: 50px;
          }

          .jarvis-chat-header {
            padding: 12px 16px;
          }

          .jarvis-messages {
            padding: 16px;
          }

          .jarvis-input-area {
            padding: 16px;
          }

          .message {
            max-width: 85%;
          }
        }

        @media (max-width: 480px) {
          .jarvis-chat-container {
            flex-direction: column;
          }

          .jarvis-sidebar {
            width: 100%;
            height: auto;
            max-height: 40vh;
            border-right: none;
            border-bottom: 1px solid #e5e5e5;
          }

          .jarvis-sidebar.collapsed {
            height: 60px;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
