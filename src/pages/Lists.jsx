import { useState } from 'react'
import { FaPlus, FaCheck, FaShoppingCart, FaBook, FaStar } from 'react-icons/fa'
import Navigation from '../components/Navigation'

function Lists() {
  const [lists, setLists] = useState([
    {
      id: '1',
      title: 'Groceries',
      icon: 'ShoppingCart',
      items: [
        { id: '1-1', content: 'Milk', isChecked: false },
        { id: '1-2', content: 'Bread', isChecked: true },
        { id: '1-3', content: 'Eggs', isChecked: false },
        { id: '1-4', content: 'Cheese', isChecked: false }
      ],
      privacy: 'public',
      color: '#10b981'
    },
    {
      id: '2',
      title: 'School Bag',
      icon: 'Book',
      items: [
        { id: '2-1', content: 'Notebook', isChecked: true },
        { id: '2-2', content: 'Pencils', isChecked: false },
        { id: '2-3', content: 'Eraser', isChecked: true }
      ],
      privacy: 'user2',
      color: '#3b82f6'
    },
    {
      id: '3',
      title: 'Weekend Tasks',
      icon: 'Star',
      items: [
        { id: '3-1', content: 'Clean garage', isChecked: false },
        { id: '3-2', content: 'Water plants', isChecked: false }
      ],
      privacy: 'private',
      color: '#8b5cf6'
    }
  ])

  const toggleItem = (listId, itemId) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item =>
            item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
          )
        }
      }
      return list
    }))
  }

  const getPrivacyBadge = (privacy) => {
    const badges = {
      public: { bg: 'bg-green-100', text: 'text-green-700', label: 'Family' },
      user2: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'User 2' },
      user3: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'User 3' },
      private: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Private' }
    }
    return badges[privacy] || badges.private
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg px-6 py-6 mb-6 border-b border-purple-100">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Lists
            </h1>
            <p className="text-gray-600 mt-1">Organize your tasks and todos</p>
          </div>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 font-semibold">
            <FaPlus /> New List
          </button>
        </div>
      </header>

      <main className="px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map(list => {
            const completedItems = list.items.filter(item => item.isChecked).length
            const totalItems = list.items.length
            const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0
            const badge = getPrivacyBadge(list.privacy)

            return (
              <div
                key={list.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-100 hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-3 rounded-xl shadow-lg"
                      style={{ backgroundColor: list.color }}
                    >
                      {list.icon === 'ShoppingCart' && <FaShoppingCart className="text-white" size={20} />}
                      {list.icon === 'Book' && <FaBook className="text-white" size={20} />}
                      {list.icon === 'Star' && <FaStar className="text-white" size={20} />}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{list.title}</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {completedItems} of {totalItems} completed
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: list.color
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {list.items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-xl transition-all group"
                    >
                      <button
                        onClick={() => toggleItem(list.id, item.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all transform group-hover:scale-110 ${
                          item.isChecked
                            ? 'border-transparent shadow-lg'
                            : 'border-gray-300 hover:border-purple-400'
                        }`}
                        style={{
                          backgroundColor: item.isChecked ? list.color : 'transparent'
                        }}
                      >
                        {item.isChecked && <FaCheck className="text-white" size={12} />}
                      </button>
                      <span className={`flex-1 transition-all ${
                        item.isChecked
                          ? 'line-through text-gray-400'
                          : 'text-gray-900 font-medium'
                      }`}>
                        {item.content}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="mt-4 w-full text-purple-600 text-sm font-semibold flex items-center justify-center gap-2 py-3 hover:bg-purple-50 rounded-xl transition-all border-2 border-dashed border-purple-200 hover:border-purple-400">
                  <FaPlus size={12} /> Add Item
                </button>
              </div>
            )
          })}

          {/* Add new list card */}
          <div className="bg-gradient-to-br from-purple-100/50 to-pink-100/50 backdrop-blur-sm border-2 border-dashed border-purple-300 rounded-2xl p-6 flex items-center justify-center min-h-[300px] cursor-pointer hover:border-purple-500 hover:shadow-xl transition-all group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <FaPlus size={28} className="text-white" />
              </div>
              <p className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create New List
              </p>
              <p className="text-sm text-gray-600 mt-2">Start organizing your tasks</p>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  )
}

export default Lists
