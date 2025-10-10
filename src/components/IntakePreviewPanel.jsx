import { X } from 'lucide-react'
import { Box, Stack, Title, Text, ActionIcon, ScrollArea, Divider } from '@mantine/core'
import {
  industries,
  jurisdictions,
  languages,
  volumeScaleOptions,
  pricingModels,
  practiceAreas,
  experienceLevels,
  purchaseFactors,
  budgetStatus,
  featurePriority,
  signTimeline,
  contractTerms,
  billingTerms,
  paymentTerms,
  productRecommendations
} from '../data/intakeOptions'

export default function IntakePreviewPanel({ formData, isOpen, onClose, currentStep = 1 }) {
  if (!isOpen) return null

  // Helper to determine if a section should be shown
  const shouldShowSection = (step) => {
    return step <= currentStep
  }

  // Helper function to get label from value
  const getLabel = (value, options) => {
    const option = options.find(opt => opt.value === value)
    return option ? option.label : value
  }

  // Helper function to format array of values
  const formatArrayValues = (values, options) => {
    if (!values || values.length === 0) return '(Not provided)'
    return values.map(val => getLabel(val, options)).join(', ')
  }

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '(Not provided)'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  // Helper function to format currency
  const formatCurrency = (value) => {
    if (!value && value !== 0) return '(Not provided)'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const QuestionAnswer = ({ question, answer }) => (
    <Box mb="sm">
      <Text size="sm" fw={600} c="gray.9" mb={4}>
        {question}
      </Text>
      <Text size="sm" c="gray.7" style={{ whiteSpace: 'pre-wrap' }}>
        {answer || '(Not provided)'}
      </Text>
    </Box>
  )

  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease-in-out',
        }}
      />

      {/* Panel */}
      <Box
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 480,
          backgroundColor: 'white',
          boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s ease-in-out',
        }}
      >
        {/* Header */}
        <Box
          p="lg"
          style={{
            borderBottom: '1px solid var(--mantine-color-gray-2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Title order={3} size="lg">Request Preview</Title>
          <ActionIcon onClick={onClose} variant="subtle" color="gray">
            <X size={20} />
          </ActionIcon>
        </Box>

        {/* Content */}
        <ScrollArea style={{ flex: 1 }} px={0}>
          <Stack gap={0}>
            {/* Step 1: Title & Company */}
            {shouldShowSection(1) && <Box>
              <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Title order={4} size="md" c="gray.9">Basic Information</Title>
              </Box>
              <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Stack gap={0}>
                  <QuestionAnswer
                    question="RFP Title"
                    answer={formData.title}
                  />
                  <QuestionAnswer
                    question="Company Description"
                    answer={formData.companyDescription}
                  />
                </Stack>
              </Box>
            </Box>}

            {/* Tech Intake - Step 2: Product Search */}
            {formData.rfpType === 'legal-tech-new' && shouldShowSection(2) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Product Information</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <QuestionAnswer
                    question="Product Search"
                    answer={formData.productSearch}
                  />
                </Box>
              </Box>
            )}

            {/* Legal Services - Step 2: Work Description */}
            {formData.rfpType !== 'legal-tech-new' && (formData.deliveryModel === 'alsp' || formData.deliveryModel === 'lawfirm') && shouldShowSection(2) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Work Description</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <QuestionAnswer
                    question="Description of Work"
                    answer={formData.workDescription}
                  />
                </Box>
              </Box>
            )}

            {/* Tech Intake - Step 3: Use Case */}
            {formData.rfpType === 'legal-tech-new' && shouldShowSection(3) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Use Case</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <QuestionAnswer
                    question="Use Case Description"
                    answer={formData.useCaseDescription}
                  />
                </Box>
              </Box>
            )}

            {/* Tech Intake - Step 4: Purchase Factors */}
            {formData.rfpType === 'legal-tech-new' && shouldShowSection(4) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Purchase Factors</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Stack gap={0}>
                    <QuestionAnswer
                      question="Important Purchase Factors"
                      answer={formatArrayValues(formData.purchaseFactors, purchaseFactors)}
                    />
                    {formData.purchaseFactors?.includes('other') && (
                      <QuestionAnswer
                        question="Other Factor"
                        answer={formData.purchaseFactorsOther}
                      />
                    )}
                  </Stack>
                </Box>
              </Box>
            )}

            {/* Tech Intake - Step 5: Budget Status */}
            {formData.rfpType === 'legal-tech-new' && shouldShowSection(5) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Budget Status</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Stack gap={0}>
                    <QuestionAnswer
                      question="Purchase Status"
                      answer={getLabel(formData.budgetStatus, budgetStatus)}
                    />
                    {formData.budgetStatus === 'other' && (
                      <QuestionAnswer
                        question="Other Status"
                        answer={formData.budgetStatusOther}
                      />
                    )}
                  </Stack>
                </Box>
              </Box>
            )}

            {/* Tech Intake - Step 6: Core Features */}
            {formData.rfpType === 'legal-tech-new' && shouldShowSection(6) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Core Features</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <QuestionAnswer
                    question="Required Features"
                    answer={
                      formData.coreFeatures && formData.coreFeatures.length > 0
                        ? formData.coreFeatures
                            .filter(f => f.feature && f.feature.trim())
                            .map((f, i) => `${i + 1}. ${f.feature}${f.priority ? ` (${getLabel(f.priority, featurePriority)})` : ''}`)
                            .join('\n') || '(None added)'
                        : '(None added)'
                    }
                  />
                </Box>
              </Box>
            )}

            {/* Tech Intake - Step 7: Existing Technology */}
            {formData.rfpType === 'legal-tech-new' && shouldShowSection(7) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Technology Integration</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <QuestionAnswer
                    question="Existing Tech Stack"
                    answer={
                      formData.existingTechStack && formData.existingTechStack.length > 0
                        ? formData.existingTechStack.join(', ')
                        : '(None added)'
                    }
                  />
                </Box>
              </Box>
            )}

            {/* Tech Intake - Step 8: Selected Products */}
            {formData.rfpType === 'legal-tech-new' && shouldShowSection(8) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Product Selection</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Stack gap={0}>
                    <QuestionAnswer
                      question="Selected Products for Bids"
                      answer={formatArrayValues(formData.selectedProducts, productRecommendations)}
                    />
                    <QuestionAnswer
                      question="Maximum Number of Responses"
                      answer={formData.maxResponses || '(Not specified)'}
                    />
                  </Stack>
                </Box>
              </Box>
            )}

            {/* Tech Intake - Step 9: Number of Users */}
            {formData.rfpType === 'legal-tech-new' && shouldShowSection(9) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Users</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <QuestionAnswer
                    question="Number of Users/Seats"
                    answer={formData.numberOfUsers}
                  />
                </Box>
              </Box>
            )}

            {/* Tech Intake - Step 10: Sign Timeline */}
            {formData.rfpType === 'legal-tech-new' && shouldShowSection(10) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Timeline</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Stack gap={0}>
                    <QuestionAnswer
                      question="How Soon to Sign"
                      answer={getLabel(formData.signTimeline, signTimeline)}
                    />
                    {formData.signTimeline === 'other' && (
                      <QuestionAnswer
                        question="Other Timeline"
                        answer={formData.signTimelineOther}
                      />
                    )}
                  </Stack>
                </Box>
              </Box>
            )}

            {/* Tech Intake - Step 11: Additional Info */}
            {formData.rfpType === 'legal-tech-new' && shouldShowSection(11) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Additional Information</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Stack gap={0}>
                    <QuestionAnswer
                      question="Contract Term"
                      answer={formatArrayValues(formData.contractTerm, contractTerms)}
                    />
                    <QuestionAnswer
                      question="Billing Term"
                      answer={formatArrayValues(formData.billingTerm, billingTerms)}
                    />
                    <QuestionAnswer
                      question="Payment Term"
                      answer={formatArrayValues(formData.paymentTerm, paymentTerms)}
                    />
                    <QuestionAnswer
                      question="Custom Questions"
                      answer={formData.customQuestions}
                    />
                  </Stack>
                </Box>
              </Box>
            )}

            {/* Tech Intake - Step 12: Contact */}
            {formData.rfpType === 'legal-tech-new' && shouldShowSection(12) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Contact Information</Title>
                </Box>
                <Box px="lg" pt="sm">
                  <Stack gap={0}>
                    <QuestionAnswer
                      question="Email Address"
                      answer={formData.email}
                    />
                    <QuestionAnswer
                      question="Terms Accepted"
                      answer={formData.acceptedTerms ? 'Yes' : 'Not yet accepted'}
                    />
                  </Stack>
                </Box>
              </Box>
            )}

            {/* Legal Services - Step 3: Requirements */}
            {formData.rfpType !== 'legal-tech-new' && (formData.deliveryModel === 'alsp' || formData.deliveryModel === 'lawfirm') && shouldShowSection(3) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Requirements</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Stack gap={0}>
                    {/* ALSP Requirements */}
                    {formData.deliveryModel === 'alsp' && (
                      <>
                        <QuestionAnswer
                          question="Client Industry Experience"
                          answer={formatArrayValues(formData.clientIndustryExperience, industries)}
                        />
                        <QuestionAnswer
                          question="Location / Jurisdiction Relevance"
                          answer={formatArrayValues(formData.locationJurisdiction, jurisdictions)}
                        />
                        <QuestionAnswer
                          question="Languages Required"
                          answer={formatArrayValues(formData.languagesRequired, languages)}
                        />
                        <QuestionAnswer
                          question="Volume / Scale Expectation"
                          answer={
                            formData.volumeScale === 'other'
                              ? formData.volumeScaleOther || '(Not provided)'
                              : getLabel(formData.volumeScale, volumeScaleOptions)
                          }
                        />
                      </>
                    )}

                    {/* Lawfirm Requirements */}
                    {formData.deliveryModel === 'lawfirm' && (
                      <>
                        <QuestionAnswer
                          question="Requested Practice Experience"
                          answer={formatArrayValues(formData.practiceAreas, practiceAreas)}
                        />
                        <QuestionAnswer
                          question="Requested Experience Level"
                          answer={getLabel(formData.experienceLevel, experienceLevels)}
                        />
                        <QuestionAnswer
                          question="Bar Licenses"
                          answer={
                            formData.barLicenses && formData.barLicenses.length > 0
                              ? formData.barLicenses
                                  .filter(license => license.state || license.country)
                                  .map(license => `${license.state || ''}${license.state && license.country ? ', ' : ''}${license.country || ''}`)
                                  .join('; ') || '(None added)'
                              : '(None added)'
                          }
                        />
                      </>
                    )}
                  </Stack>
                </Box>
              </Box>
            )}

            {/* Legal Services - Step 4: Pricing */}
            {formData.rfpType !== 'legal-tech-new' && (formData.deliveryModel === 'alsp' || formData.deliveryModel === 'lawfirm') && shouldShowSection(4) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Pricing</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Stack gap={0}>
                    <QuestionAnswer
                      question="Preferred Pricing Model"
                      answer={formatArrayValues(formData.preferredPricingModel, pricingModels)}
                    />
                    <QuestionAnswer
                      question="Budget Range"
                      answer={
                        formData.budgetFrom && formData.budgetTo
                          ? `${formatCurrency(formData.budgetFrom)} - ${formatCurrency(formData.budgetTo)}`
                          : '(Not provided)'
                      }
                    />
                    <QuestionAnswer
                      question="Additional Budget Information"
                      answer={formData.additionalBudgetInfo}
                    />
                  </Stack>
                </Box>
              </Box>
            )}

            {/* Legal Services - Step 5: Who to request bids from */}
            {formData.rfpType !== 'legal-tech-new' && (formData.deliveryModel === 'alsp' || formData.deliveryModel === 'lawfirm') && shouldShowSection(5) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Bid Recipients</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Stack gap={0}>
                    <QuestionAnswer
                      question="Use Theorem Marketplace Network"
                      answer={formData.useTheoremMarketplace ? 'Yes' : 'No'}
                    />
                    <QuestionAnswer
                      question="Maximum Number of Responses"
                      answer={formData.maxResponses || '(Not specified)'}
                    />
                  </Stack>
                </Box>
              </Box>
            )}

            {/* Legal Services - Step 6: Finishing Touches */}
            {formData.rfpType !== 'legal-tech-new' && (formData.deliveryModel === 'alsp' || formData.deliveryModel === 'lawfirm') && shouldShowSection(6) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Project Details</Title>
                </Box>
                <Box px="lg" pt="sm" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Stack gap={0}>
                    <QuestionAnswer
                      question="Expected Project Date Range"
                      answer={
                        formData.projectStartDate && formData.projectEndDate
                          ? `${formatDate(formData.projectStartDate)} - ${formatDate(formData.projectEndDate)}`
                          : '(Not provided)'
                      }
                    />
                    <QuestionAnswer
                      question="Custom Questions for Bidders"
                      answer={
                        formData.customQuestions && formData.customQuestions.length > 0
                          ? formData.customQuestions
                              .filter(q => q && q.trim())
                              .map((q, i) => `${i + 1}. ${q}`)
                              .join('\n') || '(None added)'
                          : '(None added)'
                      }
                    />
                  </Stack>
                </Box>
              </Box>
            )}

            {/* Legal Services - Step 7: Contact */}
            {formData.rfpType !== 'legal-tech-new' && (formData.deliveryModel === 'alsp' || formData.deliveryModel === 'lawfirm') && shouldShowSection(7) && (
              <Box>
                <Box py="xs" px="lg" style={{ backgroundColor: 'var(--mantine-color-gray-0)', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                  <Title order={4} size="md" c="gray.9">Contact Information</Title>
                </Box>
                <Box px="lg" pt="sm">
                  <Stack gap={0}>
                    <QuestionAnswer
                      question="Email Address"
                      answer={formData.email}
                    />
                    <QuestionAnswer
                      question="Terms Accepted"
                      answer={formData.acceptedTerms ? 'Yes' : 'Not yet accepted'}
                    />
                  </Stack>
                </Box>
              </Box>
            )}
          </Stack>
        </ScrollArea>
      </Box>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
