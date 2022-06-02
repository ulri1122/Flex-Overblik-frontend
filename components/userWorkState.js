import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouseUser,
  faAmbulance,
  faAnchor,
} from '@fortawesome/free-solid-svg-icons'
export default function userWorkState({ state }) {
  switch (state) {
    case 'not_checked_in':
      return (
        <div className=" h-8 w-8 rounded-full border-2 border-solid border-gray-300 bg-red-600"></div>
      )
    case 'at_work':
      return (
        <div className=" bg- h-8 w-8 rounded-full border-2 border-solid border-gray-300 bg-[#309ED3]"></div>
      )
    case 'Working_home':
      return (
        <div className=" flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-gray-300 bg-[#309ED3]">
          <FontAwesomeIcon icon={faHouseUser} />
        </div>
      )
    case 'on_leave':
      return (
        <div className=" h-8 w-8 rounded-full border-2 border-solid border-gray-300 bg-[#575757]"></div>
      )
    case 'sick':
      return (
        <div className=" h-8 w-8 rounded-full border-2 border-solid border-gray-300 bg-[#FFC054]"></div>
      )
    default:
      return (
        <div className=" h-8 w-8 rounded-full border-2 border-solid border-gray-300"></div>
      )
  }
}
