import { useState } from 'react'
import { X } from 'lucide-react'
import { Box, Button, Group, Badge, Stack, Container, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { clearViewedRFPs, clearInterestedRFPs } from '../utils/rfpStorage'
import { clearAllQuestionData } from '../utils/questionStorage'
import { setSelectedVendor } from '../utils/vendorStorage'
import SellerAdminSection from './SellerAdminSection'
import BuyerAdminSection from './BuyerAdminSection'

export default function AdminBar() {
  const [isVisible, setIsVisible] = useState(true)

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
        // Reload the page to refresh the UI
        window.location.reload()
      },
    })
  }

  const handleVendorChange = (vendorId) => {
    if (vendorId) {
      setSelectedVendor(vendorId)
      // Reload page to update context throughout app
      window.location.reload()
    }
  }

  return (
    <>
      {/* Show Admin Bar Button - Always visible when bar is hidden */}
      {!isVisible && (
        <Button
          onClick={() => setIsVisible(true)}
          style={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1001,
            borderRadius: '0 0 8px 8px',
          }}
          color="orange"
          size="xs"
        >
          Show Admin Bar
        </Button>
      )}

      {/* Admin Bar - Slides up/down */}
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
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 300ms ease-in-out',
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

              {/* Seller Admin Section */}
              <SellerAdminSection
                onVendorChange={handleVendorChange}
              />
            </Group>

            <Group gap="sm">
              {/* Buyer Admin Section */}
              <BuyerAdminSection
                onClearAll={handleClearAll}
              />

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
        </Stack>
      </Container>
    </Box>
    </>
  )
}
