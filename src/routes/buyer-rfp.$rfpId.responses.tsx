import { createFileRoute, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { Title, Text, Box, Stack, Paper, Group, Avatar, Badge, Select, Button, Progress } from '@mantine/core'
import fakeRFPDetails from '../data/fakeRFPDetails.json'
import { getBuyerIntake } from '../utils/buyerIntakeStorage'
import { defaultRFPQuestions, legalServicesQuestions, alspQuestions } from '../data/questionTemplates'
import ReviewModal from '../components/ReviewModal'

export const Route = createFileRoute('/buyer-rfp/$rfpId/responses')({
  component: ResponsesTab,
})

function ResponsesTab() {
  const { rfpId } = useParams({ from: '/buyer-rfp/$rfpId/responses' })
  const rfp = getBuyerIntake(rfpId)

  const [vendorStages, setVendorStages] = useState({
    'vendor-1': 'Shortlisted',
    'vendor-2': 'Responded',
    'vendor-3': 'Responded'
  })

  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState(null)

  // Determine which questions to use based on RFP type
  const getQuestionsForRFPType = (rfpType) => {
    if (rfpType === 'legal-services') {
      return legalServicesQuestions
    } else if (rfpType === 'alsp') {
      return alspQuestions
    } else {
      return defaultRFPQuestions
    }
  }

  const questions = rfp ? getQuestionsForRFPType(rfp.rfpType) : defaultRFPQuestions

  const handleStageChange = (vendorId, newStage) => {
    setVendorStages(prev => ({ ...prev, [vendorId]: newStage }))
  }

  const handleReviewClick = (vendor) => {
    setSelectedVendor(vendor)
    setReviewModalOpen(true)
  }

  const handleCloseReviewModal = () => {
    setReviewModalOpen(false)
    setSelectedVendor(null)
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
                  <Button variant="light" size="sm" onClick={() => handleReviewClick(vendor)}>Review</Button>
                  <Button variant="filled" size="sm" color="dark">Shortlist</Button>
                  <Button variant="subtle" size="sm" color="red">Decline</Button>
                </Group>
              </Group>
            </Group>
          </Paper>
        ))}
      </Stack>

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={handleCloseReviewModal}
        vendor={selectedVendor}
        questions={questions}
      />
    </Stack>
  )
}
