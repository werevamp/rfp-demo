import { createFileRoute, Link } from '@tanstack/react-router'
import { Stack, Title, Text, Paper, Group, Container, Button, Badge, Box, Alert, ThemeIcon, Anchor } from '@mantine/core'
import { CheckCircle, ArrowRight } from 'lucide-react'
import IntakeLayout from '../components/IntakeLayout'
import { getBuyerIntake } from '../utils/buyerIntakeStorage'

export const Route = createFileRoute('/intake/thank-you')({
  component: ThankYou,
  validateSearch: (search) => ({
    rfpId: search?.rfpId || ''
  })
})

function ThankYou() {
  const { rfpId } = Route.useSearch()
  const intake = rfpId ? getBuyerIntake(rfpId) : null

  return (
    <IntakeLayout>
      <Container size="md" py={64}>
        {/* Success Icon */}
        <Stack align="center" gap="lg" mb={48}>
          <ThemeIcon size={96} radius="xl" color="green.1" variant="light">
            <CheckCircle size={64} color="var(--mantine-color-green-6)" />
          </ThemeIcon>

          {/* Thank You Message */}
          <Stack align="center" gap="md">
            <Title order={1} size="2.5rem" ta="center" c="gray.9">
              Thank you for your submission!
            </Title>
            <Text size="xl" c="gray.6" ta="center">
              Your RFP has been successfully created and sent to providers.
            </Text>
            <Text c="gray.6" ta="center">
              We'll notify you at <Text component="span" fw={600}>{intake?.email}</Text> when vendors respond.
            </Text>
          </Stack>
        </Stack>

        {/* RFP Details Card */}
        {intake && (
          <Paper withBorder radius="lg" p="xl" mb="lg">
            <Title order={2} size="xl" c="gray.9" mb="lg">Your RFP Summary</Title>

            <Stack gap="md">
              <Group grow>
                <Box>
                  <Text size="sm" c="gray.5" mb={4}>RFP ID</Text>
                  <Text fw={600} c="gray.9">{intake.rfpId}</Text>
                </Box>
                <Box>
                  <Text size="sm" c="gray.5" mb={4}>Created</Text>
                  <Text fw={600} c="gray.9">
                    {new Date(intake.createdAt).toLocaleDateString()}
                  </Text>
                </Box>
              </Group>

              <Box>
                <Text size="sm" c="gray.5" mb={4}>Title</Text>
                <Text fw={600} c="gray.9">{intake.title}</Text>
              </Box>

              <Box>
                <Text size="sm" c="gray.5" mb={4}>Type</Text>
                <Text fw={600} c="gray.9">
                  ALSP - {intake.legalNeed === 'project' ? 'Project' : 'People'}
                </Text>
              </Box>

              <Box>
                <Text size="sm" c="gray.5" mb={4}>Budget Range</Text>
                <Text fw={600} c="gray.9">
                  ${intake.budgetFrom?.toLocaleString()} - ${intake.budgetTo?.toLocaleString()}
                </Text>
              </Box>

              <Box>
                <Text size="sm" c="gray.5" mb={4}>Project Timeline</Text>
                <Text fw={600} c="gray.9">
                  {new Date(intake.projectStartDate).toLocaleDateString()} -{' '}
                  {new Date(intake.projectEndDate).toLocaleDateString()}
                </Text>
              </Box>

              <Box>
                <Text size="sm" c="gray.5" mb={4}>Status</Text>
                <Badge color="green" variant="light" size="lg">
                  Active - Awaiting Responses
                </Badge>
              </Box>
            </Stack>
          </Paper>
        )}

        {/* Next Steps */}
        <Alert color="blue" variant="light" mb="lg">
          <Text fw={700} c="gray.9" mb="sm">What happens next?</Text>
          <Stack gap="xs" component="ol" style={{ listStylePosition: 'inside', paddingLeft: 0 }}>
            <Text component="li" c="gray.7">Vendors will review your RFP and submit their proposals</Text>
            <Text component="li" c="gray.7">You'll receive email notifications as responses come in</Text>
            <Text component="li" c="gray.7">Review and compare vendor proposals in your dashboard</Text>
            <Text component="li" c="gray.7">Select and connect with your preferred providers</Text>
          </Stack>
        </Alert>

        {/* Action Buttons */}
        <Group justify="center" gap="md">
          <Button
            component={Link}
            to="/intake"
            variant="outline"
            size="lg"
            rightSection={<ArrowRight size={20} />}
          >
            Create Another RFP
          </Button>
          <Button
            component={Link}
            to="/"
            size="lg"
            rightSection={<ArrowRight size={20} />}
            variant="gradient"
            gradient={{ from: 'violet', to: 'grape', deg: 90 }}
          >
            View as Seller (Demo)
          </Button>
        </Group>

        {/* Help Text */}
        <Text ta="center" size="sm" c="gray.5" mt="xl">
          Have questions?{' '}
          <Anchor href="#" c="blue.6">
            Contact Support
          </Anchor>{' '}
          or{' '}
          <Anchor href="#" c="blue.6">
            View FAQ
          </Anchor>
        </Text>
      </Container>
    </IntakeLayout>
  )
}
