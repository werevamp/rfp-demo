import { createFileRoute } from '@tanstack/react-router'
import { Stack, Paper, Group, Text, Title, SimpleGrid, ThemeIcon, Badge, Box, Divider, Alert } from '@mantine/core'
import { mockRFPs } from '../data/mockRFPs'
import { getAllBuyerIntakesArray } from '../utils/buyerIntakeStorage'
import { transformAllIntakesToRFPs } from '../utils/intakeToRFP'
import {
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

// Helper to format location - handle both string and object formats
const formatLocation = (location) => {
  if (!location) return null
  if (typeof location === 'string') return location
  if (typeof location === 'object') {
    // Handle {state, country} or similar object formats
    const parts = []
    if (location.city) parts.push(location.city)
    if (location.state) parts.push(location.state)
    if (location.country) parts.push(location.country)
    return parts.length > 0 ? parts.join(', ') : null
  }
  return null
}

export const Route = createFileRoute('/rfp/$rfpId/')({
  component: RFPOverview,
})

function RFPOverview() {
  const { rfpId } = Route.useParams()
  const rfp = findRFPById(rfpId)

  if (!rfp) {
    const allRFPs = getAllRFPs()
    const buyerIntakeCount = getAllBuyerIntakesArray().length
    const availableIds = allRFPs.map(r => r.id).join(', ')

    return (
      <Paper p="lg" withBorder>
        <Stack gap="md">
          <Text size="lg" fw={600} c="red">RFP not found</Text>
          <Text size="sm" c="dimmed">
            The RFP with ID <Text component="span" fw={600}>{rfpId}</Text> could not be found.
          </Text>
          <Paper bg="gray.0" p="sm">
            <Stack gap="xs">
              <Text size="xs" c="dimmed">
                • Total RFPs: {allRFPs.length} ({buyerIntakeCount} cached, {mockRFPs.length} mock)
              </Text>
              <Text size="xs" c="dimmed">
                • Requested ID: {rfpId}
              </Text>
              <Text size="xs" c="dimmed" style={{ wordBreak: 'break-all' }}>
                • Available IDs: {availableIds}
              </Text>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Render different layouts based on RFP type
  if (rfp.rfpType === "legal-services") {
    return <LegalServicesLayout rfp={rfp} formatDate={formatDate} />
  }

  // Default to legal-tech layout
  return <LegalTechLayout rfp={rfp} formatDate={formatDate} />
}

// ============================================================================
// LEGAL TECH LAYOUT
// ============================================================================
function LegalTechLayout({ rfp, formatDate }) {
  return (
    <Stack gap="lg">
      {/* Quick Stats */}
      {rfp.requiredLicenses && <QuickStats rfp={rfp} />}

      {/* Company Profile */}
      <Section title="Company Profile" icon={<Building2 size={20} />}>
        <SimpleGrid cols={2} spacing="lg">
          {rfp.industry && (
            <Box>
              <Text size="sm" fw={500} c="gray.6" mb={4}>Industry</Text>
              <Text size="sm" c="gray.9">{rfp.industry}</Text>
            </Box>
          )}
          {rfp.companySize && (
            <Box>
              <Text size="sm" fw={500} c="gray.6" mb={4}>Company Size</Text>
              <Text size="sm" c="gray.9">{rfp.companySize}</Text>
            </Box>
          )}
          {(rfp.location || rfp.headquarters) && (
            <Box>
              <Text size="sm" fw={500} c="gray.6" mb={4}>Region / Location</Text>
              <Text size="sm" c="gray.9">{rfp.headquarters || formatLocation(rfp.location) || 'Not specified'}</Text>
            </Box>
          )}
        </SimpleGrid>
        {rfp.companyOverview && (
          <Box mt="md" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
            <Text size="sm" c="gray.7" style={{ lineHeight: 1.6 }}>{rfp.companyOverview}</Text>
          </Box>
        )}
      </Section>

      {/* Project Details */}
      <Section title="Project Details" icon={<FileText size={20} />}>
        {rfp.solutionCategory && (
          <Badge
            mb="md"
            leftSection={<Target size={16} />}
            color="blue"
            variant="light"
            size="lg"
          >
            {rfp.solutionCategory}
          </Badge>
        )}
        <Text c="gray.7" style={{ lineHeight: 1.6 }} mb="md">{rfp.description}</Text>

        {(rfp.coreRequirements || rfp.requirements) && (
          <Box mt="md" pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
            <Text size="sm" fw={600} c="gray.9" mb="sm">Core Software Requirements</Text>
            <SimpleGrid cols={2} spacing="xs">
              {(rfp.coreRequirements || rfp.requirements).map((req, idx) => (
                <Group key={idx} gap="xs" wrap="nowrap">
                  <CheckCircle size={16} color="var(--mantine-color-green-6)" style={{ flexShrink: 0 }} />
                  <Text size="sm" c="gray.7">{req}</Text>
                </Group>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Section>

      {/* Buying Context */}
      <Section title="Buying Process & Timeline" icon={<Clock size={20} />}>
        <SimpleGrid cols={3} spacing="lg">
          {rfp.buyingStage && (
            <Box>
              <Text size="sm" fw={500} c="gray.6" mb={4}>Stage of Buying Process</Text>
              <Text size="sm" fw={600} c="gray.9">{rfp.buyingStage}</Text>
            </Box>
          )}
          {rfp.topConsideration && (
            <Box style={{ gridColumn: 'span 2' }}>
              <Text size="sm" fw={500} c="gray.6" mb={4}>Top Consideration</Text>
              <Text size="sm" c="gray.9">{rfp.topConsideration}</Text>
            </Box>
          )}
          {rfp.deadline && (
            <Box style={{ gridColumn: 'span 3', borderTop: '1px solid var(--mantine-color-gray-2)' }} pt="sm">
              <Text size="sm" fw={500} c="gray.6" mb={4}>Application Deadline</Text>
              <Group gap="xs">
                <Calendar size={16} color="var(--mantine-color-red-6)" />
                <Text size="sm" fw={600} c="red.6">{formatDate(rfp.deadline)}</Text>
              </Group>
            </Box>
          )}
        </SimpleGrid>
      </Section>

      {/* Current Tech Stack */}
      {rfp.techStack && (
        <Section title="Current Tech Stack" icon={<Monitor size={20} />}>
          <Stack gap="xs">
            {rfp.techStack.map((tech, index) => (
              <Paper
                key={index}
                p="md"
                radius="md"
                withBorder
                style={{
                  backgroundColor: tech.status === 'Replacing'
                    ? 'var(--mantine-color-red-0)'
                    : 'var(--mantine-color-gray-0)',
                  borderColor: tech.status === 'Replacing'
                    ? 'var(--mantine-color-red-2)'
                    : 'var(--mantine-color-gray-2)'
                }}
              >
                <Group justify="space-between" wrap="nowrap">
                  <Group gap="sm">
                    <Monitor size={20} color={tech.status === 'Replacing' ? 'var(--mantine-color-red-6)' : 'var(--mantine-color-gray-6)'} />
                    <Box>
                      <Text size="sm" fw={500} c="gray.9">{tech.name}</Text>
                      <Text size="xs" c="gray.5">
                        {tech.category}{tech.year ? ` - Legacy (${tech.year})` : ''}
                      </Text>
                    </Box>
                  </Group>
                  <Badge
                    color={tech.status === 'Replacing' ? 'red' : 'green'}
                    variant="light"
                  >
                    {tech.status}
                  </Badge>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Section>
      )}

      {/* Demo Requirements */}
      {rfp.demoRequirements && (
        <Section title="Supplier Demonstration Requirements" icon={<Monitor size={20} />}>
          <Alert color="blue" variant="light">
            <Text size="sm" c="gray.9" style={{ lineHeight: 1.6 }}>{rfp.demoRequirements}</Text>
          </Alert>
        </Section>
      )}

      {/* Commercial Terms */}
      {(rfp.userSeats || rfp.userLicenses || rfp.contractTerm || rfp.billingInterval || rfp.paymentTerms) && (
        <Section title="Commercial Terms" icon={<CreditCard size={20} />}>
          <SimpleGrid cols={2} spacing="lg">
            {(rfp.userSeats || rfp.userLicenses) && (
              <Box>
                <Text size="sm" fw={500} c="gray.6" mb={4}>Users & Seats</Text>
                <Text size="sm" fw={600} c="gray.9">{rfp.userLicenses || rfp.userSeats}</Text>
              </Box>
            )}
            {rfp.contractTerm && (
              <Box>
                <Text size="sm" fw={500} c="gray.6" mb={4}>Expected Contract Term</Text>
                <Text size="sm" fw={600} c="gray.9">{rfp.contractTerm}</Text>
              </Box>
            )}
            {rfp.billingInterval && (
              <Box>
                <Text size="sm" fw={500} c="gray.6" mb={4}>Expected Billing Interval</Text>
                <Text size="sm" fw={600} c="gray.9">{rfp.billingInterval}</Text>
              </Box>
            )}
            {rfp.paymentTerms && (
              <Box>
                <Text size="sm" fw={500} c="gray.6" mb={4}>Payment / Invoice Terms</Text>
                <Text size="sm" fw={600} c="gray.9">{rfp.paymentTerms}</Text>
              </Box>
            )}
          </SimpleGrid>
        </Section>
      )}
    </Stack>
  )
}

// ============================================================================
// LEGAL SERVICES LAYOUT
// ============================================================================
function LegalServicesLayout({ rfp, formatDate }) {
  return (
    <Stack gap="lg">
      {/* Project Overview */}
      <Section title="Project Overview" icon={<FileText size={20} />}>
        <Title order={3} size="xl" c="gray.9" mb="sm">{rfp.title}</Title>
        <Text c="gray.7" style={{ lineHeight: 1.6 }}>{rfp.description}</Text>
      </Section>

      {/* Practice Requirements */}
      <Section title="Practice Requirements" icon={<Users size={20} />}>
        <Stack gap="md">
          {rfp.practiceGroups && (
            <Box>
              <Text size="sm" fw={500} c="gray.6" mb="xs">Practice Groups</Text>
              <Group gap="xs">
                {rfp.practiceGroups.map((group, idx) => (
                  <Badge key={idx} color="indigo" variant="light">
                    {group}
                  </Badge>
                ))}
              </Group>
            </Box>
          )}
          {rfp.experienceLevel && (
            <Box>
              <Text size="sm" fw={500} c="gray.6" mb={4}>Experience Level Required</Text>
              <Text size="sm" c="gray.9">{rfp.experienceLevel}</Text>
            </Box>
          )}
          {rfp.barLicenses && (
            <Box>
              <Text size="sm" fw={500} c="gray.6" mb="xs">Bar Licenses Required</Text>
              <Group gap="xs">
                {rfp.barLicenses.map((license, idx) => (
                  <Badge key={idx} color="green" variant="light">
                    {license}
                  </Badge>
                ))}
              </Group>
            </Box>
          )}
        </Stack>
      </Section>

      {/* Commercial Terms */}
      <Section title="Commercial Terms" icon={<DollarSign size={20} />}>
        <SimpleGrid cols={2} spacing="lg">
          {rfp.pricingModel && (
            <Box>
              <Text size="sm" fw={500} c="gray.6" mb={4}>Preferred Pricing Model</Text>
              <Text size="sm" fw={600} c="gray.9">{rfp.pricingModel}</Text>
            </Box>
          )}
          {rfp.budget && (
            <Box>
              <Text size="sm" fw={500} c="gray.6" mb={4}>Budget Range</Text>
              <Text size="sm" fw={600} c="gray.9">{rfp.budget}</Text>
            </Box>
          )}
        </SimpleGrid>
        {rfp.additionalBudgetInfo && (
          <Paper p="sm" mt="md" bg="gray.0" radius="md">
            <Text size="xs" fw={500} c="gray.6" mb={4}>Additional Budget Information</Text>
            <Text size="sm" c="gray.7">{rfp.additionalBudgetInfo}</Text>
          </Paper>
        )}
      </Section>

      {/* Timeline & Deliverables */}
      <Section title="Timeline & Deliverables" icon={<Calendar size={20} />}>
        <Stack gap="md">
          {rfp.projectDateRange && (
            <Box>
              <Text size="sm" fw={500} c="gray.6" mb={4}>Expected Project Date Range</Text>
              <Text size="sm" fw={600} c="gray.9">{rfp.projectDateRange}</Text>
            </Box>
          )}
          {rfp.deadline && (
            <Box>
              <Text size="sm" fw={500} c="gray.6" mb={4}>Application Deadline</Text>
              <Group gap="xs">
                <Calendar size={16} color="var(--mantine-color-red-6)" />
                <Text size="sm" fw={600} c="red.6">{formatDate(rfp.deadline)}</Text>
              </Group>
            </Box>
          )}
          {rfp.demoRequirements && (
            <Box pt="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
              <Text size="sm" fw={500} c="gray.6" mb="xs">What Suppliers Need to Demonstrate</Text>
              <Text size="sm" c="gray.7" style={{ lineHeight: 1.6 }}>{rfp.demoRequirements}</Text>
            </Box>
          )}
        </Stack>
      </Section>

      {/* Provisions & Special Requests */}
      {rfp.provisionsSpecialRequests && (
        <Section title="Provisions & Special Requests" icon={<CheckCircle size={20} />}>
          <Stack gap="xs">
            {rfp.provisionsSpecialRequests.map((provision, idx) => (
              <Group key={idx} gap="xs" align="flex-start" wrap="nowrap">
                <CheckCircle size={20} color="var(--mantine-color-blue-6)" style={{ marginTop: 2, flexShrink: 0 }} />
                <Text size="sm" c="gray.7">{provision}</Text>
              </Group>
            ))}
          </Stack>
        </Section>
      )}
    </Stack>
  )
}

// ============================================================================
// SHARED COMPONENT IMPLEMENTATIONS
// ============================================================================
function RFPSnapshot({ rfp }) {
  return (
    <Paper shadow="xs" p="lg" mb="lg" withBorder>
      <Title order={2} size="lg" c="gray.9" mb="md">RFP Snapshot</Title>
      <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md">
        <SnapshotItem label="Replacing" value={rfp.replacing || "N/A"} />
        <SnapshotItem label="Decision Timeline" value={rfp.decisionTimeline || "N/A"} />
        <SnapshotItem label="Max Responses" value={rfp.maxResponses || "N/A"} />
        <SnapshotItem label="User Seats" value={rfp.userSeats || "N/A"} />
      </SimpleGrid>
    </Paper>
  )
}

function SnapshotItem({ label, value }) {
  return (
    <Box>
      <Text size="sm" c="gray.5" mb={4}>{label}</Text>
      <Text size="md" fw={600} c="gray.9">{value}</Text>
    </Box>
  )
}

function QuickStats({ rfp }) {
  return (
    <SimpleGrid cols={{ base: 1, md: 4 }} spacing="md" mb="lg">
      <StatCard
        icon={<Users size={20} />}
        label="Required Licenses"
        value={rfp.requiredLicenses || 0}
        color="blue"
      />
      <StatCard
        icon={<Clock size={20} />}
        label="Days to Decision"
        value={rfp.daysToDecision || 0}
        color="green"
      />
      <StatCard
        icon={<Target size={20} />}
        label="Max Vendors"
        value={rfp.maxVendors || 0}
        color="grape"
      />
      <StatCard
        icon={<CreditCard size={20} />}
        label="Billing Frequency"
        value={rfp.billingFrequency || "N/A"}
        color="orange"
      />
    </SimpleGrid>
  )
}

function StatCard({ icon, label, value, color }) {
  return (
    <Paper shadow="xs" p="md" withBorder>
      <ThemeIcon size="lg" radius="md" color={color} variant="light" mb="xs">
        {icon}
      </ThemeIcon>
      <Text size="xl" fw={700} c="gray.9">{value}</Text>
      <Text size="sm" c="gray.5">{label}</Text>
    </Paper>
  )
}

function MainContent({ rfp, formatDate }) {
  return (
    <Stack gap="lg">
      {/* Description */}
      <Section title="Project Description" icon={<FileText size={20} />}>
        <Text c="gray.7" style={{ lineHeight: 1.6 }}>{rfp.description}</Text>
      </Section>

      {/* Current Solution & Context */}
      {rfp.currentSolution && (
        <Section title="Current Solution & Replacement Context" icon={<RefreshCw size={20} />}>
          <Stack gap="sm">
            <InfoRow label="Current Solution" value={rfp.currentSolution} />
            <InfoRow label="Reason for Replacing" value={rfp.replacingReason} />
            <InfoRow label="Replacement Status" value={rfp.replacementStatus} />
            {rfp.competitiveRisk && (
              <Alert
                mt="md"
                color="yellow"
                variant="light"
                icon={<Zap size={20} />}
              >
                <Text fw={600} c="yellow.9" mb={4}>Competitive Risk</Text>
                <Text size="sm" c="yellow.8">{rfp.competitiveRisk}</Text>
              </Alert>
            )}
          </Stack>
        </Section>
      )}

      {/* Requirements */}
      <Section title="Requirements" icon={<CheckCircle size={20} />}>
        <Stack gap="xs">
          {rfp.requirements?.map((req, idx) => (
            <Group key={idx} gap="xs" align="flex-start" wrap="nowrap">
              <CheckCircle size={20} color="var(--mantine-color-green-6)" style={{ marginTop: 2, flexShrink: 0 }} />
              <Text c="gray.7">{req}</Text>
            </Group>
          ))}
        </Stack>
      </Section>

      {/* Deliverables */}
      <Section title="Deliverables" icon={<Target size={20} />}>
        <Stack gap="xs">
          {rfp.deliverables?.map((item, idx) => (
            <Group key={idx} gap="xs" align="flex-start" wrap="nowrap">
              <Target size={20} color="var(--mantine-color-blue-6)" style={{ marginTop: 2, flexShrink: 0 }} />
              <Text c="gray.7">{item}</Text>
            </Group>
          ))}
        </Stack>
      </Section>
    </Stack>
  )
}

function Section({ title, icon, children }) {
  return (
    <Paper shadow="xs" p="lg" withBorder radius="md">
      <Group gap="xs" mb="md">
        <Box c="blue.6">{icon}</Box>
        <Title order={3} size="lg" c="gray.9">{title}</Title>
      </Group>
      {children}
    </Paper>
  )
}

function InfoRow({ label, value }) {
  return (
    <Group gap="xs" align="flex-start" wrap="nowrap">
      <Text size="sm" fw={500} c="gray.5" style={{ minWidth: 160 }}>{label}:</Text>
      <Text size="sm" c="gray.9">{value}</Text>
    </Group>
  )
}
