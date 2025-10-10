import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Stack, Title, Paper, Group, Text, Container, UnstyledButton, Box, Button } from '@mantine/core'
import { Star, RefreshCw, ArrowRight, ChevronLeft } from 'lucide-react'
import IntakeLayout from '../components/IntakeLayout'
import { saveDraft, getDraft } from '../utils/buyerIntakeStorage'

export const Route = createFileRoute('/intake/technology')({
  component: TechnologySolution,
})

function TechnologySolution() {
  const navigate = useNavigate()

  const handleSelection = (purchaseType) => {
    // Save the selection to draft
    const draft = getDraft() || {}
    saveDraft({
      ...draft,
      serviceType: 'technology',
      purchaseType
    })

    // Navigate to tech-specific intake form
    if (purchaseType === 'new') {
      navigate({ to: '/intake/tech-new', search: { step: 1 } })
    } else if (purchaseType === 'replace') {
      // TODO: Create replace flow
      navigate({ to: '/intake/thank-you' })
    }
  }

  return (
    <IntakeLayout>
      <Container size="md" py={40}>
        {/* Back Button */}
        <Button
          component={Link}
          to="/intake"
          variant="subtle"
          color="gray"
          leftSection={<ChevronLeft size={20} />}
          mb="lg"
          size="md"
        >
          Back
        </Button>

        {/* Header */}
        <Stack align="center" gap="md" mb={40}>
          <Title order={1} size="2.25rem" ta="center" c="gray.9">
            Technology Solution RFP
          </Title>
        </Stack>

        {/* Selection Cards */}
        <Stack gap="lg" maw={640} mx="auto">
          <Title order={3} size="1.5rem" ta="center" c="gray.9" mb="sm">
            Choose an option to start
          </Title>

          <Stack gap="md">
            {/* New Purchase Card */}
            <UnstyledButton onClick={() => handleSelection('new')}>
              <Paper
                p="lg"
                radius="lg"
                withBorder
                style={{
                  borderWidth: 2,
                  borderColor: 'var(--mantine-color-yellow-3)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                styles={{
                  root: {
                    '&:hover': {
                      borderColor: 'var(--mantine-color-yellow-4)',
                      boxShadow: 'var(--mantine-shadow-md)',
                    }
                  }
                }}
              >
                <Group justify="space-between" align="center" wrap="nowrap">
                  <Group gap="md" align="center">
                    <Box
                      style={{
                        width: 56,
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--mantine-color-yellow-1)',
                        borderRadius: '12px',
                      }}
                    >
                      <Star size={28} color="var(--mantine-color-yellow-7)" fill="var(--mantine-color-yellow-7)" />
                    </Box>
                    <Box>
                      <Title order={4} size="xl" c="gray.9" mb="xs">New Purchase</Title>
                      <Text size="sm" c="gray.6">
                        Looking to buy something new
                      </Text>
                    </Box>
                  </Group>
                  <ArrowRight size={24} color="var(--mantine-color-gray-4)" style={{ flexShrink: 0 }} />
                </Group>
              </Paper>
            </UnstyledButton>

            {/* Replace Card */}
            <UnstyledButton onClick={() => handleSelection('replace')}>
              <Paper
                p="lg"
                radius="lg"
                withBorder
                style={{
                  borderWidth: 2,
                  borderColor: 'var(--mantine-color-blue-3)',
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
                  <Group gap="md" align="center">
                    <Box
                      style={{
                        width: 56,
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--mantine-color-blue-1)',
                        borderRadius: '12px',
                      }}
                    >
                      <RefreshCw size={28} color="var(--mantine-color-blue-7)" />
                    </Box>
                    <Box>
                      <Title order={4} size="xl" c="gray.9" mb="xs">Replace</Title>
                      <Text size="sm" c="gray.6">
                        Looking to replace something
                      </Text>
                    </Box>
                  </Group>
                  <ArrowRight size={24} color="var(--mantine-color-gray-4)" style={{ flexShrink: 0 }} />
                </Group>
              </Paper>
            </UnstyledButton>
          </Stack>

          {/* How it works section */}
          <Stack gap="md" mt={40}>
            <Title order={3} size="1.25rem" ta="center" c="gray.9" fw={700}>
              Learn how it works
            </Title>

            <Stack gap={4} ta="center">
              <Text size="sm" c="gray.7">1. Send requests with your identity protected</Text>
              <Text size="sm" c="gray.7">2. Review seller responses for the best price and fit</Text>
              <Text size="sm" c="gray.7">3. Select sellers to connect with</Text>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </IntakeLayout>
  )
}
