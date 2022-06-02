import moment from 'moment'
import 'moment-duration-format'
export default function flexTimeTable({ data }) {
  return (
    <div className="pt-10">
      <div className="grid grid-cols-1 ">
        <div className="grid grid-cols-5 justify-center pb-2 text-center ">
          <div>day</div>
          <div>fra</div>
          <div>til</div>
          <div>dagens saldo</div>
          <div></div>
        </div>
        <div className="border-2 border-solid border-black p-4">
          {data.checkInDays.map((day, i) => {
            return (
              <div key={i} className="grid grid-cols-5 text-center ">
                <div>{moment(day.date).format('YYYY/MM/DD')}</div>
                <div>
                  {day.clock_in != 0
                    ? moment(day.clock_in).format('hh:mm:ss')
                    : '-'}
                </div>
                <div>
                  {day.clock_out != 0
                    ? moment(day.clock_out).format('hh:mm:ss')
                    : '-'}
                </div>
                <div>
                  {day.flex_balance_on_day != 0
                    ? moment
                        .duration(day.flex_balance_on_day, 'seconds')
                        .format('hh:mm:ss')
                    : '-'}
                </div>
                <div></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
