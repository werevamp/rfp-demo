import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Send, Paperclip, X } from 'lucide-react'
import { Paper, Title, Text, TextInput, Textarea, Button, Group, Stack, SimpleGrid, Box, Divider } from '@mantine/core'

export default function ProposalForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    coverLetter: '',
    proposedBudget: '',
    timeline: '',
    technicalApproach: ''
  })

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulate successful submission
    alert('Proposal submitted successfully!')
    console.log('Proposal submitted:', formData)

    // Navigate back to inbox
    navigate({ to: '/' })
  }

  const handleCancel = () => {
    navigate({ to: '/' })
  }

  return (
    <Paper withBorder>
      <Box p="md" style={{ borderBottom: '1px solid #e5e7eb' }}>
        <Title order={2} size="h3">
          Submit Your Proposal
        </Title>
        <Text size="sm" color="dimmed" mt={4}>
          Please fill out all sections of your proposal below.
        </Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack gap="lg" p="md">
          <Textarea
            label="Cover Letter"
            placeholder="Introduce yourself and explain why you're the best fit for this project..."
            value={formData.coverLetter}
            onChange={(e) => handleChange('coverLetter', e.target.value)}
            minRows={6}
            required
            withAsterisk
          />

          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
            <TextInput
              label="Proposed Budget"
              placeholder="e.g., $75,000"
              value={formData.proposedBudget}
              onChange={(e) => handleChange('proposedBudget', e.target.value)}
              required
              withAsterisk
            />

            <TextInput
              label="Timeline"
              placeholder="e.g., 12 weeks"
              value={formData.timeline}
              onChange={(e) => handleChange('timeline', e.target.value)}
              required
              withAsterisk
            />
          </SimpleGrid>

          <Textarea
            label="Technical Approach"
            placeholder="Describe your technical approach, methodology, and any relevant experience..."
            value={formData.technicalApproach}
            onChange={(e) => handleChange('technicalApproach', e.target.value)}
            minRows={8}
            required
            withAsterisk
          />

          <AttachmentsSection />

          <Divider />

          <Group justify="flex-end" gap="sm">
            <Button
              variant="default"
              leftSection={<X size={16} />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              leftSection={<Send size={16} />}
            >
              Submit Proposal
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}

function AttachmentsSection() {
  return (
    <Stack gap="xs">
      <Text size="sm" fw={500}>
        Attachments
      </Text>
      <Paper
        withBorder
        p="xl"
        style={{
          borderStyle: 'dashed',
          textAlign: 'center',
        }}
      >
        <Stack gap="xs" align="center">
          <Paperclip size={32} color="gray" />
          <Text size="sm" c="dimmed">
            Upload your portfolio, resume, or other relevant documents
          </Text>
          <Button variant="subtle" size="sm">
            Browse files
          </Button>
          <Text size="xs" c="dimmed">
            PDF, DOC, or image files up to 10MB
          </Text>
        </Stack>
      </Paper>
    </Stack>
  )
}