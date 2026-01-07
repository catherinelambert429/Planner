import { useState } from 'react'
import Navigation from '../components/Navigation'
import { FaBell, FaPalette, FaLock, FaSignOutAlt } from 'react-icons/fa'

function Settings() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    defaultPrivacy: 'public',
    defaultColor: '#3b82f6'
  })

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </header>

      <main className="px-6 max-w-2xl mx-auto space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaBell className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Push Notifications</div>
                <div className="text-sm text-gray-600">Receive push notifications for reminders</div>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Email Notifications</div>
                <div className="text-sm text-gray-600">Receive email reminders</div>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaPalette className="text-purple-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Event Color
              </label>
              <input
                type="color"
                value={settings.defaultColor}
                onChange={(e) => setSettings({ ...settings, defaultColor: e.target.value })}
                className="h-10 w-20 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaLock className="text-green-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Privacy</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Privacy for New Items
            </label>
            <select
              value={settings.defaultPrivacy}
              onChange={(e) => setSettings({ ...settings, defaultPrivacy: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="private">Private</option>
              <option value="user2">Shared with User 2</option>
              <option value="user3">Shared with User 3</option>
              <option value="public">Public / Family</option>
            </select>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <button className="w-full flex items-center justify-center gap-2 text-red-600 font-medium py-3 hover:bg-red-50 rounded-lg transition-colors">
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </main>

      <Navigation />
    </div>
  )
}

export default Settings
