import { useState } from 'react'
import { Modal, Title, Text, Button, Stack, Group, Box, Textarea, TextInput, Select, Paper } from '@mantine/core'

export default function ReviewModal({ isOpen, onClose, vendor, questions }) {
  const [reviewer, setReviewer] = useState('M. Patel')
  const [notes, setNotes] = useState('Strong incumbent; pricing high but negotiable.')
  const [responseStage, setResponseStage] = useState('Shortlisted')

  if (!vendor) return null

  // Helper function to format response for display (same as compare tab)
  const formatResponse = (response) => {
    if (Array.isArray(response)) {
      return response.join(', ')
    }
    return response || 'No response provided'
  }

  // Filter to show only key questions with responses (same logic as compare tab)
  const displayQuestions = questions
    .filter(q => vendor.responses[q.id] !== undefined)
    .slice(0, 4) // Show first 4 questions that have responses

  const handleSave = () => {
    console.log('Saving evaluation:', { reviewer, notes, responseStage })
    onClose()
  }

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <Box>
          <Title order={2} size="h4">
            Review: {vendor.name}
          </Title>
        </Box>
      }
      size="xl"
      radius="md"
      centered
    >
      <Group align="flex-start" gap="lg" style={{ minHeight: 400 }}>
        {/* Left Column - Responses */}
        <Box style={{ flex: 1 }}>
          <Title order={4} size="h5" mb="xs">
            Responses
          </Title>
          <Text size="sm" c="dimmed" mb="lg">
            Key questions &amp; answers
          </Text>

          <Stack gap="md">
            {displayQuestions.map((question) => (
              <Paper key={question.id} withBorder p="md" radius="sm">
                <Text size="sm" fw={600} mb="xs">
                  {question.text}
                </Text>
                <Text size="sm" c="dimmed">
                  {formatResponse(vendor.responses[question.id])}
                </Text>
              </Paper>
            ))}
          </Stack>
        </Box>

        {/* Right Column - Evaluation */}
        <Box style={{ flex: 1 }}>
          <Title order={4} size="h5" mb="xs">
            Evaluation
          </Title>
          <Text size="sm" c="dimmed" mb="lg">
            Internal-only
          </Text>

          <Stack gap="md">
            <Box>
              <Text size="sm" mb="xs">
                Reviewer
              </Text>
              <TextInput
                value={reviewer}
                onChange={(e) => setReviewer(e.target.value)}
                placeholder="Enter reviewer name"
              />
            </Box>

            <Box>
              <Text size="sm" mb="xs">
                Notes
              </Text>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add evaluation notes..."
                minRows={4}
                autosize
              />
            </Box>

            <Box>
              <Text size="sm" mb="xs">
                Response Stage
              </Text>
              <Select
                value={responseStage}
                onChange={setResponseStage}
                data={['Responded', 'Shortlisted', 'Evaluating', 'Won', 'Lost', 'Declined']}
              />
            </Box>

            <Button
              onClick={handleSave}
              fullWidth
              color="dark"
              size="md"
              mt="md"
            >
              Save evaluation
            </Button>
          </Stack>
        </Box>
      </Group>
    </Modal>
  )
}
