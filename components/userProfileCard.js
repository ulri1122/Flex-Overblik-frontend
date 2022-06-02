import Image from 'next/dist/client/image'
import React from 'react'
import moment from 'moment'
import UserWorkSate from './userWorkState'
import 'moment-duration-format'

export default function userProfileCard({ user, workState }) {
  return (
    <div>
      <div className="flex justify-center">
        <Image
          width={200}
          height={200}
          src={
            process.env.NEXT_PUBLIC_IMAGE_URL +
            (user?.image ?? 'profilepicplaceholder.svg')
          }
          alt="profile_pic"
        />
      </div>
      <div className="grid justify-center align-middle">
        <div>Username: {user?.name ?? 'placeholderName'}</div>
        <div>Phone: {user?.phone ?? 'placeholderPhone'}</div>
        <div>email: {user?.email ?? 'placeholderEmail'}</div>
        <div className="pt-10 text-center text-xl ">
          {moment.duration(user?.current_flex, 'seconds').format('hh:mm:ss')}
        </div>
        <UserWorkSate state={workState} />
      </div>
    </div>
  )
}
