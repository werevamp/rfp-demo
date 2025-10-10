import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Stack, Title, Paper, Group, Text, Container, UnstyledButton, Box, ThemeIcon, Button } from '@mantine/core'
import { Building, Settings, ArrowRight, ChevronLeft } from 'lucide-react'
import IntakeLayout from '../components/IntakeLayout'
import { saveDraft, getDraft } from '../utils/buyerIntakeStorage'

export const Route = createFileRoute('/intake/legal-services/delivery')({
  component: LegalServicesDelivery,
})

function LegalServicesDelivery() {
  const navigate = useNavigate()

  const handleSelection = (deliveryModel) => {
    // Save the selection to draft
    const draft = getDraft() || {}
    saveDraft({
      ...draft,
      deliveryModel
    })

    // Navigate to the appropriate intake form
    if (deliveryModel === 'alsp') {
      navigate({ to: '/intake/alsp', search: { step: 1 } })
    } else if (deliveryModel === 'lawfirm') {
      navigate({ to: '/intake/lawfirm', search: { step: 1 } })
    }
  }

  return (
    <IntakeLayout>
      <Container size="md" py={64}>
        {/* Back Button */}
        <Button
          onClick={() => navigate({ to: '/intake/legal-services/need' })}
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
            Choose Your Delivery Model
          </Title>

          <Stack gap="md">
            {/* Law Firm Card */}
            <UnstyledButton onClick={() => handleSelection('lawfirm')}>
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
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Group gap="md" align="flex-start">
                    <ThemeIcon size={40} radius="md" color="gray.1" variant="light">
                      <Building size={24} color="var(--mantine-color-gray-7)" />
                    </ThemeIcon>
                    <Box>
                      <Title order={4} size="xl" c="gray.9" mb="xs">Law Firm Engagement</Title>
                      <Text size="sm" c="gray.6">
                        Expert legal counsel for specific matters or transactions
                      </Text>
                    </Box>
                  </Group>
                  <ArrowRight size={24} color="var(--mantine-color-gray-4)" style={{ flexShrink: 0 }} />
                </Group>
              </Paper>
            </UnstyledButton>

            {/* ALSP Card */}
            <UnstyledButton onClick={() => handleSelection('alsp')}>
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
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Group gap="md" align="flex-start">
                    <ThemeIcon size={40} radius="md" color="gray.1" variant="light">
                      <Settings size={24} color="var(--mantine-color-gray-7)" />
                    </ThemeIcon>
                    <Box>
                      <Title order={4} size="xl" c="gray.9" mb="xs">Alternative Legal Provider (ALSP)</Title>
                      <Text size="sm" c="gray.6">
                        Process-driven delivery for recurring or complex legal work
                      </Text>
                    </Box>
                  </Group>
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
