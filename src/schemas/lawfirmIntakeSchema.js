import * as yup from 'yup'

// Validation schema for Lawfirm intake form
export const lawfirmIntakeSchema = yup.object().shape({
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
  workDescription: yup
    .string()
    .required('Work description is required')
    .max(300, 'Work description must be 300 characters or less'),

  // Step 3
  practiceAreas: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one practice area')
    .required('Practice area is required'),
  experienceLevel: yup
    .string()
    .required('Experience level is required'),
  barLicenses: yup
    .array()
    .of(yup.object().shape({
      state: yup.string(),
      country: yup.string()
    })),

  // Step 4
  lawfirmTechStack: yup
    .array()
    .of(yup.number())
    .notRequired(),

  // Step 5
  preferredPricingModel: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one pricing model')
    .required('Pricing model is required'),
  budgetFrom: yup
    .number()
    .typeError('Budget from must be a number')
    .positive('Budget must be positive')
    .required('Budget from is required'),
  budgetTo: yup
    .number()
    .typeError('Budget to must be a number')
    .positive('Budget must be positive')
    .required('Budget to is required')
    .moreThan(yup.ref('budgetFrom'), 'Budget to must be greater than budget from'),
  additionalBudgetInfo: yup.string().notRequired(),

  // Step 5
  selectYourFirms: yup.boolean(),
  useTheoremMarketplace: yup.boolean(),
  serviceProviders: yup.array().of(yup.string()),
  maxResponses: yup
    .number()
    .typeError('Max responses must be a number')
    .positive('Max responses must be positive')
    .integer('Max responses must be a whole number')
    .notRequired(),

  // Step 6
  deadline: yup
    .date()
    .typeError('Deadline is required')
    .required('Application deadline is required')
    .min(new Date(), 'Deadline must be in the future'),
  projectStartDate: yup
    .date()
    .typeError('Start date is required')
    .required('Project start date is required'),
  projectEndDate: yup
    .date()
    .typeError('End date is required')
    .required('Project end date is required')
    .min(yup.ref('projectStartDate'), 'End date must be after start date'),
  customQuestions: yup
    .array()
    .of(yup.string())
    .min(1, 'At least one question is required'),
  uploadedFiles: yup.array().of(yup.string()),

  // Step 7
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
  deliveryModel: yup.string(),
  rfpType: yup.string(),
  legalNeed: yup.string(),
})

// Validation schemas for each step
export const stepSchemas = {
  1: yup.object().shape({
    title: lawfirmIntakeSchema.fields.title,
    companyDescription: lawfirmIntakeSchema.fields.companyDescription,
  }),
  2: yup.object().shape({
    workDescription: lawfirmIntakeSchema.fields.workDescription,
  }),
  3: yup.object().shape({
    practiceAreas: lawfirmIntakeSchema.fields.practiceAreas,
    experienceLevel: lawfirmIntakeSchema.fields.experienceLevel,
    barLicenses: lawfirmIntakeSchema.fields.barLicenses,
  }),
  4: yup.object().shape({
    lawfirmTechStack: lawfirmIntakeSchema.fields.lawfirmTechStack,
  }),
  5: yup.object().shape({
    preferredPricingModel: lawfirmIntakeSchema.fields.preferredPricingModel,
    budgetFrom: lawfirmIntakeSchema.fields.budgetFrom,
    budgetTo: lawfirmIntakeSchema.fields.budgetTo,
    additionalBudgetInfo: lawfirmIntakeSchema.fields.additionalBudgetInfo,
  }),
  6: yup.object().shape({
    selectYourFirms: lawfirmIntakeSchema.fields.selectYourFirms,
    useTheoremMarketplace: lawfirmIntakeSchema.fields.useTheoremMarketplace,
    serviceProviders: lawfirmIntakeSchema.fields.serviceProviders,
    maxResponses: lawfirmIntakeSchema.fields.maxResponses,
  }),
  7: yup.object().shape({
    deadline: lawfirmIntakeSchema.fields.deadline,
    projectStartDate: lawfirmIntakeSchema.fields.projectStartDate,
    projectEndDate: lawfirmIntakeSchema.fields.projectEndDate,
    customQuestions: lawfirmIntakeSchema.fields.customQuestions,
  }),
  8: yup.object().shape({
    email: lawfirmIntakeSchema.fields.email,
    acceptedTerms: lawfirmIntakeSchema.fields.acceptedTerms,
  }),
}
