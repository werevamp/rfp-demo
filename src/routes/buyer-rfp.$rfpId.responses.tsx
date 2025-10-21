import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Title, Text, Box, Stack, Paper, Group, Avatar, Badge, Select, Button, Progress } from '@mantine/core'
import fakeRFPDetails from '../data/fakeRFPDetails.json'

export const Route = createFileRoute('/buyer-rfp/$rfpId/responses')({
  component: ResponsesTab,
})

function ResponsesTab() {
  const [vendorStages, setVendorStages] = useState({
    'vendor-1': 'Shortlisted',
    'vendor-2': 'Responded',
    'vendor-3': 'Responded'
  })

  const handleStageChange = (vendorId, newStage) => {
    setVendorStages(prev => ({ ...prev, [vendorId]: newStage }))
  }

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
                  onChange={(value) => handleStageChange(vendor.id, value)}
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
