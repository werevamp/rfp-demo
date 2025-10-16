import { ClipboardList, Trash2, Inbox } from 'lucide-react'
import { Button, Group } from '@mantine/core'
import { Link } from '@tanstack/react-router'

export default function BuyerAdminSection({ onClearAll }) {
  return (
    <Group gap="sm">
      <Button
        component={Link}
        to="/buyer-inbox"
        variant="light"
        color="gray"
        size="sm"
        leftSection={<Inbox size={16} />}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
      >
        Buyer Inbox
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
        onClick={onClearAll}
        variant="filled"
        color="white"
        size="sm"
        leftSection={<Trash2 size={16} />}
        style={{ color: '#f97316' }}
      >
        Clear All Data
      </Button>
    </Group>
  )
}
