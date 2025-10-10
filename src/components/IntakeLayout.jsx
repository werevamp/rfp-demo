import { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { AppShell, Container, Group, Text, Button, Box } from '@mantine/core'
import IntakePreviewPanel from './IntakePreviewPanel'

export default function IntakeLayout({ children, showPreview = false, formData = {}, currentStep = 1 }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  return (
    <AppShell
      header={{ height: 70 }}
      styles={{
        root: {
          backgroundColor: 'white',
        },
        main: {
          backgroundColor: 'white',
          minHeight: '100vh',
        },
        header: {
          backgroundColor: 'white',
        },
      }}
    >
      <AppShell.Header withBorder style={{ backgroundColor: 'white' }}>
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%">
            <Link to="/intake" style={{ textDecoration: 'none' }}>
              <Group gap="sm">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="url(#gradient)" />
                  <path d="M20 10L12 20H28L20 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                      <stop stopColor="#6366F1" />
                      <stop offset="1" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                <Text size="xl" fw={700} c="dark">
                  Theorem.
                </Text>
              </Group>
            </Link>

            <Group gap="md">
              <Text size="sm" c="dimmed">
                Already have an account?
              </Text>
              <Button size="sm">
                Login
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl">
          {children}
        </Container>

        {/* Preview Panel Toggle Button (if enabled) */}
        {showPreview && (
          <Button
            variant="default"
            rightSection={isPanelOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            style={{
              position: 'fixed',
              top: 128,
              right: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
            size="sm"
          >
            {isPanelOpen ? 'Hide preview' : 'Show Request preview'}
          </Button>
        )}

        {/* Preview Panel */}
        <IntakePreviewPanel
          formData={formData}
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          currentStep={currentStep}
        />
      </AppShell.Main>
    </AppShell>
  )
}
