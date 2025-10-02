import { createFileRoute } from '@tanstack/react-router'
import { Briefcase, TrendingUp } from 'lucide-react'
import { mockRFPs } from '../data/mockRFPs'
import RFPCard from '../components/RFPCard'
import TailwindTest from '../components/TailwindTest'

export const Route = createFileRoute('/')({
  component: RFPInbox,
})

function RFPInbox() {
  // Temporarily show test component - remove this after testing
  const showTest = new URLSearchParams(window.location.search).get('test') === 'true'

  if (showTest) {
    return <TailwindTest />
  }

  const totalRFPs = mockRFPs.length
  const newRFPs = mockRFPs.filter(rfp => rfp.status === 'new').length
  const highValueRFPs = mockRFPs.filter(rfp => {
    const amount = parseInt(rfp.budget.replace(/[^\d]/g, ''))
    return amount >= 100000
  }).length

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Briefcase className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          RFP Opportunities
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover and apply to high-quality Request for Proposals from leading companies worldwide.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Opportunities"
          value={totalRFPs}
          subtitle="Active RFPs"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatsCard
          title="New This Week"
          value={newRFPs}
          subtitle="Fresh opportunities"
          bgColor="bg-emerald-50"
          textColor="text-emerald-600"
        />
        <StatsCard
          title="Premium Projects"
          value={highValueRFPs}
          subtitle="$100K+ budget"
          bgColor="bg-amber-50"
          textColor="text-amber-600"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* RFP Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Available Opportunities</h2>
          <div className="text-sm text-gray-500">
            {totalRFPs} opportunities available
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {mockRFPs.map((rfp) => (
            <RFPCard key={rfp.id} rfp={rfp} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StatsCard({ title, value, subtitle, bgColor, textColor, icon }) {
  return (
    <div className={`${bgColor} rounded-xl p-6 border border-gray-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${textColor} mb-1`}>{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className={`${textColor} opacity-80`}>
          {icon || <Briefcase className="h-8 w-8" />}
        </div>
      </div>
    </div>
  )
}