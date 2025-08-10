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
    <div className="chatgpt-overlay">
      <div className="chatgpt-container">
        {/* Classic ChatGPT Style Sidebar */}
        <div className={`chatgpt-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <button className="new-chat-btn" onClick={createNewChat}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
              </svg>
              {!sidebarCollapsed && <span>Новый чат</span>}
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
                {!sidebarCollapsed && (
                  <div className="chat-content">
                    <div className="chat-title">{session.title}</div>
                  </div>
                )}
                {!sidebarCollapsed && (
                  <button
                    className="delete-chat-btn"
                    onClick={(e) => deleteChat(session.id, e)}
                    title="Удалить чат"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="sidebar-toggle-wrapper">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={sidebarCollapsed ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Classic ChatGPT Main Chat */}
        <div className="chatgpt-main">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`message ${message.isUser ? 'user-message' : 'ai-message'}`}
              >
                <div className="message-wrapper">
                  <div className="message-avatar">
                    {message.isUser ? (
                      <div className="user-avatar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="ai-avatar">
                        <svg width="20" height="20" viewBox="0 0 41 41" fill="none">
                          <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-text">
                      {message.text.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex}>{line}</p>
                      ))}
                    </div>
                    {!message.isUser && (
                      <div className="message-actions">
                        <button className="action-btn copy-btn" title="Копировать">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                          </svg>
                        </button>
                        <button className="action-btn thumbs-up-btn" title="Хорошо">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
                          </svg>
                        </button>
                        <button className="action-btn thumbs-down-btn" title="Плохо">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message ai-message">
                <div className="message-wrapper">
                  <div className="message-avatar">
                    <div className="ai-avatar">
                      <svg width="20" height="20" viewBox="0 0 41 41" fill="none">
                        <path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor"/>
                      </svg>
                    </div>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                </svg>
              </button>
            </div>
            <div className="input-footer">
              <p>ChatGPT может совершать ошибки. Проверяйте важную информацию.</p>
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
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          backdrop-filter: blur(4px);
          overflow: hidden;
        }

        .chatgpt-container {
          width: 100%;
          height: 100vh;
          display: flex;
          background: #ffffff;
          overflow: hidden;
        }

        /* ChatGPT Style Sidebar */
        .chatgpt-sidebar {
          width: 260px;
          background: #171717;
          display: flex;
          flex-direction: column;
          transition: width 0.3s ease;
          border-right: 1px solid #2f2f2f;
        }

        .chatgpt-sidebar.collapsed {
          width: 60px;
        }

        .sidebar-header {
          padding: 8px;
          flex-shrink: 0;
        }

        .new-chat-btn {
          height: 44px;
          padding: 0 12px;
          background: transparent;
          color: #ffffff;
          border: 1px solid #4d4d4f;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          transition: all 0.2s ease;
          margin-bottom: 8px;
        }

        .new-chat-btn:hover {
          background: #40414f;
          border-color: #565869;
        }

        .chatgpt-sidebar.collapsed .new-chat-btn {
          width: 44px;
          padding: 0;
          justify-content: center;
        }

        .chatgpt-sidebar.collapsed .new-chat-btn span {
          display: none;
        }

        .new-chat-btn svg {
          flex-shrink: 0;
        }

        .sidebar-toggle-wrapper {
          position: absolute;
          bottom: 8px;
          left: 8px;
          right: 8px;
        }

        .sidebar-toggle {
          width: 100%;
          height: 44px;
          background: transparent;
          border: 1px solid #4d4d4f;
          color: #c5c5d2;
          cursor: pointer;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .sidebar-toggle:hover {
          background: #40414f;
          color: #fff;
        }

        .chatgpt-sidebar.collapsed .sidebar-toggle-wrapper {
          position: absolute;
          bottom: 8px;
          left: 8px;
          right: 8px;
        }

        .chatgpt-sidebar.collapsed .sidebar-toggle {
          width: 44px;
          height: 44px;
        }

        .chat-history {
          flex: 1;
          overflow-y: auto;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 60px;
        }

        .chat-history::-webkit-scrollbar {
          width: 8px;
        }

        .chat-history::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-history::-webkit-scrollbar-thumb {
          background: #4d4d4f;
          border-radius: 4px;
        }

        .chat-history::-webkit-scrollbar-thumb:hover {
          background: #565869;
        }

        .chat-item {
          display: flex;
          align-items: center;
          padding: 12px;
          margin-bottom: 0;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.15s ease;
          color: #ececf1;
          position: relative;
          min-height: 44px;
          gap: 8px;
        }

        .chat-item:hover {
          background: #40414f;
        }

        .chat-item.active {
          background: #343541;
        }

        .chatgpt-sidebar.collapsed .chat-item {
          justify-content: center;
          padding: 8px;
          gap: 0;
        }

        .chat-item-icon {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ececf1;
          flex-shrink: 0;
        }

        .chatgpt-sidebar.collapsed .chat-item-icon {
          width: 20px;
          height: 20px;
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
            z-index: 20;
            width: 300px;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
          }

          .chatgpt-sidebar.open {
            transform: translateX(0);
          }

          .chatgpt-main {
            width: 100%;
          }

          .chat-header {
            padding: 0 20px;
            height: 60px;
          }

          .chat-info {
            gap: 12px;
          }

          .chat-avatar {
            width: 36px;
            height: 36px;
          }

          .chat-details h3 {
            font-size: 16px;
          }

          .message {
            max-width: 100%;
            padding: 16px 0;
            margin-bottom: 16px;
          }

          .message-content {
            padding: 12px 16px;
          }

          .message-text {
            font-size: 14px;
            line-height: 1.5;
          }

          .chat-messages {
            padding: 16px;
          }

          .chat-input-area {
            padding: 16px;
          }

          .input-container {
            padding: 12px 16px;
            border-radius: 14px;
          }

          .chat-input {
            font-size: 16px; /* Prevent zoom on iOS */
          }

          .send-btn, .attachment-btn {
            width: 32px;
            height: 32px;
          }

          .gradient-orb {
            display: none; /* Hide decorative elements on mobile */
          }
        }

        @media (max-width: 480px) {
          .chatgpt-sidebar {
            width: 280px;
          }

          .sidebar-header {
            padding: 16px;
          }

          .chat-messages {
            padding: 12px;
          }

          .chat-input-area {
            padding: 12px;
          }

          .message {
            gap: 12px;
          }

          .message-avatar {
            width: 32px;
            height: 32px;
          }

          .message-content {
            padding: 10px 14px;
          }
        }
      `}</style>
    </div>
  )
}
