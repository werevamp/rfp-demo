import { createFileRoute, useNavigate, notFound } from '@tanstack/react-router'
import {
  ChevronLeft,
  Calendar,
  DollarSign,
  Building2,
  MapPin,
  Clock,
  FileText,
  Target,
  Users,
  CreditCard,
  CheckCircle,
  XCircle,
  RefreshCw,
  Monitor,
  Zap,
  Mail,
  Phone,
  Linkedin,
  ExternalLink
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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-green-100 text-green-700'
      case 'reviewed':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const handleBack = () => {
    navigate({ to: '/' })
  }

  return (
    <div className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 -mt-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4">
          <BackButton onClick={handleBack} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">{rfp.company}</h1>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(rfp.status)}`}>
                Active RFP
              </span>
            </div>
            <p className="text-gray-600">{rfp.title}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RFPSnapshot rfp={rfp} />
        <QuickStats rfp={rfp} />
        <MainContent rfp={rfp} formatDate={formatDate} />
        <div className="mt-8">
          <ProposalForm />
        </div>
      </div>
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

function RFPSnapshot({ rfp }) {
  if (!rfp.replacing) return null

  return (
    <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-5">
      <div className="flex items-start gap-4">
        <Target className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-indigo-900 mb-2">RFP Snapshot</h3>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-indigo-600 font-medium">Replacing</p>
              <p className="text-indigo-900">{rfp.replacing}</p>
            </div>
            <div>
              <p className="text-indigo-600 font-medium">Decision Timeline</p>
              <p className="text-indigo-900">{rfp.decisionTimeline}</p>
            </div>
            <div>
              <p className="text-indigo-600 font-medium">Max Responses</p>
              <p className="text-indigo-900">{rfp.maxResponses}</p>
            </div>
            <div>
              <p className="text-indigo-600 font-medium">User Seats</p>
              <p className="text-indigo-900">{rfp.userSeats}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickStats({ rfp }) {
  if (!rfp.requiredLicenses) return null

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <Users className="w-5 h-5 text-indigo-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{rfp.requiredLicenses}</p>
        <p className="text-sm text-gray-600">Required Licenses</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <Clock className="w-5 h-5 text-amber-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{rfp.daysToDecision}</p>
        <p className="text-sm text-gray-600">Days to Decision</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <Users className="w-5 h-5 text-blue-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{rfp.maxVendors}</p>
        <p className="text-sm text-gray-600">Max Competing Vendors</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <CreditCard className="w-5 h-5 text-green-600" />
        </div>
        <p className="text-2xl font-bold text-gray-900">{rfp.billingFrequency}</p>
        <p className="text-sm text-gray-600">Billing Frequency</p>
      </div>
    </div>
  )
}

function MainContent({ rfp, formatDate }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Left Column - 2/3 width */}
      <div className="col-span-2 space-y-6">
        <CurrentSolution rfp={rfp} />
        <CoreRequirements rfp={rfp} />
        <DemoRequirements rfp={rfp} />
        <ContractTerms rfp={rfp} />
        <CompanyOverview rfp={rfp} />
        <DepartmentProfile rfp={rfp} />
        <CurrentTechStack rfp={rfp} />
      </div>

      {/* Right Column - 1/3 width */}
      <div className="space-y-6">
        <DecisionTimeline rfp={rfp} />
        <KeyStakeholders rfp={rfp} />
        <CompetitiveIntelligence rfp={rfp} />
        <BudgetIntelligence rfp={rfp} />
        <RelationshipHistory rfp={rfp} />
      </div>
    </div>
  )
}

function CurrentSolution({ rfp }) {
  if (!rfp.currentSolution) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Solution & Replacement Context</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <XCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-red-900 mb-1">Replacing: {rfp.currentSolution}</p>
            <p className="text-sm text-red-700 mb-2">Reason: {rfp.replacingReason}</p>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">Status: {rfp.replacementStatus}</span>
            </div>
          </div>
        </div>

        {rfp.competitiveRisk && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm font-semibold text-amber-900 mb-2">⚠️ Competitive Risk</p>
            <p className="text-sm text-amber-800">{rfp.competitiveRisk}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function CoreRequirements({ rfp }) {
  const requirements = rfp.coreRequirements || rfp.requirements
  if (!requirements) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Core Software Requirements (Must-Have)</h2>
      <div className="grid grid-cols-2 gap-3">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">{req}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DemoRequirements({ rfp }) {
  if (!rfp.demoRequirements) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Demonstration Requirements</h2>
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <Monitor className="w-6 h-6 text-blue-600 mb-3" />
        <p className="text-sm text-gray-900 leading-relaxed">"{rfp.demoRequirements}"</p>
        {rfp.demoStrategy && (
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-xs font-semibold text-blue-900 mb-2">Demo Strategy Recommendations:</p>
            <ul className="space-y-1 text-xs text-blue-800">
              {rfp.demoStrategy.map((strategy, index) => (
                <li key={index}>• {strategy}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function ContractTerms({ rfp }) {
  if (!rfp.contractTerm) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract & Payment Terms</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Contract Term</p>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{rfp.contractTerm}</p>
            <p className="text-xs text-gray-500 mt-1">{rfp.contractTermDetails}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Billing Interval</p>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{rfp.billingInterval}</p>
            <p className="text-xs text-gray-500 mt-1">{rfp.billingIntervalDetails}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">Payment Terms</p>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{rfp.paymentTerms}</p>
            <p className="text-xs text-gray-500 mt-1">{rfp.paymentTermsDetails}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">User Licenses</p>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{rfp.userLicenses}</p>
            <p className="text-xs text-gray-500 mt-1">{rfp.userLicensesDetails}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CompanyOverview({ rfp }) {
  if (!rfp.industry) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Overview</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Industry</p>
          <p className="text-sm text-gray-900">{rfp.industry}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Headquarters</p>
          <p className="text-sm text-gray-900">{rfp.headquarters}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Company Size</p>
          <p className="text-sm text-gray-900">{rfp.companySize}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Revenue</p>
          <p className="text-sm text-gray-900">{rfp.revenue}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Public/Private</p>
          <p className="text-sm text-gray-900">{rfp.publicPrivate}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Geographic Presence</p>
          <p className="text-sm text-gray-900">{rfp.geographicPresence}</p>
        </div>
      </div>
    </div>
  )
}

function DepartmentProfile({ rfp }) {
  if (!rfp.departmentStructure) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Profile</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">Department Structure</p>
            <p className="text-sm text-gray-600 mt-1">{rfp.departmentStructure}</p>
          </div>
        </div>

        {rfp.technologyNeeds && (
          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Technology Needs</p>
              <p className="text-sm text-gray-600 mt-1">{rfp.technologyNeeds}</p>
            </div>
          </div>
        )}

        {rfp.painPoints && (
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Pain Points with Current System</p>
              <p className="text-sm text-gray-600 mt-1">{rfp.painPoints}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CurrentTechStack({ rfp }) {
  if (!rfp.techStack) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Tech Stack</h2>
      <div className="space-y-3">
        {rfp.techStack.map((tech, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg ${
              tech.status === 'Replacing'
                ? 'bg-red-50 border border-red-200'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Monitor className={`w-5 h-5 ${tech.status === 'Replacing' ? 'text-red-600' : 'text-gray-600'}`} />
              <div>
                <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                <p className="text-xs text-gray-500">
                  {tech.category}{tech.year ? ` - Legacy (${tech.year})` : ''}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              tech.status === 'Replacing'
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {tech.status}
            </span>
          </div>
        ))}

        {rfp.techStackIntegration && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mt-3">
            <p className="text-xs font-semibold text-blue-900 mb-1">Integration Requirements</p>
            <p className="text-xs text-blue-800">{rfp.techStackIntegration}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function DecisionTimeline({ rfp }) {
  if (!rfp.decisionMilestones) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Decision Timeline</h2>
      <div className="space-y-4">
        <div className="text-center p-4 bg-indigo-50 rounded-lg">
          <p className="text-3xl font-bold text-indigo-600">{rfp.daysToDecision}</p>
          <p className="text-sm text-gray-600 mt-1">Days to Final Decision</p>
        </div>

        <div className="pt-4 border-t border-gray-200 space-y-3">
          {rfp.decisionMilestones.map((milestone, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                milestone.status === 'completed' ? 'bg-green-500' :
                milestone.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
              }`}></div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-900">{milestone.name}</p>
                <p className="text-xs text-gray-500">{milestone.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function KeyStakeholders({ rfp }) {
  if (!rfp.stakeholders) return null

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Decision Maker':
        return 'bg-purple-100 text-purple-700'
      case 'Primary Contact':
        return 'bg-blue-100 text-blue-700'
      case 'Influencer':
        return 'bg-green-100 text-green-700'
      case 'Gatekeeper':
        return 'bg-amber-100 text-amber-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Stakeholders</h2>
      <div className="space-y-4">
        {rfp.stakeholders.map((stakeholder, index) => (
          <div key={index} className={`pb-4 ${index < rfp.stakeholders.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900 text-sm">{stakeholder.name}</p>
                <p className="text-xs text-gray-500">{stakeholder.title}</p>
              </div>
              <span className={`px-2 py-0.5 text-xs font-medium rounded ${getRoleBadgeColor(stakeholder.role)}`}>
                {stakeholder.role}
              </span>
            </div>
            {stakeholder.email && (
              <div className="flex items-center gap-2 mt-2">
                <Mail className="w-3 h-3 text-gray-400" />
                <a href={`mailto:${stakeholder.email}`} className="text-xs text-indigo-600 hover:underline">
                  {stakeholder.email}
                </a>
              </div>
            )}
            {stakeholder.phone && (
              <div className="flex items-center gap-2 mt-1">
                <Phone className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-600">{stakeholder.phone}</span>
              </div>
            )}
            {stakeholder.linkedin && (
              <div className="flex items-center gap-2 mt-1">
                <Linkedin className="w-3 h-3 text-gray-400" />
                <a href={`https://${stakeholder.linkedin}`} className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                  LinkedIn Profile
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function CompetitiveIntelligence({ rfp }) {
  if (!rfp.incumbentRisk && !rfp.expectedCompetitors && !rfp.ourAdvantages) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Competitive Intelligence</h2>
      <div className="space-y-3">
        {rfp.incumbentRisk && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm font-medium text-amber-900 mb-1">Incumbent Risk</p>
            <div className="space-y-1">
              {rfp.incumbentRisk.map((risk, index) => (
                <p key={index} className="text-xs text-amber-700">• {risk}</p>
              ))}
            </div>
          </div>
        )}

        {rfp.expectedCompetitors && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-900 mb-1">Expected Competitors</p>
            <div className="space-y-1">
              {rfp.expectedCompetitors.map((competitor, index) => (
                <p key={index} className="text-xs text-red-700">• {competitor}</p>
              ))}
            </div>
          </div>
        )}

        {rfp.ourAdvantages && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-900 mb-1">Our Advantages</p>
            <div className="space-y-1">
              {rfp.ourAdvantages.map((advantage, index) => (
                <p key={index} className="text-xs text-green-700">• {advantage}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function BudgetIntelligence({ rfp }) {
  if (!rfp.estimatedAnnualValue) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Intelligence</h2>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">Estimated Annual Value</p>
          <p className="text-xl font-bold text-gray-900">{rfp.estimatedAnnualValue}</p>
          <p className="text-xs text-gray-500 mt-1">{rfp.estimatedAnnualDetails}</p>
        </div>
        {rfp.contractValue && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-600 mb-1">Contract Value</p>
            <p className="text-sm text-gray-900">{rfp.contractValue}</p>
            <p className="text-xs text-gray-500 mt-1">{rfp.contractValueDetails}</p>
          </div>
        )}
        {rfp.paymentTerms && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-600 mb-1">Payment Terms</p>
            <p className="text-sm text-gray-900">{rfp.billingInterval}, {rfp.paymentTerms}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function RelationshipHistory({ rfp }) {
  if (!rfp.relationshipHistory) return null

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Relationship History</h2>
      <div className="space-y-3">
        {rfp.relationshipHistory.map((history, index) => (
          <div key={index} className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">{history.event}</p>
              <p className="text-xs text-gray-600">{history.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}