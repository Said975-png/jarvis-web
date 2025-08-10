import { useState, useRef, useEffect } from 'react'
import { ChatHistoryManager, ChatSession, Message } from '../lib/chatHistory'

interface ChatGPTProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatGPT({ isOpen, onClose }: ChatGPTProps) {
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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
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
      return 'Извините, у меня временные проблемы с подключением. Попробуйте еще раз.'
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
      
      chatManager.updateSession(currentSessionId, finalMessages)
      setSessions(chatManager.getAllSessions())
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
    <div className="chatgpt-overlay">
      <div className="chatgpt-container">
        {/* Sidebar */}
        <div className={`chatgpt-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <button className="new-chat-btn" onClick={createNewChat}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {!sidebarCollapsed && <span>Новый чат</span>}
            </button>
            
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d={sidebarCollapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                <div className="chat-content">
                  <div className="chat-title">{session.title}</div>
                  {!sidebarCollapsed && (
                    <div className="chat-date">{formatDate(session.updatedAt)}</div>
                  )}
                </div>
                {!sidebarCollapsed && (
                  <button 
                    className="delete-chat-btn"
                    onClick={(e) => deleteChat(session.id, e)}
                    title="Удалить чат"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat */}
        <div className="chatgpt-main">
          <div className="chat-header">
            <div className="chat-info">
              <div className="chat-avatar">
                <img src="https://cdn.builder.io/api/v1/image/assets%2Ff21efa9d331c44c6b55bad01cab8169b%2F342e3ad8cb1542ae9b5155023da06c0d?format=webp&width=800" alt="JARVIS" />
              </div>
              <div className="chat-details">
                <h3>ДЖАРВИС</h3>
                <span>AI-помощник по веб-разработке</span>
              </div>
            </div>
            <button className="close-btn" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-avatar">
                  {message.isUser ? (
                    <div className="user-avatar">У</div>
                  ) : (
                    <img src="https://cdn.builder.io/api/v1/image/assets%2Ff21efa9d331c44c6b55bad01cab8169b%2F342e3ad8cb1542ae9b5155023da06c0d?format=webp&width=800" alt="JARVIS" />
                  )}
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {message.text.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message ai-message">
                <div className="message-avatar">
                  <img src="https://cdn.builder.io/api/v1/image/assets%2Ff21efa9d331c44c6b55bad01cab8169b%2F342e3ad8cb1542ae9b5155023da06c0d?format=webp&width=800" alt="JARVIS" />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
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

          <div className="chat-input-area">
            <div className="input-wrapper">
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                className="chat-input"
                rows={1}
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="send-btn"
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
        .chatgpt-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .chatgpt-container {
          width: 100%;
          height: 100vh;
          display: flex;
          background: #f7f7f8;
        }

        /* Sidebar */
        .chatgpt-sidebar {
          width: 260px;
          background: #171717;
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
        }

        .chatgpt-sidebar.collapsed {
          width: 60px;
        }

        .sidebar-header {
          padding: 8px;
          display: flex;
          gap: 8px;
          border-bottom: 1px solid #2d2d2d;
        }

        .new-chat-btn {
          flex: 1;
          height: 44px;
          padding: 0 12px;
          background: transparent;
          color: #fff;
          border: 1px solid #565869;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background-color 0.2s;
        }

        .new-chat-btn:hover {
          background: #2d2d2d;
        }

        .sidebar-toggle {
          width: 44px;
          height: 44px;
          background: transparent;
          border: none;
          color: #8e8ea0;
          cursor: pointer;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }

        .sidebar-toggle:hover {
          background: #2d2d2d;
          color: #fff;
        }

        .chat-history {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
        }

        .chat-item {
          display: flex;
          align-items: center;
          padding: 12px;
          margin-bottom: 2px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s;
          color: #ececf1;
          position: relative;
        }

        .chat-item:hover {
          background: #2d2d2d;
        }

        .chat-item.active {
          background: #343541;
        }

        .chat-content {
          flex: 1;
          min-width: 0;
        }

        .chat-title {
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.4;
        }

        .chat-date {
          font-size: 12px;
          color: #8e8ea0;
          margin-top: 2px;
        }

        .delete-chat-btn {
          background: none;
          border: none;
          color: #8e8ea0;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          opacity: 0;
          transition: all 0.2s;
        }

        .chat-item:hover .delete-chat-btn {
          opacity: 1;
        }

        .delete-chat-btn:hover {
          background: #565869;
          color: #fff;
        }

        /* Main Chat */
        .chatgpt-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #fff;
        }

        .chat-header {
          height: 60px;
          padding: 0 24px;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
        }

        .chat-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chat-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
        }

        .chat-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .chat-details h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #374151;
        }

        .chat-details span {
          font-size: 12px;
          color: #6b7280;
        }

        .close-btn {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          background: #fff;
        }

        .message {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          max-width: 100%;
          width: 100%;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }

        .message-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: #10a37f;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .message-content {
          flex: 1;
          min-width: 0;
        }

        .message-text {
          color: #374151;
          line-height: 1.6;
        }

        .message-text p {
          margin: 0 0 12px 0;
        }

        .message-text p:last-child {
          margin-bottom: 0;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          color: #6b7280;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
        }

        .typing-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6b7280;
          animation: typing 1.4s ease-in-out infinite;
        }

        .typing-dots span:nth-child(1) { animation-delay: 0s; }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
          0%, 60%, 100% { 
            transform: translateY(0);
            opacity: 0.4;
          }
          30% { 
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        .chat-input-area {
          padding: 24px;
          background: #fff;
          border-top: 1px solid #e5e5e5;
        }

        .input-wrapper {
          max-width: 768px;
          margin: 0 auto;
          position: relative;
          display: flex;
          align-items: flex-end;
          gap: 12px;
          background: #f9fafb;
          border: 1px solid #d1d5db;
          border-radius: 12px;
          padding: 12px 16px;
          transition: all 0.2s;
        }

        .input-wrapper:focus-within {
          border-color: #10a37f;
          box-shadow: 0 0 0 1px #10a37f;
        }

        .chat-input {
          flex: 1;
          border: none;
          background: transparent;
          resize: none;
          outline: none;
          font-size: 16px;
          line-height: 1.5;
          color: #374151;
          font-family: inherit;
          min-height: 24px;
          max-height: 200px;
        }

        .chat-input::placeholder {
          color: #9ca3af;
        }

        .send-btn {
          width: 32px;
          height: 32px;
          background: #10a37f;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
          flex-shrink: 0;
        }

        .send-btn:hover:not(:disabled) {
          background: #0d8f6f;
        }

        .send-btn:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .chatgpt-sidebar {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            z-index: 10;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .chatgpt-sidebar.open {
            transform: translateX(0);
          }

          .chatgpt-main {
            width: 100%;
          }

          .chat-messages {
            padding: 16px;
          }

          .chat-input-area {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  )
}
