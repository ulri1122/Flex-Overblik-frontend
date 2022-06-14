import Link from 'next/link'
import HomeIcon from '../assets/images/icons/home'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faWrench,
  faArrowRightFromBracket,
  faUserPlus,
  faHouse,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axiosToken from '../src/lib/backendAPI'

import { useContext } from 'react'
import GlobalContext from '../context/global-context'

export default function Sidebar() {
  var globalToken = useContext(GlobalContext)

  const superUserMode = () => {
    let user_id = prompt('please_enter_a_valid_user_id')

    if (user_id == null || user_id == '') {
      return
    }
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + 'tokens/create', {
        user_id: user_id,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        globalToken.update({
          userToken: res.data.token,
        })
        toast('you are now super user.')
      })
      .catch((err) => {
        toast('Wow so error!')
      })
  }
  const removeSuperUserMode = () => {
    axiosToken
      .get(process.env.NEXT_PUBLIC_API_URL + 'tokens/revoke')
      .then((res) => {
        localStorage.removeItem('token')
        globalToken.update({
          userToken: '',
        })
        toast('you are no longer super user')
      })
      .catch((err) => {
        localStorage.removeItem('token')
        globalToken.update({
          userToken: '',
        })
        toast('Wow so error!')
      })
  }

  return (
    <div className="grid grid-cols-1">
      <div className="fixed min-h-screen w-10 bg-secondary pt-4 md:w-40">
        {globalToken.userToken ? (
          <div className="grid grid-cols-1 gap-2">
            <Link href="/">
              <a className="rounded text-center text-sm transition duration-300 ease-in-out hover:bg-Hower ">
                <FontAwesomeIcon
                  style={{
                    fontSize: 100,
                    color: 'white',
                    height: 60,
                    width: 50,
                  }}
                  icon={faHouse}
                />
              </a>
            </Link>
            <Link href="/settings/addUser/0">
              <button className=" rounded text-center text-sm transition duration-300 ease-in-out hover:bg-Hower hover:text-gray-900  ">
                <a>
                  <FontAwesomeIcon
                    style={{
                      fontSize: 100,
                      color: 'white',
                      height: 60,
                      width: 50,
                    }}
                    icon={faUserPlus}
                  />
                </a>
              </button>
            </Link>
            <button
              className=" rounded text-center text-sm transition duration-300 ease-in-out hover:bg-Hower hover:text-gray-900 "
              onClick={() => removeSuperUserMode()}
            >
              <a>
                <FontAwesomeIcon
                  style={{
                    fontSize: 100,
                    color: 'white',
                    height: 60,
                    width: 50,
                  }}
                  icon={faArrowRightFromBracket}
                />
              </a>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <Link href="/">
              <a className="rounded text-center text-sm transition duration-300 ease-in-out hover:bg-Hower ">
                <FontAwesomeIcon
                  style={{
                    fontSize: 100,
                    color: 'white',
                    height: 60,
                    width: 50,
                  }}
                  icon={faHouse}
                />
              </a>
            </Link>
            <button
              className="rounded text-center text-sm transition  duration-300 ease-in-out hover:bg-Hower hover:text-gray-900  "
              onClick={() => superUserMode()}
            >
              <a>
                <FontAwesomeIcon
                  style={{
                    fontSize: 100,
                    color: 'white',
                    height: 60,
                    width: 50,
                  }}
                  icon={faWrench}
                />
              </a>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
