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
      text: 'Привет! Я ДЖАРВИС, ваш AI-помощник в мире веб-разработки. Чем могу помочь?',
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>('')

  const chatManager = ChatHistoryManager.getInstance()
  
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
      // Блокируем скролл страницы когда чат открыт
      document.body.style.overflow = 'hidden'
    } else {
      // Возвращаем скролл страницы когда чат закрыт
      document.body.style.overflow = 'unset'
    }

    // Cleanup при размонтировании
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    // Initialize chat sessions on component mount
    const initialSessions = chatManager.getAllSessions()
    setSessions(initialSessions)

    if (initialSessions.length === 0) {
      // Create first session
      const newSession = chatManager.createNewSession()
      setCurrentSessionId(newSession.id)
      setSessions([newSession])
    } else {
      setCurrentSessionId(initialSessions[0].id)
      setMessages(initialSessions[0].messages)
    }
  }, [])

  const createNewChat = () => {
    const newSession = chatManager.createNewSession()
    setCurrentSessionId(newSession.id)
    setMessages(newSession.messages)
    setSessions(chatManager.getAllSessions())
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
    const remainingSessions = chatManager.getAllSessions()
    setSessions(remainingSessions)

    if (sessionId === currentSessionId) {
      if (remainingSessions.length > 0) {
        selectChat(remainingSessions[0].id)
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
      return 'Извините, у меня временные проблемы с подключением. Попробуйте ещ�� раз.'
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
    <div className={`chatgpt-overlay ${isDarkTheme ? 'dark' : ''}`}>
      <div className="chatgpt-container">
        {/* Modern Gradient Background */}
        <div className="chat-bg-gradient">
          <div className="gradient-orb gradient-orb-1"></div>
          <div className="gradient-orb gradient-orb-2"></div>
          <div className="gradient-orb gradient-orb-3"></div>
        </div>

        {/* Enhanced Sidebar */}
        <div className={`chatgpt-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="jarvis-brand">
              <div className="brand-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                </svg>
              </div>
              {!sidebarCollapsed && <span className="brand-text">ДЖАРВИС</span>}
            </div>

            <button className="new-chat-btn" onClick={createNewChat}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
              </svg>
              {!sidebarCollapsed && <span>Новый чат</span>}
            </button>

            <button
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={sidebarCollapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} strokeLinecap="round" strokeLinejoin="round"/>
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
                <div className="chat-item-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
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
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          {!sidebarCollapsed && (
            <div className="sidebar-footer">
              <div className="user-info">
                <div className="user-avatar-footer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="user-details">
                  <div className="user-name">Пользователь</div>
                  <div className="user-status">В сети</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Main Chat */}
        <div className="chatgpt-main">
          <div className="chat-header">
            <div className="chat-info">
              <div className="chat-avatar">
                <div className="jarvis-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <div className="chat-details">
                <h3>ДЖАРВИС AI</h3>
                <div className="ai-status">
                  <div className="status-indicator"></div>
                  <span>Готов к работе</span>
                </div>
              </div>
            </div>
            <div className="header-actions">
              <button className="action-btn settings-btn" title="Настройки">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.2 4.2l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.2-4.2l4.2-4.2"/>
                </svg>
              </button>
              <button className="action-btn close-btn" onClick={onClose} title="Закрыть">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-avatar">
                  {message.isUser ? (
                    <div className="user-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="jarvis-avatar">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-sender">{message.isUser ? 'Вы' : 'ДЖАРВИС'}</span>
                    <span className="message-time">{message.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="message-text">
                    {message.text.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex}>{line}</p>
                    ))}
                  </div>
                  {!message.isUser && (
                    <div className="message-actions">
                      <button className="action-btn copy-btn" title="Копировать">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                        </svg>
                      </button>
                      <button className="action-btn like-btn" title="Нравится">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message ai-message typing-message">
                <div className="message-avatar">
                  <div className="jarvis-avatar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-sender">ДЖАРВИС</span>
                  </div>
                  <div className="typing-indicator">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="typing-text">думает...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <div className="input-wrapper">
              <div className="input-container">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Спросите что-нибудь у ДЖАРВИС..."
                  className="chat-input"
                  rows={1}
                  disabled={isTyping}
                />
                <div className="input-actions">
                  <button className="attachment-btn" title="Прикрепить файл">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66L9.64 16.2a2 2 0 01-2.83-2.83l8.49-8.49"/>
                    </svg>
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="send-btn"
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
      </div>

      <style jsx>{`
        .chatgpt-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1000;
          backdrop-filter: blur(8px);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .chatgpt-overlay.dark {
          background: rgba(0, 0, 0, 0.8);
        }

        .chatgpt-container {
          width: 100%;
          height: 100vh;
          display: flex;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          overflow: hidden;
          position: relative;
        }

        .chatgpt-overlay.dark .chatgpt-container {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }

        .chat-bg-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .gradient-orb-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          top: -150px;
          right: -150px;
          animation-delay: 0s;
        }

        .gradient-orb-2 {
          width: 200px;
          height: 200px;
          background: linear-gradient(45deg, #06b6d4, #3b82f6);
          bottom: -100px;
          left: -100px;
          animation-delay: 2s;
        }

        .gradient-orb-3 {
          width: 150px;
          height: 150px;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(20px, -20px) rotate(120deg); }
          66% { transform: translate(-10px, 10px) rotate(240deg); }
        }

        /* Enhanced Sidebar */
        .chatgpt-sidebar {
          width: 280px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 10;
        }

        .chatgpt-overlay.dark .chatgpt-sidebar {
          background: rgba(15, 23, 42, 0.95);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chatgpt-sidebar.collapsed {
          width: 70px;
        }

        .sidebar-header {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          flex-shrink: 0;
        }

        .chatgpt-overlay.dark .sidebar-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .jarvis-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .brand-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .brand-text {
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.025em;
        }

        .chatgpt-overlay.dark .brand-text {
          color: #f1f5f9;
        }

        .new-chat-btn {
          height: 48px;
          padding: 0 16px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          position: relative;
          overflow: hidden;
        }

        .new-chat-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .new-chat-btn:hover::before {
          left: 100%;
        }

        .chatgpt-sidebar.collapsed .new-chat-btn {
          width: 48px;
          padding: 0;
          margin: 0 auto;
        }

        .chatgpt-sidebar.collapsed .new-chat-btn span {
          display: none;
        }

        .new-chat-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }

        .new-chat-btn svg {
          flex-shrink: 0;
        }

        .sidebar-toggle {
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.05);
          border: none;
          color: #64748b;
          cursor: pointer;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          align-self: flex-end;
        }

        .chatgpt-overlay.dark .sidebar-toggle {
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
        }

        .sidebar-toggle:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #1e293b;
          transform: scale(1.05);
        }

        .chatgpt-overlay.dark .sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
        }

        .chatgpt-sidebar.collapsed .sidebar-toggle {
          position: absolute;
          top: 20px;
          right: 15px;
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .chat-history {
          flex: 1;
          overflow-y: auto;
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .chat-history::-webkit-scrollbar {
          width: 4px;
        }

        .chat-history::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-history::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }

        .chatgpt-overlay.dark .chat-history::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }

        .chat-history::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .chatgpt-overlay.dark .chat-history::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chat-item {
          display: flex;
          align-items: center;
          padding: 12px;
          margin-bottom: 2px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #475569;
          position: relative;
          min-height: 52px;
          gap: 12px;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .chatgpt-overlay.dark .chat-item {
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chat-item:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.2);
          transform: translateX(4px);
        }

        .chat-item.active {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1));
          border-color: rgba(59, 130, 246, 0.3);
          color: #3b82f6;
        }

        .chatgpt-overlay.dark .chat-item.active {
          color: #60a5fa;
        }

        .chatgpt-sidebar.collapsed .chat-item {
          justify-content: center;
          padding: 12px 8px;
          gap: 0;
        }

        .chat-item-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          flex-shrink: 0;
        }

        .chatgpt-overlay.dark .chat-item-icon {
          color: #94a3b8;
        }

        .chat-item.active .chat-item-icon {
          color: #3b82f6;
        }

        .chatgpt-overlay.dark .chat-item.active .chat-item-icon {
          color: #60a5fa;
        }

        .chat-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .chatgpt-sidebar.collapsed .chat-content {
          display: none;
        }

        .chat-title {
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.3;
          color: inherit;
          margin: 0;
        }

        .chat-date {
          font-size: 12px;
          color: #94a3b8;
          line-height: 1;
          margin: 0;
        }

        .chatgpt-overlay.dark .chat-date {
          color: #64748b;
        }

        .delete-chat-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          opacity: 0;
          transition: all 0.2s ease;
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-item:hover .delete-chat-btn {
          opacity: 1;
        }

        .delete-chat-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .chatgpt-sidebar.collapsed .delete-chat-btn {
          display: none;
        }

        .sidebar-footer {
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding: 16px;
          flex-shrink: 0;
        }

        .chatgpt-overlay.dark .sidebar-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .chatgpt-overlay.dark .user-info {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .user-info:hover {
          background: rgba(59, 130, 246, 0.1);
          border-color: rgba(59, 130, 246, 0.2);
        }

        .user-avatar-footer {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #64748b, #475569);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .user-details {
          flex: 1;
          min-width: 0;
        }

        .user-name {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          line-height: 1.3;
        }

        .chatgpt-overlay.dark .user-name {
          color: #f1f5f9;
        }

        .user-status {
          font-size: 12px;
          color: #10b981;
          margin: 0;
          line-height: 1.2;
          font-weight: 500;
        }

        /* Enhanced Main Chat */
        .chatgpt-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
        }

        .chatgpt-overlay.dark .chatgpt-main {
          background: rgba(30, 41, 59, 0.9);
        }

        .chat-header {
          height: 70px;
          padding: 0 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
        }

        .chatgpt-overlay.dark .chat-header {
          background: rgba(15, 23, 42, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .chat-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .chat-avatar {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .jarvis-icon {
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-details h3 {
          margin: 0 0 4px 0;
          font-size: 18px;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.025em;
        }

        .chatgpt-overlay.dark .chat-details h3 {
          color: #f1f5f9;
        }

        .ai-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        .chatgpt-overlay.dark .ai-status {
          color: #94a3b8;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse-status 2s infinite;
        }

        @keyframes pulse-status {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .action-btn {
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.04);
          border: none;
          color: #64748b;
          cursor: pointer;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .chatgpt-overlay.dark .action-btn {
          background: rgba(255, 255, 255, 0.04);
          color: #94a3b8;
        }

        .action-btn:hover {
          background: rgba(0, 0, 0, 0.08);
          color: #1e293b;
          transform: scale(1.05);
        }

        .chatgpt-overlay.dark .action-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #f1f5f9;
        }

        .close-btn:hover {
          background: rgba(239, 68, 68, 0.1) !important;
          color: #ef4444 !important;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          background: transparent;
          padding: 20px;
        }

        .chat-messages::-webkit-scrollbar {
          width: 4px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }

        .chatgpt-overlay.dark .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }

        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .chatgpt-overlay.dark .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .message {
          padding: 20px 0;
          display: flex;
          gap: 16px;
          max-width: 800px;
          margin: 0 auto 24px auto;
          position: relative;
        }

        .message:last-child {
          margin-bottom: 0;
        }

        .message.user-message {
          flex-direction: row-reverse;
        }

        .message.user-message .message-content {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border-radius: 18px 18px 4px 18px;
        }

        .message.ai-message .message-content {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 18px 18px 18px 4px;
        }

        .chatgpt-overlay.dark .message.ai-message .message-content {
          background: rgba(51, 65, 85, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .message-avatar {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .user-avatar {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .jarvis-avatar {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
        }

        .message-content {
          flex: 1;
          min-width: 0;
          padding: 16px 20px;
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .message-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .message-sender {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .message.ai-message .message-sender {
          color: #64748b;
        }

        .chatgpt-overlay.dark .message.ai-message .message-sender {
          color: #94a3b8;
        }

        .message-time {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .message.ai-message .message-time {
          color: #94a3b8;
        }

        .chatgpt-overlay.dark .message.ai-message .message-time {
          color: #64748b;
        }

        .message-text {
          color: inherit;
          line-height: 1.6;
          font-size: 15px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .message.ai-message .message-text {
          color: #1e293b;
        }

        .chatgpt-overlay.dark .message.ai-message .message-text {
          color: #e2e8f0;
        }

        .message-text p {
          margin: 0 0 12px 0;
          word-wrap: break-word;
        }

        .message-text p:last-child {
          margin-bottom: 0;
        }

        .message-text pre {
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 12px;
          overflow-x: auto;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 14px;
          line-height: 1.5;
          margin: 12px 0;
        }

        .chatgpt-overlay.dark .message-text pre {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .message-text code {
          background: rgba(0, 0, 0, 0.08);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 13px;
        }

        .chatgpt-overlay.dark .message-text code {
          background: rgba(255, 255, 255, 0.1);
        }

        .message-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .message:hover .message-actions {
          opacity: 1;
        }

        .message-actions .action-btn {
          width: 32px;
          height: 32px;
          background: rgba(0, 0, 0, 0.05);
          border: none;
          color: #64748b;
          cursor: pointer;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .chatgpt-overlay.dark .message-actions .action-btn {
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
        }

        .message-actions .action-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          transform: scale(1.1);
        }

        .typing-message {
          animation: fadeInUp 0.3s ease;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .typing-dots {
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 8px 12px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 12px;
        }

        .chatgpt-overlay.dark .typing-dots {
          background: rgba(255, 255, 255, 0.05);
        }

        .typing-dots span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #3b82f6;
          animation: typing 1.4s ease-in-out infinite;
        }

        .typing-dots span:nth-child(1) { animation-delay: 0s; }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        .typing-text {
          font-size: 13px;
          color: #64748b;
          font-style: italic;
        }

        .chatgpt-overlay.dark .typing-text {
          color: #94a3b8;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: scale(0.8);
            opacity: 0.4;
          }
          30% {
            transform: scale(1.2);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chat-input-area {
          padding: 24px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .chatgpt-overlay.dark .chat-input-area {
          background: rgba(15, 23, 42, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .input-wrapper {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .input-container {
          display: flex;
          align-items: flex-end;
          gap: 12px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          padding: 16px 20px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(20px);
        }

        .chatgpt-overlay.dark .input-container {
          background: rgba(51, 65, 85, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .input-container:focus-within {
          border-color: #3b82f6;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }

        .chat-input {
          flex: 1;
          border: none;
          background: transparent;
          resize: none;
          outline: none;
          font-size: 15px;
          line-height: 1.5;
          color: #1e293b;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          min-height: 24px;
          max-height: 120px;
          padding: 0;
        }

        .chatgpt-overlay.dark .chat-input {
          color: #e2e8f0;
        }

        .chat-input::placeholder {
          color: #94a3b8;
        }

        .chatgpt-overlay.dark .chat-input::placeholder {
          color: #64748b;
        }

        .input-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .attachment-btn {
          width: 36px;
          height: 36px;
          background: rgba(0, 0, 0, 0.04);
          border: none;
          color: #64748b;
          cursor: pointer;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .chatgpt-overlay.dark .attachment-btn {
          background: rgba(255, 255, 255, 0.04);
          color: #94a3b8;
        }

        .attachment-btn:hover {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          transform: scale(1.05);
        }

        .send-btn {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .send-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .send-btn:disabled {
          background: #e2e8f0;
          color: #94a3b8;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .chatgpt-overlay.dark .send-btn:disabled {
          background: #334155;
          color: #64748b;
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
