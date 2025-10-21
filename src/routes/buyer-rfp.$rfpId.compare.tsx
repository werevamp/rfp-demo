import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { Title, Text, Box, Stack, Group, Button, Badge, Checkbox, Table, NumberInput, Rating } from '@mantine/core'
import fakeRFPDetails from '../data/fakeRFPDetails.json'

export const Route = createFileRoute('/buyer-rfp/$rfpId/compare')({
  component: CompareTab,
})

function CompareTab() {
  const [selectedVendors, setSelectedVendors] = useState(['vendor-1', 'vendor-2'])
  const [vendorStages, setVendorStages] = useState({
    'vendor-1': 'Shortlisted',
    'vendor-2': 'Responded',
    'vendor-3': 'Responded'
  })

  // Initialize weights from fakeRFPDetails
  const [questionWeights, setQuestionWeights] = useState(() => {
    const weights = {}
    fakeRFPDetails.questions.forEach(q => {
      weights[q.id] = q.weight
    })
    return weights
  })

  // Initialize vendor scores (stars out of 5) for each question
  const [vendorScores, setVendorScores] = useState(() => {
    const scores = {}
    fakeRFPDetails.vendors.forEach(vendor => {
      scores[vendor.id] = {}
      fakeRFPDetails.questions.forEach(q => {
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

  const handleWeightChange = (questionId, value) => {
    const newValue = value || 0
    const currentWeight = questionWeights[questionId] || 0
    const otherWeightsTotal = Object.entries(questionWeights)
      .filter(([id]) => id !== questionId)
      .reduce((sum, [, weight]) => sum + weight, 0)

    // Only allow change if total won't exceed 100
    if (otherWeightsTotal + newValue <= 100) {
      setQuestionWeights(prev => ({
        ...prev,
        [questionId]: newValue
      }))
    }
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

  // Calculate total weight
  const totalWeight = useMemo(() => {
    return Object.values(questionWeights).reduce((sum, weight) => sum + weight, 0)
  }, [questionWeights])

  // Calculate vendor scores
  const calculateVendorScore = useMemo(() => {
    return (vendorId) => {
      let totalScore = 0

      fakeRFPDetails.questions.forEach(question => {
        const stars = vendorScores[vendorId]?.[question.id] || 0
        const weight = questionWeights[question.id] || 0

        // Convert stars (0-5) to percentage (0-1) and apply weight
        const questionScore = (stars / 5) * (weight / 100)
        totalScore += questionScore
      })

      // Convert to percentage (0-100)
      return (totalScore * 100).toFixed(1)
    }
  }, [vendorScores, questionWeights])

  const selectedVendorData = fakeRFPDetails.vendors.filter(v => selectedVendors.includes(v.id))

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

      {/* Comparison Table */}
      <Box>
        <Title order={4} mb="md">Side-by-side responses</Title>
        <Text size="sm" c="dimmed" mb="lg">
          Assign weights (total 100) and score each vendor per question. Overall score shows at top; click to jump to bottom controls.
        </Text>

        <Table withTableBorder withColumnBorders style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          borderCollapse: 'separate',
          borderSpacing: 0,
          overflow: 'hidden'
        }}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ width: 250, borderBottom: '2px solid var(--mantine-color-gray-4)' }}></Table.Th>
              <Table.Th style={{ width: 100, textAlign: 'center', borderBottom: '2px solid var(--mantine-color-gray-4)' }}>
                <Text size="xs" c="dimmed" mb={4}>WEIGHT (OUT OF 100)</Text>
              </Table.Th>
              {selectedVendorData.map((vendor) => (
                <Table.Th key={vendor.id} style={{ borderBottom: '2px solid var(--mantine-color-gray-4)' }}>
                  <Box>
                    <Text fw={600} mb={4}>{vendor.name}</Text>
                    <Text size="xs" c="dimmed">Score: {calculateVendorScore(vendor.id)}%</Text>
                  </Box>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {fakeRFPDetails.questions.map((question) => (
              <Table.Tr key={question.id}>
                <Table.Td style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                  <Text size="sm" fw={500}>{question.text}</Text>
                </Table.Td>
                <Table.Td style={{ textAlign: 'center', borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                  <NumberInput
                    value={questionWeights[question.id]}
                    onChange={(value) => handleWeightChange(question.id, value)}
                    min={0}
                    max={100}
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
                    <Text size="sm" mb="xs">{vendor.responses[Object.keys(vendor.responses)[fakeRFPDetails.questions.indexOf(question)]]}</Text>
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
            {/* Totals Row */}
            <Table.Tr>
              <Table.Td style={{ borderTop: '2px solid var(--mantine-color-gray-4)' }}>
                <Text fw={700}>Totals</Text>
              </Table.Td>
              <Table.Td style={{ textAlign: 'center', borderTop: '2px solid var(--mantine-color-gray-4)' }}>
                <Text
                  size="xl"
                  fw={700}
                  c={totalWeight === 100 ? 'green' : 'red'}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {totalWeight} / 100
                </Text>
              </Table.Td>
              {selectedVendorData.map((vendor) => (
                <Table.Td key={vendor.id} style={{ textAlign: 'center', borderTop: '2px solid var(--mantine-color-gray-4)' }}>
                  <Text size="xl" fw={700} c="blue">
                    {calculateVendorScore(vendor.id)}%
                  </Text>
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Box>
    </Stack>
  )
}
