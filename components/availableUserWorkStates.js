import Link from 'next/link'
import UserWorkState from './userWorkState'
export default function availableUserWorkStates({ state }) {
  return (
    <div className="flex">
      <div className="flex items-center justify-center ">
        <UserWorkState state="not_checked_in" />
        <p className="px-2">Ikke checket ind</p>
      </div>
      <div className="flex items-center justify-center ">
        <UserWorkState state="at_work" />
        <p className="px-2">På Arbejdspladsen</p>
      </div>
      <div className="flex items-center justify-center ">
        <UserWorkState state="Working_home" />
        <p className="px-2">Arbejder hjemme</p>
      </div>
      <div className="flex items-center justify-center ">
        <UserWorkState state="on_leave" /> <p className="px-2">Ferie</p>
      </div>
      <div className="flex items-center justify-center ">
        <UserWorkState state="sick" /> <p className="px-2">Syg</p>
      </div>
    </div>
  )
}
