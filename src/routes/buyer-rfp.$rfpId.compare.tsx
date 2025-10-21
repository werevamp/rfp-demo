import { createFileRoute, useParams } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Title, Text, Box, Stack, Group, Button, Badge, Checkbox, Table, NumberInput, Rating, Accordion } from '@mantine/core'
import { getBuyerIntake } from '../utils/buyerIntakeStorage'
import { defaultRFPQuestions, legalServicesQuestions, alspQuestions } from '../data/questionTemplates'
import fakeRFPDetails from '../data/fakeRFPDetails.json'

export const Route = createFileRoute('/buyer-rfp/$rfpId/compare')({
  component: CompareTab,
})

function CompareTab() {
  const { rfpId } = useParams({ from: '/buyer-rfp/$rfpId/compare' })
  const rfp = getBuyerIntake(rfpId)

  const [selectedVendors, setSelectedVendors] = useState(['vendor-1', 'vendor-2'])
  const [vendorStages, setVendorStages] = useState({
    'vendor-1': 'Shortlisted',
    'vendor-2': 'Responded',
    'vendor-3': 'Responded'
  })

  // Determine which questions to use based on RFP type
  const getQuestionsForRFPType = (rfpType) => {
    if (rfpType === 'legal-services') {
      return legalServicesQuestions
    } else if (rfpType === 'alsp') {
      return alspQuestions
    } else {
      // Default to legal-tech questions for 'legal-tech' and any other type
      return defaultRFPQuestions
    }
  }

  const questions = rfp ? getQuestionsForRFPType(rfp.rfpType) : defaultRFPQuestions

  // Group questions by section
  const questionsBySection = useMemo(() => {
    const sections = {}
    questions.forEach(question => {
      const section = question.section || 'Other'
      if (!sections[section]) {
        sections[section] = []
      }
      sections[section].push(question)
    })
    return sections
  }, [questions])

  const sectionNames = Object.keys(questionsBySection)

  // Initialize weights evenly distributed per section (each section has 100 total)
  const [questionWeights, setQuestionWeights] = useState(() => {
    const weights = {}

    // For each section, distribute 100 points evenly among questions in that section
    sectionNames.forEach(sectionName => {
      const sectionQuestions = questionsBySection[sectionName]
      const numQuestions = sectionQuestions.length
      const evenWeight = Math.floor(100 / numQuestions)
      const remainder = 100 % numQuestions

      sectionQuestions.forEach((q, index) => {
        weights[q.id] = evenWeight + (index < remainder ? 1 : 0)
      })
    })

    return weights
  })

  // Initialize vendor scores (stars out of 5) for each question
  const [vendorScores, setVendorScores] = useState(() => {
    const scores = {}
    fakeRFPDetails.vendors.forEach(vendor => {
      scores[vendor.id] = {}
      questions.forEach(q => {
        scores[vendor.id][q.id] = 0
      })
    })
    return scores
  })

  const toggleVendorSelection = (vendorId) => {
    setSelectedVendors(prev =>
      prev.includes(vendorId)
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    )
  }

  const handleWeightChange = (questionId, value, section) => {
    setQuestionWeights(prev => ({
      ...prev,
      [questionId]: value || 0
    }))
  }

  // Calculate max weight for a given question within its section
  const getMaxWeight = (questionId, section) => {
    const sectionQuestions = questionsBySection[section]
    const currentWeight = questionWeights[questionId] || 0
    const otherWeightsTotal = sectionQuestions
      .filter(q => q.id !== questionId)
      .reduce((sum, q) => sum + (questionWeights[q.id] || 0), 0)

    return 100 - otherWeightsTotal
  }

  const handleScoreChange = (vendorId, questionId, value) => {
    setVendorScores(prev => ({
      ...prev,
      [vendorId]: {
        ...prev[vendorId],
        [questionId]: value
      }
    }))
  }

  // Calculate section total weight (sum of question weights in that section)
  const calculateSectionTotal = (section) => {
    const sectionQuestions = questionsBySection[section]
    return sectionQuestions.reduce((sum, q) => sum + (questionWeights[q.id] || 0), 0)
  }

  // Calculate vendor section scores
  const calculateVendorSectionScore = (vendorId, section) => {
    const sectionQuestions = questionsBySection[section]
    let totalScore = 0

    sectionQuestions.forEach(question => {
      const stars = vendorScores[vendorId]?.[question.id] || 0
      const weight = questionWeights[question.id] || 0

      // Convert stars (0-5) to percentage (0-1) and apply weight
      const questionScore = (stars / 5) * (weight / 100)
      totalScore += questionScore
    })

    // Convert to percentage (0-100)
    return (totalScore * 100).toFixed(1)
  }

  const selectedVendorData = fakeRFPDetails.vendors.filter(v => selectedVendors.includes(v.id))

  // Helper function to format response for display
  const formatResponse = (response) => {
    if (Array.isArray(response)) {
      return response.join(', ')
    }
    return response || 'No response provided'
  }

  return (
    <Stack gap="lg">
      <Box>
        <Title order={3} mb="xs">Build your comparison</Title>
        <Text size="sm" c="dimmed">Select vendors to compare side-by-side</Text>
      </Box>

      {/* Vendor Selection */}
      <Group gap="md">
        {fakeRFPDetails.vendors.map((vendor) => (
          <Button
            key={vendor.id}
            variant="default"
            onClick={() => toggleVendorSelection(vendor.id)}
            leftSection={
              <Checkbox
                checked={selectedVendors.includes(vendor.id)}
                onChange={() => {}}
                size="xs"
              />
            }
            rightSection={
              <Badge size="sm" variant="light" color={vendor.stage === 'Shortlisted' ? 'orange' : 'blue'}>
                {vendorStages[vendor.id]}
              </Badge>
            }
            style={{
              backgroundColor: selectedVendors.includes(vendor.id) ? 'var(--mantine-color-gray-1)' : 'white',
              border: '1px solid var(--mantine-color-gray-4)',
              color: 'black'
            }}
          >
            {vendor.name}
          </Button>
        ))}
      </Group>

      {/* Questions grouped by section */}
      <Box>
        <Title order={4} mb="md">Detailed Question Comparison by Section</Title>
        <Text size="sm" c="dimmed" mb="lg">
          Expand each section to view questions, assign weights, and score vendors. Each section's weights should total 100.
        </Text>

        <Accordion variant="separated" defaultValue={sectionNames[0]} styles={{
          item: {
            border: '1px solid var(--mantine-color-gray-4)',
            borderRadius: '8px',
            backgroundColor: 'white',
            overflow: 'hidden',
          },
          control: {
            backgroundColor: 'white',
          }
        }}>
          {sectionNames.map((section) => {
            const sectionQuestions = questionsBySection[section]
            const sectionTotal = calculateSectionTotal(section)

            return (
              <Accordion.Item key={section} value={section}>
                <Accordion.Control>
                  <Group justify="space-between" pr="md" wrap="nowrap">
                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Text fw={600} mb={4}>{section}</Text>
                      <Group gap="xs" wrap="nowrap">
                        {selectedVendorData.map((vendor) => (
                          <Text key={vendor.id} size="xs" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
                            {vendor.name}: <Text component="span" fw={600} c="blue">{calculateVendorSectionScore(vendor.id, section)}%</Text>
                          </Text>
                        ))}
                      </Group>
                    </Box>
                    <Badge color={sectionTotal === 100 ? 'green' : 'red'} variant="light" style={{ flexShrink: 0 }}>
                      {sectionQuestions.length} questions • Weight: {sectionTotal}/100
                    </Badge>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Table withTableBorder withColumnBorders style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    borderCollapse: 'separate',
                    borderSpacing: 0,
                    overflow: 'hidden'
                  }}>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th style={{ width: 250, borderBottom: '2px solid var(--mantine-color-gray-4)' }}>Question</Table.Th>
                        <Table.Th style={{ width: 100, textAlign: 'center', borderBottom: '2px solid var(--mantine-color-gray-4)' }}>
                          <Text size="xs" c="dimmed" mb={4}>WEIGHT (OUT OF 100)</Text>
                        </Table.Th>
                        {selectedVendorData.map((vendor) => (
                          <Table.Th key={vendor.id} style={{ borderBottom: '2px solid var(--mantine-color-gray-4)' }}>
                            <Box>
                              <Text fw={600} mb={4}>{vendor.name}</Text>
                              <Text size="xs" c="dimmed">Section Score: {calculateVendorSectionScore(vendor.id, section)}%</Text>
                            </Box>
                          </Table.Th>
                        ))}
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {sectionQuestions.map((question) => (
                        <Table.Tr key={question.id}>
                          <Table.Td style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                            <Text size="sm" fw={500}>{question.text}</Text>
                          </Table.Td>
                          <Table.Td style={{ textAlign: 'center', borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                            <NumberInput
                              value={questionWeights[question.id]}
                              onChange={(value) => handleWeightChange(question.id, value, section)}
                              min={0}
                              max={getMaxWeight(question.id, section)}
                              w={80}
                              size="sm"
                              styles={{
                                input: {
                                  textAlign: 'center',
                                  fontWeight: 600
                                }
                              }}
                            />
                          </Table.Td>
                          {selectedVendorData.map((vendor) => (
                            <Table.Td key={vendor.id} style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                              <Text size="sm" mb="xs">
                                {formatResponse(vendor.responses[question.id])}
                              </Text>
                              <Box mt="sm">
                                <Text size="xs" c="dimmed" mb={4}>Score</Text>
                                <Rating
                                  value={vendorScores[vendor.id]?.[question.id] || 0}
                                  onChange={(value) => handleScoreChange(vendor.id, question.id, value)}
                                  fractions={2}
                                  size="md"
                                />
                              </Box>
                            </Table.Td>
                          ))}
                        </Table.Tr>
                      ))}
                      {/* Section Totals Row */}
                      <Table.Tr>
                        <Table.Td style={{ borderTop: '2px solid var(--mantine-color-gray-4)' }}>
                          <Text fw={700}>Section Totals</Text>
                        </Table.Td>
                        <Table.Td style={{ textAlign: 'center', borderTop: '2px solid var(--mantine-color-gray-4)' }}>
                          <Text
                            size="xl"
                            fw={700}
                            c={sectionTotal === 100 ? 'green' : 'red'}
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            {sectionTotal} / 100
                          </Text>
                        </Table.Td>
                        {selectedVendorData.map((vendor) => (
                          <Table.Td key={vendor.id} style={{ textAlign: 'center', borderTop: '2px solid var(--mantine-color-gray-4)' }}>
                            <Text size="xl" fw={700} c="blue">
                              {calculateVendorSectionScore(vendor.id, section)}%
                            </Text>
                          </Table.Td>
                        ))}
                      </Table.Tr>
                    </Table.Tbody>
                  </Table>
                </Accordion.Panel>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Box>
    </Stack>
  )
}
