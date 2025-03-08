import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans, Montserrat } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['400', '700'], 
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '700'],
})

export const metadata = {
  title: 'Your App',
  description: 'Your description',
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${openSans.variable} ${montserrat.variable}`}>
      <Component {...pageProps} />
    </div>
  )
}
