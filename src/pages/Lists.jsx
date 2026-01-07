import { useState } from 'react'
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa'
import Navigation from '../components/Navigation'

function Lists() {
  const [lists, setLists] = useState([
    {
      id: '1',
      title: 'Groceries',
      items: [
        { id: '1-1', content: 'Milk', isChecked: false },
        { id: '1-2', content: 'Bread', isChecked: true },
        { id: '1-3', content: 'Eggs', isChecked: false }
      ],
      privacy: 'public'
    },
    {
      id: '2',
      title: 'School Bag',
      items: [
        { id: '2-1', content: 'Notebook', isChecked: true },
        { id: '2-2', content: 'Pencils', isChecked: false }
      ],
      privacy: 'user2'
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

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <header className="bg-white shadow-sm px-6 py-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Lists</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <FaPlus /> New List
          </button>
        </div>
      </header>

      <main className="px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map(list => (
            <div key={list.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{list.title}</h2>
                <span className={`text-xs px-2 py-1 rounded ${
                  list.privacy === 'public' ? 'bg-green-100 text-green-800' :
                  list.privacy === 'user2' ? 'bg-blue-100 text-blue-800' :
                  list.privacy === 'user3' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {list.privacy}
                </span>
              </div>

              <div className="space-y-2">
                {list.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                    <button
                      onClick={() => toggleItem(list.id, item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        item.isChecked
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {item.isChecked && <FaCheck className="text-white" size={12} />}
                    </button>
                    <span className={`flex-1 ${item.isChecked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {item.content}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full text-blue-600 text-sm font-medium flex items-center justify-center gap-2 py-2 hover:bg-blue-50 rounded">
                <FaPlus size={12} /> Add Item
              </button>
            </div>
          ))}

          {/* Add new list card */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 flex items-center justify-center min-h-[200px] cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <div className="text-center text-gray-500">
              <FaPlus size={32} className="mx-auto mb-2" />
              <p className="font-medium">Create New List</p>
            </div>
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  )
}

export default Lists
