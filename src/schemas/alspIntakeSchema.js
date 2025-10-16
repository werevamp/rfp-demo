import * as yup from 'yup'

// Validation schema for ALSP intake form
export const alspIntakeSchema = yup.object().shape({
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
  clientIndustryExperience: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one industry')
    .required('Industry experience is required'),
  locationJurisdiction: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one location/jurisdiction')
    .required('Location/jurisdiction is required'),
  languagesRequired: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one language')
    .required('Languages required is required'),
  volumeScale: yup
    .string()
    .required('Volume/scale expectation is required'),
  volumeScaleOther: yup
    .string()
    .when('volumeScale', {
      is: 'other',
      then: (schema) => schema.required('Please specify the volume/scale'),
      otherwise: (schema) => schema.notRequired(),
    }),

  // Step 4
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
    title: alspIntakeSchema.fields.title,
    companyDescription: alspIntakeSchema.fields.companyDescription,
  }),
  2: yup.object().shape({
    workDescription: alspIntakeSchema.fields.workDescription,
  }),
  3: yup.object().shape({
    clientIndustryExperience: alspIntakeSchema.fields.clientIndustryExperience,
    locationJurisdiction: alspIntakeSchema.fields.locationJurisdiction,
    languagesRequired: alspIntakeSchema.fields.languagesRequired,
    volumeScale: alspIntakeSchema.fields.volumeScale,
    volumeScaleOther: alspIntakeSchema.fields.volumeScaleOther,
  }),
  4: yup.object().shape({
    preferredPricingModel: alspIntakeSchema.fields.preferredPricingModel,
    budgetFrom: alspIntakeSchema.fields.budgetFrom,
    budgetTo: alspIntakeSchema.fields.budgetTo,
    additionalBudgetInfo: alspIntakeSchema.fields.additionalBudgetInfo,
  }),
  5: yup.object().shape({
    useTheoremMarketplace: alspIntakeSchema.fields.useTheoremMarketplace,
    serviceProviders: alspIntakeSchema.fields.serviceProviders,
    maxResponses: alspIntakeSchema.fields.maxResponses,
  }),
  6: yup.object().shape({
    deadline: alspIntakeSchema.fields.deadline,
    projectStartDate: alspIntakeSchema.fields.projectStartDate,
    projectEndDate: alspIntakeSchema.fields.projectEndDate,
    customQuestions: alspIntakeSchema.fields.customQuestions,
  }),
  7: yup.object().shape({
    email: alspIntakeSchema.fields.email,
    acceptedTerms: alspIntakeSchema.fields.acceptedTerms,
  }),
}
