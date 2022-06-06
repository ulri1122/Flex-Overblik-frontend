import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
export default function addButton() {
  return (
    <div className=" flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-gray-300 bg-[#ffffff]">
      <FontAwesomeIcon icon={faPlus} />
    </div>
  )
}
