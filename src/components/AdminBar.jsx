import { useState } from 'react'
import { Trash2, X, ChevronDown, ChevronUp, ClipboardList } from 'lucide-react'
import { Box, Button, Group, Text, Badge, Stack, Container } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Link } from '@tanstack/react-router'
import { clearViewedRFPs, getViewedCount, clearInterestedRFPs, getInterestedCount, getPendingCount } from '../utils/rfpStorage'
import { clearAllQuestionData } from '../utils/questionStorage'
import BuyerResponsePanel from './BuyerResponsePanel'

export default function AdminBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [viewedCount, setViewedCount] = useState(getViewedCount())
  const [interestedCount, setInterestedCount] = useState(getInterestedCount())
  const [pendingCount, setPendingCount] = useState(getPendingCount())
  const [buyerPanelOpen, setBuyerPanelOpen] = useState(false)

  const handleClearAll = () => {
    modals.openConfirmModal({
      title: 'Clear All Data',
      children: (
        <Text size="sm">
          Are you sure you want to clear all viewed and interested RFPs? This will reset the demo.
        </Text>
      ),
      labels: { confirm: 'Clear All', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        clearViewedRFPs()
        clearInterestedRFPs()
        clearAllQuestionData()
        setViewedCount(0)
        setInterestedCount(0)
        setPendingCount(0)
        // Reload the page to refresh the UI
        window.location.reload()
      },
    })
  }

  const handleBuyerResponseUpdate = () => {
    // Update counts after buyer responds
    setPendingCount(getPendingCount())
    // Force a small delay and reload to update UI
    setTimeout(() => {
      window.location.reload()
    }, 300)
  }

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          borderRadius: '0 0 8px 8px',
        }}
        color="orange"
        size="xs"
      >
        Show Admin Bar
      </Button>
    )
  }

  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'linear-gradient(to right, #f97316, #f59e0b)',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container size="xl" py="md">
        <Stack gap="md">
          <Group justify="space-between">
            <Group gap="md">
              <Badge
                size="lg"
                variant="filled"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                ADMIN / DEMO MODE
              </Badge>
              <Text size="sm">
                <Text component="span" opacity={0.9}>Viewed:</Text>{' '}
                <Text component="span" fw={700}>{viewedCount}</Text>
              </Text>
              <Text size="sm">
                <Text component="span" opacity={0.9}>Applications:</Text>{' '}
                <Text component="span" fw={700}>{interestedCount}</Text>
              </Text>
              <Text size="sm">
                <Text component="span" opacity={0.9}>Pending:</Text>{' '}
                <Text component="span" fw={700}>{pendingCount}</Text>
              </Text>
            </Group>

            <Group gap="sm">
              <Button
                onClick={() => setBuyerPanelOpen(!buyerPanelOpen)}
                variant="light"
                color="gray"
                size="sm"
                rightSection={buyerPanelOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
              >
                Buyer Panel
              </Button>

              <Button
                component={Link}
                to="/intake"
                variant="light"
                color="gray"
                size="sm"
                leftSection={<ClipboardList size={16} />}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
              >
                Intake Form
              </Button>

              <Button
                onClick={handleClearAll}
                variant="filled"
                color="white"
                size="sm"
                leftSection={<Trash2 size={16} />}
                style={{ color: '#f97316' }}
              >
                Clear All Data
              </Button>

              <Button
                onClick={() => setIsVisible(false)}
                variant="subtle"
                color="gray"
                size="sm"
                p="xs"
                aria-label="Hide admin bar"
                style={{ color: 'white' }}
              >
                <X size={16} />
              </Button>
            </Group>
          </Group>

          {/* Buyer Response Panel */}
          <BuyerResponsePanel isOpen={buyerPanelOpen} onUpdate={handleBuyerResponseUpdate} />
        </Stack>
      </Container>
    </Box>
  )
}
