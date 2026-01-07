import { format } from 'date-fns'
import TimeGrid from './TimeGrid'

function WeeklyCalendar({ days }) {
  const isToday = (day) => {
    const today = new Date()
    return day.toDateString() === today.toDateString()
  }

  return (
    <div className="h-full overflow-auto bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="grid grid-cols-8 border-b border-purple-200 sticky top-0 bg-white/90 backdrop-blur-md z-20">
          <div className="p-4 border-r border-purple-100"></div>
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={`p-4 text-center border-r border-purple-100 ${
                isToday(day) ? 'bg-gradient-to-br from-purple-100 to-pink-100' : ''
              }`}
            >
              <div className={`text-sm font-medium ${
                isToday(day) ? 'text-purple-700' : 'text-gray-600'
              }`}>
                {format(day, 'EEE')}
              </div>
              <div className={`text-2xl font-bold mt-1 ${
                isToday(day)
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto shadow-lg'
                  : 'text-gray-900'
              }`}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
        <TimeGrid days={days} />
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="overflow-x-auto p-4">
          <div className="flex space-x-4">
            {days.map((day) => (
              <div
                key={day.toISOString()}
                className={`min-w-[300px] rounded-2xl shadow-xl p-5 ${
                  isToday(day)
                    ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300'
                    : 'bg-white border border-purple-100'
                }`}
              >
                <div className="text-center mb-4">
                  <div className={`text-sm font-semibold ${
                    isToday(day) ? 'text-purple-700' : 'text-gray-600'
                  }`}>
                    {format(day, 'EEEE')}
                  </div>
                  <div className={`text-2xl font-bold mt-2 ${
                    isToday(day)
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'
                      : 'text-gray-900'
                  }`}>
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
