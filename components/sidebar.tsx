import Link from 'next/link'
import HomeIcon from '../assets/images/icons/home'

export default function Sidebar() {
  return (
    <div className="fixed min-h-screen w-10 bg-secondary px-1  md:w-40">
      <ul className="relative">
        <li className="relative md:py-4">
          <Link href="/">
            <a className="flex items-center overflow-hidden rounded text-center text-sm transition  duration-300 ease-in-out hover:bg-Hower hover:text-gray-900 md:h-16 md:py-4 md:px-6">
              <HomeIcon className="md:ml-4" width={60} height={100} />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
