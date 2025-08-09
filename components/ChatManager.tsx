import { useState } from 'react'
import ChatButton from './ChatButton'
import JarvisChat from './JarvisChat'

export default function ChatManager() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openChat = () => setIsChatOpen(true)
  const closeChat = () => setIsChatOpen(false)

  return (
    <>
      <ChatButton onClick={openChat} />
      <JarvisChat isOpen={isChatOpen} onClose={closeChat} />
    </>
  )
}
