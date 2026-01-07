import Navigation from '../components/Navigation'
import { FaUser, FaEnvelope, FaUserPlus, FaCrown } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthContext'

function Profile() {
  const { user } = useAuth()

  const secondaryUsers = [
    { id: '2', name: 'User 2', email: 'user2@example.com' },
    { id: '3', name: 'User 3', email: 'user3@example.com' }
  ]

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg px-6 py-6 mb-6 border-b border-purple-100">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Profile
        </h1>
      </header>

      <main className="px-6 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-purple-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-xl">
              <FaUser className="text-white" size={40} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900">{user?.displayName || 'User'}</h2>
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <FaEnvelope size={14} />
                {user?.email}
              </p>
              <span className="inline-flex items-center gap-2 mt-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-sm font-bold px-4 py-2 rounded-full border-2 border-purple-200">
                <FaCrown className="text-purple-600" />
                Primary User
              </span>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-bold hover:shadow-xl transform hover:scale-[1.02] transition-all">
            Edit Profile
          </button>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-gray-900">Secondary Users</h3>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all font-semibold">
              <FaUserPlus /> Add User
            </button>
          </div>

          <div className="space-y-4">
            {secondaryUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-5 border-2 border-purple-100 rounded-xl hover:shadow-lg transition-all bg-white/50">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-md">
                    <FaUser className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-bold px-4 py-2 rounded-lg hover:bg-purple-50 transition-all">
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
