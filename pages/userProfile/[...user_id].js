import Image from 'next/image'
import Logo from '../../assets/images/flexoverblik.png'
import UserProfileCard from '../../components/userProfileCard'
import FlexTimesTable from '../../components/flexTimesTable'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useContext, useEffect } from 'react'
import GlobalContext from '../../context/global-context'
import Link from 'next/link'
import axiosToken from '../../src/lib/backendAPI'

export async function getServerSideProps(context) {
  var user_id = context.query['user_id']
  var data = await axios
    .get(process.env.BACKEND_API_URL + `getUserProfile`, {
      params: {
        id: user_id,
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      return {
        error: err.response.data,
      }
    })
  return { props: { data } }
}

export default function userId({ data }) {
  const globalToken = useContext(GlobalContext)
  const [checkInStatus, setCheckInStatus] = useState(data.check_in_state)
  const [checkInDays, setCheckInDays] = useState(data.checkInDays)
  const [currentFlex, setCurrentFlex] = useState(data.current_flex)
  const [datahook, setDataHook] = useState(data)
  const checkInFromhome = (user_id) => {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + 'check_in', {
        user_id: user_id,
        check_in_type: '2',
      })
      .then((res) => {
        setCurrentFlex(res.data.current_flex)
        setCheckInStatus(res.data.check_in_state)
        getCheckInDays(user_id)
      })
      .catch((err) => {
        toast('Wow so error!')
      })
  }

  const getCheckInDays = (user_id) => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `getUserProfile`, {
        params: {
          id: user_id,
        },
      })
      .then((res) => {
        setCheckInDays(res.data.checkInDays)
        setCheckInStatus(res.data.check_in_state)
        setDataHook(res.data)
      })
      .catch((err) => {})
  }
  const addFlex = (user_id) => {
    let flex_amount = prompt('Number in hours will be added to the user')
    if (flex_amount == null || flex_amount == '') {
      return
    }

    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + `addFlex`, {
        flex_amount: flex_amount,
        user_id: user_id,
      })
      .then((res) => {
        getUserData(user_id)
      })
      .catch((err) => {})
  }
  const getUserData = (user_id) => {
    var data = axios
      .get(process.env.NEXT_PUBLIC_API_URL + `getUserProfile`, {
        params: {
          id: user_id,
        },
      })
      .then((res) => {
        setCurrentFlex(res.data.current_flex)
        setCheckInStatus(res.data.check_in_state)
        getCheckInDays(user_id)
        setDataHook(res.data)
      })
      .catch((err) => {
        toast('wow mutch error')
      })
  }

  return (
    <div>
      <div className="grid grid-cols-3">
        <div>
          <h1 className="justify-self-start text-2xl">
            {datahook?.name ?? 'username placeholder'}
          </h1>
        </div>
        <div className="grid grid-cols-2">
          <button
            onClick={() => checkInFromhome(datahook.id)}
            className="btn btn-blue"
          >
            Working home
          </button>
          {globalToken?.userToken ? (
            <div className="grid grid-cols-2">
              <Link href={'/settings/addUser/' + datahook.id}>
                <button className="btn btn-blue">edit user</button>
              </Link>
              <button
                onClick={() => addFlex(datahook.id)}
                className="btn btn-blue"
              >
                tilføj flex
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="justify-self-end">
          <Image height={50} width={250} src={Logo} alt="Flex overblik" />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <UserProfileCard
            user={datahook}
            currentFlex={currentFlex}
            checkInStatus={checkInStatus}
          />
        </div>
        <div className="col-span-2">
          <FlexTimesTable checkInDays={checkInDays} />
        </div>
      </div>
    </div>
  )
}
