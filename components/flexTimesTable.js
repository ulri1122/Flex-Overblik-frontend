import moment from 'moment'
import 'moment-duration-format'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { Disclosure } from '@headlessui/react'
import FlexTimeSubTable from './flexTimeSubTable'
export default function flexTimeTable({ checkInDays }) {
  return (
    <div className="pt-10">
      <div className="grid grid-cols-1 ">
        <div className="grid grid-cols-5 justify-center text-center font-bold text-primary shadow-lg ">
          <div className="border bg-secondary px-8 py-4 ">day</div>
          <div className="border bg-secondary px-8 py-4 ">fra</div>
          <div className="border bg-secondary px-8 py-4 ">til</div>
          <div className="border bg-secondary px-8 py-4 ">dagens saldo</div>
          <div className="border bg-secondary px-8 py-4 text-left"></div>
        </div>
        <div className="border-separate bg-white shadow-lg">
          {checkInDays?.map((day, i) => {
            return (
              <div key={i}>
                <Disclosure>
                  <div className="grid grid-cols-5 text-center ">
                    <div className="border px-8 py-4">
                      {moment(day.date).format('YYYY/MM/DD')}
                    </div>
                    <div className="border px-8 py-4">
                      {day.clock_in != 0
                        ? moment.utc(day.clock_in).local().format('H:mm:ss')
                        : '-'}
                    </div>
                    <div className="border px-8 py-4">
                      {day.clock_out != 0
                        ? moment.utc(day.clock_out).local().format('H:mm:ss')
                        : '-'}
                    </div>
                    <div className="border px-8 py-4">
                      {day.flex_balance_on_day != 0
                        ? moment
                            .duration(day.flex_balance_on_day, 'seconds')
                            .format('H:mm:ss')
                        : '-'}
                    </div>
                    <Disclosure.Button>
                      <div className="border px-8 py-4">
                        <FontAwesomeIcon icon={faSortDown} />
                      </div>
                    </Disclosure.Button>
                  </div>
                  <Disclosure.Panel className="border">
                    <FlexTimeSubTable times={day.times} />
                  </Disclosure.Panel>
                </Disclosure>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
