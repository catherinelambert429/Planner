import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { FaBell, FaPalette, FaLock, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

function Settings() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    defaultPrivacy: 'public',
    defaultColor: '#8b5cf6'
  })

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout()
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg px-6 py-6 mb-6 border-b border-purple-100">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Logged in as {user?.email}</p>
        </div>
      </header>

      <main className="px-6 max-w-2xl mx-auto space-y-6">
        {/* Notifications */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
              <FaBell className="text-purple-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">Push Notifications</div>
                <div className="text-sm text-gray-600 mt-1">Receive push notifications for reminders</div>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shadow-inner ${
                  settings.pushNotifications ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">Email Notifications</div>
                <div className="text-sm text-gray-600 mt-1">Receive email reminders</div>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shadow-inner ${
                  settings.emailNotifications ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
              <FaPalette className="text-purple-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Default Event Color
              </label>
              <input
                type="color"
                value={settings.defaultColor}
                onChange={(e) => setSettings({ ...settings, defaultColor: e.target.value })}
                className="h-12 w-24 rounded-xl cursor-pointer border-2 border-purple-200"
              />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
              <FaLock className="text-purple-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Privacy</h2>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Default Privacy for New Items
            </label>
            <select
              value={settings.defaultPrivacy}
              onChange={(e) => setSettings({ ...settings, defaultPrivacy: e.target.value })}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 font-medium"
            >
              <option value="private">Private</option>
              <option value="user2">Shared with User 2</option>
              <option value="user3">Shared with User 3</option>
              <option value="public">Public / Family</option>
            </select>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 text-white bg-gradient-to-r from-red-500 to-red-600 font-bold py-4 hover:shadow-xl rounded-xl transition-all transform hover:scale-[1.02]"
          >
            <FaSignOutAlt size={20} />
            Sign Out
          </button>
        </div>
      </main>

      <Navigation />
    </div>
  )
}

export default Settings
