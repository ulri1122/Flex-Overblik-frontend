export default function userFound({ data }) {
  return (
    <div>
      <div>
        {data.checkin_status != 'not_checked_in' ? (
          <div>checked in</div>
        ) : (
          <div>checked out</div>
        )}
      </div>
      {data.current_flex}
    </div>
  )
}
