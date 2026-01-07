import { useState } from 'react'
import { format, startOfWeek, addDays } from 'date-fns'
import WeeklyCalendar from '../components/Calendar/WeeklyCalendar'
import Navigation from '../components/Navigation'

function WeeklyView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }) // Monday

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-sm px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Mom Planner</h1>
        <p className="text-gray-600">
          Week of {format(weekStart, 'MMMM d, yyyy')}
        </p>
      </header>

      <main className="flex-1 overflow-hidden">
        <WeeklyCalendar days={days} />
      </main>

      <Navigation />
    </div>
  )
}

export default WeeklyView
