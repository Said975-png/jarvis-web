import Head from 'next/head'
import Hero from '../components/Hero'

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
      </main>
    </>
  )
}
