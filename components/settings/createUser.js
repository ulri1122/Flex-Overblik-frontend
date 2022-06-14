import { useContext, useEffect, useState } from 'react'
import GlobalContext from '../../context/global-context'
import Image from 'next/image'
import Logo from '../../assets/images/flexoverblik.png'
import axios from 'axios'
import { useRouter } from 'next/router'
import axiosToken from '../../src/lib/backendAPI'
import CurrentTeams from '../../components/settings/currentTeams'
import { toast } from 'react-toastify'
import DeleteUserButton from '../../components/settings/deleteUserButton'
import { Tab } from '@headlessui/react'
import AddTimeOff from './addTimeOff'

export default function createUser({ data }) {
  const globalToken = useContext(GlobalContext)
  const [selectedFile, setSelectedFile] = useState(null)
  const [ProfileUrl, setProfileUrl] = useState(
    process.env.NEXT_PUBLIC_URL + 'storage/profilepicplaceholder.svg'
  )
  const [userTeams, setUserTeams] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [cardNr, setCardNr] = useState('')
  const [monday, setMonday] = useState('')
  const [tuesday, setTuesday] = useState('')
  const [wednesday, setWednesday] = useState('')
  const [thursday, setThursday] = useState('')
  const [friday, setFriday] = useState('')
  const [saturday, setSaturday] = useState('')
  const [sunday, setSunday] = useState('')

  const router = useRouter()
  const { user_id } = router.query

  useEffect(() => {
    if (user_id == 0) {
      setProfileUrl(
        process.env.NEXT_PUBLIC_URL + 'storage/profilepicplaceholder.svg'
      )
      setUserTeams(null)
      setIsAdmin(false)
      setUserName('')
      setEmail('')
      setPhone('')
      setCardNr('')
      setMonday('')
      setTuesday('')
      setWednesday('')
      setThursday('')
      setFriday('')
      setSaturday('')
      setSunday('')
    }
  }, [user_id])

  useEffect(() => {
    if (data.user) {
      setProfileUrl(
        process.env.NEXT_PUBLIC_URL +
          (data?.user?.image_path ?? 'storage/profilepicplaceholder.svg')
      )
      setUserTeams(data?.user?.teams ?? null)
      setIsAdmin(data?.user?.is_admin ?? null)
      setUserName(data?.user?.name ?? 'error')
      setEmail(data?.user?.email ?? 'error')
      setPhone(data?.user?.phone ?? 'error')
      setCardNr(data?.card_data?.card_id ?? 'error')
      setMonday(data.work_times[1] ?? 0)
      setTuesday(data.work_times[2] ?? 0)
      setWednesday(data.work_times[3] ?? 0)
      setThursday(data.work_times[4] ?? 0)
      setFriday(data.work_times[5] ?? 0)
      setSaturday(data.work_times[6] ?? 0)
      setSunday(data.work_times[7] ?? 0)
    }
  }, [data.user])
  if (!globalToken.userToken || data == null) {
    return <div>access restricted</div>
  }
  // TODO alt skal laves til hooks

  const createUpdateUser = (e) => {
    e.preventDefault()

    var weekdays = {
      1: monday,
      2: tuesday,
      3: wednesday,
      4: thursday,
      5: friday,
      6: saturday,
      7: sunday,
    }
    var formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('user_id', data?.user?.id ?? 0)
    formData.append('username', userName)
    formData.append('email', email)
    formData.append('phone', phone)
    formData.append('card_id', cardNr)
    formData.append('is_admin', ~~isAdmin)
    formData.append('team_id', e.target.team_select.value)
    formData.append('weekdays', JSON.stringify(weekdays))

    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (
          (res?.data?.nfc_cards?.findIndex((x) => x?.card_id == cardNr) ??
            false) == -1
        ) {
          toast('card_id already excists')
        }

        toast('user Was Updated /created')
        if (cardNr) setUserTeams(res?.data?.teams ?? null)
        setProfileUrl(
          process.env.NEXT_PUBLIC_URL +
            (res?.data?.image_path ?? 'storage/profilepicplaceholder.svg')
        )
        router.push(`/settings/addUser/${res?.data?.id}`)
      })
      .catch((err) => {
        toast('wow error')
      })
  }
  return (
    <div>
      <div>
        <div className="grid grid-cols-2">
          <h1 className="justify-self-start text-2xl">Create user</h1>
          <div className="justify-self-end">
            <Image height={50} width={250} src={Logo} alt="Flex overblik" />
          </div>
        </div>
        <div>
          <form
            onSubmit={(e) => createUpdateUser(e)}
            className="grid grid-cols-3"
          >
            <div>
              <div>
                <Image
                  width={100}
                  height={100}
                  src={ProfileUrl}
                  alt="profile_pic"
                  className="rounded-full "
                />
              </div>
              <p>upload image</p>
              <div>
                <input
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="pt-4"
                  placeholder="team Name"
                  type="file"
                  name="image"
                />
              </div>
              <br />
              <div className="flex">
                <p className="pr-4">is admin</p>
                <input
                  className="input"
                  placeholder="team Name"
                  type="checkbox"
                  name="is_admin"
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  checked={isAdmin}
                />
              </div>
            </div>
            <div>
              <p>Add a user: </p>
              <div className="flex ">
                <div>
                  username:
                  <input
                    className="input"
                    placeholder="username"
                    type="text"
                    name="username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                  />
                  Email:
                  <input
                    className="input"
                    placeholder="team Name"
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  phone:
                  <input
                    className="input"
                    placeholder="team Name"
                    type="text"
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                  card nr :
                  <input
                    className="input"
                    placeholder="team Name"
                    type="text"
                    name="card_nr"
                    onChange={(e) => setCardNr(e.target.value)}
                    value={cardNr}
                  />
                  <br />
                  <p>select team</p>
                  <div>
                    <select name="team_select">
                      {data.teams.map((team, i) => {
                        return (
                          <option key={i} value={team.id}>
                            {team.team_name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <br />
                </div>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-[100px_1fr]">
                <p className="pr-2">Monday : </p>
                <input
                  className="block w-[50px] rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Monday"
                  min={0}
                  max={24}
                  step="0.5"
                  onChange={(e) => setMonday(e.target.value)}
                  value={monday}
                />
                <p className="pr-2">Tuesday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Tuesday"
                  min={0}
                  max={24}
                  onChange={(e) => setTuesday(e.target.value)}
                  value={tuesday}
                />
                <p className="pr-2">Wednesday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Wednesday"
                  min={0}
                  max={24}
                  onChange={(e) => setWednesday(e.target.value)}
                  value={wednesday}
                />
                <p className="pr-2">Thursday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Thursday"
                  min={0}
                  max={24}
                  onChange={(e) => setThursday(e.target.value)}
                  value={thursday}
                />
                <p className="pr-2">Friday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Friday"
                  min={0}
                  max={24}
                  onChange={(e) => setFriday(e.target.value)}
                  value={friday}
                />
                <p className="pr-2">Saturday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Saturday"
                  min={0}
                  max={24}
                  onChange={(e) => setSaturday(e.target.value)}
                  value={saturday}
                />
                <p className="pr-2">Sunday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Sunday"
                  min={0}
                  max={24}
                  onChange={(e) => setSunday(e.target.value)}
                  value={sunday}
                />
              </div>
            </div>
            <div>
              {user_id != 0 ? (
                <DeleteUserButton user_id={user_id} />
              ) : (
                <div></div>
              )}
            </div>
            <div></div>
            <button className="btn btn-blue">save user</button>
          </form>
        </div>
      </div>
      <h2 className="pt-10 text-xl">remove user from team</h2>
      <div className="grid grid-cols-4 ">
        {userTeams?.map((team, i) => {
          return (
            <div key={i}>
              <CurrentTeams team={team} user_id={data?.user?.id} />
            </div>
          )
        })}
      </div>
      <div>{user_id != 0 ? <AddTimeOff data={data} /> : <div></div>}</div>
    </div>
  )
}
