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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-purple-200 shadow-2xl z-50">
      <div className="flex justify-around px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          return (
            <Link
              key={path}
              to={path}
              className={`flex-1 flex flex-col items-center py-3 px-2 transition-all duration-300 ${
                isActive
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-purple-400'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg transform scale-110'
                  : 'hover:bg-purple-50'
              }`}>
                <Icon size={20} />
              </div>
              <span className={`text-xs mt-1 font-medium ${
                isActive ? 'font-bold' : ''
              }`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigation
