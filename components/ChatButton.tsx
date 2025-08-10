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
      <div className="chat-button-container">
        <button
          className="chat-button"
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="chat-button-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {isHovered && (
            <div className="chat-button-tooltip">
              Чат с ДЖАРВИС
            </div>
          )}
        </button>
      </div>

      <style jsx>{`
        .chat-button-container {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 999;
        }

        .chat-button {
          position: relative;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border: none;
          border-radius: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .chat-button-container.dark .chat-button {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4);
        }

        .chat-button:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.6);
        }

        .chat-button-container.dark .chat-button:hover {
          box-shadow: 0 12px 40px rgba(139, 92, 246, 0.6);
        }

        .chat-button-bg-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .chat-button-icon {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: sparkle 3s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }

        .chat-button-tooltip {
          position: absolute;
          bottom: 75px;
          right: 0;
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          color: #ffffff;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          animation: fadeInUp 0.3s ease;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chat-button-container.dark .chat-button-tooltip {
          background: rgba(255, 255, 255, 0.95);
          color: #1e293b;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .tooltip-arrow {
          position: absolute;
          top: 100%;
          right: 20px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid rgba(15, 23, 42, 0.95);
        }

        .chat-button-container.dark .tooltip-arrow {
          border-top-color: rgba(255, 255, 255, 0.95);
        }

        .chat-button-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          animation: pulse 3s infinite;
        }

        .chat-button-container.dark .chat-button-pulse {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        @keyframes fadeInUp {
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
            transform: scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .chat-button-container {
            bottom: 24px;
            right: 24px;
          }

          .chat-button {
            width: 56px;
            height: 56px;
            border-radius: 14px;
          }

          .chat-button-pulse {
            border-radius: 14px;
          }

          .chat-button-tooltip {
            bottom: 70px;
            font-size: 13px;
            padding: 10px 14px;
          }
        }

        @media (max-width: 480px) {
          .chat-button-container {
            bottom: 20px;
            right: 20px;
          }

          .chat-button {
            width: 52px;
            height: 52px;
            border-radius: 12px;
          }

          .chat-button-pulse {
            border-radius: 12px;
          }
        }
      `}</style>
    </>
  )
}
