import * as yup from 'yup'

// Validation schema for Technology Purchase intake form
export const techIntakeSchema = yup.object().shape({
  // Step 1
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  companyDescription: yup
    .string()
    .required('Company description is required')
    .max(100, 'Company description must be 100 characters or less'),

  // Step 2
  productSearch: yup.string().notRequired(),

  // Step 3
  useCaseDescription: yup
    .string()
    .required('Use case description is required')
    .max(500, 'Use case description must be 500 characters or less'),

  // Step 4
  purchaseFactors: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one purchase factor')
    .required('Purchase factors are required'),
  purchaseFactorsOther: yup.string().notRequired(),

  // Step 5
  budgetStatus: yup
    .string()
    .required('Budget status is required'),
  budgetStatusOther: yup.string().notRequired(),

  // Step 6
  coreFeatures: yup
    .array()
    .of(
      yup.object().shape({
        feature: yup.string().required('Feature is required'),
        priority: yup.string().required('Priority is required'),
      })
    )
    .min(1, 'Please add at least one core feature'),
  featureFiles: yup.array().of(yup.string()),

  // Step 7
  existingTechStack: yup.array().of(yup.string()),
  integrationRequired: yup.boolean(),

  // Step 8
  selectedProducts: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one product'),
  maxResponses: yup
    .number()
    .typeError('Max responses must be a number')
    .positive('Max responses must be positive')
    .integer('Max responses must be a whole number')
    .notRequired(),

  // Step 9
  numberOfUsers: yup
    .number()
    .typeError('Number of users must be a number')
    .positive('Number of users must be positive')
    .integer('Number of users must be a whole number')
    .required('Number of users is required'),

  // Step 10
  signTimeline: yup
    .string()
    .required('Sign timeline is required'),
  signTimelineOther: yup.string().notRequired(),

  // Step 11
  contractTerm: yup.array().of(yup.string()),
  billingTerm: yup.array().of(yup.string()),
  paymentTerm: yup.array().of(yup.string()),
  customQuestions: yup.string().notRequired(),

  // Step 12
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms of service')
    .required('You must accept the terms of service'),

  // Meta fields
  serviceType: yup.string(),
  rfpType: yup.string(),
})

// Validation schemas for each step
export const stepSchemas = {
  1: yup.object().shape({
    title: techIntakeSchema.fields.title,
    companyDescription: techIntakeSchema.fields.companyDescription,
  }),
  2: yup.object().shape({
    productSearch: techIntakeSchema.fields.productSearch,
  }),
  3: yup.object().shape({
    useCaseDescription: techIntakeSchema.fields.useCaseDescription,
  }),
  4: yup.object().shape({
    purchaseFactors: techIntakeSchema.fields.purchaseFactors,
    purchaseFactorsOther: techIntakeSchema.fields.purchaseFactorsOther,
  }),
  5: yup.object().shape({
    budgetStatus: techIntakeSchema.fields.budgetStatus,
    budgetStatusOther: techIntakeSchema.fields.budgetStatusOther,
  }),
  6: yup.object().shape({
    coreFeatures: techIntakeSchema.fields.coreFeatures,
    featureFiles: techIntakeSchema.fields.featureFiles,
  }),
  7: yup.object().shape({
    existingTechStack: techIntakeSchema.fields.existingTechStack,
    integrationRequired: techIntakeSchema.fields.integrationRequired,
  }),
  8: yup.object().shape({
    selectedProducts: techIntakeSchema.fields.selectedProducts,
    maxResponses: techIntakeSchema.fields.maxResponses,
  }),
  9: yup.object().shape({
    numberOfUsers: techIntakeSchema.fields.numberOfUsers,
  }),
  10: yup.object().shape({
    signTimeline: techIntakeSchema.fields.signTimeline,
    signTimelineOther: techIntakeSchema.fields.signTimelineOther,
  }),
  11: yup.object().shape({
    contractTerm: techIntakeSchema.fields.contractTerm,
    billingTerm: techIntakeSchema.fields.billingTerm,
    paymentTerm: techIntakeSchema.fields.paymentTerm,
    customQuestions: techIntakeSchema.fields.customQuestions,
  }),
  12: yup.object().shape({
    email: techIntakeSchema.fields.email,
    acceptedTerms: techIntakeSchema.fields.acceptedTerms,
  }),
}
