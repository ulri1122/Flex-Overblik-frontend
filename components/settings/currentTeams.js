import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import axiosToken from '../../src/lib/backendAPI'

export default function currentTeams({ team, user_id }) {
  const [removeTeam, setRemoveTeam] = useState(false)
  const removeFromTeam = (e, team_id) => {
    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'removeUserFromTeam ', {
        team_id: team_id,
        user_id: user_id,
      })
      .then((res) => {
        setRemoveTeam(true)
      })
      .catch((err) => {
        toast('Wow so error!')
      })
  }
  if (removeTeam) {
    return <div></div>
  }
  return (
    <div className="m-4 grid grid-cols-2 rounded-md border-2 border-solid border-gray-500 p-4">
      <div>{team?.team_name}</div>
      <div className="grid justify-end">
        <button onClick={(e) => removeFromTeam(e, team?.id)} className="btn">
          Remove
        </button>
      </div>
    </div>
  )
}
