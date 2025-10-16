import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Stack, Title, Paper, Group, Text, Container, UnstyledButton, Box, Button } from '@mantine/core'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import IntakeLayout from '../components/IntakeLayout'
import { saveDraft, getDraft } from '../utils/buyerIntakeStorage'

export const Route = createFileRoute('/intake/legal-services/need')({
  component: LegalServicesNeed,
})

function LegalServicesNeed() {
  const navigate = useNavigate()

  const handleSelection = (legalNeed) => {
    // Save the selection to draft
    const draft = getDraft() || {}
    saveDraft({
      ...draft,
      serviceType: 'legal-services',
      legalNeed,
      deliveryModel: legalNeed === 'people' ? 'lawfirm' : draft.deliveryModel
    })

    // If "People" is selected, skip delivery model and go directly to lawfirm intake
    if (legalNeed === 'people') {
      navigate({ to: '/intake/lawfirm', search: { step: 1 } })
    } else {
      // Navigate to delivery model selection for "Project"
      navigate({ to: '/intake/legal-services/delivery' })
    }
  }

  return (
    <IntakeLayout>
      <Container size="md" py={64}>
        {/* Back Button */}
        <Button
          component={Link}
          to="/intake"
          variant="subtle"
          color="gray"
          leftSection={<ChevronLeft size={20} />}
          mb="xl"
          size="md"
        >
          Back
        </Button>

        {/* Header */}
        <Stack align="center" gap="xl" mb={64}>
          <Title order={1} size="2.5rem" ta="center" c="gray.9">
            Legal Services RFP
          </Title>
        </Stack>

        {/* Selection Cards */}
        <Stack gap="xl" maw={640} mx="auto">
          <Title order={3} size="2rem" ta="center" c="gray.9" mb="lg">
            Choose your legal need
          </Title>

          <Stack gap="md">
            {/* Project Card */}
            <UnstyledButton onClick={() => handleSelection('project')}>
              <Paper
                p="lg"
                radius="lg"
                withBorder
                style={{
                  borderWidth: 2,
                  borderColor: 'var(--mantine-color-gray-2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                styles={{
                  root: {
                    '&:hover': {
                      borderColor: 'var(--mantine-color-blue-4)',
                      boxShadow: 'var(--mantine-shadow-md)',
                    }
                  }
                }}
              >
                <Group justify="space-between" align="center" wrap="nowrap">
                  <Box>
                    <Title order={4} size="xl" c="gray.9" mb="xs">Project</Title>
                    <Text size="sm" c="gray.6">
                      Specialized project, transaction or litigation
                    </Text>
                  </Box>
                  <ArrowRight size={24} color="var(--mantine-color-gray-4)" style={{ flexShrink: 0 }} />
                </Group>
              </Paper>
            </UnstyledButton>

            {/* People Card */}
            <UnstyledButton onClick={() => handleSelection('people')}>
              <Paper
                p="lg"
                radius="lg"
                withBorder
                style={{
                  borderWidth: 2,
                  borderColor: 'var(--mantine-color-gray-2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                styles={{
                  root: {
                    '&:hover': {
                      borderColor: 'var(--mantine-color-blue-4)',
                      boxShadow: 'var(--mantine-shadow-md)',
                    }
                  }
                }}
              >
                <Group justify="space-between" align="center" wrap="nowrap">
                  <Box>
                    <Title order={4} size="xl" c="gray.9" mb="xs">People</Title>
                    <Text size="sm" c="gray.6">
                      Legal professional for overflow work or temporary placement
                    </Text>
                  </Box>
                  <ArrowRight size={24} color="var(--mantine-color-gray-4)" style={{ flexShrink: 0 }} />
                </Group>
              </Paper>
            </UnstyledButton>
          </Stack>
        </Stack>
      </Container>
    </IntakeLayout>
  )
}
