import { ArrowUp, ArrowDown } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { Button, Group, Text, ActionIcon } from '@mantine/core'

export function BackButton({ onClick, to }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (to) {
      navigate({ to })
    } else {
      navigate({ to: '..' })
    }
  }

  return (
    <ActionIcon
      variant="outline"
      size="xl"
      onClick={handleClick}
      color="gray"
    >
      <ArrowUp size={20} />
    </ActionIcon>
  )
}

export function NextButton({ onClick, disabled, type = "button", isSubmit = false }) {
  return (
    <Group gap="md">
      <Button
        type={type}
        onClick={onClick}
        disabled={disabled}
        color="violet"
        rightSection={<ArrowDown size={20} />}
        size="md"
      >
        {isSubmit ? 'Submit' : 'Next'}
      </Button>
      <Text size="sm" c="dimmed">
        Press Enter
      </Text>
    </Group>
  )
}
