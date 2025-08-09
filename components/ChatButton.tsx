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
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
