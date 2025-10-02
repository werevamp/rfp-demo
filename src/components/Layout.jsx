import { Link } from '@tanstack/react-router'
import { Inbox } from 'lucide-react'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />
          <Navigation />
        </div>
      </div>
    </header>
  )
}

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center space-x-2 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
    >
      <Inbox className="h-6 w-6" />
      <span>RFP Portal</span>
    </Link>
  )
}

function Navigation() {
  return (
    <nav className="flex items-center space-x-4">
      <Link
        to="/"
        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Inbox
      </Link>
    </nav>
  )
}