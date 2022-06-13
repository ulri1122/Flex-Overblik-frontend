import Link from 'next/link'
import HomeIcon from '../assets/images/icons/home'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faWorm, faUserPlus } from '@fortawesome/free-solid-svg-icons'
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
    <div className="fixed min-h-screen w-10 bg-secondary px-1  md:w-40">
      <ul className="relative">
        <li className="relative md:py-4">
          <Link href="/">
            <a className="flex items-center overflow-hidden rounded text-center text-sm transition  duration-300 ease-in-out hover:bg-Hower hover:text-gray-900 md:h-16 md:py-4 md:px-6">
              <HomeIcon className="md:ml-4" width={60} height={100} />
            </a>
          </Link>

          {globalToken.userToken ? (
            <div>
              <Link href="/settings/addUser/0">
                <button>
                  <a className="flex items-center overflow-hidden rounded text-center text-sm transition  duration-300 ease-in-out hover:bg-Hower hover:text-gray-900 md:h-16 md:py-4 md:px-6">
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
              <button onClick={() => removeSuperUserMode()}>
                <a className="flex items-center overflow-hidden rounded text-center text-sm transition  duration-300 ease-in-out hover:bg-Hower hover:text-gray-900 md:h-16 md:py-4 md:px-6">
                  <FontAwesomeIcon
                    style={{
                      fontSize: 100,
                      color: 'white',
                      height: 60,
                      width: 50,
                    }}
                    icon={faWorm}
                  />
                </a>
              </button>
            </div>
          ) : (
            <button onClick={() => superUserMode()}>
              <a className="flex items-center overflow-hidden rounded text-center text-sm transition  duration-300 ease-in-out hover:bg-Hower hover:text-gray-900 md:h-16 md:py-4 md:px-6">
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
          )}
        </li>
      </ul>
    </div>
  )
}
