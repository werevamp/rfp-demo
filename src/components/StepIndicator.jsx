import { CheckCircle } from 'lucide-react'
import { Stack, Box, ThemeIcon } from '@mantine/core'

export default function StepIndicator({ currentStep, totalSteps = 6 }) {
  return (
    <Stack gap="xs">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        const isUpcoming = stepNumber > currentStep

        return (
          <Box key={stepNumber} style={{ display: 'flex', justifyContent: 'center' }}>
            {isCompleted && (
              <ThemeIcon size="lg" radius="xl" color="green">
                <CheckCircle size={20} />
              </ThemeIcon>
            )}
            {isCurrent && (
              <Box
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '4px solid #3b82f6',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Box
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6',
                  }}
                />
              </Box>
            )}
            {isUpcoming && (
              <Box
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '2px solid #d1d5db',
                  backgroundColor: 'white',
                }}
              />
            )}
          </Box>
        )
      })}
    </Stack>
  )
}
