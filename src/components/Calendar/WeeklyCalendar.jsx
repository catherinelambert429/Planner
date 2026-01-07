import { format } from 'date-fns'
import TimeGrid from './TimeGrid'

function WeeklyCalendar({ days }) {
  return (
    <div className="h-full overflow-auto">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="grid grid-cols-8 border-b">
          <div className="p-4 border-r bg-gray-50"></div>
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className="p-4 text-center border-r"
            >
              <div className="text-sm text-gray-600">
                {format(day, 'EEE')}
              </div>
              <div className="text-lg font-semibold">
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
        <TimeGrid days={days} />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="overflow-x-auto">
          <div className="flex space-x-4 p-4">
            {days.map((day) => (
              <div
                key={day.toISOString()}
                className="min-w-[280px] bg-white rounded-lg shadow p-4"
              >
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600">
                    {format(day, 'EEEE')}
                  </div>
                  <div className="text-xl font-semibold">
                    {format(day, 'MMMM d')}
                  </div>
                </div>
                <TimeGrid days={[day]} isMobile />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyCalendar
