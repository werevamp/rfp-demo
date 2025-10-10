import { Check, X as XIcon, Clock, Zap } from 'lucide-react'
import { Box, Title, Text, Group, Button, Stack, ScrollArea } from '@mantine/core'
import { getPendingApplications, setBuyerResponse } from '../utils/rfpStorage'
import { mockRFPs } from '../data/mockRFPs'

export default function BuyerResponsePanel({ isOpen, onUpdate }) {
  const pendingApplications = getPendingApplications()

  const handleAccept = (rfpId) => {
    setBuyerResponse(rfpId, 'accepted')
    onUpdate()
  }

  const handleReject = (rfpId) => {
    setBuyerResponse(rfpId, 'rejected')
    onUpdate()
  }

  const getRFPDetails = (rfpId) => {
    return mockRFPs.find(rfp => rfp.id === parseInt(rfpId))
  }

  if (!isOpen) return null

  return (
    <Box
      style={{
        marginTop: 12,
        borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        paddingTop: 12,
      }}
    >
      <Title order={6} size="sm" color="white" mb="md">
        Buyer Response Panel
      </Title>

      {pendingApplications.length === 0 ? (
        <Box
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 8,
            padding: 12,
          }}
        >
          <Text size="sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            No pending applications
          </Text>
        </Box>
      ) : (
        <ScrollArea style={{ maxHeight: 240 }}>
          <Stack gap="xs">
            {pendingApplications.map((app) => {
              const rfp = getRFPDetails(app.rfpId)
              if (!rfp) return null

              return (
                <Box
                  key={app.rfpId}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 8,
                    padding: 12,
                  }}
                >
                  <Group justify="space-between" gap="sm">
                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Text
                        size="sm"
                        fw={500}
                        c="white"
                        lineClamp={1}
                      >
                        {rfp.title}
                      </Text>
                      <Group gap="xs" mt={4}>
                        <Group gap={4}>
                          {app.type === 'notify-now' ? (
                            <>
                              <Zap size={12} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                              <Text size="xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Immediate
                              </Text>
                            </>
                          ) : (
                            <>
                              <Clock size={12} style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                              <Text size="xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Later
                              </Text>
                            </>
                          )}
                        </Group>
                        <Text size="xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>•</Text>
                        <Text size="xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {new Date(app.timestamp).toLocaleDateString()}
                        </Text>
                      </Group>
                    </Box>

                    <Group gap="xs">
                      <Button
                        onClick={() => handleAccept(app.rfpId)}
                        color="green"
                        size="xs"
                        leftSection={<Check size={12} />}
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleReject(app.rfpId)}
                        color="red"
                        size="xs"
                        leftSection={<XIcon size={12} />}
                      >
                        Reject
                      </Button>
                    </Group>
                  </Group>
                </Box>
              )
            })}
          </Stack>
        </ScrollArea>
      )}
    </Box>
  )
}
