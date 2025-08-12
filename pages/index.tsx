import { useState, useEffect } from 'react'
import Head from 'next/head'
import SearchableNavbar from '../components/SearchableNavbar'
import Hero from '../components/Hero'
import Pricing from '../components/Pricing'
import Features from '../components/Features'
import Benefits from '../components/Benefits'
import ChatManager from '../components/ChatManager'
import Footer from '../components/Footer'
import ShineEffect from '../components/ShineEffect'
import LoadingAnimation from '../components/LoadingAnimation'
import OpenRouterTester from '../components/OpenRouterTester'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Минимальное время загрузки для красивой анимации
    const minLoadingTime = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(minLoadingTime)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingAnimation onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <>
      <Head>
        <title>JARVIS - AI-Powered Web Development</title>
        <meta name="description" content="JARVIS creates stunning websites using artificial intelligence and cutting-edge technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Глобальный фон с клеточками */}
      <div className="global-background">
        <div className="global-grid-pattern"></div>
        <div className="global-orb global-orb-1"></div>
        <div className="global-orb global-orb-2"></div>
      </div>

      {/* Эффект сияния как ChatGPT */}
      <ShineEffect />

      <SearchableNavbar />

      <main>
        <Hero />
        <Pricing />
        <Features />
        <Benefits />
        <OpenRouterTester />
      </main>

      <Footer />
      <ChatManager />
    </>
  )
}
