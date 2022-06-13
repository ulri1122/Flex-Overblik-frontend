import moment from 'moment'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axiosToken from '../../src/lib/backendAPI'

export default function offTimeTable({ data }) {
  console.log(data.days_off)
  const [startDate, setStartDate] = useState(
    moment.utc(data.start_date).local().format('YYYY-MM-DD')
  )
  const [endDate, setEndDate] = useState(
    moment.utc(data.end_date).local().format('YYYY-MM-DD')
  )
  const [comment, setComment] = useState(data.comment ?? '')
  const [offType, setOffType] = useState(data.off_day_type)

  const [isDeleted, setIsDeleted] = useState(false)

  const deleteOffDay = (e) => {
    e.preventDefault()
    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'deleteDayOff', {
        day_off_id: data.id,
      })
      .then((res) => {
        setIsDeleted(true)
        toast('days off deleted')
      })
      .catch((err) => {
        toast('wow error')
      })
  }
  const editDaysOff = (e) => {
    e.preventDefault()

    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'editDayOff', {
        day_off_id: data.id,
        startDate: startDate,
        endDate: endDate,
        comment: comment,
        offType: offType,
      })
      .then((res) => {
        toast('edit day off')
      })
      .catch((err) => {
        toast('wow error')
      })
  }

  if (isDeleted) {
    return <div> </div>
  }
  return (
    <div>
      <div className="grid grid-cols-5">
        <div>
          <input
            required
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          ></input>
        </div>
        <div>
          <input
            required
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          ></input>
        </div>
        <div>
          <input
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
        </div>
        <div>
          <select
            required
            value={offType}
            onChange={(e) => setOffType(e.target.value)}
          >
            <option value="0">Ferie</option>
            <option value="1">Syg</option>
          </select>
        </div>
        <div>
          <div>
            <button onClick={(e) => editDaysOff(e)} className="btn btn-blue">
              save
            </button>
            <button onClick={(e) => deleteOffDay(e)} className="btn btn-red">
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
