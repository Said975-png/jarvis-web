import { useState } from 'react'
import ChatButton from './ChatButton'
import JarvisChatEnhanced from './JarvisChatEnhanced'

export default function ChatManager() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openChat = () => setIsChatOpen(true)
  const closeChat = () => setIsChatOpen(false)

  return (
    <>
      <ChatButton onClick={openChat} />
      <JarvisChatEnhanced isOpen={isChatOpen} onClose={closeChat} />
    </>
  )
}
