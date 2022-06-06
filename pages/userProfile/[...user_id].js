import Image from 'next/image'
import Logo from '../../assets/images/flexoverblik.png'
import UserProfileCard from '../../components/userProfileCard'
import FlexTimesTable from '../../components/flexTimesTable'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'

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
  const [checkInStatus, setCheckInStatus] = useState(data.check_in_state)
  const checkInFromhome = (user_id) => {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + 'check_in', {
        user_id: user_id,
        check_in_type: '2',
      })
      .then((res) => {
        console.log(res)
        if (res.data == 'Working_home') {
          setCheckInStatus(res.data)
          toast('you have checked in from home')
        } else if (res.data == 'not_checked_in') {
          setCheckInStatus(res.data)
          toast('you have checked out')
        } else {
          toast('Wow so error!')
        }
      })
      .catch((err) => {
        toast('Wow so error!')
      })
  }
  console.log(data)
  return (
    <div>
      <div className="grid grid-cols-3">
        <div>
          <h1 className="justify-self-start text-2xl">
            {data?.name ?? 'username placeholder'}
          </h1>
        </div>
        <div>
          <button
            onClick={() => checkInFromhome(data.id)}
            className="btn btn-blue"
          >
            Working home
          </button>
        </div>
        <div className="justify-self-end">
          <Image height={50} width={250} src={Logo} alt="Flex overblik" />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <UserProfileCard user={data} checkInStatus={checkInStatus} />
        </div>
        <div className="col-span-2">
          <FlexTimesTable data={data} />
        </div>
      </div>
    </div>
  )
}
