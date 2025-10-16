import { createFileRoute, useNavigate, notFound, Outlet, Link, useMatchRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications'
import {
  Container,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  Button,
  Tabs,
  Paper,
  Card,
  ThemeIcon,
  ActionIcon,
  Anchor,
  Grid,
  Box,
  SimpleGrid,
  Divider,
  rem
} from '@mantine/core'
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
  ExternalLink,
  Heart,
  X,
  Send,
  CheckCircle2,
  XCircle as XCircleIcon,
  LayoutDashboard,
  MessageSquare,
  Folder,
  Scale
} from 'lucide-react'
import { mockRFPs } from '../data/mockRFPs'
import ProposalForm from '../components/ProposalForm'
import { markRFPAsViewed, getRFPInterest, markRFPInterest, removeRFPInterest } from '../utils/rfpStorage'
import { getProgressStats } from '../utils/questionStorage'
import QuestionsSection from '../components/QuestionsSection'
import { generateBuyerSpecificQuestions } from '../data/questionTemplates'
import { getAllBuyerIntakesArray } from '../utils/buyerIntakeStorage'
import { transformAllIntakesToRFPs } from '../utils/intakeToRFP'

// Helper to get all RFPs (mock + buyer intakes)
const getAllRFPs = () => {
  const buyerIntakes = getAllBuyerIntakesArray()
  const transformedIntakes = transformAllIntakesToRFPs(buyerIntakes)
  return [...transformedIntakes, ...mockRFPs]
}

// Helper to find RFP by ID
const findRFPById = (rfpId) => {
  const allRFPs = getAllRFPs()

  // Try to find by string ID first (buyer intake RFPs use string IDs like "rfp_123...")
  let rfp = allRFPs.find(r => r.id === rfpId)

  // If not found, try parsing as integer (mock RFPs use integer IDs)
  if (!rfp) {
    rfp = allRFPs.find(r => r.id === parseInt(rfpId))
  }

  return rfp
}

export const Route = createFileRoute('/rfp/$rfpId')({
  component: RFPDetail,
  // Removed beforeLoad check to allow component to handle not-found case with better debugging
})

function RFPDetail() {
  const { rfpId } = Route.useParams()
  const navigate = useNavigate()

  const rfp = findRFPById(rfpId)

  const [interestStatus, setInterestStatus] = useState(null)
  const matchRoute = useMatchRoute()

  // Mark RFP as viewed when component loads
  useEffect(() => {
    if (rfp) {
      markRFPAsViewed(rfp.id)
      // Load interest status
      const interest = getRFPInterest(rfp.id)
      setInterestStatus(interest)
    }
  }, [rfp])

  const handleApplyClick = () => {
    // Navigate to Questions route
    navigate({
      to: '/rfp/$rfpId/questions',
      params: { rfpId: rfp.id.toString() }
    })

    // Show notification
    notifications.show({
      title: 'Complete Application',
      message: 'Please complete the questions to submit your application',
      color: 'blue',
      icon: <FileText size={16} />,
      autoClose: 5000,
    })
  }

  const handleRemoveInterest = () => {
    if (rfp) {
      removeRFPInterest(rfp.id)
      setInterestStatus(null)
    }
  }

  // Show detailed error if RFP not found
  if (!rfp) {
    const allRFPs = getAllRFPs()
    const availableIds = allRFPs.map(r => r.id).join(', ')
    const buyerIntakeCount = getAllBuyerIntakesArray().length

    return (
      <Container size="lg" py="xl">
        <Paper withBorder p="xl" radius="md">
          <Stack gap="lg" align="center">
            <ThemeIcon size="xl" radius="xl" color="red" variant="light">
              <XCircle size={32} />
            </ThemeIcon>
            <Title order={2}>RFP Not Found</Title>
            <Text c="dimmed" ta="center">
              The RFP with ID <Text component="span" fw={600} c="blue">{rfpId}</Text> could not be found.
            </Text>

            {/* Debug Info */}
            <Paper bg="gray.0" p="md" w="100%">
              <Stack gap="xs">
                <Text size="sm" fw={600}>Debug Information:</Text>
                <Text size="xs" c="dimmed">
                  • Total RFPs available: {allRFPs.length} ({buyerIntakeCount} from submissions, {mockRFPs.length} mock)
                </Text>
                <Text size="xs" c="dimmed">
                  • Requested ID: {rfpId}
                </Text>
                <Text size="xs" c="dimmed">
                  • ID type: {typeof rfpId}
                </Text>
                {availableIds && (
                  <Box>
                    <Text size="xs" fw={600} mb={4}>Available IDs:</Text>
                    <Text size="xs" c="dimmed" style={{ wordBreak: 'break-all' }}>
                      {availableIds}
                    </Text>
                  </Box>
                )}
              </Stack>
            </Paper>

            <Button onClick={handleBack} leftSection={<ChevronLeft size={16} />}>
              Back to Opportunities
            </Button>
          </Stack>
        </Paper>
      </Container>
    )
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
        return 'green'
      case 'reviewed':
        return 'blue'
      default:
        return 'gray'
    }
  }

  const getRFPTypeInfo = (rfpType) => {
    if (rfpType === 'legal-services') {
      return {
        label: 'Legal Services',
        icon: <Scale size={16} />,
        color: 'violet'
      }
    }
    // Default to legal-tech
    return {
      label: 'Legal Tech',
      icon: <Monitor size={16} />,
      color: 'blue'
    }
  }

  const handleBack = () => {
    navigate({ to: '/' })
  }

  // Calculate question progress (global + buyer-specific questions)
  const globalQuestionCount = rfp.questions?.length || 0
  const buyerQuestionCount = generateBuyerSpecificQuestions(rfp).length
  const totalQuestionCount = globalQuestionCount + buyerQuestionCount
  const progressStats = totalQuestionCount > 0 ? getProgressStats(rfp.id, totalQuestionCount) : null
  const typeInfo = getRFPTypeInfo(rfp.rfpType)

  return (
    <>
      {/* Header */}
      <Paper
        shadow="xs"
        withBorder
        p="xl"
        radius={0}
        style={{
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          marginTop: '-1rem'
        }}
      >
        <Container size="xl">
          <Box mb="md">
            <BackButton onClick={handleBack} />
          </Box>
          <Group justify="space-between" align="flex-start">
            <Box>
              <Group gap="md" mb="xs" align="center" wrap="wrap">
                <Group gap="sm" align="center">
                  <ThemeIcon size="xl" variant="light" color="indigo">
                    <Building2 size={24} />
                  </ThemeIcon>
                  <Title order={2}>{rfp.company}</Title>
                </Group>
                <Badge
                  size="md"
                  variant="light"
                  color={typeInfo.color}
                  leftSection={typeInfo.icon}
                  style={{ alignSelf: 'center' }}
                >
                  {typeInfo.label}
                </Badge>
                <Badge
                  size="md"
                  color={getStatusColor(rfp.status)}
                  style={{ alignSelf: 'center' }}
                >
                  Active RFP
                </Badge>
              </Group>
              <Text c="dimmed">{rfp.title}</Text>
            </Box>
            <Group gap="xs">
              {!interestStatus ? (
                // Not Applied - Click to go to Questions
                <Button
                  onClick={handleApplyClick}
                  variant="outline"
                  leftSection={<Send size={16} />}
                >
                  Apply to RFP
                </Button>
              ) : interestStatus.buyerResponse === 'accepted' ? (
                // Accepted
                <Button
                  color="green"
                  leftSection={<CheckCircle2 size={16} />}
                  style={{ cursor: 'default' }}
                >
                  Accepted to Respond
                </Button>
              ) : interestStatus.buyerResponse === 'rejected' ? (
                // Rejected - Allow Reapply
                <Button
                  onClick={handleRemoveInterest}
                  color="gray"
                  leftSection={<XCircleIcon size={16} />}
                  rightSection={<X size={14} />}
                >
                  Application Declined
                </Button>
              ) : (
                // Pending
                <Button
                  color="orange"
                  leftSection={<Clock size={16} />}
                  disabled
                  style={{ cursor: 'default' }}
                >
                  Application Pending
                </Button>
              )}
              <Button variant="default" leftSection={<Mail size={16} />}>
                Contact
              </Button>
            </Group>
          </Group>
        </Container>
      </Paper>

      {/* Tab Navigation */}
      <Paper
        shadow="xs"
        radius={0}
        style={{
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: '1px solid var(--mantine-color-gray-3)',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)'
        }}
      >
        <Container size="xl">
          <Tabs
            value={
              matchRoute({ to: '/rfp/$rfpId/questions', params: { rfpId: rfpId } })
                ? 'questions'
                : matchRoute({ to: '/rfp/$rfpId/documents', params: { rfpId: rfpId } })
                ? 'documents'
                : 'overview'
            }
            variant="default"
          >
            <Tabs.List>
              <Tabs.Tab
                value="overview"
                leftSection={<LayoutDashboard size={16} />}
                component={Link}
                to="/rfp/$rfpId"
                params={{ rfpId: rfpId }}
              >
                Overview
              </Tabs.Tab>

              <Tabs.Tab
                value="questions"
                leftSection={<MessageSquare size={16} />}
                component={Link}
                to="/rfp/$rfpId/questions"
                params={{ rfpId: rfpId }}
                rightSection={
                  progressStats && (
                    <Badge size="sm" variant="filled">
                      {progressStats.completed}/{totalQuestionCount}
                    </Badge>
                  )
                }
              >
                Questions
              </Tabs.Tab>

              <Tabs.Tab
                value="documents"
                leftSection={<Folder size={16} />}
                component={Link}
                to="/rfp/$rfpId/documents"
                params={{ rfpId: rfpId }}
              >
                Documents
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Container>
      </Paper>

      {/* Content */}
      <Box py="xl">
        <Outlet />
      </Box>
    </>
  )
}

function BackButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      variant="subtle"
      leftSection={<ChevronLeft size={16} />}
      size="sm"
    >
      Back to Inbox
    </Button>
  )
}

function RFPSnapshot({ rfp }) {
  if (!rfp.replacing) return null

  return (
    <Paper withBorder p="lg" mb="md" bg="indigo.0">
      <Group align="flex-start" gap="md">
        <ThemeIcon size="lg" color="indigo" variant="light">
          <Target size={20} />
        </ThemeIcon>
        <Box style={{ flex: 1 }}>
          <Title order={4} mb="sm">RFP Snapshot</Title>
          <SimpleGrid cols={4} spacing="md">
            <Box>
              <Text size="sm" fw={500} c="indigo">Replacing</Text>
              <Text size="sm">{rfp.replacing}</Text>
            </Box>
            <Box>
              <Text size="sm" fw={500} c="indigo">Decision Timeline</Text>
              <Text size="sm">{rfp.decisionTimeline}</Text>
            </Box>
            <Box>
              <Text size="sm" fw={500} c="indigo">Max Responses</Text>
              <Text size="sm">{rfp.maxResponses}</Text>
            </Box>
            <Box>
              <Text size="sm" fw={500} c="indigo">User Seats</Text>
              <Text size="sm">{rfp.userSeats}</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Group>
    </Paper>
  )
}

function QuickStats({ rfp }) {
  if (!rfp.requiredLicenses) return null

  return (
    <SimpleGrid cols={4} spacing="md" mb="xl">
      <Paper withBorder p="lg">
        <ThemeIcon size="md" color="indigo" variant="light" mb="xs">
          <Users size={20} />
        </ThemeIcon>
        <Text size="xl" fw={700}>{rfp.requiredLicenses}</Text>
        <Text size="sm" c="dimmed">Required Licenses</Text>
      </Paper>

      <Paper withBorder p="lg">
        <ThemeIcon size="md" color="orange" variant="light" mb="xs">
          <Clock size={20} />
        </ThemeIcon>
        <Text size="xl" fw={700}>{rfp.daysToDecision}</Text>
        <Text size="sm" c="dimmed">Days to Decision</Text>
      </Paper>

      <Paper withBorder p="lg">
        <ThemeIcon size="md" color="blue" variant="light" mb="xs">
          <Users size={20} />
        </ThemeIcon>
        <Text size="xl" fw={700}>{rfp.maxVendors}</Text>
        <Text size="sm" c="dimmed">Max Competing Vendors</Text>
      </Paper>

      <Paper withBorder p="lg">
        <ThemeIcon size="md" color="green" variant="light" mb="xs">
          <CreditCard size={20} />
        </ThemeIcon>
        <Text size="xl" fw={700}>{rfp.billingFrequency}</Text>
        <Text size="sm" c="dimmed">Billing Frequency</Text>
      </Paper>
    </SimpleGrid>
  )
}

function MainContent({ rfp, formatDate }) {
  return (
    <Grid gutter="md">
      {/* Left Column - 2/3 width */}
      <Grid.Col span={8}>
        <Stack gap="md">
          <CurrentSolution rfp={rfp} />
          <CoreRequirements rfp={rfp} />
          <DemoRequirements rfp={rfp} />
          <ContractTerms rfp={rfp} />
          <CompanyOverview rfp={rfp} />
          <DepartmentProfile rfp={rfp} />
          <CurrentTechStack rfp={rfp} />
        </Stack>
      </Grid.Col>

      {/* Right Column - 1/3 width */}
      <Grid.Col span={4}>
        <Stack gap="md">
          <DecisionTimeline rfp={rfp} />
          <KeyStakeholders rfp={rfp} />
          <CompetitiveIntelligence rfp={rfp} />
          <BudgetIntelligence rfp={rfp} />
          <RelationshipHistory rfp={rfp} />
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

function CurrentSolution({ rfp }) {
  if (!rfp.currentSolution) return null

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Current Solution & Replacement Context</Title>
      <Stack gap="md">
        <Paper withBorder p="md" bg="red.0">
          <Group align="flex-start" gap="md">
            <ThemeIcon size="lg" color="red" variant="light">
              <XCircle size={20} />
            </ThemeIcon>
            <Box style={{ flex: 1 }}>
              <Text fw={600} c="red.9" mb="xs">Replacing: {rfp.currentSolution}</Text>
              <Text size="sm" c="red.7" mb="sm">Reason: {rfp.replacingReason}</Text>
              <Group gap="xs">
                <RefreshCw size={16} color="var(--mantine-color-red-6)" />
                <Text size="sm" fw={500} c="red.8">Status: {rfp.replacementStatus}</Text>
              </Group>
            </Box>
          </Group>
        </Paper>

        {rfp.competitiveRisk && (
          <Paper withBorder p="md" bg="orange.0">
            <Text size="sm" fw={600} c="orange.9" mb="xs">⚠️ Competitive Risk</Text>
            <Text size="sm" c="orange.8">{rfp.competitiveRisk}</Text>
          </Paper>
        )}
      </Stack>
    </Paper>
  )
}

function CoreRequirements({ rfp }) {
  const requirements = rfp.coreRequirements || rfp.requirements
  if (!requirements) return null

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Core Software Requirements (Must-Have)</Title>
      <SimpleGrid cols={2} spacing="xs">
        {requirements.map((req, index) => (
          <Paper key={index} withBorder p="sm" bg="green.0">
            <Group gap="xs">
              <ThemeIcon size="sm" color="green" variant="light">
                <CheckCircle size={16} />
              </ThemeIcon>
              <Text size="sm" fw={500}>{req}</Text>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </Paper>
  )
}

function DemoRequirements({ rfp }) {
  if (!rfp.demoRequirements) return null

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Demonstration Requirements</Title>
      <Paper withBorder p="md" bg="blue.0">
        <ThemeIcon size="lg" color="blue" variant="light" mb="sm">
          <Monitor size={20} />
        </ThemeIcon>
        <Text size="sm">"{rfp.demoRequirements}"</Text>
        {rfp.demoStrategy && (
          <>
            <Divider my="md" color="blue.2" />
            <Text size="xs" fw={600} c="blue.9" mb="xs">Demo Strategy Recommendations:</Text>
            <Stack gap={4}>
              {rfp.demoStrategy.map((strategy, index) => (
                <Text key={index} size="xs" c="blue.8">• {strategy}</Text>
              ))}
            </Stack>
          </>
        )}
      </Paper>
    </Paper>
  )
}

function ContractTerms({ rfp }) {
  if (!rfp.contractTerm) return null

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Contract & Payment Terms</Title>
      <SimpleGrid cols={2} spacing="md">
        <Box>
          <Text size="sm" fw={500} c="dimmed" mb="xs">Contract Term</Text>
          <Paper bg="gray.0" p="sm">
            <Text size="lg" fw={600}>{rfp.contractTerm}</Text>
            <Text size="xs" c="dimmed" mt={4}>{rfp.contractTermDetails}</Text>
          </Paper>
        </Box>
        <Box>
          <Text size="sm" fw={500} c="dimmed" mb="xs">Billing Interval</Text>
          <Paper bg="gray.0" p="sm">
            <Text size="lg" fw={600}>{rfp.billingInterval}</Text>
            <Text size="xs" c="dimmed" mt={4}>{rfp.billingIntervalDetails}</Text>
          </Paper>
        </Box>
        <Box>
          <Text size="sm" fw={500} c="dimmed" mb="xs">Payment Terms</Text>
          <Paper bg="gray.0" p="sm">
            <Text size="lg" fw={600}>{rfp.paymentTerms}</Text>
            <Text size="xs" c="dimmed" mt={4}>{rfp.paymentTermsDetails}</Text>
          </Paper>
        </Box>
        <Box>
          <Text size="sm" fw={500} c="dimmed" mb="xs">User Licenses</Text>
          <Paper bg="gray.0" p="sm">
            <Text size="lg" fw={600}>{rfp.userLicenses}</Text>
            <Text size="xs" c="dimmed" mt={4}>{rfp.userLicensesDetails}</Text>
          </Paper>
        </Box>
      </SimpleGrid>
    </Paper>
  )
}

function CompanyOverview({ rfp }) {
  if (!rfp.industry) return null

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Company Overview</Title>
      <SimpleGrid cols={2} spacing="md">
        <Box>
          <Text size="sm" fw={500} c="dimmed" mb={4}>Industry</Text>
          <Text size="sm">{rfp.industry}</Text>
        </Box>
        <Box>
          <Text size="sm" fw={500} c="dimmed" mb={4}>Headquarters</Text>
          <Text size="sm">{rfp.headquarters}</Text>
        </Box>
        <Box>
          <Text size="sm" fw={500} c="dimmed" mb={4}>Company Size</Text>
          <Text size="sm">{rfp.companySize}</Text>
        </Box>
        <Box>
          <Text size="sm" fw={500} c="dimmed" mb={4}>Revenue</Text>
          <Text size="sm">{rfp.revenue}</Text>
        </Box>
        <Box>
          <Text size="sm" fw={500} c="dimmed" mb={4}>Public/Private</Text>
          <Text size="sm">{rfp.publicPrivate}</Text>
        </Box>
        <Box>
          <Text size="sm" fw={500} c="dimmed" mb={4}>Geographic Presence</Text>
          <Text size="sm">{rfp.geographicPresence}</Text>
        </Box>
      </SimpleGrid>
    </Paper>
  )
}

function DepartmentProfile({ rfp }) {
  if (!rfp.departmentStructure) return null

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Department Profile</Title>
      <Stack gap="md">
        <Group align="flex-start" gap="md">
          <ThemeIcon size="xl" color="indigo" variant="light" radius="xl">
            <Users size={24} />
          </ThemeIcon>
          <Box style={{ flex: 1 }}>
            <Text fw={500}>Department Structure</Text>
            <Text size="sm" c="dimmed" mt={4}>{rfp.departmentStructure}</Text>
          </Box>
        </Group>

        {rfp.technologyNeeds && (
          <>
            <Divider />
            <Group align="flex-start" gap="md">
              <ThemeIcon size="xl" color="green" variant="light" radius="xl">
                <DollarSign size={24} />
              </ThemeIcon>
              <Box style={{ flex: 1 }}>
                <Text fw={500}>Technology Needs</Text>
                <Text size="sm" c="dimmed" mt={4}>{rfp.technologyNeeds}</Text>
              </Box>
            </Group>
          </>
        )}

        {rfp.painPoints && (
          <>
            <Divider />
            <Group align="flex-start" gap="md">
              <ThemeIcon size="xl" color="blue" variant="light" radius="xl">
                <Zap size={24} />
              </ThemeIcon>
              <Box style={{ flex: 1 }}>
                <Text fw={500}>Pain Points with Current System</Text>
                <Text size="sm" c="dimmed" mt={4}>{rfp.painPoints}</Text>
              </Box>
            </Group>
          </>
        )}
      </Stack>
    </Paper>
  )
}

function CurrentTechStack({ rfp }) {
  if (!rfp.techStack) return null

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Current Tech Stack</Title>
      <Stack gap="xs">
        {rfp.techStack.map((tech, index) => (
          <Paper
            key={index}
            withBorder={tech.status === 'Replacing'}
            p="sm"
            bg={tech.status === 'Replacing' ? 'red.0' : 'gray.0'}
          >
            <Group justify="space-between" align="center">
              <Group gap="xs">
                <ThemeIcon
                  size="md"
                  color={tech.status === 'Replacing' ? 'red' : 'gray'}
                  variant="light"
                >
                  <Monitor size={20} />
                </ThemeIcon>
                <Box>
                  <Text size="sm" fw={500}>{tech.name}</Text>
                  <Text size="xs" c="dimmed">
                    {tech.category}{tech.year ? ` - Legacy (${tech.year})` : ''}
                  </Text>
                </Box>
              </Group>
              <Badge color={tech.status === 'Replacing' ? 'red' : 'green'}>
                {tech.status}
              </Badge>
            </Group>
          </Paper>
        ))}

        {rfp.techStackIntegration && (
          <Paper withBorder p="sm" bg="blue.0" mt="xs">
            <Text size="xs" fw={600} c="blue.9" mb={4}>Integration Requirements</Text>
            <Text size="xs" c="blue.8">{rfp.techStackIntegration}</Text>
          </Paper>
        )}
      </Stack>
    </Paper>
  )
}

function DecisionTimeline({ rfp }) {
  if (!rfp.decisionMilestones) return null

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Decision Timeline</Title>
      <Stack gap="md">
        <Paper p="md" bg="indigo.0" style={{ textAlign: 'center' }}>
          <Text size="xl" fw={700} c="indigo">{rfp.daysToDecision}</Text>
          <Text size="sm" c="dimmed" mt={4}>Days to Final Decision</Text>
        </Paper>

        <Divider />

        <Stack gap="sm">
          {rfp.decisionMilestones.map((milestone, index) => (
            <Group key={index} gap="xs" align="center">
              <Box
                style={{
                  width: rem(8),
                  height: rem(8),
                  borderRadius: '50%',
                  backgroundColor: milestone.status === 'completed' ? 'var(--mantine-color-green-5)' :
                    milestone.status === 'current' ? 'var(--mantine-color-blue-5)' : 'var(--mantine-color-gray-3)'
                }}
              />
              <Box style={{ flex: 1 }}>
                <Text size="xs" fw={500}>{milestone.name}</Text>
                <Text size="xs" c="dimmed">{milestone.date}</Text>
              </Box>
            </Group>
          ))}
        </Stack>
      </Stack>
    </Paper>
  )
}

function KeyStakeholders({ rfp }) {
  if (!rfp.stakeholders) return null

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Decision Maker':
        return 'violet'
      case 'Primary Contact':
        return 'blue'
      case 'Influencer':
        return 'green'
      case 'Gatekeeper':
        return 'orange'
      default:
        return 'gray'
    }
  }

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Key Stakeholders</Title>
      <Stack gap="md">
        {rfp.stakeholders.map((stakeholder, index) => (
          <Box key={index}>
            <Group justify="space-between" align="flex-start" mb="xs">
              <Box>
                <Text size="sm" fw={500}>{stakeholder.name}</Text>
                <Text size="xs" c="dimmed">{stakeholder.title}</Text>
              </Box>
              <Badge size="sm" color={getRoleBadgeColor(stakeholder.role)}>
                {stakeholder.role}
              </Badge>
            </Group>
            {stakeholder.email && (
              <Group gap={4} mt="xs">
                <Mail size={12} color="var(--mantine-color-dimmed)" />
                <Anchor href={`mailto:${stakeholder.email}`} size="xs">
                  {stakeholder.email}
                </Anchor>
              </Group>
            )}
            {stakeholder.phone && (
              <Group gap={4} mt={4}>
                <Phone size={12} color="var(--mantine-color-dimmed)" />
                <Text size="xs" c="dimmed">{stakeholder.phone}</Text>
              </Group>
            )}
            {stakeholder.linkedin && (
              <Group gap={4} mt={4}>
                <Linkedin size={12} color="var(--mantine-color-dimmed)" />
                <Anchor href={`https://${stakeholder.linkedin}`} size="xs" target="_blank">
                  <Group gap={4}>
                    LinkedIn Profile
                    <ExternalLink size={12} />
                  </Group>
                </Anchor>
              </Group>
            )}
            {index < rfp.stakeholders.length - 1 && <Divider mt="md" />}
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}

function CompetitiveIntelligence({ rfp }) {
  if (!rfp.incumbentRisk && !rfp.expectedCompetitors && !rfp.ourAdvantages) return null

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Competitive Intelligence</Title>
      <Stack gap="xs">
        {rfp.incumbentRisk && (
          <Paper withBorder p="sm" bg="orange.0">
            <Text size="sm" fw={500} c="orange.9" mb={4}>Incumbent Risk</Text>
            <Stack gap={4}>
              {rfp.incumbentRisk.map((risk, index) => (
                <Text key={index} size="xs" c="orange.7">• {risk}</Text>
              ))}
            </Stack>
          </Paper>
        )}

        {rfp.expectedCompetitors && (
          <Paper withBorder p="sm" bg="red.0">
            <Text size="sm" fw={500} c="red.9" mb={4}>Expected Competitors</Text>
            <Stack gap={4}>
              {rfp.expectedCompetitors.map((competitor, index) => (
                <Text key={index} size="xs" c="red.7">• {competitor}</Text>
              ))}
            </Stack>
          </Paper>
        )}

        {rfp.ourAdvantages && (
          <Paper withBorder p="sm" bg="green.0">
            <Text size="sm" fw={500} c="green.9" mb={4}>Our Advantages</Text>
            <Stack gap={4}>
              {rfp.ourAdvantages.map((advantage, index) => (
                <Text key={index} size="xs" c="green.7">• {advantage}</Text>
              ))}
            </Stack>
          </Paper>
        )}
      </Stack>
    </Paper>
  )
}

function BudgetIntelligence({ rfp }) {
  if (!rfp.estimatedAnnualValue) return null

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Budget Intelligence</Title>
      <Stack gap="xs">
        <Box>
          <Text size="sm" fw={500} c="dimmed" mb={4}>Estimated Annual Value</Text>
          <Text size="xl" fw={700}>{rfp.estimatedAnnualValue}</Text>
          <Text size="xs" c="dimmed" mt={4}>{rfp.estimatedAnnualDetails}</Text>
        </Box>
        {rfp.contractValue && (
          <>
            <Divider />
            <Box>
              <Text size="sm" fw={500} c="dimmed" mb={4}>Contract Value</Text>
              <Text size="sm">{rfp.contractValue}</Text>
              <Text size="xs" c="dimmed" mt={4}>{rfp.contractValueDetails}</Text>
            </Box>
          </>
        )}
        {rfp.paymentTerms && (
          <>
            <Divider />
            <Box>
              <Text size="sm" fw={500} c="dimmed" mb={4}>Payment Terms</Text>
              <Text size="sm">{rfp.billingInterval}, {rfp.paymentTerms}</Text>
            </Box>
          </>
        )}
      </Stack>
    </Paper>
  )
}

function RelationshipHistory({ rfp }) {
  if (!rfp.relationshipHistory) return null

  return (
    <Paper withBorder p="lg">
      <Title order={3} mb="md">Relationship History</Title>
      <Stack gap="sm">
        {rfp.relationshipHistory.map((history, index) => (
          <Group key={index} align="flex-start" gap="xs">
            <ThemeIcon size="sm" color="gray" variant="light">
              <Calendar size={14} />
            </ThemeIcon>
            <Box style={{ flex: 1 }}>
              <Text size="sm" fw={500}>{history.event}</Text>
              <Text size="xs" c="dimmed">{history.description}</Text>
            </Box>
          </Group>
        ))}
      </Stack>
    </Paper>
  )
}