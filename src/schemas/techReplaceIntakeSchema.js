import * as yup from 'yup'

// Validation schema for Technology Replacement intake form
export const techReplaceIntakeSchema = yup.object().shape({
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
  productToReplace: yup
    .string()
    .required('Product to replace is required'),

  // Step 3
  replacementReasons: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one reason')
    .required('Replacement reasons are required'),
  replacementReasonsOther: yup.string().notRequired(),

  // Step 4
  currentStatus: yup
    .string()
    .required('Current status is required'),
  currentStatusOther: yup.string().notRequired(),

  // Step 5
  useCaseDescription: yup
    .string()
    .required('Use case description is required')
    .max(500, 'Use case description must be 500 characters or less'),

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
    .string()
    .required('Number of users is required'),

  // Step 10
  signTimeline: yup
    .string()
    .required('Sign timeline is required'),
  signTimelineOther: yup.string().notRequired(),

  // Step 11
  deadline: yup
    .date()
    .typeError('Deadline is required')
    .required('Proposal submission deadline is required')
    .min(new Date(), 'Deadline must be in the future'),
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
    title: techReplaceIntakeSchema.fields.title,
    companyDescription: techReplaceIntakeSchema.fields.companyDescription,
  }),
  2: yup.object().shape({
    productToReplace: techReplaceIntakeSchema.fields.productToReplace,
  }),
  3: yup.object().shape({
    replacementReasons: techReplaceIntakeSchema.fields.replacementReasons,
    replacementReasonsOther: techReplaceIntakeSchema.fields.replacementReasonsOther,
  }),
  4: yup.object().shape({
    currentStatus: techReplaceIntakeSchema.fields.currentStatus,
    currentStatusOther: techReplaceIntakeSchema.fields.currentStatusOther,
  }),
  5: yup.object().shape({
    useCaseDescription: techReplaceIntakeSchema.fields.useCaseDescription,
  }),
  6: yup.object().shape({
    coreFeatures: techReplaceIntakeSchema.fields.coreFeatures,
    featureFiles: techReplaceIntakeSchema.fields.featureFiles,
  }),
  7: yup.object().shape({
    existingTechStack: techReplaceIntakeSchema.fields.existingTechStack,
    integrationRequired: techReplaceIntakeSchema.fields.integrationRequired,
  }),
  8: yup.object().shape({
    selectedProducts: techReplaceIntakeSchema.fields.selectedProducts,
    maxResponses: techReplaceIntakeSchema.fields.maxResponses,
  }),
  9: yup.object().shape({
    numberOfUsers: techReplaceIntakeSchema.fields.numberOfUsers,
  }),
  10: yup.object().shape({
    signTimeline: techReplaceIntakeSchema.fields.signTimeline,
    signTimelineOther: techReplaceIntakeSchema.fields.signTimelineOther,
  }),
  11: yup.object().shape({
    deadline: techReplaceIntakeSchema.fields.deadline,
    contractTerm: techReplaceIntakeSchema.fields.contractTerm,
    billingTerm: techReplaceIntakeSchema.fields.billingTerm,
    paymentTerm: techReplaceIntakeSchema.fields.paymentTerm,
    customQuestions: techReplaceIntakeSchema.fields.customQuestions,
  }),
  12: yup.object().shape({
    email: techReplaceIntakeSchema.fields.email,
    acceptedTerms: techReplaceIntakeSchema.fields.acceptedTerms,
  }),
}
