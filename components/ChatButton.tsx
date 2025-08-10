import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

interface ChatButtonProps {
  onClick: () => void
}

export default function ChatButton({ onClick }: ChatButtonProps) {
  const { isDarkTheme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <>
      <div className={`chat-button-container ${isDarkTheme ? 'dark' : ''}`}>
        <button
          className="chat-button"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="chat-button-bg-effect"></div>
          <div className="chat-button-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
            </svg>
          </div>

          {isHovered && (
            <div className="chat-button-tooltip">
              <span>Чат с ДЖАРВИС</span>
              <div className="tooltip-arrow"></div>
            </div>
          )}

          <div className="chat-button-pulse"></div>
        </button>
      </div>

      <style jsx>{`
        .chat-button-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
        }

        .chat-button {
          position: relative;
          width: 64px;
          height: 64px;
          background: #000000;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .chat-button:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
        }

        .chat-button-icon {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-button-tooltip {
          position: absolute;
          bottom: 80px;
          right: 0;
          background: rgba(0, 0, 0, 0.9);
          color: #ffffff;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          white-space: nowrap;
          animation: fadeIn 0.3s ease;
        }

        .chat-button-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          right: 20px;
          border: 6px solid transparent;
          border-top-color: rgba(0, 0, 0, 0.9);
        }

        .chat-button-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #000000;
          animation: pulse 2s infinite;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .chat-button-container {
            bottom: 20px;
            right: 20px;
          }

          .chat-button {
            width: 56px;
            height: 56px;
          }

          .chat-button-tooltip {
            bottom: 70px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  )
}
