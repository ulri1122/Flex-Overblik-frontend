import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axiosToken from '../../src/lib/backendAPI'
import OffTimeTable from './offTimeTable'

export default function addTimeOff({ data }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [comment, setComment] = useState('')
  const [offType, setOffType] = useState('')
  const router = useRouter()
  const { user_id } = router.query
  console.log()
  const [daysOff, setDaysOff] = useState(data.days_off)
  const addDaysOff = (e) => {
    e.preventDefault()

    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'AddOffDay', {
        startDate: startDate,
        endDate: endDate,
        comment: comment,
        offType: offType,
        user_id: user_id[0],
      })
      .then((res) => {
        setDaysOff(res.data)
        toast('add Off days for the user')
      })
      .catch((err) => {
        toast('wow error')
      })
  }

  return (
    <div>
      <h1 className="justify-self-start pt-4 text-2xl">Add days Off</h1>
      <form onSubmit={(e) => addDaysOff(e)}>
        <div className="grid grid-cols-5">
          <div>
            <input
              required
              className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              required
              className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              type="text"
              onChange={(e) => setComment(e.target.value)}
            ></input>
          </div>
          <div>
            <select required onChange={(e) => setOffType(e.target.value)}>
              <option value="">--</option>

              <option value="0">Ferie</option>
              <option value="1">Syg</option>
            </select>
          </div>
          <div>
            <button className="btn btn-blue">add DaysOff</button>
          </div>
        </div>
      </form>
      <div className="pt-10">
        {daysOff.map((off_date, i) => {
          return (
            <div key={i}>
              <OffTimeTable data={off_date} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
