import { createFileRoute } from '@tanstack/react-router'
import { Stack, Paper, Group, ThemeIcon, Title, Text, Alert } from '@mantine/core'
import { defaultRFPQuestions } from '../data/questionTemplates'
import QuestionsSection from '../components/QuestionsSection'
import { FileEdit, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/my-answers')({
  component: MyAnswers,
})

function MyAnswers() {
  // Create a template "RFP" object with just the questions
  const templateRFP = {
    id: 'template',
    title: 'Your Default RFP Answers',
    company: 'Template',
    questions: defaultRFPQuestions,
  }

  return (
    <Stack gap="lg">
      {/* Header Section */}
      <Paper
        p="xl"
        radius="lg"
        style={{
          background: 'linear-gradient(to right, var(--mantine-color-blue-0), var(--mantine-color-indigo-0))',
          border: '1px solid var(--mantine-color-blue-2)'
        }}
      >
        <Group align="flex-start" gap="md">
          <ThemeIcon size={54} radius="md" color="blue.1" variant="light">
            <FileEdit size={24} color="var(--mantine-color-blue-6)" />
          </ThemeIcon>
          <Stack gap="md" style={{ flex: 1 }}>
            <Title order={1} size="h2" c="gray.9">
              Pre-fill Your RFP Answers
            </Title>
            <Text size="lg" c="gray.7">
              Save time by filling out your default answers once. These answers will automatically appear when you respond to any RFP.
            </Text>
            <Alert
              icon={<Sparkles size={20} />}
              color="blue"
              variant="light"
              styles={{
                root: { backgroundColor: 'rgba(255, 255, 255, 0.6)' }
              }}
            >
              <Text size="sm" c="gray.7">
                <Text component="span" fw={700}>Pro tip:</Text> Your answers are automatically saved as you type. When viewing an RFP's questions, you can override these defaults for that specific RFP.
              </Text>
            </Alert>
          </Stack>
        </Group>
      </Paper>

      {/* Questions Section */}
      <QuestionsSection rfp={templateRFP} isTemplate={true} />
    </Stack>
  )
}
