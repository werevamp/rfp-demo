import { createFileRoute, useNavigate, notFound } from '@tanstack/react-router'
import {
  ChevronLeft,
  Calendar,
  DollarSign,
  Building2,
  MapPin,
  Clock,
  FileText
} from 'lucide-react'
import { mockRFPs } from '../data/mockRFPs'
import ProposalForm from '../components/ProposalForm'

export const Route = createFileRoute('/rfp/$rfpId')({
  component: RFPDetail,
  beforeLoad: ({ params }) => {
    const rfp = mockRFPs.find(r => r.id === parseInt(params.rfpId))
    if (!rfp) {
      throw notFound()
    }
  }
})

function RFPDetail() {
  const { rfpId } = Route.useParams()
  const navigate = useNavigate()

  const rfp = mockRFPs.find(r => r.id === parseInt(rfpId))

  if (!rfp) {
    return <div>RFP not found</div>
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-green-100 text-green-800'
      case 'reviewed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleBack = () => {
    navigate({ to: '/' })
  }

  return (
    <div className="space-y-8">
      <BackButton onClick={handleBack} />
      <RFPDetails rfp={rfp} formatDate={formatDate} getStatusColor={getStatusColor} />
      <ProposalForm />
    </div>
  )
}

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      Back to Inbox
    </button>
  )
}

function RFPDetails({ rfp, formatDate, getStatusColor }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {rfp.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-2" />
                <span>{rfp.company}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{rfp.location}</span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(rfp.status)}`}>
            {rfp.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <div className="text-sm font-medium text-gray-900">Budget</div>
              <div className="text-sm text-gray-600">{rfp.budget}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <div className="text-sm font-medium text-gray-900">Deadline</div>
              <div className="text-sm text-gray-600">{formatDate(rfp.deadline)}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <div className="text-sm font-medium text-gray-900">Posted</div>
              <div className="text-sm text-gray-600">{formatDate(rfp.postedDate)}</div>
            </div>
          </div>
        </div>

        <ProjectDescription description={rfp.description} />
        <RequirementsList items={rfp.requirements} title="Requirements" />
        <RequirementsList items={rfp.deliverables} title="Deliverables" />
      </div>
    </div>
  )
}

function ProjectDescription({ description }) {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <FileText className="h-5 w-5 text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Project Description</h2>
      </div>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  )
}

function RequirementsList({ items, title }) {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}