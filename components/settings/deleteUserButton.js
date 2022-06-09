import { toast } from 'react-toastify'
import axiosToken from '../../src/lib/backendAPI'
import { useRouter } from 'next/router'

export default function deleteUserButton({ user_id }) {
  const router = useRouter()
  const deleteUser = (e, team_id) => {
    if (!confirm('youSure?')) {
      return
    }
    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'deleteUser', {
        user_id: user_id[0],
      })
      .then((res) => {
        toast('user was deleted')
        router.push(`/`)
      })
      .catch((err) => {
        toast('Wow so error')
      })
  }
  return (
    <button type="button" onClick={deleteUser} className="btn btn-red">
      delete User
    </button>
  )
}
