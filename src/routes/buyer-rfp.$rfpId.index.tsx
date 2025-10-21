import { createFileRoute, useParams } from '@tanstack/react-router'
import { Title, Text, Box, Group, Paper, SimpleGrid, Stack, Button, Divider } from '@mantine/core'
import { Download } from 'lucide-react'
import { getBuyerIntake } from '../utils/buyerIntakeStorage'
import fakeRFPDetails from '../data/fakeRFPDetails.json'

export const Route = createFileRoute('/buyer-rfp/$rfpId/')({
  component: OverviewTab,
})

function OverviewTab() {
  const { rfpId } = useParams({ from: '/buyer-rfp/$rfpId/' })
  const rfp = getBuyerIntake(rfpId)

  if (!rfp) {
    return <Text>RFP not found</Text>
  }

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
