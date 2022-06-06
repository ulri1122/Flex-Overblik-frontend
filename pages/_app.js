import '../styles/globals.css'
import Sidebar from '../components/sidebar'
import '@fortawesome/fontawesome-svg-core/styles.css' // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import Head from 'next/head'
import { useEffect, useState } from 'react'
import GlobalContext from '../context/global-context'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    userToken: '',
    update,
  })
  function update(data) {
    setState(Object.assign({}, state, data))
  }
  useEffect(() => {
    update({
      userToken: localStorage.getItem('token'),
    })
  }, [])
  return (
    <GlobalContext.Provider value={state}>
      <ToastContainer />

      <div className="flex min-h-screen flex-row text-[#111520]">
        <div className="shrink">
          <div className="w-10 shrink md:w-40"></div>
          <Sidebar />
        </div>
        <div className="w-full grow">
          <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
              <title>Create Next App</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex w-full flex-1 flex-col px-20 ">
              <Component {...pageProps} />
            </main>

            <footer className="flex h-24 w-full items-center justify-center border-t"></footer>
          </div>
        </div>
        <div className="  shrink  2xl:w-40"></div>
      </div>
    </GlobalContext.Provider>
  )
}

export default MyApp
