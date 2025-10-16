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
  Button,
  Group,
  Box,
  Paper,
  Alert,
  Checkbox,
  NumberInput,
  ActionIcon,
  ThemeIcon,
  Radio,
  Avatar
} from '@mantine/core'
import { Search, Star } from 'lucide-react'
import IntakeLayout from '../components/IntakeLayout'
import StepIndicator from '../components/StepIndicator'
import { BackButton, NextButton } from '../components/IntakeNavButtons'
import ProductAutocomplete from '../components/ProductAutocomplete'
import { saveDraft, getDraft, saveBuyerIntake } from '../utils/buyerIntakeStorage'
import { techReplaceIntakeSchema, stepSchemas } from '../schemas/techReplaceIntakeSchema'
import {
  replacementReasons,
  currentToolStatus,
  featurePriority,
  signTimeline,
  contractTerms,
  billingTerms,
  paymentTerms
} from '../data/intakeOptions'
import {
  getRecommendedProducts,
  formatProductForDisplay,
  saveSelectedProducts,
  getProductInitials,
  getProductColor
} from '../utils/productRecommendations'

export const Route = createFileRoute('/intake/tech-replace')({
  component: TechReplaceIntake,
  validateSearch: (search) => ({
    step: Number(search?.step) || 1
  })
})

function TechReplaceIntake() {
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
    serviceType: 'legal-tech-replace',
    rfpType: 'legal-tech-replace',
    deliveryModel: null,
    title: '',
    companyDescription: '',
    productToReplace: '',
    replacementReasons: [],
    replacementReasonsOther: '',
    currentStatus: '',
    currentStatusOther: '',
    useCaseDescription: '',
    coreFeatures: [{ feature: '', priority: '' }],
    featureFiles: [],
    existingTechStack: [],
    integrationRequired: false,
    selectedProducts: [],
    maxResponses: '',
    numberOfUsers: '',
    signTimeline: '',
    signTimelineOther: '',
    deadline: '',
    contractTerm: [],
    billingTerm: [],
    paymentTerm: [],
    customQuestions: '',
    email: '',
    acceptedTerms: false
  }

  // Initialize form with draft data or defaults
  const draft = getDraft('tech-replace')
  const methods = useForm({
    defaultValues: draft ? { ...defaultValues, ...draft } : defaultValues,
    resolver: yupResolver(techReplaceIntakeSchema),
    mode: 'onChange'
  })

  const { watch, trigger, setValue, formState: { errors } } = methods

  // Watch all form values for auto-save
  const formValues = watch()

  // Auto-save draft
  useEffect(() => {
    saveDraft(formValues, 'tech-replace')
  }, [formValues])

  // Reset acceptedTerms when reaching final step to prevent auto-submission
  useEffect(() => {
    if (step === 12) {
      setValue('acceptedTerms', false)
    }
  }, [step, setValue])

  const goToStep = (newStep) => {
    navigate({ to: '/intake/tech-replace', search: { step: newStep } })
  }

  const handleNext = async () => {
    // Validate current step
    const currentStepSchema = stepSchemas[step]
    const isStepValid = await trigger(Object.keys(currentStepSchema.fields))

    if (isStepValid && step < 12) {
      window.scrollTo(0, 0)
      goToStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      goToStep(step - 1)
    } else {
      navigate({ to: '/intake/technology' })
    }
  }

  const handleSubmit = methods.handleSubmit((data) => {
    // Only submit if on final step
    if (step !== 12) {
      console.log('Attempted submission on step', step, '- blocking')
      return
    }

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

  const getDisplayableStepErrors = () => {
    const stepErrors = getStepErrors()
    const { acceptedTerms, ...otherErrors } = stepErrors
    return otherErrors
  }

  const hasStepErrors = () => {
    return Object.keys(getDisplayableStepErrors()).length > 0
  }

  return (
    <IntakeLayout showPreview={true} formData={formValues} currentStep={maxStepReached}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <Group align="flex-start" gap="xl" py="lg" style={{ minHeight: '100vh' }}>
            {/* Left Sidebar - Step Indicator */}
            <Box style={{ width: 64, flexShrink: 0, position: 'sticky', top: 32, paddingTop: 8 }}>
              <StepIndicator currentStep={step} totalSteps={12} />
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
              {step === 8 && <Step8 errors={errors} />}
              {step === 9 && <Step9 errors={errors} />}
              {step === 10 && <Step10 errors={errors} />}
              {step === 11 && <Step11 errors={errors} />}
              {step === 12 && <Step12 errors={errors} />}

              {/* Navigation Buttons */}
              <Group gap="md" mt="xl">
                <BackButton onClick={handleBack} />
                {step < 12 ? (
                  <NextButton
                    onClick={handleNext}
                    type="button"
                  />
                ) : (
                  <NextButton
                    type="submit"
                    isSubmit={true}
                    disabled={!formValues.acceptedTerms}
                  />
                )}
              </Group>

              {/* Show validation errors */}
              {hasStepErrors() && (
                <Alert color="red" mt="md">
                  <Text size="sm" fw={600} c="red.8" mb="xs">Please fix the following errors:</Text>
                  <Stack gap={4} component="ul" style={{ listStylePosition: 'inside', paddingLeft: 0 }}>
                    {Object.entries(getDisplayableStepErrors()).map(([field, error]) => (
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
  const { register, watch } = useFormContext()
  const companyDescription = watch('companyDescription') || ''

  return (
    <Stack gap="xl">
      <Title order={1} size="2.5rem" c="gray.9">Tool Replacement RFP</Title>

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
        <Textarea
          {...register('companyDescription')}
          placeholder='e.g. "Am law 200 firm, software company, consultancy (limit: 100 characters)'
          maxLength={100}
          rows={4}
          error={errors.companyDescription?.message}
          size="md"
        />
        <Text size="sm" c="gray.5" ta="right" mt="xs">
          {companyDescription.length}/100
        </Text>
      </Box>
    </Stack>
  )
}

// Step 2: Product to Replace
function Step2({ errors }) {
  const { watch } = useFormContext()
  const companyDescription = watch('companyDescription')

  return (
    <Stack gap="xl">
      <Box>
        <Text c="gray.9" size="lg" mb="sm" ta="center">
          From here you will remain anonymous as:
        </Text>
        <Text c="gray.9" fw={600} ta="center" mb="xl">
          {companyDescription || 'Company Description'}
        </Text>
      </Box>

      <Box>
        <Title order={2} size="xl" c="gray.9" mb="sm" ta="center">
          What software are you thinking of replacing?
        </Title>

        <ProductAutocomplete
          fieldName="productToReplace"
          label="Product Name"
          placeholder="Search for a product"
          error={errors.productToReplace}
          size="md"
        />
      </Box>
    </Stack>
  )
}

// Step 3: Replacement Reasons
function Step3({ errors }) {
  const { watch, setValue, register } = useFormContext()
  const selectedReasons = watch('replacementReasons') || []
  const showOther = selectedReasons.includes('other')
  const productToReplace = watch('productToReplace') || '{ Tool Selected }'

  const toggleReason = (reason) => {
    if (selectedReasons.includes(reason)) {
      setValue('replacementReasons', selectedReasons.filter(r => r !== reason))
    } else {
      setValue('replacementReasons', [...selectedReasons, reason])
    }
  }

  return (
    <Stack gap="xl">
      <Box>
        <Title order={1} size="2rem" c="gray.9" mb="sm">
          Why are you considering replacing {productToReplace}?
        </Title>
        <Text c="gray.6" size="md">
          Select all applicable
        </Text>
      </Box>

      <Group gap="sm">
        {replacementReasons.map((reason) => (
          <Button
            key={reason.value}
            onClick={() => toggleReason(reason.value)}
            variant={selectedReasons.includes(reason.value) ? 'filled' : 'outline'}
            color={selectedReasons.includes(reason.value) ? 'violet' : 'gray'}
            size="md"
          >
            {reason.label}
          </Button>
        ))}
      </Group>

      {showOther && (
        <TextInput
          {...register('replacementReasonsOther')}
          placeholder="Text in here"
          size="md"
        />
      )}

      {errors.replacementReasons && (
        <Text size="sm" c="red.6">{errors.replacementReasons.message}</Text>
      )}
    </Stack>
  )
}

// Step 4: Current Status
function Step4({ errors }) {
  const { watch, setValue, register } = useFormContext()
  const selectedStatus = watch('currentStatus')
  const showOther = selectedStatus === 'other'
  const productToReplace = watch('productToReplace') || '{ Tool Selected }'

  return (
    <Stack gap="xl">
      <Box>
        <Title order={1} size="2rem" c="gray.9" mb="sm">
          What best describes your status with {productToReplace}?
        </Title>
        <Text c="gray.6" size="md">
          Select one
        </Text>
      </Box>

      <Radio.Group
        value={selectedStatus}
        onChange={(value) => setValue('currentStatus', value)}
      >
        <Stack gap="sm">
          {currentToolStatus.map((status) => (
            <Paper key={status.value} p="md" withBorder style={{ cursor: 'pointer' }}>
              <Radio value={status.value} label={status.label} />
            </Paper>
          ))}
        </Stack>
      </Radio.Group>

      {showOther && (
        <TextInput
          {...register('currentStatusOther')}
          placeholder="Text in here"
          size="md"
        />
      )}

      {errors.currentStatus && (
        <Text size="sm" c="red.6">{errors.currentStatus.message}</Text>
      )}
    </Stack>
  )
}

// Step 5: Use Case Description
function Step5({ errors }) {
  const { register, watch } = useFormContext()
  const useCaseDescription = watch('useCaseDescription') || ''

  return (
    <Stack gap="xl">
      <Title order={1} size="2rem" c="gray.9">Describe your use case and pain points</Title>
      <Text c="gray.6" size="lg">
        Please describe the use case and feel free to provide any additional info you think will be helpful
      </Text>

      <Box>
        <Textarea
          {...register('useCaseDescription')}
          placeholder="Tell us about your use case and the reasons you're looking for a solution to the problem"
          maxLength={500}
          rows={8}
          error={errors.useCaseDescription?.message}
          size="md"
        />
        <Text size="sm" c="gray.5" ta="right" mt="xs">
          {useCaseDescription.length}/500
        </Text>
      </Box>
    </Stack>
  )
}

// Step 6: Core Features
function Step6({ errors }) {
  const { watch, setValue, register } = useFormContext()
  const coreFeatures = watch('coreFeatures') || [{ feature: '', priority: '' }]

  const addFeature = () => {
    setValue('coreFeatures', [...coreFeatures, { feature: '', priority: '' }])
  }

  const removeFeature = (index) => {
    const newFeatures = coreFeatures.filter((_, i) => i !== index)
    setValue('coreFeatures', newFeatures.length > 0 ? newFeatures : [{ feature: '', priority: '' }])
  }

  return (
    <Stack gap="xl">
      <Box>
        <Title order={1} size="2rem" c="gray.9" mb="sm">
          What core features or functions do you need this software for?
        </Title>
        <Text c="gray.6" size="md">
          This helps competitive bidders know the right product tier or functionality to include in their offer
        </Text>
      </Box>

      <Stack gap="md">
        {coreFeatures.map((_, index) => (
          <Group key={index} gap="sm" align="flex-start">
            <TextInput
              {...register(`coreFeatures.${index}.feature`)}
              placeholder="Core feature or function 1"
              size="md"
              style={{ flex: 1 }}
            />
            <Controller
              name={`coreFeatures.${index}.priority`}
              render={({ field }) => (
                <Select
                  {...field}
                  data={featurePriority}
                  placeholder="Must Have / Nice to have"
                  size="md"
                  style={{ width: 240 }}
                />
              )}
            />
            <ActionIcon
              onClick={() => removeFeature(index)}
              color="red"
              size="lg"
              radius="xl"
            >
              <Text size="xl">−</Text>
            </ActionIcon>
            {index === coreFeatures.length - 1 && (
              <ActionIcon
                onClick={addFeature}
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

      <Paper
        p={48}
        withBorder
        style={{
          borderWidth: 2,
          borderStyle: 'dashed',
          borderColor: 'var(--mantine-color-gray-3)',
          textAlign: 'center'
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
          <Text size="xs" c="gray.4">
            Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
          </Text>
        </Stack>
      </Paper>

      {errors.coreFeatures && (
        <Text size="sm" c="red.6">{errors.coreFeatures.message}</Text>
      )}
    </Stack>
  )
}

// Step 7: Existing Technology
function Step7({ errors }) {
  const { register } = useFormContext()

  return (
    <Stack gap="xl">
      <Box>
        <Title order={1} size="2rem" c="gray.9" mb="sm">
          Tell us how this will work with your existing technology
        </Title>
        <Text c="gray.6" size="md">
          Select which tools you need this new solution to be compatible with
        </Text>
      </Box>

      <Paper p="lg" withBorder>
        <Text c="gray.5" ta="center">
          You have not added any tools to your existing technology stack
        </Text>
      </Paper>

      <Group gap="sm">
        <Button
          variant="outline"
          color="blue"
          size="md"
        >
          + ADD TO STACK
        </Button>
        <Text c="dimmed">Or</Text>
        <Button
          variant="subtle"
          size="md"
          c="dimmed"
          style={{ textDecoration: 'underline' }}
        >
          Manage My Stack
        </Button>
      </Group>
    </Stack>
  )
}

// Step 8: Product Selection
function Step8({ errors }) {
  const { watch, setValue, register } = useFormContext()
  const selectedProducts = watch('selectedProducts') || []
  const [recommendedProducts, setRecommendedProducts] = useState([])

  // Load recommended products on component mount
  useEffect(() => {
    const products = getRecommendedProducts(5)
    const formatted = products.map(formatProductForDisplay)
    setRecommendedProducts(formatted)
  }, [])

  const toggleProduct = (productValue) => {
    let newSelected
    if (selectedProducts.includes(productValue)) {
      newSelected = selectedProducts.filter(p => p !== productValue)
    } else {
      newSelected = [...selectedProducts, productValue]
    }
    setValue('selectedProducts', newSelected)

    // Extract product IDs from the selected values and save to localStorage
    const selectedIds = newSelected
      .map(val => {
        const match = val.match(/^product-(\d+)$/)
        return match ? parseInt(match[1]) : null
      })
      .filter(id => id !== null)

    saveSelectedProducts(selectedIds)
  }

  return (
    <Stack gap="xl">
      <Box>
        <Title order={1} size="2rem" c="gray.9" mb="sm">
          Who should we request bids from?
        </Title>
        <Text c="gray.6" size="md">
          To ensure clarity and competitive pricing, avoid requesting bids from suppliers you're currently speaking with
        </Text>
      </Box>

      <Stack gap="sm">
        {recommendedProducts.map((product) => (
          <Paper
            key={product.value}
            p="md"
            withBorder
            style={{
              cursor: 'pointer',
              borderColor: selectedProducts.includes(product.value) ? 'var(--mantine-color-violet-4)' : undefined,
              borderWidth: selectedProducts.includes(product.value) ? 2 : 1
            }}
            onClick={() => toggleProduct(product.value)}
          >
            <Group gap="sm">
              <Checkbox
                checked={selectedProducts.includes(product.value)}
                onChange={() => toggleProduct(product.value)}
              />
              {product.logoUrl ? (
                <Avatar
                  src={product.logoUrl}
                  size={32}
                  radius="sm"
                  alt={product.label}
                />
              ) : (
                <Avatar
                  size={32}
                  radius="sm"
                  color={getProductColor(product.label)}
                >
                  {getProductInitials(product.label)}
                </Avatar>
              )}
              {product.isRecommended && (
                <Star size={16} fill="gold" color="gold" />
              )}
              <Text fw={product.isRecommended ? 700 : 400}>
                {product.label}
              </Text>
            </Group>
          </Paper>
        ))}
      </Stack>

      <Text size="sm" c="blue.6" style={{ cursor: 'pointer', textDecoration: 'underline' }}>
        Don't see your product? Request a product
      </Text>

      <Box>
        <Text fw={700} c="gray.9" mb="sm">
          Add a Maximum # of responses?
        </Text>
        <Controller
          name="maxResponses"
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Limit responses to [#]"
              size="md"
              hideControls
            />
          )}
        />
      </Box>

      {errors.selectedProducts && (
        <Text size="sm" c="red.6">{errors.selectedProducts.message}</Text>
      )}
    </Stack>
  )
}

// Step 9: Number of Users
function Step9({ errors }) {
  const { register } = useFormContext()

  return (
    <Stack gap="xl">
      <Box>
        <Title order={1} size="2rem" c="gray.9" mb="sm">
          How many people will use this software?
        </Title>
        <Text c="gray.6" size="md">
          This is a good place to list the number of seats, licenses, or other quantities you need.
        </Text>
      </Box>

      <TextInput
        {...register('numberOfUsers')}
        placeholder="Text in here"
        error={errors.numberOfUsers?.message}
        size="md"
      />
    </Stack>
  )
}

// Step 10: Sign Timeline
function Step10({ errors }) {
  const { watch, setValue, register } = useFormContext()
  const selectedTimeline = watch('signTimeline')
  const showOther = selectedTimeline === 'other'

  return (
    <Stack gap="xl">
      <Box>
        <Title order={1} size="2rem" c="gray.9" mb="sm">
          If you get a great offer, how soon would you like to sign?
        </Title>
        <Text c="gray.6" size="md">
          Select one
        </Text>
      </Box>

      <Group gap="sm">
        {signTimeline.map((timeline) => (
          <Button
            key={timeline.value}
            onClick={() => setValue('signTimeline', timeline.value)}
            variant={selectedTimeline === timeline.value ? 'filled' : 'outline'}
            color={selectedTimeline === timeline.value ? 'violet' : 'gray'}
            size="md"
          >
            {timeline.label}
          </Button>
        ))}
      </Group>

      {showOther && (
        <TextInput
          {...register('signTimelineOther')}
          placeholder="Text in here"
          size="md"
        />
      )}

      {errors.signTimeline && (
        <Text size="sm" c="red.6">{errors.signTimeline.message}</Text>
      )}
    </Stack>
  )
}

// Step 11: Additional Information
function Step11({ errors }) {
  const { watch, setValue, register } = useFormContext()
  const contractTerm = watch('contractTerm') || []
  const billingTerm = watch('billingTerm') || []
  const paymentTerm = watch('paymentTerm') || []

  const toggleOption = (field, option) => {
    const current = watch(field) || []
    if (current.includes(option)) {
      setValue(field, current.filter(o => o !== option))
    } else {
      setValue(field, [...current, option])
    }
  }

  return (
    <Stack gap="xl">
      <Title order={1} size="2rem" c="gray.9">Anything else?</Title>
      <Text c="gray.6" size="md">
        Please provide the proposal deadline and any additional details that will help suppliers give you the best deal.
      </Text>

      <Box>
        <Title order={2} size="lg" c="gray.9" mb="sm">
          Proposal Submission Deadline - Required* {errors.deadline && <Text component="span" c="red.6">*</Text>}
        </Title>
        <Text c="gray.6" size="sm" mb="sm">
          When do you need vendors to submit their proposals BY? This is the last date vendors can apply to this RFP.
        </Text>
        <TextInput
          type="date"
          {...register('deadline')}
          error={errors.deadline?.message}
          size="md"
        />
      </Box>

      <Box>
        <Text fw={700} c="gray.9" mb="sm">Term</Text>
        <Group gap="sm">
          {contractTerms.map((term) => (
            <Button
              key={term.value}
              onClick={() => toggleOption('contractTerm', term.value)}
              variant={contractTerm.includes(term.value) ? 'filled' : 'outline'}
              color={contractTerm.includes(term.value) ? 'violet' : 'gray'}
              size="md"
            >
              {term.label}
            </Button>
          ))}
        </Group>
      </Box>

      <Box>
        <Text fw={700} c="gray.9" mb="sm">Billing Term</Text>
        <Group gap="sm">
          {billingTerms.map((term) => (
            <Button
              key={term.value}
              onClick={() => toggleOption('billingTerm', term.value)}
              variant={billingTerm.includes(term.value) ? 'filled' : 'outline'}
              color={billingTerm.includes(term.value) ? 'violet' : 'gray'}
              size="md"
            >
              {term.label}
            </Button>
          ))}
        </Group>
      </Box>

      <Box>
        <Text fw={700} c="gray.9" mb="sm">Payment Term</Text>
        <Group gap="sm">
          {paymentTerms.map((term) => (
            <Button
              key={term.value}
              onClick={() => toggleOption('paymentTerm', term.value)}
              variant={paymentTerm.includes(term.value) ? 'filled' : 'outline'}
              color={paymentTerm.includes(term.value) ? 'violet' : 'gray'}
              size="md"
            >
              {term.label}
            </Button>
          ))}
        </Group>
      </Box>

      <Box>
        <Text fw={700} c="gray.9" mb="sm">
          What questions would you like bidders to address in their offer?
        </Text>
        <Textarea
          {...register('customQuestions')}
          placeholder="Create a list of must haves and non-negotiables"
          rows={4}
          size="md"
        />
      </Box>
    </Stack>
  )
}

// Step 12: Submit
function Step12({ errors }) {
  const { register, watch } = useFormContext()
  const acceptedTerms = watch('acceptedTerms')

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
      </Box>
    </Stack>
  )
}
