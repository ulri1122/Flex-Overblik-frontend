import Image from 'next/dist/client/image'
import React from 'react'
import moment from 'moment'
import UserWorkSate from './userWorkState'
import 'moment-duration-format'

export default function userProfileCard({ user, checkInStatus }) {
  return (
    <div>
      <div className="flex justify-center">
        <Image
          width={200}
          height={200}
          src={
            process.env.NEXT_PUBLIC_URL +
            (user?.image_path ?? 'storage/profilepicplaceholder.svg')
          }
          className="rounded-full "
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
        <UserWorkSate state={checkInStatus} />
      </div>
    </div>
  )
}
