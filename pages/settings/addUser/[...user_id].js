import { useContext, useEffect, useState } from 'react'
import GlobalContext from '../../../context/global-context'
import Image from 'next/image'
import Logo from '../../../assets/images/flexoverblik.png'
import axios from 'axios'

import axiosToken from '../../../src/lib/backendAPI'

export async function getServerSideProps(context) {
  var user_id = context.query['user_id'][0]
  var data = await axios
    .get(process.env.BACKEND_API_URL + `getUserForUpdate`, {
      params: {
        user_id: user_id,
      },
    })
    .then((res) => {
      return res?.data
    })
    .catch((err) => {
      return err?.data
    })
  return { props: { data } }
}

export default function userNotFound({ data }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [ProfileUrl, setProfileUrl] = useState(
    process.env.NEXT_PUBLIC_URL +
      (data?.user?.image_path ?? 'storage/profilepicplaceholder.svg')
  )

  const globalToken = useContext(GlobalContext)
  if (!globalToken.userToken) {
    return <div>access restricted</div>
  }

  const createUpdateUser = (e) => {
    e.preventDefault()

    var weekdays = {
      Monday: e.target.Monday.value,
      Tuesday: e.target.Tuesday.value,
      Wednesday: e.target.Wednesday.value,
      Thursday: e.target.Thursday.value,
      Friday: e.target.Friday.value,
      Saturday: e.target.Saturday.value,
      Sunday: e.target.Sunday.value,
    }

    var formData = new FormData()
    formData.append('file', selectedFile)
    formData.append('user_id', data?.user?.id ?? 0)
    formData.append('username', e.target.username.value)
    formData.append('email', e.target.email.value)
    formData.append('phone', e.target.phone.value)
    formData.append('card_id', e.target.card_nr.value)
    formData.append('is_admin', ~~(e.target.is_admin.value == 'on'))
    formData.append('username', e.target.username.value)
    formData.append('team_id', e.target.team_select.value)
    formData.append('weekdays', JSON.stringify(weekdays))

    console.log(formData)
    axiosToken
      .post(process.env.NEXT_PUBLIC_API_URL + 'users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data)
        setProfileUrl(
          process.env.NEXT_PUBLIC_URL +
            (res?.data?.image_path ?? 'storage/profilepicplaceholder.svg')
        )
      })
      .catch((err) => {})
  }
  console.log(data)
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
                  defaultChecked={data?.user?.is_admin}
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
                    placeholder="team Name"
                    type="text"
                    name="username"
                    defaultValue={data?.user?.name ?? ''}
                  />
                  Email:
                  <input
                    className="input"
                    placeholder="team Name"
                    type="text"
                    name="email"
                    defaultValue={data?.user?.email ?? ''}
                  />
                  phone:
                  <input
                    className="input"
                    placeholder="team Name"
                    type="text"
                    name="phone"
                    defaultValue={data?.user?.phone ?? ''}
                  />
                  card nr :
                  <input
                    className="input"
                    placeholder="team Name"
                    type="text"
                    name="card_nr"
                    defaultValue={data?.card_data?.card_id ?? ''}
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
                />
                <p className="pr-2">Tuesday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Tuesday"
                  min={0}
                  max={24}
                />
                <p className="pr-2">Wednesday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Wednesday"
                  min={0}
                  max={24}
                />
                <p className="pr-2">Thursday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Thursday"
                  min={0}
                  max={24}
                />
                <p className="pr-2">Friday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Friday"
                  min={0}
                  max={24}
                />
                <p className="pr-2">Saturday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Saturday"
                  min={0}
                  max={24}
                />
                <p className="pr-2">Sunday : </p>
                <input
                  className="block w-[50px]  rounded-md border border-slate-300 bg-white py-2 pl-1 pr-1 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="number"
                  name="Sunday"
                  min={0}
                  max={24}
                />
              </div>
            </div>
            <div></div>
            <div></div>
            <button className="btn btn-blue">save user</button>
            <div></div>
          </form>
        </div>
      </div>
    </div>
  )
}
