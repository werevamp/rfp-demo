import { useState } from 'react'
import { Paperclip, Link2, Sparkles } from 'lucide-react'
import { Select, Checkbox, Radio, Textarea, TextInput, Stack, Group, Paper, Text, Button } from '@mantine/core'

export default function QuestionFields({ question, value, onChange }) {
  const [showConditionalText, setShowConditionalText] = useState(false)

  const handleDropdownChange = (val) => {
    onChange(val)
  }

  const handleMultiSelectChange = (option) => {
    // Handle both array format and object format (for "Other" option)
    const isObjectFormat = value && typeof value === 'object' && !Array.isArray(value)
    const currentValues = isObjectFormat ? (value.selected || []) : (value || [])
    const otherText = isObjectFormat ? value.otherText : ''

    const newValues = currentValues.includes(option)
      ? currentValues.filter(v => v !== option)
      : [...currentValues, option]

    // If "Other" is in the new values, use object format
    if (newValues.includes('Other')) {
      onChange({ selected: newValues, otherText })
    } else {
      onChange(newValues)
    }
  }

  const handleSingleSelectChange = (option) => {
    onChange(option)
    if (question.conditionalText && option === question.conditionalText) {
      setShowConditionalText(true)
    } else {
      setShowConditionalText(false)
    }
  }

  const handleTextAreaChange = (e) => {
    onChange(e.target.value)
  }

  // Render based on field type
  switch (question.fieldType) {
    case 'dropdown':
      return (
        <Select
          value={value || null}
          onChange={handleDropdownChange}
          placeholder="Select an option..."
          data={question.options || []}
        />
      )

    case 'multiselect':
      const isObjectFormat = value && typeof value === 'object' && !Array.isArray(value)
      const selectedValues = isObjectFormat ? (value.selected || []) : (value || [])
      const showOtherText = selectedValues.includes('Other')
      const otherTextValue = isObjectFormat ? (value.otherText || '') : ''

      return (
        <Stack gap="xs">
          {question.options?.map((option, idx) => (
            <Paper key={idx} p="sm" withBorder style={{ cursor: 'pointer' }}>
              <Checkbox
                label={option}
                checked={selectedValues.includes(option)}
                onChange={() => handleMultiSelectChange(option)}
              />
            </Paper>
          ))}
          {showOtherText && (
            <TextInput
              value={otherTextValue}
              onChange={(e) => onChange({ selected: selectedValues, otherText: e.target.value })}
              placeholder="Please specify..."
              mt="xs"
            />
          )}
        </Stack>
      )

    case 'singleselect':
      return (
        <Stack gap="xs">
          <Radio.Group value={value || ''} onChange={handleSingleSelectChange}>
            <Stack gap="xs">
              {question.options?.map((option, idx) => (
                <Paper key={idx} p="sm" withBorder style={{ cursor: 'pointer' }}>
                  <Radio value={option} label={option} />
                </Paper>
              ))}
            </Stack>
          </Radio.Group>
          {showConditionalText && (
            <Textarea
              value={value?.conditionalText || ''}
              onChange={(e) => onChange({ ...value, conditionalText: e.target.value })}
              placeholder="Please provide details..."
              minRows={3}
              mt="xs"
            />
          )}
        </Stack>
      )

    case 'textarea':
      return (
        <Textarea
          value={value || ''}
          onChange={handleTextAreaChange}
          placeholder={question.placeholder || "Write your response here..."}
          minRows={question.rows || 6}
        />
      )

    case 'file':
      return (
        <Stack gap="sm">
          <Paper
            withBorder
            p="xl"
            style={{
              borderStyle: 'dashed',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            sx={(theme) => ({
              '&:hover': {
                borderColor: theme.colors.blue[4],
              },
            })}
          >
            <Stack gap="xs" align="center">
              <Paperclip size={32} color="gray" />
              <Text size="sm" c="dimmed">
                Click to upload or drag and drop
              </Text>
              <Text size="xs" c="dimmed">
                PDF, DOC, DOCX up to 10MB
              </Text>
            </Stack>
          </Paper>
          {question.allowText && (
            <TextInput
              value={value?.text || ''}
              onChange={(e) => onChange({ ...value, text: e.target.value })}
              placeholder={question.placeholder}
            />
          )}
        </Stack>
      )

    // Complex field types with sub-questions
    case 'capacity':
    case 'security':
    case 'implementation':
    case 'billing':
    case 'contract':
    case 'differentiators':
      return (
        <Stack gap="lg">
          {question.subQuestions?.map((subQ) => (
            <Stack key={subQ.id} gap="xs">
              <Text size="sm" fw={500}>
                {subQ.text}
              </Text>
              <QuestionFields
                question={subQ}
                value={value?.[subQ.id]}
                onChange={(newValue) => onChange({ ...value, [subQ.id]: newValue })}
              />
            </Stack>
          ))}
        </Stack>
      )

    default:
      return (
        <Textarea
          value={value || ''}
          onChange={handleTextAreaChange}
          placeholder="Write your response here..."
          minRows={6}
        />
      )
  }
}

// Action buttons for attach file and add link
export function QuestionActions({ onAttachFile, onAddLink, onGenerateSuggestion }) {
  return (
    <Group gap="sm">
      <Button
        onClick={onAttachFile}
        variant="subtle"
        color="gray"
        leftSection={<Paperclip size={16} />}
      >
        Attach file
      </Button>
      <Button
        onClick={onAddLink}
        variant="subtle"
        color="gray"
        leftSection={<Link2 size={16} />}
      >
        Add link
      </Button>
      <Button
        onClick={onGenerateSuggestion}
        variant="subtle"
        color="blue"
        leftSection={<Sparkles size={16} />}
        style={{ marginLeft: 'auto' }}
      >
        Generate suggestion
      </Button>
    </Group>
  )
}
