import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import axiosToken from '../../src/lib/backendAPI'

export default function teams({ team }) {
  const router = useRouter()
  const [deleteRow, setDeleteRow] = useState('')

  const deleteTeam = (e, team_id) => {
    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'deleteTeam', {
        team_id: team_id,
      })
      .then((res) => {
        toast('team was deleted')
        setDeleteRow(true)
      })
      .catch((err) => {
        toast('Wow so error')
      })
  }
  const [teamName, setTeamName] = useState(team.team_name)

  const updateTeam = (e, team_id, team_name) => {
    console.log(team_name)
    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'updateTeamName', {
        team_id: team_id,
        team_name: team_name,
      })
      .then((res) => {
        toast('team was updated')
      })
      .catch((err) => {
        toast('Wow so error')
      })
  }
  if (deleteRow) {
    return <div></div>
  }
  return (
    <div className="grid grid-cols-4">
      <div>{team.id}</div>
      <div>
        <input
          className=" block rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder="team Name"
          type="text"
          name="search"
          defaultValue={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>
      <div>{team.created_at}</div>
      <div>
        <button
          onClick={(e) => updateTeam(e, team.id, teamName)}
          className="btn"
        >
          save
        </button>
        <button onClick={(e) => deleteTeam(e, team.id)} className="btn">
          delete
        </button>
      </div>
    </div>
  )
}
