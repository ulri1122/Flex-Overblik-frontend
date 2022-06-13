import { format } from 'path'
import axiosToken from '../src/lib/backendAPI'
import { useState } from 'react'
import { useContext, useEffect } from 'react'
import GlobalContext from '../context/global-context'
import moment from 'moment'
import { toast } from 'react-toastify'

export default function flexTimeSupTableRow({ time }) {
  const globalToken = useContext(GlobalContext)
  const [isDeleted, setIsDeleted] = useState(false)
  const [checkinTime, setCheckInTime] = useState(
    moment.utc(time.from).local().format('YYYY-MM-DDTHH:mm:ss')
  )
  const [checkOutTime, setcheckOutTime] = useState(
    moment.utc(time.to).local().format('YYYY-MM-DDTHH:mm:ss')
  )
  console.log(checkOutTime)
  const UpdateTimeStamp = (e) => {
    var from_time = moment(checkinTime).format()
    var to_time = moment(checkOutTime).format()

    //manger at tage højde for rollover times
    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'updateTimeStamp', {
        from_time: from_time,
        to_time: to_time,
        checkin_id: time.id,
      })
      .then((res) => {
        toast('time was updated')
      })
      .catch((err) => {
        toast('Wow so error!')
      })
  }
  const deleteTimeStamp = (e) => {
    if (!confirm('are you sure you wanna delete?')) {
      return
    }
    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'deleteTimeStamp', {
        checkin_id: time.id,
      })
      .then((res) => {
        setIsDeleted(true)
        toast('time was deleted')
      })
      .catch((err) => {
        toast('Wow so error!')
      })
  }
  if (isDeleted) {
    return <div></div>
  }
  return (
    <div className="grid grid-cols-4 border bg-white shadow-lg">
      <div className="px-8 py-4">
        {globalToken.userToken ? (
          <div>
            <input
              type="datetime-local"
              onChange={(e) => setCheckInTime(e.target.value)}
              className=" block rounded-md border border-slate-300 bg-white py-2 pl-3 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              value={checkinTime}
            />
          </div>
        ) : (
          <div>{moment.utc(checkinTime).format('H:mm:ss')}</div>
        )}
      </div>
      <div className="px-8 py-4">
        {globalToken.userToken ? (
          <div>
            <input
              type="datetime-local"
              onChange={(e) => setcheckOutTime(e.target.value)}
              className=" block rounded-md border border-slate-300 bg-white py-2 pl-3 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              value={checkOutTime}
            />
          </div>
        ) : (
          <div>{moment.utc(checkOutTime).format('H:mm:ss')}</div>
        )}
      </div>
      <div className="px-8 py-4">
        {moment.duration(time.total_time, 'seconds').format('H:mm:ss')}
      </div>
      <div className="flex self-center align-middle">
        {globalToken.userToken ? (
          <div>
            <button
              onClick={(e) => UpdateTimeStamp(e)}
              className="btn btn-blue"
            >
              Edit time
            </button>
            <button onClick={(e) => deleteTimeStamp(e)} className="btn btn-red">
              Delete time
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
