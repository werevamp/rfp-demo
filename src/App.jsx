import { useState } from 'react'
import { Heart, Star, Home, Settings, User } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React + Tailwind + Lucide
          </h1>
          <p className="text-gray-600">
            Your project is set up with React, Tailwind CSS, and Lucide React icons
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Home className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold">Welcome</h2>
            </div>
            <p className="text-gray-600">
              This is your new React project with Tailwind CSS styling.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold">Icons</h2>
            </div>
            <p className="text-gray-600">
              Lucide React provides beautiful, customizable icons.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-gray-500 mr-2" />
              <h2 className="text-xl font-semibold">Setup Complete</h2>
            </div>
            <p className="text-gray-600">
              Everything is configured and ready to go!
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md inline-block">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Heart className="h-5 w-5 mr-2" />
              Clicked {count} times
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <User className="h-8 w-8 text-purple-500" />
          <Home className="h-8 w-8 text-green-500" />
          <Star className="h-8 w-8 text-yellow-500" />
          <Settings className="h-8 w-8 text-gray-500" />
          <Heart className="h-8 w-8 text-red-500" />
        </div>
      </div>
    </div>
  )
}

export default App
