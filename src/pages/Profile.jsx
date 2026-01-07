import Navigation from '../components/Navigation'
import { FaUser, FaEnvelope, FaUserPlus } from 'react-icons/fa'

function Profile() {
  const user = {
    role: 'mom',
    email: 'mom@example.com',
    displayName: 'Sarah Johnson'
  }

  const secondaryUsers = [
    { id: '2', name: 'User 2', email: 'user2@example.com' },
    { id: '3', name: 'User 3', email: 'user3@example.com' }
  ]

  return (
    <div className="min-h-screen pb-20 md:pb-8 bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      </header>

      <main className="px-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <FaUser className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.displayName}</h2>
              <p className="text-gray-600 flex items-center gap-2">
                <FaEnvelope size={14} />
                {user.email}
              </p>
              <span className="inline-block mt-2 bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                Primary User
              </span>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Edit Profile
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Secondary Users</h3>
            <button className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              <FaUserPlus /> Add User
            </button>
          </div>

          <div className="space-y-3">
            {secondaryUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <FaUser className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Manage
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  )
}

export default Profile
