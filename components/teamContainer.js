import Link from 'next/link'
import UserCard from './userCard.js'
export default function teamContainer({ team }) {
  return (
    <div className="border-2 border-solid border-secondary ">
      <div className="bg-secondary">
        <div className=" flex justify-start p-1 text-white">
          {team.team_name}
        </div>
      </div>
      {team.users.map((user, i) => {
        return (
          <div key={i} className="p-1">
            <UserCard user={user} />
          </div>
        )
      })}
    </div>
  )
}
