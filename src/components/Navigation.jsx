import { Link, useLocation } from 'react-router-dom'
import { FaCalendarWeek, FaListUl, FaUser, FaCog } from 'react-icons/fa'

function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: FaCalendarWeek, label: 'Week' },
    { path: '/lists', icon: FaListUl, label: 'Lists' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
    { path: '/settings', icon: FaCog, label: 'Settings' }
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex-1 flex flex-col items-center py-3 ${
              location.pathname === path
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
