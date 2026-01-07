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

  const privacyBadges = {
    private: { bg: 'bg-gray-900/20', text: 'Private', icon: Icons.FaLock },
    user2: { bg: 'bg-blue-900/20', text: 'User 2', icon: Icons.FaUser },
    user3: { bg: 'bg-purple-900/20', text: 'User 3', icon: Icons.FaUserFriends },
    public: { bg: 'bg-green-900/20', text: 'Family', icon: Icons.FaUsers }
  }

  const badge = privacyBadges[event.privacy] || privacyBadges.public
  const BadgeIcon = badge.icon

  return (
    <div
      className="absolute left-2 right-2 rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 z-10 group"
      style={{
        top: `${topOffset}px`,
        height: `${height}px`,
        backgroundColor: event.color,
        minHeight: '56px'
      }}
      onClick={() => handleEventClick(event)}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10"></div>

      {/* Content */}
      <div className="relative p-3 h-full flex flex-col">
        <div className="flex items-start gap-2 mb-2">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
            <Icon className="text-white" size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm text-white truncate drop-shadow-md">
              {event.title}
            </div>
            <div className="text-xs text-white/90 font-medium mt-1">
              {format(startDate, 'h:mm a')} - {format(endDate, 'h:mm a')}
            </div>
          </div>
        </div>

        {/* Privacy badge */}
        <div className="mt-auto">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold text-white ${badge.bg} backdrop-blur-sm`}>
            <BadgeIcon size={10} />
            {badge.text}
          </span>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
    </div>
  )

  function handleEventClick(event) {
    console.log('Event clicked:', event)
    // TODO: Open event details modal
  }
}

export default EventBlock
