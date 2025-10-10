import { CheckCircle2, Circle, Clock as ClockIcon } from 'lucide-react'
import { Paper, Title, Text, Progress, Group, Stack, ScrollArea, Box, Alert } from '@mantine/core'
import { getQuestionResponse } from '../utils/questionStorage'

export default function QuestionProgress({ rfpId, questions, currentQuestionIndex, onQuestionClick, progressStats, deadline, isTemplate = false }) {
  const getQuestionStatus = (questionId) => {
    const response = getQuestionResponse(rfpId, questionId)
    if (response?.status === 'completed') return 'completed'
    if (response?.status === 'in_progress') return 'in_progress'
    return 'not_started'
  }

  const formatDeadline = (deadlineDate) => {
    const deadline = new Date(deadlineDate)
    const today = new Date()
    const diffTime = deadline - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return {
      days: diffDays,
      date: deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
    }
  }

  const deadlineInfo = deadline ? formatDeadline(deadline) : null

  return (
    <Stack gap="md">
      {/* Progress Overview */}
      <Paper withBorder p="md">
        <Title order={6} size="sm" mb="md">
          Progress
        </Title>

        {/* Progress Bar */}
        <Stack gap="xs" mb="lg">
          <Text size="xl" fw={700} c="blue">
            {progressStats.percentage}%
          </Text>
          <Progress value={progressStats.percentage} size="sm" />
        </Stack>

        {/* Stats Cards */}
        <Group grow gap="xs">
          <Paper withBorder p="sm" style={{ backgroundColor: '#f0fdf4' }}>
            <Text ta="center" size="xl" fw={700} c="green">
              {progressStats.completed}
            </Text>
            <Text ta="center" size="xs" c="green">
              Completed
            </Text>
          </Paper>
          <Paper withBorder p="sm" style={{ backgroundColor: '#eff6ff' }}>
            <Text ta="center" size="xl" fw={700} c="blue">
              {progressStats.inProgress}
            </Text>
            <Text ta="center" size="xs" c="blue">
              In Progress
            </Text>
          </Paper>
          <Paper withBorder p="sm" style={{ backgroundColor: '#f9fafb' }}>
            <Text ta="center" size="xl" fw={700} c="gray">
              {progressStats.remaining}
            </Text>
            <Text ta="center" size="xs" c="dimmed">
              Remaining
            </Text>
          </Paper>
        </Group>
      </Paper>

      {/* Deadline Warning - Only show for actual RFPs, not template */}
      {!isTemplate && deadlineInfo && (
        <Alert
          icon={<ClockIcon size={20} />}
          color="yellow"
          variant="light"
        >
          <Text size="sm" fw={600}>
            {deadlineInfo.days} days until deadline
          </Text>
          <Text size="xs" mt={4}>
            Due: {deadlineInfo.date}
          </Text>
        </Alert>
      )}

      {/* All Questions List */}
      <Paper withBorder p="md">
        <Title order={6} size="sm" mb="md">
          All Questions
        </Title>
        <ScrollArea style={{ height: 384 }}>
          <Stack gap="md">
            {(() => {
              // Group questions by section
              const groupedQuestions = questions.reduce((acc, question, index) => {
                const section = question.section || 'Other'
                if (!acc[section]) {
                  acc[section] = []
                }
                acc[section].push({ ...question, originalIndex: index })
                return acc
              }, {})

              return Object.entries(groupedQuestions).map(([sectionName, sectionQuestions]) => (
                <Stack key={sectionName} gap="xs">
                  {/* Section Header */}
                  <Text
                    size="xs"
                    fw={600}
                    c="dimmed"
                    tt="uppercase"
                    px="xs"
                  >
                    {sectionName}
                  </Text>

                  {/* Questions in this section */}
                  <Stack gap={4}>
                    {sectionQuestions.map((question) => {
                      const status = getQuestionStatus(question.id)
                      const isCurrent = question.originalIndex === currentQuestionIndex

                      return (
                        <Box
                          key={question.id}
                          component="button"
                          onClick={() => onQuestionClick(question.originalIndex)}
                          p="xs"
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            border: isCurrent ? '1px solid #bfdbfe' : '1px solid transparent',
                            borderRadius: 8,
                            backgroundColor: isCurrent ? '#eff6ff' : 'transparent',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                          }}
                          sx={(theme) => ({
                            '&:hover': {
                              backgroundColor: isCurrent ? '#eff6ff' : theme.colors.gray[0],
                            },
                          })}
                        >
                          <Group gap="xs" align="flex-start">
                            {/* Status Icon */}
                            <Box mt={2}>
                              {status === 'completed' ? (
                                <CheckCircle2 size={16} color="#16a34a" />
                              ) : isCurrent ? (
                                <Circle size={16} color="#2563eb" fill="#2563eb" />
                              ) : (
                                <Circle size={16} color="#d1d5db" />
                              )}
                            </Box>

                            {/* Question Info */}
                            <Text
                              size="xs"
                              fw={500}
                              lineClamp={2}
                              c={isCurrent ? 'blue' : 'dark'}
                              style={{ flex: 1 }}
                            >
                              {question.text}
                            </Text>
                          </Group>
                        </Box>
                      )
                    })}
                  </Stack>
                </Stack>
              ))
            })()}
          </Stack>
        </ScrollArea>
      </Paper>
    </Stack>
  )
}
