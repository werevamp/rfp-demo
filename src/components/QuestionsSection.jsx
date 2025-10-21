import { useState, useEffect, useMemo } from 'react'
import { notifications } from '@mantine/notifications'
import { ChevronLeft, ChevronRight, Check, Send, Sparkles, Paperclip, Link2 } from 'lucide-react'
import { Paper, Title, Text, Button, Group, Stack, Badge, Anchor, SimpleGrid, Box, Divider } from '@mantine/core'
import QuestionFields from './QuestionFields'
import QuestionProgress from './QuestionProgress'
import { getQuestionResponse, saveQuestionResponse, markQuestionComplete, getProgressStats } from '../utils/questionStorage'
import { markRFPInterest } from '../utils/rfpStorage'
import { generateBuyerSpecificQuestions } from '../data/questionTemplates'
import { getCurrentVendor } from '../utils/vendorStorage'
import { saveVendorResponse, calculateMatchPercentage } from '../utils/vendorResponseStorage'

export default function QuestionsSection({ rfp, isTemplate = false }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [originalSavedValues, setOriginalSavedValues] = useState({})
  const [autoSaveStatus, setAutoSaveStatus] = useState('')

  // Merge buyer-specific questions with global questions
  // Buyer-specific questions appear FIRST, but only for actual RFPs (not template)
  // Use useMemo to prevent recreating the questions array on every render
  const questions = useMemo(() => {
    const globalQuestions = rfp.questions || []
    const buyerQuestions = !isTemplate ? generateBuyerSpecificQuestions(rfp) : []
    const allQuestions = [...buyerQuestions, ...globalQuestions]
    console.log('Questions list for RFP:', rfp.id, allQuestions)
    return allQuestions
  }, [rfp, isTemplate])

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  // Load existing responses
  useEffect(() => {
    if (currentQuestion) {
      const savedResponse = getQuestionResponse(rfp.id, currentQuestion.id)
      if (savedResponse) {
        setResponses(prev => {
          // Only update if the value has changed to prevent infinite loops
          if (prev[currentQuestion.id] !== savedResponse.value) {
            return {
              ...prev,
              [currentQuestion.id]: savedResponse.value
            }
          }
          return prev
        })
        // Store the original saved value for comparison
        setOriginalSavedValues(prev => {
          // Only update if not already set to prevent infinite loops
          if (!prev[currentQuestion.id]) {
            return {
              ...prev,
              [currentQuestion.id]: {
                value: savedResponse.value,
                status: savedResponse.status
              }
            }
          }
          return prev
        })
      }
    }
  }, [currentQuestionIndex, rfp.id])

  // Auto-save with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentQuestion && responses[currentQuestion.id] !== undefined) {
        saveQuestionResponse(rfp.id, currentQuestion.id, responses[currentQuestion.id])
        setAutoSaveStatus('Saved')
        setTimeout(() => setAutoSaveStatus(''), 2000)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [responses, currentQuestionIndex, rfp.id])

  const handleResponseChange = (value) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
    setAutoSaveStatus('Saving...')
  }

  const handlePrevious = () => {
    // Auto-mark current question as complete if it has a valid answer
    autoMarkCompleteIfValid()

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleNext = () => {
    // Auto-mark current question as complete if it has a valid answer
    autoMarkCompleteIfValid()

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const autoMarkCompleteIfValid = () => {
    if (!currentQuestion) return

    const currentValue = responses[currentQuestion.id]

    // Check if the question has a valid non-empty response
    const hasValidResponse = isValidResponse(currentValue)

    if (hasValidResponse) {
      // Mark as complete
      markQuestionComplete(rfp.id, currentQuestion.id)
      setOriginalSavedValues(prev => ({
        ...prev,
        [currentQuestion.id]: {
          value: currentValue,
          status: 'completed'
        }
      }))
    }
  }

  const isValidResponse = (value) => {
    if (value === undefined || value === null || value === '') {
      return false
    }
    if (typeof value === 'string' && value.trim() === '') {
      return false
    }
    if (Array.isArray(value) && value.length === 0) {
      return false
    }
    if (
      typeof value === 'object' &&
      !Array.isArray(value) &&
      value.selected &&
      Array.isArray(value.selected) &&
      value.selected.length === 0
    ) {
      return false
    }
    return true
  }

  const handleMarkComplete = () => {
    if (currentQuestion) {
      const state = getButtonState()
      const currentValue = responses[currentQuestion.id]

      // Validate required questions before marking complete
      if (currentQuestion.required) {
        let isEmpty = false

        if (currentValue === undefined || currentValue === null || currentValue === '') {
          isEmpty = true
        } else if (Array.isArray(currentValue) && currentValue.length === 0) {
          isEmpty = true
        } else if (
          typeof currentValue === 'object' &&
          !Array.isArray(currentValue) &&
          currentValue.selected &&
          Array.isArray(currentValue.selected) &&
          currentValue.selected.length === 0
        ) {
          isEmpty = true
        }

        if (isEmpty) {
          notifications.show({
            title: 'Required Field',
            message: 'Please provide an answer before marking this question as complete',
            color: 'red',
          })
          return
        }
      }

      // Only mark as complete if it's not "Continue" state
      // "Continue" means already completed with no edits
      if (state?.text !== 'Continue') {
        markQuestionComplete(rfp.id, currentQuestion.id)
        // Update the original saved value after marking complete
        setOriginalSavedValues(prev => ({
          ...prev,
          [currentQuestion.id]: {
            value: currentValue,
            status: 'completed'
          }
        }))
      }

      // Move to next question if not the last one
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    }
  }

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index)
  }

  const handleAttachFile = () => {
    alert('File upload functionality (UI mockup)')
  }

  const handleAddLink = () => {
    const link = prompt('Enter link URL:')
    if (link) {
      console.log('Link added:', link)
    }
  }

  const handleGenerateSuggestion = () => {
    alert('AI suggestion generation (UI mockup)')
  }

  const handleSubmitApplication = () => {
    const requiredQuestions = questions.filter(q => q.required)
    const completedRequired = requiredQuestions.filter(q => {
      const response = getQuestionResponse(rfp.id, q.id)
      return response?.status === 'completed'
    })

    if (completedRequired.length < requiredQuestions.length) {
      notifications.show({
        title: 'Warning',
        message: 'Please complete all required questions before submitting',
        color: 'red',
      })
      return
    }

    // Get current vendor
    const currentVendor = getCurrentVendor()

    // Check if this is a buyer-created RFP (not a mock RFP)
    // Only track vendor responses for buyer-created RFPs
    const isBuyerRFP = typeof rfp.id === 'string' && rfp.id.startsWith('rfp_')

    if (isBuyerRFP) {
      // Calculate match percentage
      const matchPercentage = calculateMatchPercentage(rfp.id, currentVendor.id)

      // Save vendor response
      saveVendorResponse(rfp.id, currentVendor.id, 'responded', {
        matchPercentage,
        vendorName: currentVendor.companyName,
        notes: ''
      })
    }

    // Mark application as pending (submitted)
    markRFPInterest(rfp.id, 'notify-now')

    // Show success notification
    notifications.show({
      title: 'Success',
      message: 'Application submitted successfully!',
      color: 'green',
    })

    // Optionally reload page to show updated status
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  const progressStats = getProgressStats(rfp.id, totalQuestions)
  const allRequiredCompleted = questions
    .filter(q => q.required)
    .every(q => {
      const response = getQuestionResponse(rfp.id, q.id)
      return response?.status === 'completed'
    })

  // Determine button state based on completion status and edits
  const getButtonState = () => {
    if (!currentQuestion) return null

    const originalData = originalSavedValues[currentQuestion.id]
    const currentValue = responses[currentQuestion.id]
    const wasCompleted = originalData?.status === 'completed'
    const hasEdits = originalData && JSON.stringify(currentValue) !== JSON.stringify(originalData.value)

    if (wasCompleted && !hasEdits) {
      return {
        text: 'Continue',
        color: 'bg-green-600 hover:bg-green-700',
        icon: ChevronRight
      }
    } else if (wasCompleted && hasEdits) {
      return {
        text: 'Update',
        color: 'bg-blue-600 hover:bg-blue-700',
        icon: Check
      }
    } else {
      return {
        text: 'Mark complete',
        color: 'bg-gray-900 hover:bg-gray-800',
        icon: Check
      }
    }
  }

  const buttonState = getButtonState()

  // Get RFP type display label
  const getRFPTypeLabel = () => {
    switch (rfp.rfpType) {
      case 'lawfirm':
        return 'Law Firm RFP'
      case 'alsp':
        return 'ALSP (Alternative Legal Service Provider) RFP'
      case 'legal-tech-new':
        return 'Legal Tech - New Product RFP'
      case 'legal-tech-replace':
        return 'Legal Tech - Replacement RFP'
      default:
        return null
    }
  }

  const rfpTypeLabel = getRFPTypeLabel()

  if (!currentQuestion) {
    return (
      <Box py="xl" style={{ textAlign: 'center' }}>
        <Text color="dimmed">No questions available for this RFP</Text>
      </Box>
    )
  }

  return (
    <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'lg', cols: 1 }]} spacing="lg">
      {/* Main Question Area - 3/4 width */}
      <Box style={{ gridColumn: 'span 3' }}>
        {/* RFP Type Badge */}
        {rfpTypeLabel && (
          <Paper withBorder p="sm" mb="md" style={{ background: 'linear-gradient(to right, #f8fafc, #f1f5f9)' }}>
            <Group gap="xs">
              <Badge size="lg" color="indigo" variant="filled">
                {rfpTypeLabel}
              </Badge>
              <Text size="sm" c="dimmed">
                {rfp.rfpType === 'lawfirm' && 'Legal services provided by a law firm'}
                {rfp.rfpType === 'alsp' && 'Legal services provided by an alternative legal service provider'}
                {rfp.rfpType === 'legal-tech-new' && 'Purchasing new legal technology product'}
                {rfp.rfpType === 'legal-tech-replace' && 'Replacing existing legal technology solution'}
              </Text>
            </Group>
          </Paper>
        )}

        <Paper withBorder p="md">

          {/* Question Header */}
          <Stack gap="md" mb="lg">
            <Group justify="space-between">
              <Badge
                color={currentQuestion.priority === 'urgent' ? 'blue' : 'gray'}
                variant="light"
              >
                {currentQuestion.priority === 'urgent' ? 'Normal' : 'Normal'}
              </Badge>
              <Anchor href="#" size="sm" fw={500}>
                View all questions →
              </Anchor>
            </Group>

            {currentQuestion.section && (
              <Text size="xs" fw={600} c="blue" tt="uppercase">
                {currentQuestion.section}
              </Text>
            )}

            <Title order={2}>
              {currentQuestion.text}
            </Title>

            {currentQuestion.helpText && (
              <Text size="sm" c="dimmed">
                {currentQuestion.helpText}
              </Text>
            )}
          </Stack>

          {/* Response Section */}
          <Stack gap="md" mb="lg">
            <Group justify="space-between">
              <Text size="sm" fw={500}>
                Your Response
              </Text>
              <Group gap="sm">
                {autoSaveStatus && (
                  <Text size="xs" c="dimmed">{autoSaveStatus}</Text>
                )}
                <Button
                  onClick={handleGenerateSuggestion}
                  variant="subtle"
                  color="blue"
                  leftSection={<Sparkles size={16} />}
                  size="sm"
                >
                  Generate suggestion
                </Button>
              </Group>
            </Group>

            <QuestionFields
              question={currentQuestion}
              value={responses[currentQuestion.id]}
              onChange={handleResponseChange}
            />
          </Stack>

          {/* Actions */}
          <Divider my="md" />
          <Group justify="space-between">
            <Group gap="sm">
              <Button
                onClick={handleAttachFile}
                variant="default"
                leftSection={<Paperclip size={16} />}
                size="sm"
              >
                Attach file
              </Button>
              <Button
                onClick={handleAddLink}
                variant="default"
                leftSection={<Link2 size={16} />}
                size="sm"
              >
                Add link
              </Button>
            </Group>
            <Button
              onClick={handleMarkComplete}
              color={
                buttonState?.text === 'Continue' ? 'green' :
                buttonState?.text === 'Update' ? 'blue' : 'dark'
              }
              leftSection={buttonState?.icon && <buttonState.icon size={16} />}
            >
              {buttonState?.text || 'Mark complete'}
            </Button>
          </Group>

          {/* Navigation */}
          <Divider my="md" />
          <Group justify="space-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              variant="subtle"
              leftSection={<ChevronLeft size={16} />}
            >
              Previous
            </Button>

            <Text size="sm" c="dimmed">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </Text>

            <Button
              onClick={handleNext}
              disabled={currentQuestionIndex === totalQuestions - 1}
              variant="subtle"
              rightSection={<ChevronRight size={16} />}
            >
              Next
            </Button>
          </Group>
        </Paper>

        {/* Submit Application Button - Only show for actual RFPs, not template */}
        {!isTemplate && allRequiredCompleted && (
          <Paper
            mt="md"
            p="md"
            withBorder
            style={{
              background: 'linear-gradient(to right, #f0fdf4, #eff6ff)',
              borderColor: '#86efac',
            }}
          >
            <Group justify="space-between" align="center">
              <Box>
                <Title order={4} mb={4}>
                  Ready to Submit?
                </Title>
                <Text size="sm" c="dimmed">
                  All required questions completed. You can now submit your application to the buyer.
                </Text>
              </Box>
              <Button
                onClick={handleSubmitApplication}
                color="green"
                size="lg"
                leftSection={<Send size={20} />}
                style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
              >
                Submit Application
              </Button>
            </Group>
          </Paper>
        )}
      </Box>

      {/* Progress Sidebar - 1/3 width */}
      <Box>
        <QuestionProgress
          rfpId={rfp.id}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          onQuestionClick={handleQuestionClick}
          progressStats={progressStats}
          deadline={rfp.deadline}
          isTemplate={isTemplate}
        />
      </Box>
    </SimpleGrid>
  )
}
