import Head from 'next/head'
import Hero from '../components/Hero'
import Pricing from '../components/Pricing'
import Features from '../components/Features'
import Benefits from '../components/Benefits'

export default function Home() {
  return (
    <>
      <Head>
        <title>JARVIS - AI-Powered Web Development</title>
        <meta name="description" content="JARVIS creates stunning websites using artificial intelligence and cutting-edge technology" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Pricing />
        <Features />
        <Benefits />
      </main>
    </>
  )
}
