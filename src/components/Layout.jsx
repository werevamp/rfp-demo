import { Link } from '@tanstack/react-router'
import { AppShell, Container, Group, Anchor, Title } from '@mantine/core'
import { Inbox } from 'lucide-react'
import AdminBar from './AdminBar'
import ScrollToTop from './ScrollToTop'

export default function Layout({ children, noBackground = false }) {
  return (
    <>
      <ScrollToTop />
      <AdminBar />
      <AppShell
        header={{ height: 60 }}
        padding="md"
        styles={{
          main: {
            minHeight: '100vh',
            backgroundColor: noBackground ? 'white' : 'var(--mantine-color-gray-0)',
          },
        }}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Main>
          <Container size="xl">
            {children}
          </Container>
        </AppShell.Main>
      </AppShell>
    </>
  )
}

function Header() {
  return (
    <Container size="xl" h="100%">
      <Group justify="space-between" h="100%">
        <Logo />
        <Navigation />
      </Group>
    </Container>
  )
}

function Logo() {
  return (
    <Anchor
      component={Link}
      to="/"
      underline="never"
      c="dark"
      style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
    >
      <Inbox size={24} />
      <Title order={3} fw={600}>RFP Portal</Title>
    </Anchor>
  )
}

function Navigation() {
  return (
    <Group gap="md">
      <Anchor
        component={Link}
        to="/"
        c="dimmed"
        fw={500}
        size="sm"
      >
        Inbox
      </Anchor>
    </Group>
  )
}