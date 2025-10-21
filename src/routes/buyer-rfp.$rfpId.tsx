import { createFileRoute, Link, Outlet, useParams, useLocation } from '@tanstack/react-router'
import { Container, Title, Text, Box, Group, Badge, Select } from '@mantine/core'
import { getBuyerIntake } from '../utils/buyerIntakeStorage'

export const Route = createFileRoute('/buyer-rfp/$rfpId')({
  component: BuyerRFPLayout,
})

function BuyerRFPLayout() {
  const { rfpId } = useParams({ from: '/buyer-rfp/$rfpId' })
  const location = useLocation()
  const rfp = getBuyerIntake(rfpId)

  const getActiveTab = () => {
    const pathname = location.pathname
    if (pathname.endsWith('/responses')) return 'responses'
    if (pathname.endsWith('/compare')) return 'compare'
    if (pathname.endsWith('/documents')) return 'documents'
    if (pathname.endsWith('/analytics')) return 'analytics'
    return 'overview'
  }

  const activeTab = getActiveTab()

  if (!rfp) {
    return (
      <Container size="xl" py="xl">
        <Text>RFP not found</Text>
      </Container>
    )
  }

  const deadlineDate = rfp.deadline ? new Date(rfp.deadline) : null
  const postedDate = rfp.postedDate ? new Date(rfp.postedDate) : null

  return (
    <Container size="xl" py="xl">
      <Box>
        {/* Header */}
        <Box mb="xl" pb="lg" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
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
            </Group>
          </Group>
        </Box>

        {/* Tab Navigation */}
        <Box mb="xl" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
          <Group gap={0}>
            <Link
              to="/buyer-rfp/$rfpId"
              params={{ rfpId }}
              style={{
                padding: '12px 16px',
                textDecoration: 'none',
                color: activeTab === 'overview' ? 'var(--mantine-color-blue-6)' : 'inherit',
                borderBottom: activeTab === 'overview' ? '2px solid var(--mantine-color-blue-6)' : '2px solid transparent',
                fontWeight: activeTab === 'overview' ? 600 : 400,
              }}
            >
              Overview
            </Link>
            <Link
              to="/buyer-rfp/$rfpId/responses"
              params={{ rfpId }}
              style={{
                padding: '12px 16px',
                textDecoration: 'none',
                color: activeTab === 'responses' ? 'var(--mantine-color-blue-6)' : 'inherit',
                borderBottom: activeTab === 'responses' ? '2px solid var(--mantine-color-blue-6)' : '2px solid transparent',
                fontWeight: activeTab === 'responses' ? 600 : 400,
              }}
            >
              Responses
            </Link>
            <Link
              to="/buyer-rfp/$rfpId/compare"
              params={{ rfpId }}
              style={{
                padding: '12px 16px',
                textDecoration: 'none',
                color: activeTab === 'compare' ? 'var(--mantine-color-blue-6)' : 'inherit',
                borderBottom: activeTab === 'compare' ? '2px solid var(--mantine-color-blue-6)' : '2px solid transparent',
                fontWeight: activeTab === 'compare' ? 600 : 400,
              }}
            >
              Compare
            </Link>
            <Link
              to="/buyer-rfp/$rfpId/documents"
              params={{ rfpId }}
              style={{
                padding: '12px 16px',
                textDecoration: 'none',
                color: activeTab === 'documents' ? 'var(--mantine-color-blue-6)' : 'inherit',
                borderBottom: activeTab === 'documents' ? '2px solid var(--mantine-color-blue-6)' : '2px solid transparent',
                fontWeight: activeTab === 'documents' ? 600 : 400,
              }}
            >
              Documents
            </Link>
            <Link
              to="/buyer-rfp/$rfpId/analytics"
              params={{ rfpId }}
              style={{
                padding: '12px 16px',
                textDecoration: 'none',
                color: activeTab === 'analytics' ? 'var(--mantine-color-blue-6)' : 'inherit',
                borderBottom: activeTab === 'analytics' ? '2px solid var(--mantine-color-blue-6)' : '2px solid transparent',
                fontWeight: activeTab === 'analytics' ? 600 : 400,
              }}
            >
              Analytics
            </Link>
          </Group>
        </Box>

        {/* Nested route content */}
        <Outlet />
      </Box>
    </Container>
  )
}
