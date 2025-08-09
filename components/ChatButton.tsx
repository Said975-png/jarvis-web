import { useState } from 'react'

interface ChatButtonProps {
  onClick: () => void
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="chat-button-container">
      <button
        className="chat-button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="chat-button-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="8" cy="16" r="2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="16" cy="16" r="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 10v2" stroke="currentColor" strokeWidth="2"/>
            <path d="M10 16h4" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 14l4-2" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 14l-4-2" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        
        {isHovered && (
          <div className="chat-button-tooltip">
            Чат с ДЖАРВИС
          </div>
        )}
        
        <div className="chat-button-pulse"></div>
      </button>
    </div>
  )
}
