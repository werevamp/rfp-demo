import { X, Zap, Clock, Check } from 'lucide-react'
import { Modal, Title, Text, Button, Stack, Group, Box, ThemeIcon } from '@mantine/core'

export default function ApplicationModal({ isOpen, onClose, onSelectInterest, rfpTitle }) {
  const handleNotifyNow = () => {
    onSelectInterest('notify-now')
  }

  const handleNotifyLater = () => {
    onSelectInterest('notify-later')
  }

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <Box>
          <Title order={2} size="h3" mb="xs">
            Submit Your Application
          </Title>
          <Text size="sm" c="dimmed" lineClamp={2}>
            {rfpTitle}
          </Text>
        </Box>
      }
      size="md"
      radius="lg"
      centered
    >
      <Stack gap="md">
        <Text c="dark">
          How would you like to notify the buyer about your application?
        </Text>

        <Stack gap="sm">
          <Button
            onClick={handleNotifyNow}
            variant="gradient"
            gradient={{ from: 'blue', to: 'indigo', deg: 90 }}
            size="lg"
            fullWidth
            styles={(theme) => ({
              root: {
                height: 'auto',
                padding: theme.spacing.md,
              },
              inner: {
                justifyContent: 'flex-start',
              },
            })}
          >
            <Group gap="md" style={{ width: '100%' }}>
              <ThemeIcon
                size="lg"
                radius="md"
                variant="light"
                color="blue"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Zap size={20} />
              </ThemeIcon>
              <Box style={{ flex: 1, textAlign: 'left' }}>
                <Text fw={600}>Notify Immediately</Text>
                <Text size="sm" style={{ opacity: 0.9 }}>
                  Send instant notification to buyer
                </Text>
              </Box>
              <Check size={20} style={{ opacity: 0.8 }} />
            </Group>
          </Button>

          <Button
            onClick={handleNotifyLater}
            variant="gradient"
            gradient={{ from: 'yellow', to: 'orange', deg: 90 }}
            size="lg"
            fullWidth
            styles={(theme) => ({
              root: {
                height: 'auto',
                padding: theme.spacing.md,
              },
              inner: {
                justifyContent: 'flex-start',
              },
            })}
          >
            <Group gap="md" style={{ width: '100%' }}>
              <ThemeIcon
                size="lg"
                radius="md"
                variant="light"
                color="orange"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Clock size={20} />
              </ThemeIcon>
              <Box style={{ flex: 1, textAlign: 'left' }}>
                <Text fw={600}>Notify Later</Text>
                <Text size="sm" style={{ opacity: 0.9 }}>
                  Schedule notification for later
                </Text>
              </Box>
              <Check size={20} style={{ opacity: 0.8 }} />
            </Group>
          </Button>
        </Stack>

        <Button
          onClick={onClose}
          variant="subtle"
          color="gray"
          fullWidth
        >
          Cancel
        </Button>
      </Stack>
    </Modal>
  )
}
