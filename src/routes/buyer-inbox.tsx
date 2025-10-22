import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Container, Title, Text, Stack, Paper, Group, Badge, Button, SimpleGrid, Box, Progress, Avatar, Select } from '@mantine/core'
import { TrendingUp, TrendingDown, Users, FileText, ChevronRight, Eye, Plus } from 'lucide-react'
import { getAllBuyerIntakesArray, updateBuyerIntakeStatus } from '../utils/buyerIntakeStorage'
import { getResponsesForRFP, getTopMatch, getResponseStats, updateResponseStatus } from '../utils/vendorResponseStorage'
import { getVendorById } from '../utils/vendorStorage'

export const Route = createFileRoute('/buyer-inbox')({
  component: BuyerInbox,
})

function BuyerInbox() {
  const buyerRFPs = getAllBuyerIntakesArray()

  console.log('RFPs:', buyerRFPs)

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
        <Stack gap="xl" align="center" py={80}>
          <FileText size={80} style={{ color: 'var(--mantine-color-gray-4)' }} />
          <Stack gap="md" align="center" maw={500}>
            <Title order={2}>No RFPs Created Yet</Title>
            <Text size="lg" c="dimmed" ta="center">
              Create your first RFP to start receiving proposals from qualified vendors. Our guided intake process makes it easy to define your requirements.
            </Text>
          </Stack>
          <Button
            component={Link}
            to="/intake"
            leftSection={<Plus size={20} />}
            size="lg"
            mt="md"
          >
            Create Your First RFP
          </Button>
        </Stack>
      </Container>
    )
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Box>
            <Title order={1} mb="md">Buyer RFP Inbox</Title>
            <Text size="lg" c="dimmed">
              Manage your RFPs and review vendor responses
            </Text>
          </Box>
          <Button
            component={Link}
            to="/intake"
            leftSection={<Plus size={20} />}
            size="md"
          >
            Create RFP
          </Button>
        </Group>

        {/* RFP List */}
        <Stack gap="lg">
          {enrichedRFPs.map((rfp) => (
            <RFPCard key={rfp.rfpId} rfp={rfp} />
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}

function RFPCard({ rfp }) {
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
              component={Link}
              to="/buyer-rfp/$rfpId"
              params={{ rfpId: rfp.rfpId }}
              variant="light"
              leftSection={<Eye size={16} />}
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
