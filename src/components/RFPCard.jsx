import { Link } from '@tanstack/react-router'
import { Calendar, DollarSign, Building2, MapPin, Clock, ArrowRight, Star } from 'lucide-react'

export default function RFPCard({ rfp }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'reviewed':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getBudgetLevel = (budget) => {
    const amount = parseInt(budget.replace(/[^\d]/g, ''))
    if (amount >= 100000) return 'high'
    if (amount >= 50000) return 'medium'
    return 'low'
  }

  const getDaysRemaining = (deadline) => {
    const today = new Date()
    const due = new Date(deadline)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysRemaining = getDaysRemaining(rfp.deadline)
  const budgetLevel = getBudgetLevel(rfp.budget)

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(rfp.status)}`}>
                {rfp.status}
              </span>
              {budgetLevel === 'high' && (
                <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-md border border-amber-200">
                  <Star className="h-3 w-3 fill-current" />
                  <span>Premium</span>
                </div>
              )}
              {daysRemaining <= 7 && daysRemaining > 0 && (
                <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-md border border-red-200">
                  Urgent
                </span>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {rfp.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Building2 className="h-4 w-4 text-gray-400" />
            <span className="font-medium">{rfp.company}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span>{rfp.location}</span>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {rfp.description}
        </p>
      </div>

      {/* Card Metrics */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
              <DollarSign className="h-4 w-4" />
            </div>
            <div className="text-sm font-semibold text-gray-900">{rfp.budget}</div>
            <div className="text-xs text-gray-500">Budget</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
              <Calendar className="h-4 w-4" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
            </div>
            <div className="text-xs text-gray-500">Remaining</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-500 mb-1">
              <Clock className="h-4 w-4" />
            </div>
            <div className="text-sm font-semibold text-gray-900">{formatDate(rfp.postedDate)}</div>
            <div className="text-xs text-gray-500">Posted</div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6 pt-4">
        <Link
          to="/rfp/$rfpId"
          params={{ rfpId: rfp.id.toString() }}
          className="group/link w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <span>View Details & Apply</span>
          <ArrowRight className="h-4 w-4 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  )
}