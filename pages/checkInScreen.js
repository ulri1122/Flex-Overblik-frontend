import Image from 'next/image'
import Logo from '../assets/images/flexoverblik.png'
import { useRouter } from 'next/router'
import { useState } from 'react'
import axiosToken from '../src/lib/backendAPI'

function checkInScreen() {
  const [cardID, setCardID] = useState('')
  const router = useRouter()
  const handlingSearch = (e) => {
    e.preventDefault()
    router.push(`/checkInScreen/${cardID}`)
  }

  return (
    <div className="grid grid-cols-1">
      <div className="flex justify-center">
        <Image src={Logo} alt="Flex overblik" />
      </div>
      <div className="flex justify-center">
        <div className="pt-56">
          <form
            className="flex flex-col"
            method="POST"
            onSubmit={(e) => handlingSearch(e)}
          >
            <input
              className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Scan Kort"
              type="text"
              name="search"
              onChange={(e) => setCardID(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default checkInScreen
