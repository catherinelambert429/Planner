import { useState } from 'react'
import EventBlock from '../Events/EventBlock'

function TimeGrid({ days, isMobile = false }) {
  const [events, setEvents] = useState([
    // Sample event
    {
      id: '1',
      title: 'Morning Exercise',
      startTime: '2026-01-07T07:00:00',
      endTime: '2026-01-07T08:00:00',
      color: '#3b82f6',
      icon: 'dumbbell',
      type: 'activity',
      privacy: 'public'
    }
  ])

  // Generate hours from 6 AM to 10 PM
  const hours = Array.from({ length: 17 }, (_, i) => i + 6)

  return (
    <div className={isMobile ? '' : 'grid grid-cols-8'}>
      {/* Time labels */}
      {!isMobile && (
        <div className="border-r bg-gray-50">
          {hours.map((hour) => (
            <div
              key={hour}
              className="h-16 border-b px-2 py-1 text-xs text-gray-600"
            >
              {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
            </div>
          ))}
        </div>
      )}

      {/* Day columns */}
      {days.map((day, dayIndex) => (
        <div key={day.toISOString()} className={isMobile ? '' : 'border-r relative'}>
          {hours.map((hour) => (
            <div
              key={`${dayIndex}-${hour}`}
              className="h-16 border-b hover:bg-blue-50 cursor-pointer transition-colors relative"
              onClick={() => handleTimeSlotClick(day, hour)}
            >
              {isMobile && (
                <div className="text-xs text-gray-500 px-2 py-1">
                  {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
              )}
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
