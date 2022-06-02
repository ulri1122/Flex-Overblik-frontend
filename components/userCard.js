import Image from 'next/image'
import UserWorkSate from './userWorkState'
import Link from 'next/link'

export default function userCard({ user }) {
  return (
    <div>
      <Link href={'/userProfile/' + user.id}>
        <div className=" grid grid-cols-3 rounded-md border-2 border-solid border-gray-300 p-1">
          <div>
            <Image
              width={100}
              height={100}
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL +
                (user.image ?? 'profilepicplaceholder.svg')
              }
              alt="profile_pic"
            />
          </div>
          <div>
            <div>{user.name}</div>
            <div>{user.current_flex}</div>
          </div>
          <div className="flex items-center justify-center">
            <UserWorkSate state={user.work_state} />
          </div>
        </div>
      </Link>
    </div>
  )
}
