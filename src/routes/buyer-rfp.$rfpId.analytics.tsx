import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Title, Text, Box, Group, Stack, Paper, Badge, Progress } from '@mantine/core'
import fakeRFPDetails from '../data/fakeRFPDetails.json'

export const Route = createFileRoute('/buyer-rfp/$rfpId/analytics')({
  component: AnalyticsTab,
})

function AnalyticsTab() {
  const [vendorStages] = useState({
    'vendor-1': 'Shortlisted',
    'vendor-2': 'Responded',
    'vendor-3': 'Responded'
  })

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
