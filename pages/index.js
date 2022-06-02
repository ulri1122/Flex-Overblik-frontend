import axios from 'axios'

import TeamContainer from '../components/teamContainer'
import AvailableUserWorkStates from '../components/availableUserWorkStates'
import Image from 'next/image'
import Logo from '../assets/images/flexoverblik.png'

export async function getServerSideProps(context) {
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

function DashBoard({ data }) {
  return (
    <div>
      <div className="grid grid-cols-2">
        <h1 className="justify-self-start text-2xl">DashBoard</h1>
        <div className="justify-self-end">
          <Image height={50} width={250} src={Logo} alt="Flex overblik" />
        </div>
      </div>
      <AvailableUserWorkStates />
      <div className=" 2xl;grid-cols-4 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {data.map((team, i) => {
          {
            return (
              <div key={i}>
                <TeamContainer team={team} />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default DashBoard
