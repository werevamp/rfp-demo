import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useForm, useFormContext, FormProvider, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Stack,
  Title,
  Text,
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  Button,
  Group,
  Box,
  Paper,
  Alert,
  Checkbox,
  NumberInput,
  ActionIcon,
  ThemeIcon,
  Modal
} from '@mantine/core'
import { Search } from 'lucide-react'
import IntakeLayout from '../components/IntakeLayout'
import StepIndicator from '../components/StepIndicator'
import { BackButton, NextButton } from '../components/IntakeNavButtons'
import { saveDraft, getDraft, saveBuyerIntake } from '../utils/buyerIntakeStorage'
import { lawfirmIntakeSchema, stepSchemas } from '../schemas/lawfirmIntakeSchema'
import {
  practiceAreas,
  experienceLevels,
  pricingModels
} from '../data/intakeOptions'

export const Route = createFileRoute('/intake/lawfirm')({
  component: LawfirmIntake,
  validateSearch: (search) => ({
    step: Number(search?.step) || 1
  })
})

function LawfirmIntake() {
  const navigate = useNavigate()
  const { step } = Route.useSearch()

  // Track the highest step reached for preview panel
  const [maxStepReached, setMaxStepReached] = useState(step)

  useEffect(() => {
    if (step > maxStepReached) {
      setMaxStepReached(step)
    }
  }, [step, maxStepReached])

  // Default values
  const defaultValues = {
    serviceType: 'legal-services',
    deliveryModel: 'lawfirm',
    rfpType: 'lawfirm',
    legalNeed: '',
    title: '',
    companyDescription: '',
    workDescription: '',
    practiceAreas: [],
    experienceLevel: '',
    barLicenses: [],
    preferredPricingModel: [],
    budgetFrom: '',
    budgetTo: '',
    additionalBudgetInfo: '',
    selectYourFirms: false,
    useTheoremMarketplace: true,
    serviceProviders: [],
    maxResponses: '',
    projectStartDate: '',
    projectEndDate: '',
    customQuestions: [''],
    uploadedFiles: [],
    email: '',
    acceptedTerms: false
  }

  // Initialize form with draft data or defaults
  const draft = getDraft('lawfirm')
  const methods = useForm({
    defaultValues: draft ? { ...defaultValues, ...draft } : defaultValues,
    resolver: yupResolver(lawfirmIntakeSchema),
    mode: 'onChange'
  })

  const { watch, trigger, formState: { errors, isValid } } = methods

  // Watch all form values for auto-save
  const formValues = watch()

  // Auto-save draft
  useEffect(() => {
    saveDraft(formValues, 'lawfirm')
  }, [formValues])

  const goToStep = (newStep) => {
    navigate({ to: '/intake/lawfirm', search: { step: newStep } })
  }

  const handleNext = async () => {
    // Validate current step
    const currentStepSchema = stepSchemas[step]
    const isStepValid = await trigger(Object.keys(currentStepSchema.fields))

    if (isStepValid && step < 7) {
      goToStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      goToStep(step - 1)
    } else {
      navigate({ to: '/intake/legal-services/need' })
    }
  }

  const handleSubmit = methods.handleSubmit((data) => {
    // Save to localStorage
    const rfpId = saveBuyerIntake(data)

    // Navigate to thank you page
    navigate({ to: '/intake/thank-you', search: { rfpId } })
  })

  const getStepErrors = () => {
    const currentStepSchema = stepSchemas[step]
    if (!currentStepSchema) return {}

    const stepFieldNames = Object.keys(currentStepSchema.fields)
    const stepErrors = {}

    stepFieldNames.forEach(fieldName => {
      if (errors[fieldName]) {
        stepErrors[fieldName] = errors[fieldName]
      }
    })

    return stepErrors
  }

  const hasStepErrors = () => {
    return Object.keys(getStepErrors()).length > 0
  }

  return (
    <IntakeLayout showPreview={true} formData={formValues} currentStep={maxStepReached}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <Group align="flex-start" gap="xl" py="lg" style={{ minHeight: '100vh' }}>
            {/* Left Sidebar - Step Indicator */}
            <Box style={{ width: 64, flexShrink: 0, position: 'sticky', top: 32 }}>
              <StepIndicator currentStep={step} totalSteps={7} />
            </Box>

            {/* Main Content */}
            <Box style={{ flex: 1, maxWidth: 768 }}>
              {step === 1 && <Step1 errors={errors} />}
              {step === 2 && <Step2 errors={errors} />}
              {step === 3 && <Step3 errors={errors} />}
              {step === 4 && <Step4 errors={errors} />}
              {step === 5 && <Step5 errors={errors} />}
              {step === 6 && <Step6 errors={errors} />}
              {step === 7 && <Step7 errors={errors} />}

              {/* Navigation Buttons */}
              <Group gap="md" mt="xl">
                <BackButton onClick={handleBack} />
                {step < 7 ? (
                  <NextButton
                    onClick={handleNext}
                    type="button"
                  />
                ) : (
                  <NextButton
                    type="submit"
                    isSubmit={true}
                  />
                )}
              </Group>

              {/* Show validation errors */}
              {hasStepErrors() && (
                <Alert color="red" mt="md">
                  <Text size="sm" fw={600} c="red.8" mb="xs">Please fix the following errors:</Text>
                  <Stack gap={4} component="ul" style={{ listStylePosition: 'inside', paddingLeft: 0 }}>
                    {Object.entries(getStepErrors()).map(([field, error]) => (
                      <Text key={field} component="li" size="sm" c="red.7">{error.message}</Text>
                    ))}
                  </Stack>
                </Alert>
              )}
            </Box>
          </Group>
        </form>
      </FormProvider>
    </IntakeLayout>
  )
}

// Step 1: Title & Company Description
function Step1({ errors }) {
  const { register } = useFormContext()

  return (
    <Stack gap="xl">
      <Title order={1} size="2.5rem" c="gray.9">RFP Builder</Title>

      <Box>
        <Title order={2} size="xl" c="gray.9" mb="sm">
          Title {errors.title && <Text component="span" c="red.6">*</Text>}
        </Title>
        <TextInput
          {...register('title')}
          placeholder="Give your RFP a title"
          error={errors.title?.message}
          size="md"
        />
      </Box>

      <Box>
        <Group gap="xs" mb="sm">
          <Title order={2} size="xl" c="gray.9">
            Please provide your anonymous company description {errors.companyDescription && <Text component="span" c="red.6">*</Text>}
          </Title>
          <ThemeIcon size="sm" radius="xl" color="blue">
            <Text size="xs" c="white">i</Text>
          </ThemeIcon>
        </Group>
        <TextInput
          {...register('companyDescription')}
          placeholder='e.g. "Am law 200 firm, software company, consultancy (limit: 100 characters)'
          maxLength={100}
          error={errors.companyDescription?.message}
          size="md"
        />
      </Box>
    </Stack>
  )
}

// Step 2: Description of Work
function Step2({ errors }) {
  const { register, watch } = useFormContext()
  const workDescription = watch('workDescription') || ''

  return (
    <Stack gap="lg">
      <Title order={1} size="2.5rem" c="gray.9">Description of work</Title>
      <Text c="gray.6" size="lg">
        This helps competitive bidders know if this is something they are a good fit for
      </Text>

      <Box>
        <Textarea
          {...register('workDescription')}
          placeholder="Please provide a brief description of the work to be completed.
(Max character limit - 300)"
          maxLength={300}
          rows={8}
          error={errors.workDescription?.message}
          size="md"
        />
        <Group justify="space-between" mt="xs">
          <Box>
            {errors.workDescription && (
              <Text size="sm" c="red.6">{errors.workDescription.message}</Text>
            )}
          </Box>
          <Text size="sm" c="gray.5">
            {workDescription.length}/300
          </Text>
        </Group>
      </Box>
    </Stack>
  )
}

// Step 3: Requirements
function Step3({ errors }) {
  const { register, watch, setValue, control } = useFormContext()
  const barLicenses = watch('barLicenses') || []

  const addBarLicense = () => {
    setValue('barLicenses', [...barLicenses, { state: '', country: '' }])
  }

  const removeBarLicense = (index) => {
    const newLicenses = barLicenses.filter((_, i) => i !== index)
    setValue('barLicenses', newLicenses)
  }

  return (
    <Stack gap="xl">
      <Title order={1} size="2.5rem" c="gray.9">Requirements</Title>

      <Box>
        <Title order={2} size="xl" c="gray.9" mb="sm">
          Requested Practice Experience {errors.practiceAreas && <Text component="span" c="red.6">*</Text>}
        </Title>
        <Controller
          name="practiceAreas"
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              data={practiceAreas}
              error={errors.practiceAreas?.message}
              size="md"
              searchable
              placeholder="Practice Area Drop Down Multi select"
            />
          )}
        />
      </Box>

      <Box>
        <Title order={2} size="xl" c="gray.9" mb="sm">
          Requested Experience Level {errors.experienceLevel && <Text component="span" c="red.6">*</Text>}
        </Title>
        <Controller
          name="experienceLevel"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              data={experienceLevels}
              error={errors.experienceLevel?.message}
              size="md"
              placeholder="Select an experience level"
            />
          )}
        />
      </Box>

      <Box>
        <Title order={2} size="xl" c="gray.9" mb="sm">
          Bar License
        </Title>
        <Button
          onClick={addBarLicense}
          variant="outline"
          color="blue"
          size="md"
        >
          ADD BAR LICENSE
        </Button>
        {barLicenses.length > 0 && (
          <Stack gap="sm" mt="md">
            {barLicenses.map((_, index) => (
              <Group key={index} gap="sm">
                <TextInput
                  {...register(`barLicenses.${index}.state`)}
                  placeholder="State"
                  size="md"
                  style={{ flex: 1 }}
                />
                <TextInput
                  {...register(`barLicenses.${index}.country`)}
                  placeholder="Country"
                  size="md"
                  style={{ flex: 1 }}
                />
                <ActionIcon
                  onClick={() => removeBarLicense(index)}
                  color="red"
                  size="lg"
                  radius="xl"
                >
                  <Text size="xl">−</Text>
                </ActionIcon>
              </Group>
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  )
}

// Step 4: Pricing
function Step4({ errors }) {
  const { register, control } = useFormContext()

  return (
    <Stack gap="xl">
      <Title order={1} size="2.5rem" c="gray.9">Pricing</Title>

      <Box>
        <Title order={2} size="xl" c="gray.9" mb="sm">
          Preferred Pricing Model {errors.preferredPricingModel && <Text component="span" c="red.6">*</Text>}
        </Title>
        <Controller
          name="preferredPricingModel"
          control={control}
          render={({ field }) => (
            <MultiSelect
              {...field}
              data={pricingModels}
              error={errors.preferredPricingModel?.message}
              size="md"
              searchable
              placeholder="Practice Area Drop Down Multi select"
            />
          )}
        />
      </Box>

      <Box>
        <Title order={2} size="xl" c="gray.9" mb="sm">
          Budget Range {(errors.budgetFrom || errors.budgetTo) && <Text component="span" c="red.6">*</Text>}
        </Title>
        <Group gap="md" align="flex-start">
          <Box style={{ flex: 1 }}>
            <Controller
              name="budgetFrom"
              control={control}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  placeholder="$ From"
                  prefix="$"
                  thousandSeparator=","
                  decimalScale={0}
                  allowNegative={false}
                  error={errors.budgetFrom?.message}
                  size="md"
                  hideControls
                />
              )}
            />
          </Box>
          <Text size="2xl" c="gray.4" mt="xs">—</Text>
          <Box style={{ flex: 1 }}>
            <Controller
              name="budgetTo"
              control={control}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  placeholder="$ To"
                  prefix="$"
                  thousandSeparator=","
                  decimalScale={0}
                  allowNegative={false}
                  error={errors.budgetTo?.message}
                  size="md"
                  hideControls
                />
              )}
            />
          </Box>
        </Group>
      </Box>

      <Box>
        <Title order={2} size="xl" c="gray.9" mb="sm">
          Additional Budget Information
        </Title>
        <Textarea
          {...register('additionalBudgetInfo')}
          placeholder="Any additional budget details or constraints"
          rows={4}
          size="md"
        />
      </Box>
    </Stack>
  )
}

// Step 5: Who should we request bids from?
function Step5({ errors }) {
  const { register, watch, control } = useFormContext()
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const selectYourFirms = watch('selectYourFirms')

  return (
    <Stack gap="xl">
      <Title order={1} size="1.75rem" c="gray.9">
        Who should we request bids from?
      </Title>
      <Text c="gray.6">
        To ensure clarity and competitive pricing, avoid requesting bids from suppliers you're currently speaking with
      </Text>

      <Box>
        <Group gap="sm" mb="md">
          <Checkbox
            {...register('selectYourFirms')}
          />
          <Text fw={700} c="gray.9">
            Select Your Firms
          </Text>
        </Group>

        {selectYourFirms && (
          <Box>
            <Text fw={600} c="gray.7" mb="sm">
              Select which law firms should receive this RFP. The list of your law firms enabled to receive RFPs can be viewed on the Panel Law Firms section of your Legal Admin Page. Your RFP will be sent to the designated RFP manager at each firm.
            </Text>

            <Paper p="lg" withBorder mb="md">
              <Text c="gray.5" ta="center">You have not added any law firms</Text>
            </Paper>

            <Group gap="sm">
              <Button
                variant="outline"
                color="blue"
                size="md"
                onClick={() => setSearchModalOpen(true)}
              >
                + ADD SERVICE PROVIDER
              </Button>
              <Text c="dimmed">Or</Text>
              <Button
                variant="default"
                size="md"
                onClick={() => setSearchModalOpen(true)}
              >
                SELECT FROM PANEL
              </Button>
              <Button
                variant="subtle"
                size="md"
                component="a"
                style={{ marginLeft: 'auto' }}
              >
                Manage My Panel
              </Button>
            </Group>
          </Box>
        )}
      </Box>

      <Box>
        <Text fw={700} c="grape.6" mb="sm">
          Expand your RFP to include our network for comparison
        </Text>
        <Paper p="lg" withBorder style={{ borderWidth: 2, borderColor: 'var(--mantine-color-grape-4)' }}>
          <Group justify="space-between" mb="md">
            <Group gap="sm">
              <Checkbox
                {...register('useTheoremMarketplace')}
              />
              <Box>
                <Text fw={700} c="gray.9">
                  Theorem Marketplace Network (Recommended)
                </Text>
              </Box>
            </Group>
            <Box
              component="svg"
              style={{ height: 32, width: 32 }}
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect width="40" height="40" rx="8" fill="url(#gradient)" />
              <path d="M20 10L12 20H28L20 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#6366F1" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </Box>
          </Group>
          <Text size="sm" c="gray.7" ml={36}>
            Send this RFP to Theorem's global legal marketplace of law firms, lawyers, and ALSPs to receive additional proposals to gain leverage in negotiations.
          </Text>
        </Paper>
      </Box>

      <Box>
        <Text fw={700} c="gray.9" mb="sm">
          Add a Maximum # of responses?
        </Text>
        <Controller
          name="maxResponses"
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Limit responses to [#]"
              error={errors.maxResponses?.message}
              size="md"
              hideControls
            />
          )}
        />
      </Box>

      {/* Search Modal */}
      <Modal
        opened={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        title="Search Legal Service Providers"
        size="lg"
      >
        <Stack gap="md">
          <TextInput
            placeholder="Search..."
            leftSection={<Search size={16} />}
            size="md"
          />
          <Group gap="sm" mb="md">
            <Text fw={600}>My panel Firms</Text>
            <Checkbox label="" />
          </Group>
          <Stack gap="sm">
            {['Firm 1', 'Firm 2', 'Firm 4', 'firm 5', 'Firm 3'].map((firm) => (
              <Paper key={firm} p="md" withBorder style={{ cursor: 'pointer' }}>
                <Text>{firm}</Text>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  )
}

// Step 6: Finishing Touches
function Step6({ errors }) {
  const { register, watch, setValue } = useFormContext()
  const customQuestions = watch('customQuestions') || ['']

  const addQuestion = () => {
    setValue('customQuestions', [...customQuestions, ''])
  }

  const removeQuestion = (index) => {
    const newQuestions = customQuestions.filter((_, i) => i !== index)
    setValue('customQuestions', newQuestions)
  }

  return (
    <Stack gap="xl">
      <Title order={1} size="1.75rem" c="gray.9">Finishing Touches</Title>
      <Text c="gray.6">
        These questions will help suppliers give you a timely and accurate response
      </Text>

      <Box>
        <Title order={2} size="lg" c="gray.9" mb="sm">
          Expected Project Date Range - Required* {(errors.projectStartDate || errors.projectEndDate) && <Text component="span" c="red.6">*</Text>}
        </Title>
        <Group gap="md" align="flex-start">
          <Box style={{ flex: 1 }}>
            <TextInput
              type="date"
              {...register('projectStartDate')}
              placeholder="Start Date"
              error={errors.projectStartDate?.message}
              size="md"
            />
          </Box>
          <Text size="2xl" c="gray.4" mt="xs">—</Text>
          <Box style={{ flex: 1 }}>
            <TextInput
              type="date"
              {...register('projectEndDate')}
              placeholder="End Date"
              error={errors.projectEndDate?.message}
              size="md"
            />
          </Box>
        </Group>
      </Box>

      <Box>
        <Title order={2} size="xl" c="gray.9" mb="md">
          What would a supplier need to demonstrate for you to purchase?
        </Title>
        <Text fw={700} c="gray.9" mb="sm">
          What questions would you like bidders to address in their offer?
        </Text>
        <Stack gap="sm">
          {customQuestions.map((_, index) => (
            <Group key={index} gap="sm" align="flex-start">
              <TextInput
                {...register(`customQuestions.${index}`)}
                placeholder={`Question ${index + 1}`}
                size="md"
                style={{ flex: 1 }}
              />
              {customQuestions.length > 1 && (
                <ActionIcon
                  onClick={() => removeQuestion(index)}
                  color="red"
                  size="lg"
                  radius="xl"
                >
                  <Text size="xl">−</Text>
                </ActionIcon>
              )}
              {index === customQuestions.length - 1 && (
                <ActionIcon
                  onClick={addQuestion}
                  color="blue"
                  size="lg"
                  radius="xl"
                >
                  <Text size="xl">+</Text>
                </ActionIcon>
              )}
            </Group>
          ))}
        </Stack>
      </Box>

      <Box>
        <Group gap="xs" mb="sm">
          <Text fw={700} c="gray.9">
            Upload Your RFP Template / Questionnaire*
          </Text>
          <Text c="gray.6">Supporting documentation (optional)</Text>
        </Group>
        <Paper
          p={48}
          withBorder
          style={{
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: 'var(--mantine-color-gray-3)'
          }}
        >
          <Stack align="center" gap="md">
            <Box
              component="svg"
              style={{ width: 64, height: 64 }}
              fill="none"
              stroke="var(--mantine-color-indigo-5)"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </Box>
            <Text c="gray.7">
              Drag & drop files or{' '}
              <Text component="span" c="blue.6" style={{ cursor: 'pointer', textDecoration: 'underline' }}>Browse</Text>
            </Text>
            <Text size="xs" c="gray.5" ta="center">
              Press Enter
            </Text>
            <Text size="xs" c="gray.4">
              Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
            </Text>
          </Stack>
        </Paper>
      </Box>
    </Stack>
  )
}

// Step 7: Submit
function Step7({ errors }) {
  const { register } = useFormContext()

  return (
    <Stack gap="xl">
      <Title order={1} size="xl" c="gray.9">
        That's everything, lets get some bids!
      </Title>
      <Title order={2} size="lg" c="gray.9">
        We're going to send your anonymous request for a bid
      </Title>

      <Alert color="grape" variant="light">
        <Text fw={700} c="gray.9" mb="xs">What information do we share?</Text>
        <Stack gap={4} component="ul" style={{ listStylePosition: 'inside', paddingLeft: 0 }}>
          <Text component="li" size="sm" c="gray.7">We NEVER share your email address. No spam or cold calls as a result of bids!</Text>
          <Text component="li" size="sm" c="gray.7">We do share your company description to improve the quality and likelihood of an offer</Text>
        </Stack>
      </Alert>

      <Box>
        <Text fw={700} c="gray.9" mb="sm">
          Add your email to notify you when sellers respond back* {errors.email && <Text component="span" c="red.6">*</Text>}
        </Text>
        <TextInput
          type="email"
          {...register('email')}
          placeholder="Email input*"
          error={errors.email?.message}
          size="md"
        />
      </Box>

      <Box>
        <Group gap="xs" align="flex-start">
          <Checkbox
            id="terms"
            {...register('acceptedTerms')}
            mt={2}
          />
          <Text size="sm" c="gray.7" component="label" htmlFor="terms">
            I accept. By hitting "I accept," you agree to be bound by the{' '}
            <Text component="span" c="blue.6" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              Theorem Bids Terms of Use.
            </Text>
          </Text>
        </Group>
        {errors.acceptedTerms && (
          <Text size="sm" c="red.6" mt="xs">{errors.acceptedTerms.message}</Text>
        )}
      </Box>
    </Stack>
  )
}
