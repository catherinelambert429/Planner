import { format } from 'date-fns'
import * as Icons from 'react-icons/fa'

function EventBlock({ event }) {
  const startDate = new Date(event.startTime)
  const endDate = new Date(event.endTime)

  // Calculate position and height
  const startHour = startDate.getHours()
  const startMinute = startDate.getMinutes()
  const endHour = endDate.getHours()
  const endMinute = endDate.getMinutes()

  const topOffset = ((startHour - 6) * 64) + (startMinute / 60 * 64)
  const duration = (endHour - startHour) + ((endMinute - startMinute) / 60)
  const height = duration * 64

  const Icon = event.icon ? Icons[`Fa${event.icon}`] || Icons.FaCalendar : Icons.FaCalendar

  return (
    <div
      className="absolute left-1 right-1 rounded-lg shadow-md p-2 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow z-10"
      style={{
        top: `${topOffset}px`,
        height: `${height}px`,
        backgroundColor: event.color,
        minHeight: '48px'
      }}
      onClick={() => handleEventClick(event)}
    >
      <div className="flex items-start gap-2 text-white">
        <Icon className="flex-shrink-0 mt-0.5" size={14} />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{event.title}</div>
          <div className="text-xs opacity-90">
            {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
          </div>
        </div>
      </div>
    </div>
  )

  function handleEventClick(event) {
    console.log('Event clicked:', event)
    // TODO: Open event details modal
  }
}

export default EventBlock
