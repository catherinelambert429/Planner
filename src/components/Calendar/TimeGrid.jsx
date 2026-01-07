import { useState } from 'react'
import EventBlock from '../Events/EventBlock'

function TimeGrid({ days, isMobile = false }) {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Morning Exercise',
      startTime: '2026-01-07T07:00:00',
      endTime: '2026-01-07T08:00:00',
      color: '#8b5cf6',
      icon: 'Dumbbell',
      type: 'activity',
      privacy: 'public'
    },
    {
      id: '2',
      title: 'Team Meeting',
      startTime: '2026-01-07T10:00:00',
      endTime: '2026-01-07T11:30:00',
      color: '#3b82f6',
      icon: 'Users',
      type: 'meeting',
      privacy: 'public'
    },
    {
      id: '3',
      title: 'Lunch Break',
      startTime: '2026-01-07T12:00:00',
      endTime: '2026-01-07T13:00:00',
      color: '#10b981',
      icon: 'Utensils',
      type: 'personal',
      privacy: 'private'
    },
    {
      id: '4',
      title: 'Kids Soccer Practice',
      startTime: '2026-01-07T16:00:00',
      endTime: '2026-01-07T17:30:00',
      color: '#f59e0b',
      icon: 'Futbol',
      type: 'activity',
      privacy: 'user2'
    }
  ])

  // Generate hours from 6 AM to 10 PM
  const hours = Array.from({ length: 17 }, (_, i) => i + 6)

  return (
    <div className={isMobile ? '' : 'grid grid-cols-8'}>
      {/* Time labels */}
      {!isMobile && (
        <div className="border-r border-purple-100 bg-gradient-to-b from-purple-50/30 to-pink-50/30">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-16 border-b border-purple-100 px-3 py-2 text-xs font-semibold text-purple-700"
            >
              {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
          ))}
        </div>
      )}

      {/* Day columns */}
      {days.map((day, dayIndex) => (
        <div key={day.toISOString()} className={isMobile ? '' : 'border-r border-purple-100 relative'}>
          {hours.map((hour) => (
            <div
              key={`${dayIndex}-${hour}`}
              className="h-16 border-b border-purple-100 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 cursor-pointer transition-all duration-200 relative group"
              onClick={() => handleTimeSlotClick(day, hour)}
            >
              {isMobile && (
                <div className="text-xs text-purple-600 font-medium px-3 py-1">
                  {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
              )}
              <div className="absolute inset-0 bg-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-purple-600 text-2xl font-light opacity-50">+</span>
              </div>
            </div>
          ))}

          {/* Render events for this day */}
          {events
            .filter((event) => {
              const eventDate = new Date(event.startTime)
              return eventDate.toDateString() === day.toDateString()
            })
            .map((event) => (
              <EventBlock key={event.id} event={event} />
            ))}
        </div>
      ))}
    </div>
  )

  function handleTimeSlotClick(day, hour) {
    console.log('Clicked:', day, hour)
    // TODO: Open event creation modal
  }
}

export default TimeGrid
