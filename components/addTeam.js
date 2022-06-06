import Link from 'next/link'
import AddButton from './AddButton'

export default function addTeam({ data }) {
  return (
    <div className="flex items-center justify-end">
      <Link href={'/settings/addTeam'}>
        <div className="grid grid-cols-2">
          <p className="pr-2">add team : </p>
          <div className="flex justify-center">
            <AddButton />
          </div>
        </div>
      </Link>
    </div>
  )
}
