import { useContext, useEffect, useState } from 'react'
import GlobalContext from '../../context/global-context'
import Image from 'next/image'
import Logo from '../../assets/images/flexoverblik.png'

import axiosToken from '../../src/lib/backendAPI'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Teams from '../../components/settings/teams'

export async function getServerSideProps(context) {
  return getData()
}
async function getData() {
  var data = await axios
    .get(process.env.BACKEND_API_URL + `getTeams`)
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
export default function addTeams({ data }) {
  const [teamName, setTeamName] = useState('')
  var [useData, setUseData] = useState(data)

  const globalToken = useContext(GlobalContext)

  if (!globalToken.userToken) {
    return <div>access restricted</div>
  }
  const addTeam = (e) => {
    e.preventDefault()
    if (teamName == '') {
      return alert('typesmt')
    }
    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'createTeam', {
        team_name: teamName,
      })
      .then((res) => {
        toast('team was created')
        setUseData((useData) => [...useData, res.data])
      })
      .catch((err) => {
        toast('Wow so error')
      })
  }
  return (
    <div>
      <div>
        <div className="grid grid-cols-2">
          <h1 className="justify-self-start text-2xl">Create Team</h1>
          <div className="justify-self-end">
            <Image height={50} width={250} src={Logo} alt="Flex overblik" />
          </div>
        </div>
        <form>
          <p>Add a Team: </p>
          <div className="flex ">
            <div>
              <input
                onChange={(e) => setTeamName(e.target.value)}
                className=" block rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="team Name"
                type="text"
                name="search"
              />
            </div>
            <div>
              <button onClick={(e) => addTeam(e)} className="btn btn-blue">
                Add Team
              </button>
            </div>
          </div>
        </form>
        <div>current teams:</div>
        {useData.map((team, i) => {
          {
            return (
              <div key={i}>
                <Teams team={team} />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
