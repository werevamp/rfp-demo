import { Link } from '@tanstack/react-router'
import { Card, Badge, Group, Stack, Text, Title, Button, Progress, ThemeIcon } from '@mantine/core'
import { Calendar, DollarSign, Building2, MapPin, Clock, ArrowRight, Star, Eye, Heart, Zap, CheckCircle2, XCircle, Monitor, Scale } from 'lucide-react'
import { isRFPViewed, getRFPInterest } from '../utils/rfpStorage'
import { getProgressStats } from '../utils/questionStorage'
import { defaultRFPQuestions, generateBuyerSpecificQuestions } from '../data/questionTemplates'

export default function RFPCard({ rfp, showProgress }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'teal'
      case 'reviewed':
        return 'blue'
      default:
        return 'gray'
    }
  }

  const getBudgetLevel = (budget) => {
    const amount = parseInt(budget.replace(/[^\d]/g, ''))
    if (amount >= 100000) return 'high'
    if (amount >= 50000) return 'medium'
    return 'low'
  }

  const getDaysRemaining = (deadline) => {
    const today = new Date()
    const due = new Date(deadline)
    const diffTime = due - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getRFPTypeInfo = (rfpType) => {
    if (rfpType === 'legal-services') {
      return {
        label: 'Legal Services',
        icon: Scale,
        color: 'grape'
      }
    }
    // Default to legal-tech
    return {
      label: 'Legal Tech',
      icon: Monitor,
      color: 'blue'
    }
  }

  const daysRemaining = getDaysRemaining(rfp.deadline)
  const budgetLevel = getBudgetLevel(rfp.budget)
  const isViewed = isRFPViewed(rfp.id)
  const interestStatus = getRFPInterest(rfp.id)
  const typeInfo = getRFPTypeInfo(rfp.rfpType)

  // Calculate progress if needed
  // Total questions = default questions (26) + buyer-specific questions (5) = 31
  const buyerQuestions = generateBuyerSpecificQuestions(rfp)
  const totalQuestions = defaultRFPQuestions.length + buyerQuestions.length
  const progressStats = showProgress ? getProgressStats(rfp.id, totalQuestions) : null

  const TypeIcon = typeInfo.icon

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        opacity: 1,
        backgroundColor: 'white'
      }}
    >
      <Card.Section withBorder inheritPadding py="md">
        <Stack gap="sm">
          <Group gap="xs" wrap="wrap">
            <Badge
              leftSection={<TypeIcon size={12} />}
              color={typeInfo.color}
              variant="light"
            >
              {typeInfo.label}
            </Badge>
            <Badge color={getStatusColor(rfp.status)} variant="light">
              {rfp.status}
            </Badge>
            {interestStatus && (
              interestStatus.buyerResponse === 'accepted' ? (
                <Badge leftSection={<CheckCircle2 size={12} />} color="green" variant="light">
                  Accepted
                </Badge>
              ) : interestStatus.buyerResponse === 'rejected' ? (
                <Badge leftSection={<XCircle size={12} />} color="gray" variant="light">
                  Declined
                </Badge>
              ) : (
                <Badge leftSection={<Clock size={12} />} color="yellow" variant="light">
                  Pending
                </Badge>
              )
            )}
            {isViewed && (
              <Badge leftSection={<Eye size={12} />} color="gray" variant="light">
                Viewed
              </Badge>
            )}
            {budgetLevel === 'high' && (
              <Badge leftSection={<Star size={12} />} color="yellow" variant="light">
                Premium
              </Badge>
            )}
            {daysRemaining <= 7 && daysRemaining > 0 && (
              <Badge color="red" variant="light">
                Urgent
              </Badge>
            )}
          </Group>

          <Title order={4} lineClamp={2}>
            {rfp.title}
          </Title>

          <Group gap="md">
            <Group gap={4}>
              <Building2 size={16} color="var(--mantine-color-dimmed)" />
              <Text size="sm" fw={500}>{rfp.company}</Text>
            </Group>
            <Group gap={4}>
              <MapPin size={16} color="var(--mantine-color-dimmed)" />
              <Text size="sm">{rfp.location}</Text>
            </Group>
          </Group>

          <Text size="sm" c="dimmed" lineClamp={3}>
            {rfp.description}
          </Text>

          {rfp.rfpType === 'legal-tech' && rfp.solutionCategory && (
            <Group gap="xs">
              <Text size="xs" fw={500} c="dimmed">Solution:</Text>
              <Badge color="blue" variant="light" size="sm">
                {rfp.solutionCategory}
              </Badge>
            </Group>
          )}
        </Stack>
      </Card.Section>

      <Card.Section withBorder inheritPadding py="md" bg="gray.0">
        <Group grow>
          <Stack align="center" gap={4}>
            <ThemeIcon variant="light" color="gray" size="sm">
              <DollarSign size={16} />
            </ThemeIcon>
            <Text size="sm" fw={600}>{rfp.budget}</Text>
            <Text size="xs" c="dimmed">Budget</Text>
          </Stack>
          <Stack align="center" gap={4}>
            <ThemeIcon variant="light" color="gray" size="sm">
              <Calendar size={16} />
            </ThemeIcon>
            <Text size="sm" fw={600}>
              {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
            </Text>
            <Text size="xs" c="dimmed">Remaining</Text>
          </Stack>
          <Stack align="center" gap={4}>
            <ThemeIcon variant="light" color="gray" size="sm">
              <Clock size={16} />
            </ThemeIcon>
            <Text size="sm" fw={600}>{formatDate(rfp.postedDate)}</Text>
            <Text size="xs" c="dimmed">Posted</Text>
          </Stack>
        </Group>
      </Card.Section>

      <Card.Section inheritPadding py="md">
        <Stack gap="md">
          {showProgress && progressStats && (
            <div>
              <Group justify="space-between" mb={8}>
                <Text size="sm" fw={500}>Application Progress</Text>
                <Text size="sm" fw={600} c="blue">{progressStats.percentage}%</Text>
              </Group>
              <Progress value={progressStats.percentage} color="blue" size="sm" />
              <Text size="xs" c="dimmed" mt={4}>
                {progressStats.completed + progressStats.inProgress} of {totalQuestions} questions answered
              </Text>
            </div>
          )}
          <Button
            component={Link}
            to="/rfp/$rfpId"
            params={{ rfpId: rfp.id.toString() }}
            rightSection={<ArrowRight size={16} />}
            fullWidth
          >
            View Details & Apply
          </Button>
        </Stack>
      </Card.Section>
    </Card>
  )
}