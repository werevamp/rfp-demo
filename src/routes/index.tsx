import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Briefcase, TrendingUp, ArrowUpDown, Eye, EyeOff, Heart, FileEdit, ArrowRight, Clock, CheckCircle, Filter, Trash2, Database } from 'lucide-react'
import { Tabs, Select, SimpleGrid, Text, Title, Group, Stack, Badge, Button, Paper, Progress, Box, Flex, Modal } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { mockRFPs } from '../data/mockRFPs'
import RFPCard from '../components/RFPCard'
import TailwindTest from '../components/TailwindTest'
import { isRFPViewed, getInterestedCount, isRFPInterested, getRFPInterest } from '../utils/rfpStorage'
import { getGlobalAnswers, getQuestionResponses } from '../utils/questionStorage'
import { defaultRFPQuestions } from '../data/questionTemplates'
import { getAllBuyerIntakesArray, clearAllBuyerIntakes } from '../utils/buyerIntakeStorage'
import { transformAllIntakesToRFPs } from '../utils/intakeToRFP'

export const Route = createFileRoute('/')({
  component: RFPInbox,
})

function RFPInbox() {
  // Temporarily show test component - remove this after testing
  const showTest = new URLSearchParams(window.location.search).get('test') === 'true'

  if (showTest) {
    return <TailwindTest />
  }

  const [activeTab, setActiveTab] = useState('available')
  const [sortOption, setSortOption] = useState('newest-posted')
  const [viewFilter, setViewFilter] = useState('all') // 'all' or 'unviewed'
  const [rfpTypeFilter, setRfpTypeFilter] = useState('all') // 'all', 'legal-tech', or 'legal-services'
  const [cacheRefresh, setCacheRefresh] = useState(0) // Used to trigger re-render after cache clear
  const [clearCacheModalOpened, setClearCacheModalOpened] = useState(false)

  // Merge mock RFPs with buyer intake submissions
  const allRFPs = useMemo(() => {
    const buyerIntakes = getAllBuyerIntakesArray()
    const transformedIntakes = transformAllIntakesToRFPs(buyerIntakes)
    return [...transformedIntakes, ...mockRFPs]
  }, [cacheRefresh]) // Re-compute when cache is cleared

  // Console log all RFPs
  console.log('All RFPs:', allRFPs)

  const buyerIntakeCount = getAllBuyerIntakesArray().length

  const handleClearCache = () => {
    clearAllBuyerIntakes()
    setCacheRefresh(prev => prev + 1) // Trigger re-render
    setClearCacheModalOpened(false)
    notifications.show({
      title: 'Cache Cleared',
      message: `Successfully cleared ${buyerIntakeCount} buyer intake RFP${buyerIntakeCount !== 1 ? 's' : ''} from cache`,
      color: 'green',
      icon: <Trash2 size={16} />,
      autoClose: 5000,
    })
  }

  // Sorting function
  const sortRFPs = (rfps, option) => {
    const sorted = [...rfps]

    switch (option) {
      case 'newest-posted':
        return sorted.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime())

      case 'deadline-soonest':
        return sorted.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())

      case 'deadline-latest':
        return sorted.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())

      case 'budget-highest':
        return sorted.sort((a, b) => {
          const aMax = parseInt(a.budget.split('-')[1].replace(/[^\d]/g, ''))
          const bMax = parseInt(b.budget.split('-')[1].replace(/[^\d]/g, ''))
          return bMax - aMax
        })

      case 'budget-lowest':
        return sorted.sort((a, b) => {
          const aMin = parseInt(a.budget.split('-')[0].replace(/[^\d]/g, ''))
          const bMin = parseInt(b.budget.split('-')[0].replace(/[^\d]/g, ''))
          return aMin - bMin
        })

      default:
        return sorted
    }
  }

  // Helper function to check if user has started filling out an RFP
  const hasStartedRFP = (rfpId) => {
    const responses = getQuestionResponses(rfpId)
    return Object.keys(responses).length > 0
  }

  // Filter RFPs based on active tab
  const tabFilteredRFPs = allRFPs.filter(rfp => {
    const interested = isRFPInterested(rfp.id)
    const started = hasStartedRFP(rfp.id)

    switch (activeTab) {
      case 'available':
        // Not started and not submitted
        return !started && !interested
      case 'pending':
        // Started filling out questions
        return started && !interested
      case 'completed':
        // Submitted application
        return interested
      default:
        return true
    }
  })

  // Filter RFPs based on view status (only for Available tab)
  const viewFilteredRFPs = activeTab === 'available' && viewFilter === 'unviewed'
    ? tabFilteredRFPs.filter(rfp => !isRFPViewed(rfp.id))
    : tabFilteredRFPs

  // Filter RFPs based on type (only for Available tab)
  const filteredRFPs = activeTab === 'available' && rfpTypeFilter !== 'all'
    ? viewFilteredRFPs.filter(rfp => {
        if (rfpTypeFilter === 'legal-tech') {
          return rfp.rfpType === 'legal-tech-new' || rfp.rfpType === 'legal-tech-replace'
        }
        if (rfpTypeFilter === 'legal-services') {
          return rfp.rfpType === 'lawfirm' || rfp.rfpType === 'alsp'
        }
        return rfp.rfpType === rfpTypeFilter
      })
    : viewFilteredRFPs

  const sortedRFPs = activeTab === 'available' ? sortRFPs(filteredRFPs, sortOption) : filteredRFPs

  // Calculate tab counts
  const availableCount = allRFPs.filter(rfp => !hasStartedRFP(rfp.id) && !isRFPInterested(rfp.id)).length
  const pendingCount = allRFPs.filter(rfp => hasStartedRFP(rfp.id) && !isRFPInterested(rfp.id)).length
  const completedCount = allRFPs.filter(rfp => isRFPInterested(rfp.id)).length

  const totalRFPs = allRFPs.length
  const unviewedRFPs = allRFPs.filter(rfp => !isRFPViewed(rfp.id)).length
  const interestedRFPs = getInterestedCount()
  const highValueRFPs = allRFPs.filter(rfp => {
    const amount = parseInt(rfp.budget.replace(/[^\d]/g, ''))
    return amount >= 100000
  }).length

  // Calculate global answers completion
  const globalAnswers = getGlobalAnswers()
  const answeredQuestions = Object.keys(globalAnswers).filter(key => {
    const value = globalAnswers[key]
    // Check if value is not empty
    if (typeof value === 'string') return value.trim().length > 0
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object' && value !== null) {
      // For objects like {selected: [], otherText: ''}
      if (value.selected) return value.selected.length > 0
      return Object.keys(value).length > 0
    }
    return false
  }).length
  const totalQuestions = defaultRFPQuestions.length
  const completionPercentage = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0

  return (
    <Stack gap="xl">
      {/* Header Section */}
      <Flex justify="space-between" align="flex-start" gap="xl">
        <Box style={{ flex: 1 }}>
          <Title order={1} size="h1" mb="md">
            RFP Opportunities
          </Title>
          <Text size="lg" c="dimmed">
            Discover and apply to high-quality Request for Proposals from leading companies worldwide.
          </Text>
        </Box>

        <Group gap="md">
          {/* Cache Info & Clear Button */}
          {buyerIntakeCount > 0 && (
            <Paper bg="orange.0" withBorder p="sm" style={{ borderColor: 'var(--mantine-color-orange-2)' }}>
              <Group justify="space-between" gap="xs" mb="xs">
                <Group gap="xs">
                  <Database style={{ width: 16, height: 16, color: 'var(--mantine-color-orange-6)' }} />
                  <Text size="sm" fw={600}>Buyer Cache</Text>
                </Group>
                <Badge size="sm" color="orange">{buyerIntakeCount}</Badge>
              </Group>
              <Text size="xs" c="dimmed" mb="xs">
                {buyerIntakeCount} RFP{buyerIntakeCount !== 1 ? 's' : ''} in localStorage
              </Text>
              <Button
                fullWidth
                size="xs"
                color="orange"
                variant="light"
                leftSection={<Trash2 style={{ width: 12, height: 12 }} />}
                onClick={() => setClearCacheModalOpened(true)}
              >
                Clear Cache
              </Button>
            </Paper>
          )}

          {/* Pre-fill Answers Card - Compact */}
          <Paper bg="indigo.0" withBorder p="sm" style={{ borderColor: 'var(--mantine-color-indigo-2)' }}>
            <Group justify="space-between" gap="xs" mb="xs">
              <Group gap="xs">
                <FileEdit style={{ width: 16, height: 16, color: 'var(--mantine-color-indigo-6)' }} />
                <Text size="sm" fw={600}>Pre-fill Answers</Text>
              </Group>
              <Text size="sm" fw={700} c="indigo.6">{completionPercentage}%</Text>
            </Group>
            <Text size="xs" c="dimmed" mb="xs">
              {answeredQuestions} of {totalQuestions} questions
            </Text>
            <Button
              component={Link}
              to="/my-answers"
              fullWidth
              size="xs"
              color="indigo"
              rightSection={<ArrowRight style={{ width: 12, height: 12 }} />}
            >
              {completionPercentage === 0 ? 'Get Started' : 'Edit Answers'}
            </Button>
          </Paper>
        </Group>
      </Flex>

      {/* Clear Cache Confirmation Modal */}
      <Modal
        opened={clearCacheModalOpened}
        onClose={() => setClearCacheModalOpened(false)}
        title="Clear Buyer RFP Cache?"
        centered
      >
        <Stack gap="md">
          <Text size="sm">
            This will remove <Text component="span" fw={600}>{buyerIntakeCount} buyer intake RFP{buyerIntakeCount !== 1 ? 's' : ''}</Text> from localStorage.
            Mock RFPs will not be affected.
          </Text>
          <Text size="sm" c="dimmed">
            This action cannot be undone. You'll need to resubmit intake forms to recreate these RFPs.
          </Text>
          <Group justify="flex-end" gap="xs">
            <Button variant="default" onClick={() => setClearCacheModalOpened(false)}>
              Cancel
            </Button>
            <Button color="red" leftSection={<Trash2 size={16} />} onClick={handleClearCache}>
              Clear Cache
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Opportunities"
          value={totalRFPs}
          subtitle="Active RFPs"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
        />
        <StatsCard
          title="Unviewed"
          value={unviewedRFPs}
          subtitle="Not yet viewed"
          bgColor="bg-emerald-50"
          textColor="text-emerald-600"
          icon={<EyeOff className="h-5 w-5" />}
        />
        <StatsCard
          title="Interested"
          value={interestedRFPs}
          subtitle="Marked as interested"
          bgColor="bg-pink-50"
          textColor="text-pink-600"
          icon={<Heart className="h-5 w-5" />}
        />
        <StatsCard
          title="Premium Projects"
          value={highValueRFPs}
          subtitle="$100K+ budget"
          bgColor="bg-amber-50"
          textColor="text-amber-600"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div> */}

      {/* RFP Grid */}
      <Box>
        {/* Tabs */}
        <Tabs value={activeTab} onChange={setActiveTab} mb="lg">
          <Tabs.List>
            <Tabs.Tab
              value="available"
              leftSection={<Briefcase style={{ width: 20, height: 20 }} />}
              rightSection={<Badge size="sm" variant={activeTab === 'available' ? 'filled' : 'light'}>{availableCount}</Badge>}
            >
              Available
            </Tabs.Tab>
            <Tabs.Tab
              value="pending"
              leftSection={<Clock style={{ width: 20, height: 20 }} />}
              rightSection={<Badge size="sm" variant={activeTab === 'pending' ? 'filled' : 'light'}>{pendingCount}</Badge>}
            >
              In Progress
            </Tabs.Tab>
            <Tabs.Tab
              value="completed"
              leftSection={<CheckCircle style={{ width: 20, height: 20 }} />}
              rightSection={<Badge size="sm" variant={activeTab === 'completed' ? 'filled' : 'light'}>{completedCount}</Badge>}
            >
              Completed
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>

        {/* Filters - Below Tabs */}
        <Flex justify="space-between" align="center" gap="md" mb="lg">
          {activeTab === 'available' && (
            <Group gap="md">
              <Select
                value={rfpTypeFilter}
                onChange={(value) => setRfpTypeFilter(value || 'all')}
                data={[
                  { value: 'all', label: 'All Types' },
                  { value: 'legal-tech', label: 'Legal Tech' },
                  { value: 'legal-services', label: 'Legal Services' },
                ]}
                leftSection={<Filter style={{ width: 16, height: 16 }} />}
                size="sm"
                w={180}
              />
              <Select
                value={viewFilter}
                onChange={(value) => setViewFilter(value || 'all')}
                data={[
                  { value: 'all', label: 'All RFPs' },
                  { value: 'unviewed', label: 'Unviewed Only' },
                ]}
                leftSection={<Eye style={{ width: 16, height: 16 }} />}
                size="sm"
                w={180}
              />
              <Select
                value={sortOption}
                onChange={(value) => setSortOption(value || 'newest-posted')}
                data={[
                  { value: 'newest-posted', label: 'Newest Posted' },
                  { value: 'deadline-soonest', label: 'Deadline (Soonest)' },
                  { value: 'deadline-latest', label: 'Deadline (Latest)' },
                  { value: 'budget-highest', label: 'Budget (Highest)' },
                  { value: 'budget-lowest', label: 'Budget (Lowest)' },
                ]}
                leftSection={<ArrowUpDown style={{ width: 16, height: 16 }} />}
                size="sm"
                w={200}
              />
            </Group>
          )}
          {activeTab !== 'available' && <Box />}
          <Text size="sm" c="dimmed">
            {sortedRFPs.length} {sortedRFPs.length === 1 ? 'opportunity' : 'opportunities'}
          </Text>
        </Flex>

        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
          {sortedRFPs.map((rfp) => (
            <RFPCard key={rfp.id} rfp={rfp} showProgress={activeTab === 'pending'} />
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  )
}

function StatsCard({ title, value, subtitle, bgColor, textColor, icon }) {
  return (
    <Paper withBorder radius="lg" p="lg" bg={bgColor}>
      <Group justify="space-between">
        <Stack gap="xs">
          <Text size="sm" fw={500} c="dimmed">{title}</Text>
          <Text size="2rem" fw={700} c={textColor}>{value}</Text>
          <Text size="sm" c="dimmed">{subtitle}</Text>
        </Stack>
        <Box c={textColor} style={{ opacity: 0.8 }}>
          {icon || <Briefcase style={{ width: 32, height: 32 }} />}
        </Box>
      </Group>
    </Paper>
  )
}