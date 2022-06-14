import moment from 'moment'
import 'moment-duration-format'
import Image from 'next/image'

export default function userFound({ data }) {
  console.log(data)
  return (
    <div className="grid grid-cols-1 rounded-lg border border-secondary p-10 text-center align-middle">
      <div className="pb-10">
        {data.checkin_status != 'not_checked_in' ? (
          <div className="text-2xl">checked in</div>
        ) : (
          <div className="text-2xl">checked out</div>
        )}
      </div>
      <Image
        width={200}
        height={200}
        src={
          process.env.NEXT_PUBLIC_URL +
          (data?.user_img ?? 'storage/profilepicplaceholder.svg')
        }
        className="rounded-full "
        alt="profile_pic"
      />
      <div className="py-4 text-2xl">{data.username}</div>
      <div>
        {data?.current_flex < 0 ? (
          <div className="text-2xl text-red-700 ">
            {moment.duration(data?.current_flex, 'seconds').format('H:mm:ss')}
          </div>
        ) : (
          <div className="text-2xl text-blue-700 ">
            +{moment.duration(data?.current_flex, 'seconds').format('H:mm:ss')}
          </div>
        )}
      </div>
    </div>
  )
}
