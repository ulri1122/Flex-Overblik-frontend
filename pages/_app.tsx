import '../styles/globals.css'
import Sidebar from '../components/sidebar'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-row text-[#111520]">
      <div className="shrink">
        <div className="w-10 shrink md:w-40"></div>
        <Sidebar />
      </div>
      <div className="w-full grow">
        <Component {...pageProps} />
      </div>
      <div className="  shrink  2xl:w-40"></div>
    </div>
  )
}

export default MyApp
