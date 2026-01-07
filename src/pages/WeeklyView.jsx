import { useState } from 'react'
import { format, startOfWeek, addDays } from 'date-fns'
import WeeklyCalendar from '../components/Calendar/WeeklyCalendar'
import Navigation from '../components/Navigation'
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa'

function WeeklyView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }) // Monday

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const goToPreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7))
  }

  const goToNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg px-6 py-5 border-b border-purple-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mom Planner
            </h1>
            <p className="text-gray-600 mt-1">
              Week of {format(weekStart, 'MMMM d, yyyy')}
            </p>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 font-semibold">
            <FaPlus /> New Event
          </button>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={goToPreviousWeek}
            className="p-2 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <FaChevronLeft className="text-purple-600" />
          </button>
          <button 
            onClick={goToToday}
            className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition-colors"
          >
            Today
          </button>
          <button 
            onClick={goToNextWeek}
            className="p-2 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <FaChevronRight className="text-purple-600" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden p-4">
        <WeeklyCalendar days={days} />
      </main>

      <Navigation />
    </div>
  )
}

export default WeeklyView
