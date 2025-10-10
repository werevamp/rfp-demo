import { createFileRoute, Link } from '@tanstack/react-router'
import { Stack, Title, Text, Paper, Group, Container, Anchor, Box, SimpleGrid } from '@mantine/core'
import { ArrowRight } from 'lucide-react'
import IntakeLayout from '../components/IntakeLayout'

export const Route = createFileRoute('/intake/')({
  component: IntakeLanding,
})

function IntakeLanding() {
  return (
    <IntakeLayout>
      <Container size="lg" py={40}>
        {/* Header */}
        <Stack align="center" gap={4} mb={40}>
          <Title order={1} size="2.75rem" ta="center" c="gray.9" fw={700} style={{ lineHeight: 1.1 }}>
            Competitive bids from top providers
          </Title>
          <Title order={1} size="2.75rem" ta="center" fw={700} style={{ lineHeight: 1.1 }}>
            100%{' '}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'violet', to: 'pink', deg: 90 }}
              inherit
            >
              free and anonymous.
            </Text>
          </Title>
        </Stack>

        {/* Selection Cards */}
        <Stack gap="lg" maw={900} mx="auto">
          <Title order={3} size="1.5rem" ta="center" c="gray.9" fw={700}>
            What are you looking for?
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {/* Technology Solution Card */}
            <Paper
              component={Link}
              to="/intake/technology"
              p="lg"
              radius="lg"
              withBorder
              style={{
                borderWidth: 2,
                borderColor: 'var(--mantine-color-yellow-3)',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '160px',
              }}
              styles={{
                root: {
                  '&:hover': {
                    borderColor: 'var(--mantine-color-yellow-4)',
                    boxShadow: 'var(--mantine-shadow-lg)',
                  }
                }
              }}
            >
              <Group justify="space-between" align="flex-start" wrap="nowrap" mb="sm">
                <Box
                  style={{
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--mantine-color-gray-1)',
                    borderRadius: '12px',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--mantine-color-gray-6)" strokeWidth="1.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>
                </Box>
                <ArrowRight size={20} color="var(--mantine-color-gray-9)" style={{ flexShrink: 0 }} />
              </Group>
              <Box>
                <Title order={4} size="lg" c="gray.9" mb={6} fw={700}>Technology Solution</Title>
                <Text size="sm" c="gray.7">
                  Looking to buy a new tool or replace something coming up for renewal
                </Text>
              </Box>
            </Paper>

            {/* Legal Services Card */}
            <Paper
              component={Link}
              to="/intake/legal-services/need"
              p="lg"
              radius="lg"
              withBorder
              style={{
                borderWidth: 2,
                borderColor: 'var(--mantine-color-blue-3)',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '160px',
              }}
              styles={{
                root: {
                  '&:hover': {
                    borderColor: 'var(--mantine-color-blue-4)',
                    boxShadow: 'var(--mantine-shadow-lg)',
                  }
                }
              }}
            >
              <Group justify="space-between" align="flex-start" wrap="nowrap" mb="sm">
                <Box
                  style={{
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--mantine-color-gray-1)',
                    borderRadius: '12px',
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--mantine-color-gray-6)" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </Box>
                <ArrowRight size={20} color="var(--mantine-color-gray-9)" style={{ flexShrink: 0 }} />
              </Group>
              <Box>
                <Title order={4} size="lg" c="gray.9" mb={6} fw={700}>Legal Services</Title>
                <Text size="sm" c="gray.7">
                  Get bids from top law firms, ALSPs, or vetted flex legal talent networks.
                </Text>
              </Box>
            </Paper>
          </SimpleGrid>
        </Stack>

        {/* How it works section */}
        <Stack gap="lg" maw={800} mx="auto" mt={48}>
          <Title order={3} size="1.5rem" ta="center" c="gray.9" fw={700}>
            Learn how it works
          </Title>

          <Stack gap="xs" ta="center">
            <Text size="md" c="gray.7">1. Send requests with your identity protected</Text>
            <Text size="md" c="gray.7">2. Review vendor responses for the best price and fit</Text>
            <Text size="md" c="gray.7">3. Select providers to connect with</Text>
          </Stack>

          <Text ta="center" c="gray.6" size="md" mt="md">
            Theorem is the matchmaker, bringing you top providers with transparent offers.
          </Text>

          <Text ta="center" size="sm" c="gray.5" mt="md">
            By making a selection above, you agree to{' '}
            <Anchor href="#" c="blue.6">
              our Terms
            </Anchor>{' '}
            and have read our{' '}
            <Anchor href="#" c="blue.6">
              Privacy Policy
            </Anchor>
            .
          </Text>
        </Stack>
      </Container>
    </IntakeLayout>
  )
}
