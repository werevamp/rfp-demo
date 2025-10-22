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

  // Filter to show all questions with responses
  const displayQuestions = questions
    .filter(q => vendor.responses[q.id] !== undefined)

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
      styles={{
        body: {
          maxWidth: '1000px'
        },
        content: {
          maxWidth: '1000px !important'
        },
        inner: {
          padding: 0
        }
      }}
    >
      <Box style={{ position: 'relative', minHeight: 600 }}>
        {/* Left Column - Responses (Scrollable) */}
        <Box
          style={{
            width: 'calc(50% - 16px)',
            maxHeight: 600,
            overflowY: 'auto',
            paddingRight: 16
          }}
        >
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

        {/* Right Column - Evaluation (Fixed Position) */}
        <Box
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 'calc(50% - 16px)',
            paddingLeft: 16
          }}
        >
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
      </Box>
    </Modal>
  )
}
