import Image from 'next/image'
import Logo from '../../assets/images/flexoverblik.png'
import axios from 'axios'
import UserNotFound from '../../components/userNotFound'
import UserFound from '../../components/userFound'

export async function getServerSideProps(context) {
  var card_id = context.query['card_id']
  var data = await axios
    .post(process.env.BACKEND_API_URL + `check_in`, {
      card_id: card_id,
      check_in_type: 1,
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

function checkInScreen({ data }) {
  return (
    <div className="grid grid-cols-1">
      <div className="flex justify-center">
        <Image src={Logo} alt="Flex overblik" />
      </div>
      <div className="flex justify-center">
        <div className="pt-56">
          {data?.error ? <UserNotFound /> : <UserFound data={data} />}
        </div>
      </div>
    </div>
  )
}

export default checkInScreen
