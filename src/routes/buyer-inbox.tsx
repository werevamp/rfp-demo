import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Container, Title, Text, Stack, Paper, Group, Badge, Button, SimpleGrid, Box, Progress, Avatar, Select, Modal, Tabs, Table, Checkbox, TextInput, Divider } from '@mantine/core'
import { TrendingUp, TrendingDown, Users, FileText, ChevronRight, Eye, Download, BarChart3 } from 'lucide-react'
import { getAllBuyerIntakesArray, updateBuyerIntakeStatus } from '../utils/buyerIntakeStorage'
import { getResponsesForRFP, getTopMatch, getResponseStats, updateResponseStatus } from '../utils/vendorResponseStorage'
import { getVendorById } from '../utils/vendorStorage'
import fakeRFPDetails from '../data/fakeRFPDetails.json'

export const Route = createFileRoute('/buyer-inbox')({
  component: BuyerInbox,
})

function BuyerInbox() {
  const buyerRFPs = getAllBuyerIntakesArray()
  const [selectedRFP, setSelectedRFP] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)

  console.log('RFPs:', buyerRFPs)

  const handleViewRFP = (rfp) => {
    setSelectedRFP(rfp)
    setModalOpened(true)
  }

  const handleCloseModal = () => {
    setModalOpened(false)
    setSelectedRFP(null)
  }

  // Enrich RFPs with vendor response data - memoized to prevent recalculation on every render
  const enrichedRFPs = useMemo(() => {
    const enriched = buyerRFPs.map(rfp => {
      const responses = getResponsesForRFP(rfp.rfpId)
      const topMatch = getTopMatch(rfp.rfpId)
      const stats = getResponseStats(rfp.rfpId)

      return {
        ...rfp,
        responses,
        topMatch,
        stats,
        responseCount: responses.length
      }
    })

    // Sort RFPs:
    // 1. RFPs with responses (filled out) come first
    // 2. Within each group, sort by latest date first (most recent on top)
    return enriched.sort((a, b) => {
      // First priority: RFPs with responses come first
      if (a.responseCount > 0 && b.responseCount === 0) return -1
      if (a.responseCount === 0 && b.responseCount > 0) return 1

      // Second priority: Sort by date (latest first)
      const dateA = new Date(a.postedDate || a.createdAt || 0)
      const dateB = new Date(b.postedDate || b.createdAt || 0)
      return dateB - dateA // Descending order (latest first)
    })
  }, [buyerRFPs.length]) // Only recalculate when number of RFPs changes

  if (buyerRFPs.length === 0) {
    return (
      <Container size="xl" py="xl">
        <Stack gap="xl" align="center" py="xl">
          <FileText size={64} style={{ color: 'var(--mantine-color-gray-4)' }} />
          <Stack gap="sm" align="center">
            <Title order={2}>No RFPs Created Yet</Title>
            <Text size="lg" c="dimmed">
              Create your first RFP using the intake form to start receiving vendor responses
            </Text>
          </Stack>
        </Stack>
      </Container>
    )
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Box>
          <Title order={1} mb="md">Buyer RFP Inbox</Title>
          <Text size="lg" c="dimmed">
            Manage your RFPs and review vendor responses
          </Text>
        </Box>

        {/* Stats Overview */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
          <Paper withBorder p="md">
            <Group justify="space-between">
              <Stack gap={4}>
                <Text size="sm" c="dimmed">Total RFPs</Text>
                <Text size="xl" fw={700}>{buyerRFPs.length}</Text>
              </Stack>
              <FileText size={24} style={{ color: 'var(--mantine-color-blue-6)' }} />
            </Group>
          </Paper>

          <Paper withBorder p="md">
            <Group justify="space-between">
              <Stack gap={4}>
                <Text size="sm" c="dimmed">Total Responses</Text>
                <Text size="xl" fw={700}>
                  {enrichedRFPs.reduce((sum, rfp) => sum + rfp.responseCount, 0)}
                </Text>
              </Stack>
              <Users size={24} style={{ color: 'var(--mantine-color-green-6)' }} />
            </Group>
          </Paper>

          <Paper withBorder p="md">
            <Group justify="space-between">
              <Stack gap={4}>
                <Text size="sm" c="dimmed">Avg Response Rate</Text>
                <Text size="xl" fw={700}>
                  {buyerRFPs.length > 0
                    ? Math.round((enrichedRFPs.reduce((sum, rfp) => sum + rfp.responseCount, 0) / buyerRFPs.length) * 10) / 10
                    : 0}
                </Text>
              </Stack>
              <TrendingUp size={24} style={{ color: 'var(--mantine-color-teal-6)' }} />
            </Group>
          </Paper>

          <Paper withBorder p="md">
            <Group justify="space-between">
              <Stack gap={4}>
                <Text size="sm" c="dimmed">Open RFPs</Text>
                <Text size="xl" fw={700}>
                  {enrichedRFPs.filter(rfp => rfp.status === 'new' || rfp.status === 'Open').length}
                </Text>
              </Stack>
              <TrendingDown size={24} style={{ color: 'var(--mantine-color-orange-6)' }} />
            </Group>
          </Paper>
        </SimpleGrid>

        {/* RFP List */}
        <Stack gap="lg">
          {enrichedRFPs.map((rfp) => (
            <RFPCard key={rfp.rfpId} rfp={rfp} onViewRFP={handleViewRFP} />
          ))}
        </Stack>
      </Stack>

      {/* RFP Detail Modal */}
      <RFPDetailModal
        opened={modalOpened}
        onClose={handleCloseModal}
        rfp={selectedRFP}
      />
    </Container>
  )
}

function RFPCard({ rfp, onViewRFP }) {
  const { title, company, budget, deadline, postedDate, status, responseCount, topMatch, stats, responses } = rfp

  const deadlineDate = new Date(deadline)
  const postedDateObj = postedDate ? new Date(postedDate) : null
  const isExpired = deadlineDate < new Date()
  const maxResponsesReached = rfp.maxResponses && stats.shortlisted >= rfp.maxResponses

  // Normalize legacy status values
  const normalizedStatus = (status === 'new' || !status) ? 'Open' : status

  // Determine automatic status based on conditions
  // Default to 'Open' if no status is set
  const autoStatus = (isExpired || maxResponsesReached) ? 'Closed' : normalizedStatus

  // Local state for status (initialized with current status)
  const [currentStatus, setCurrentStatus] = useState(autoStatus)

  // Status color mapping
  const statusColors = {
    'Open': 'green',
    'Closed': 'red',
    'In Review': 'blue',
    'Completed': 'gray'
  }

  // Handle status change
  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus)
    updateBuyerIntakeStatus(rfp.rfpId, newStatus)
  }

  return (
    <Paper withBorder p="lg" radius="md">
      <Stack gap="md">
        {/* Header Row */}
        <Group justify="space-between" align="flex-start">
          <Box style={{ flex: 1 }}>
            <Group gap="sm" mb="xs">
              <Title order={3}>{title || 'Untitled RFP'}</Title>
              <Select
                value={currentStatus}
                onChange={handleStatusChange}
                data={['Open', 'Closed', 'In Review', 'Completed']}
                w={140}
                size="xs"
                styles={{
                  input: {
                    backgroundColor: `var(--mantine-color-${statusColors[currentStatus]}-1)`,
                    color: `var(--mantine-color-${statusColors[currentStatus]}-7)`,
                    fontWeight: 600,
                    border: `1px solid var(--mantine-color-${statusColors[currentStatus]}-4)`,
                  }
                }}
              />
            </Group>
            <Group gap="md">
              <Text size="sm" c="dimmed">{rfp.rfpId}</Text>
              <Text size="sm" c="dimmed">•</Text>
              {postedDateObj && (
                <>
                  <Text size="sm" c="dimmed">Posted: {postedDateObj.toLocaleDateString()}</Text>
                  <Text size="sm" c="dimmed">•</Text>
                </>
              )}
              <Text size="sm" c="dimmed">Deadline: {deadlineDate.toLocaleDateString()}</Text>
            </Group>
          </Box>

          <Group gap="md" align="flex-start">
            <Button
              variant="light"
              leftSection={<Eye size={16} />}
              onClick={() => onViewRFP(rfp)}
              size="sm"
            >
              View RFP
            </Button>

            {topMatch && (
              <Box>
                <Text size="xs" c="dimmed" mb={4} ta="right">Top match</Text>
                <Group gap="xs" justify="flex-end">
                  <Box style={{ width: 60 }}>
                    <Progress value={topMatch.matchPercentage} size="sm" color="green" />
                  </Box>
                  <Text size="sm" fw={700} c="green">{topMatch.matchPercentage}%</Text>
                  <TrendingUp size={16} style={{ color: 'var(--mantine-color-green-6)' }} />
                </Group>
              </Box>
            )}
          </Group>
        </Group>

        {/* Response Stats */}
        <Group gap="lg">
          <Group gap="xs">
            <Text size="sm" fw={600}>Shortlisted</Text>
            <Badge variant="light">{stats.shortlisted}/{rfp.maxResponses || stats.total}</Badge>
          </Group>

          {stats.shortlisted > 0 && (
            <Group gap="xs">
              <Text size="sm" c="dimmed">Shortlisted:</Text>
              <Text size="sm" fw={600}>{stats.shortlisted}</Text>
            </Group>
          )}

          {stats.evaluating > 0 && (
            <Group gap="xs">
              <Text size="sm" c="dimmed">Evaluating:</Text>
              <Text size="sm" fw={600}>{stats.evaluating}</Text>
            </Group>
          )}

          {stats.won > 0 && (
            <Group gap="xs">
              <Text size="sm" c="dimmed">Won:</Text>
              <Text size="sm" fw={600} c="green">{stats.won}</Text>
            </Group>
          )}
        </Group>

        {/* Vendor List */}
        {responses.length > 0 && (
          <Stack gap="sm">
            {responses.map((response) => (
              <VendorResponseRow key={response.vendorId} response={response} rfpId={rfp.rfpId} />
            ))}
          </Stack>
        )}

        {responses.length === 0 && (
          <Paper bg="gray.0" p="md" radius="sm">
            <Text size="sm" c="dimmed" ta="center">No vendor responses yet</Text>
          </Paper>
        )}
      </Stack>
    </Paper>
  )
}

function VendorResponseRow({ response, rfpId }) {
  const vendor = getVendorById(response.vendorId)
  const [currentStatus, setCurrentStatus] = useState(response.status)

  if (!vendor) return null

  // Status badge colors
  const statusColors = {
    'responded': 'blue',
    'shortlisted': 'purple',
    'evaluating': 'yellow',
    'won': 'green',
    'lost': 'red',
    'declined': 'gray'
  }

  // Status labels
  const statusLabels = {
    'responded': 'Responded',
    'shortlisted': 'Shortlisted',
    'evaluating': 'Evaluating',
    'won': 'Won',
    'lost': 'Lost',
    'declined': 'Declined'
  }

  // Handle status change
  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus)
    updateResponseStatus(rfpId, response.vendorId, newStatus)
  }

  // Check if incumbent
  const isIncumbent = vendor.isIncumbent

  return (
    <Paper withBorder p="md" radius="sm">
      <Group justify="space-between" wrap="nowrap">
        <Group gap="md" style={{ flex: 1 }}>
          <Avatar color="blue" radius="sm" size="md">
            {vendor.shortName?.substring(0, 2).toUpperCase() || vendor.companyName?.substring(0, 2).toUpperCase()}
          </Avatar>

          <Box style={{ flex: 1 }}>
            <Group gap="xs" mb={4}>
              <Text fw={600}>{vendor.companyName}</Text>
              {isIncumbent && (
                <Badge size="sm" variant="light" color="green">Current supplier</Badge>
              )}
            </Group>
            <Text size="xs" c="dimmed">{vendor.location}</Text>
          </Box>
        </Group>

        <Group gap="md" wrap="nowrap">
          <Select
            value={currentStatus}
            onChange={handleStatusChange}
            data={[
              { value: 'responded', label: 'Responded' },
              { value: 'shortlisted', label: 'Shortlisted' },
              { value: 'evaluating', label: 'Evaluating' },
              { value: 'won', label: 'Won' },
              { value: 'lost', label: 'Lost' },
              { value: 'declined', label: 'Declined' }
            ]}
            w={140}
            size="xs"
          />

          <Box style={{ width: 80 }}>
            <Progress
              value={response.matchPercentage || 0}
              size="sm"
              color={response.matchPercentage >= 80 ? 'green' : response.matchPercentage >= 60 ? 'yellow' : 'red'}
            />
            <Text size="xs" c="dimmed" mt={2} ta="center">
              {response.matchPercentage}% match
            </Text>
          </Box>

          <Button
            variant="light"
            size="sm"
            rightSection={<ChevronRight size={16} />}
          >
            Review response
          </Button>
        </Group>
      </Group>
    </Paper>
  )
}

function RFPDetailModal({ opened, onClose, rfp }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedVendors, setSelectedVendors] = useState(['vendor-1', 'vendor-2'])
  const [vendorStages, setVendorStages] = useState({
    'vendor-1': 'Shortlisted',
    'vendor-2': 'Responded',
    'vendor-3': 'Responded'
  })

  if (!rfp) return null

  const deadlineDate = rfp.deadline ? new Date(rfp.deadline) : null
  const postedDate = rfp.postedDate ? new Date(rfp.postedDate) : null

  const handleVendorStageChange = (vendorId, newStage) => {
    setVendorStages(prev => ({ ...prev, [vendorId]: newStage }))
  }

  const toggleVendorSelection = (vendorId) => {
    setSelectedVendors(prev =>
      prev.includes(vendorId)
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    )
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="1400px"
      radius="md"
      padding={0}
      styles={{
        body: { padding: 0 },
        header: { padding: '20px 24px', borderBottom: '1px solid var(--mantine-color-gray-2)' }
      }}
    >
      {/* Modal Header */}
      <Box p="lg" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
        <Group justify="space-between" align="flex-start" mb="sm">
          <Box style={{ flex: 1 }}>
            <Text size="xs" c="dimmed" mb={4}>
              {rfp.rfpId} • Posted {postedDate?.toLocaleDateString()} • Decision by {deadlineDate?.toLocaleDateString()}
            </Text>
            <Title order={2} size="h3" mb="xs">
              {rfp.title || 'Untitled RFP'}
            </Title>
            <Group gap="md">
              <Badge variant="light">Legal Services</Badge>
              <Badge variant="filled" color="orange">Evaluating</Badge>
              <Text size="sm" c="dimmed">3/8 responses</Text>
            </Group>
          </Box>

          <Group gap="sm">
            <Select
              value="Evaluating"
              data={['Open', 'Evaluating', 'Closed', 'Completed']}
              w={140}
              size="sm"
              styles={{
                input: {
                  fontWeight: 600
                }
              }}
            />
            <Button onClick={onClose} variant="subtle" color="gray">
              Close
            </Button>
          </Group>
        </Group>
      </Box>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List style={{ paddingLeft: 24, paddingRight: 24, borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
          <Tabs.Tab value="overview">Overview</Tabs.Tab>
          <Tabs.Tab value="responses">Responses</Tabs.Tab>
          <Tabs.Tab value="compare">Compare</Tabs.Tab>
          <Tabs.Tab value="documents">Documents</Tabs.Tab>
          <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
        </Tabs.List>

        <Box p="xl" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {/* Overview Tab */}
          <Tabs.Panel value="overview">
            <OverviewTab rfp={rfp} />
          </Tabs.Panel>

          {/* Responses Tab */}
          <Tabs.Panel value="responses">
            <ResponsesTab vendorStages={vendorStages} onStageChange={handleVendorStageChange} />
          </Tabs.Panel>

          {/* Compare Tab */}
          <Tabs.Panel value="compare">
            <CompareTab
              selectedVendors={selectedVendors}
              onToggleVendor={toggleVendorSelection}
              vendorStages={vendorStages}
            />
          </Tabs.Panel>

          {/* Documents Tab */}
          <Tabs.Panel value="documents">
            <DocumentsTab />
          </Tabs.Panel>

          {/* Analytics Tab */}
          <Tabs.Panel value="analytics">
            <AnalyticsTab vendorStages={vendorStages} />
          </Tabs.Panel>
        </Box>
      </Tabs>
    </Modal>
  )
}

// Overview Tab Component
function OverviewTab({ rfp }) {
  const totalResponses = fakeRFPDetails.vendors.length
  const avgScore = Math.round(fakeRFPDetails.vendors.reduce((sum, v) => sum + v.score, 0) / totalResponses)
  const shortlistedCount = fakeRFPDetails.vendors.filter(v => v.stage === 'Shortlisted').length

  return (
    <Group align="flex-start" gap="xl" wrap="nowrap">
      {/* Left Side: Project Overview */}
      <Box style={{ flex: 1 }}>
        <Title order={3} mb="sm">Project Overview</Title>
        <Text size="sm" c="dimmed" mb="xl">
          {rfp.company || 'Metro Office Spaces LLC'}
        </Text>

        <Text size="sm" mb="xl">
          We need legal representation for negotiating and finalizing a commercial office lease for our new HQ (approx. 25,000 sq ft). Includes tenant improvement allowances, expansion options, and specific technology requirements.
        </Text>

        <SimpleGrid cols={2} spacing="lg">
          <Box>
            <Text size="xs" c="dimmed" mb="xs">Practice Groups</Text>
            <Text size="sm" fw={500}>Real Estate, Commercial Leasing</Text>
          </Box>

          <Box>
            <Text size="xs" c="dimmed" mb="xs">Experience</Text>
            <Text size="sm" fw={500}>Mid–Senior associate with lease experience</Text>
          </Box>

          <Box>
            <Text size="xs" c="dimmed" mb="xs">Jurisdiction</Text>
            <Text size="sm" fw={500}>Illinois</Text>
          </Box>

          <Box>
            <Text size="xs" c="dimmed" mb="xs">Languages</Text>
            <Text size="sm" fw={500}>English</Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Right Side: At a glance */}
      <Paper withBorder p="lg" radius="md" style={{ minWidth: 300 }}>
        <Title order={4} mb="md">At a glance</Title>
        <Text size="xs" c="dimmed" mb="xs">Quick metrics</Text>

        <Divider my="md" />

        <Stack gap="lg">
          <Box>
            <Text size="sm" c="dimmed" mb={4}>Responses</Text>
            <Text size="xl" fw={700}>{totalResponses}/8</Text>
          </Box>

          <Box>
            <Text size="sm" c="dimmed" mb={4}>Avg score (est.)</Text>
            <Text size="xl" fw={700}>{avgScore}%</Text>
          </Box>

          <Box>
            <Text size="sm" c="dimmed" mb={4}>Shortlist</Text>
            <Text size="xl" fw={700}>{shortlistedCount}</Text>
          </Box>

          <Box>
            <Text size="sm" c="dimmed" mb={4}>Budget</Text>
            <Text size="xl" fw={700}>$600k - $900k</Text>
          </Box>
        </Stack>

        <Divider my="md" />

        <Button
          variant="light"
          fullWidth
          leftSection={<Download size={16} />}
        >
          Export summary
        </Button>
      </Paper>
    </Group>
  )
}

// Responses Tab Component
function ResponsesTab({ vendorStages, onStageChange }) {
  return (
    <Stack gap="lg">
      <Box>
        <Title order={3} mb="xs">Vendors</Title>
        <Text size="sm" c="dimmed">Manage stages and review submissions</Text>
      </Box>

      <Stack gap="md">
        {fakeRFPDetails.vendors.map((vendor) => (
          <Paper key={vendor.id} withBorder p="md" radius="sm">
            <Group justify="space-between" wrap="nowrap">
              <Group gap="md" style={{ flex: 1 }}>
                <Avatar color="blue" radius="sm" size="md">
                  {vendor.shortName}
                </Avatar>

                <Box style={{ flex: 1 }}>
                  <Group gap="xs" mb={4}>
                    <Text fw={600}>{vendor.name}</Text>
                    {vendor.isCurrentSupplier && (
                      <Badge size="sm" variant="light" color="green">Current supplier</Badge>
                    )}
                  </Group>
                </Box>
              </Group>

              <Group gap="md" wrap="nowrap">
                <Select
                  value={vendorStages[vendor.id]}
                  onChange={(value) => onStageChange(vendor.id, value)}
                  data={['Responded', 'Shortlisted', 'Evaluating', 'Won', 'Lost', 'Declined']}
                  w={140}
                  size="xs"
                />

                <Box style={{ width: 60 }}>
                  <Text size="sm" fw={700} ta="center">{vendor.score}%</Text>
                  <Text size="xs" c="dimmed" ta="center">Score</Text>
                </Box>

                <Box style={{ width: 100 }}>
                  <Progress value={vendor.completion} size="sm" />
                  <Text size="xs" c="dimmed" mt={2} ta="center">{vendor.completion}%</Text>
                </Box>

                <Group gap="xs">
                  <Button variant="light" size="sm">Review</Button>
                  <Button variant="filled" size="sm" color="dark">Shortlist</Button>
                  <Button variant="subtle" size="sm" color="red">Decline</Button>
                </Group>
              </Group>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Stack>
  )
}

// Compare Tab Component
function CompareTab({ selectedVendors, onToggleVendor, vendorStages }) {
  const selectedVendorData = fakeRFPDetails.vendors.filter(v => selectedVendors.includes(v.id))

  return (
    <Stack gap="lg">
      <Box>
        <Title order={3} mb="xs">Build your comparison</Title>
        <Text size="sm" c="dimmed">Select vendors to compare side-by-side</Text>
      </Box>

      {/* Vendor Selection */}
      <Group gap="md">
        {fakeRFPDetails.vendors.map((vendor) => (
          <Button
            key={vendor.id}
            variant={selectedVendors.includes(vendor.id) ? 'filled' : 'outline'}
            onClick={() => onToggleVendor(vendor.id)}
            leftSection={
              <Checkbox
                checked={selectedVendors.includes(vendor.id)}
                onChange={() => {}}
                size="xs"
              />
            }
            rightSection={
              <Badge size="sm" variant="light" color={vendor.stage === 'Shortlisted' ? 'orange' : 'blue'}>
                {vendorStages[vendor.id]}
              </Badge>
            }
          >
            {vendor.name}
          </Button>
        ))}
      </Group>

      {/* Comparison Table */}
      <Box>
        <Title order={4} mb="md">Side-by-side responses</Title>
        <Text size="sm" c="dimmed" mb="lg">
          Assign weights (total 100) and score each vendor per question. Overall score shows at top; click to jump to bottom controls.
        </Text>

        <Table withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: 250 }}></Table.Th>
              <Table.Th style={{ width: 100, textAlign: 'center' }}>
                <Text size="xs" c="dimmed" mb={4}>WEIGHT (OUT OF 100)</Text>
              </Table.Th>
              {selectedVendorData.map((vendor) => (
                <Table.Th key={vendor.id}>
                  <Box>
                    <Text fw={600} mb={4}>{vendor.name}</Text>
                    <Text size="xs" c="dimmed">Score: 0.0%</Text>
                  </Box>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {fakeRFPDetails.questions.map((question) => (
              <Table.Tr key={question.id}>
                <Table.Td>
                  <Text size="sm" fw={500}>{question.text}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: 'center' }}>
                  <Text size="lg" fw={600}>{question.weight}</Text>
                </Table.Td>
                {selectedVendorData.map((vendor) => (
                  <Table.Td key={vendor.id}>
                    <Text size="sm" mb="xs">{vendor.responses[Object.keys(vendor.responses)[fakeRFPDetails.questions.indexOf(question)]]}</Text>
                    <Group gap="xs">
                      <Text size="xs" c="dimmed">Score</Text>
                      <TextInput
                        size="xs"
                        w={60}
                        defaultValue="0"
                        rightSection={<Text size="xs" c="dimmed">/ 100</Text>}
                      />
                    </Group>
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>
    </Stack>
  )
}

// Documents Tab Component
function DocumentsTab() {
  return (
    <Group align="flex-start" gap="xl" wrap="nowrap">
      {/* Left Side: Buyer Attachments */}
      <Box style={{ flex: 1 }}>
        <Title order={3} mb="xs">Buyer Attachments</Title>
        <Text size="sm" c="dimmed" mb="lg">Original RFP materials</Text>

        <Stack gap="md">
          {fakeRFPDetails.documents.buyerAttachments.map((doc) => (
            <Paper key={doc.id} withBorder p="md" radius="sm">
              <Group justify="space-between">
                <Group gap="md">
                  <FileText size={24} />
                  <Box>
                    <Text fw={600}>{doc.name}</Text>
                    <Text size="xs" c="dimmed">{doc.type} • {doc.size}</Text>
                  </Box>
                </Group>
                <Button variant="light" size="sm">Preview</Button>
              </Group>
            </Paper>
          ))}

          <Button variant="outline" fullWidth>
            Upload addendum
          </Button>
        </Stack>
      </Box>

      {/* Right Side: Provider Uploads */}
      <Box style={{ flex: 1 }}>
        <Title order={3} mb="xs">Provider Uploads</Title>
        <Text size="sm" c="dimmed" mb="lg">Filter by vendor</Text>

        <Paper bg="gray.0" p="xl" radius="sm">
          <Text size="sm" c="dimmed" ta="center">
            (Placeholder) Show a list grouped by vendor with preview/download.
          </Text>
        </Paper>
      </Box>
    </Group>
  )
}

// Analytics Tab Component
function AnalyticsTab({ vendorStages }) {
  return (
    <Group align="flex-start" gap="xl" wrap="nowrap">
      {/* Left Side: Scoring & Distribution */}
      <Box style={{ flex: 1 }}>
        <Title order={3} mb="xs">Scoring & distribution</Title>
        <Text size="sm" c="dimmed" mb="lg">Quick visual summary</Text>

        <Stack gap="lg">
          {fakeRFPDetails.vendors.map((vendor) => (
            <Box key={vendor.id}>
              <Group justify="space-between" mb="xs">
                <Group gap="sm">
                  <Text fw={600}>{vendor.name}</Text>
                  <Badge size="sm" variant="light" color={vendor.stage === 'Shortlisted' ? 'orange' : 'blue'}>
                    {vendorStages[vendor.id]}
                  </Badge>
                </Group>
              </Group>

              <Box mb="sm">
                <Text size="xs" c="dimmed" mb={4}>Score {vendor.score}%</Text>
                <Progress value={vendor.score} size="lg" color={vendor.score >= 80 ? 'green' : vendor.score >= 70 ? 'yellow' : 'red'} />
              </Box>

              <Box>
                <Text size="xs" c="dimmed" mb={4}>Completion {vendor.completion}%</Text>
                <Progress value={vendor.completion} size="lg" color="dark" />
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Right Side: Milestones */}
      <Paper withBorder p="lg" radius="md" style={{ minWidth: 300 }}>
        <Title order={4} mb="md">Milestones</Title>
        <Text size="xs" c="dimmed" mb="lg">Timeline health</Text>

        <Stack gap="lg">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">Posted</Text>
            <Text size="sm" fw={600}>{fakeRFPDetails.milestones.posted}</Text>
          </Group>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">Due</Text>
            <Text size="sm" fw={600}>{fakeRFPDetails.milestones.due}</Text>
          </Group>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">Avg response time</Text>
            <Text size="sm" fw={600}>{fakeRFPDetails.milestones.avgResponseTime}</Text>
          </Group>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">Bid range</Text>
            <Text size="sm" fw={600}>{fakeRFPDetails.milestones.bidRange}</Text>
          </Group>
        </Stack>
      </Paper>
    </Group>
  )
}
