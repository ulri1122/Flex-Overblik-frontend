import { useContext, useEffect, useState } from 'react'
import GlobalContext from '../../../context/global-context'
import axios from 'axios'
import { Tab } from '@headlessui/react'
import CreateUser from '../../../components/settings/createUser'
export async function getServerSideProps(context) {
  var user_id = context.query['user_id'][0]
  var data = await axios
    .get(process.env.BACKEND_API_URL + `getUserForUpdate`, {
      params: {
        user_id: user_id,
      },
    })
    .then((res) => {
      return res?.data ?? null
    })
    .catch((err) => {
      return null
    })
  return { props: { data } }
}
export default function userNotFound({ data }) {
  const globalToken = useContext(GlobalContext)

  if (!globalToken.userToken || data == null) {
    return <div>access restricted</div>
  }

  return (
    <div>
      <Tab.Group>
        <Tab.List>
          <Tab.List>
            <Tab></Tab>
          </Tab.List>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CreateUser data={data} />
          </Tab.Panel>
          <Tab.Panel></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
