import FlexTimeSupTableRow from './flexTimeSupTableRow'

export default function FlexTimeSubTable({ times }) {
  return (
    <div>
      <div className="grid grid-cols-4 border bg-white font-bold text-primary shadow-lg">
        <div className="border bg-gray-600 px-8 py-4">check in</div>
        <div className="border bg-gray-600 px-8 py-4">check out</div>
        <div className="border bg-gray-600 px-8 py-4">total time</div>
        <div className="border bg-gray-600 px-8 py-4"></div>
      </div>
      {times?.map((time, i) => {
        return (
          <div key={i}>
            <FlexTimeSupTableRow time={time} />
          </div>
        )
      })}
    </div>
  )
}
