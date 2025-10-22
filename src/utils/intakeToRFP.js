// Utility to transform buyer intake form data into RFP format for display
import { defaultRFPQuestions, legalServicesQuestions, alspQuestions } from '../data/questionTemplates'
import productsData from '../data/products.json'

/**
 * Transform buyer intake data into RFP format
 * @param {Object} intake - The buyer intake data from localStorage
 * @returns {Object} RFP-formatted data
 */
export const transformIntakeToRFP = (intake) => {
  if (!intake) return null

  // Common fields for all RFP types
  const baseRFP = {
    id: intake.rfpId || intake.id,
    title: intake.title,
    company: intake.company || 'Anonymous Company', // From buyer profile
    description: intake.companyDescription || intake.workDescription || intake.useCaseDescription || '',
    deadline: intake.deadline,
    postedDate: intake.postedDate || intake.createdAt,
    status: intake.status || 'new',
    location: intake.location || 'Not specified', // From buyer profile
    // Optional enrichment fields from buyer profile
    industry: intake.industry,
    companySize: intake.companySize,
    headquarters: intake.headquarters,
  }

  // Determine RFP type and add type-specific fields
  if (intake.rfpType === 'legal-tech-new' || intake.rfpType === 'legal-tech-replace') {
    return transformTechIntake(intake, baseRFP)
  } else if (intake.rfpType === 'lawfirm') {
    return transformLegalServicesIntake(intake, baseRFP, 'lawfirm')
  } else if (intake.rfpType === 'alsp') {
    return transformLegalServicesIntake(intake, baseRFP, 'alsp')
  }

  return baseRFP
}

/**
 * Parse custom questions string into proper question objects
 */
const parseCustomQuestions = (customQuestionsString) => {
  if (!customQuestionsString || typeof customQuestionsString !== 'string') {
    return []
  }

  return customQuestionsString
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map((questionText, index) => ({
      id: `custom-${index + 1}`,
      section: 'Other',
      text: questionText,
      fieldType: 'textarea',
      priority: 'normal',
      required: false,
      supportingDocs: false,
      rows: 6,
      placeholder: 'Write your response here...'
    }))
}

/**
 * Transform tech intake (new or replace) into RFP format
 */
const transformTechIntake = (intake, baseRFP) => {
  // Format budget from budgetFrom/To or use budgetStatus
  let budget = 'Budget not specified'
  if (intake.budgetFrom && intake.budgetTo) {
    budget = formatBudget(intake.budgetFrom, intake.budgetTo)
  } else if (intake.budgetStatus) {
    budget = intake.budgetStatus
  }

  // Build questions array: default tech questions + custom buyer questions
  const questions = [...defaultRFPQuestions]

  // Parse custom questions string into proper question objects
  const customQuestions = parseCustomQuestions(intake.customQuestions)
  if (customQuestions.length > 0) {
    questions.push(...customQuestions)
  }

  return {
    ...baseRFP,
    rfpType: intake.rfpType, // Preserve specific type: legal-tech-new or legal-tech-replace
    budget,
    description: intake.useCaseDescription || intake.companyDescription || '',

    // Tech-specific fields
    solutionCategory: intake.productSearch || intake.categorySearch || intake.productToReplace || null,
    requirements: intake.coreFeatures?.map(f => f.feature).filter(Boolean) || [],
    numberOfUsers: intake.numberOfUsers,
    signTimeline: intake.signTimeline,

    // Tech replace specific
    productToReplace: intake.productToReplace || null,
    replacementReasons: intake.replacementReasons || null,
    currentStatus: intake.currentStatus || null,

    // Additional info
    contractTerm: intake.contractTerm,
    billingTerm: intake.billingTerm,
    paymentTerm: intake.paymentTerm,
    customQuestions: intake.customQuestions,
    selectedProducts: intake.selectedProducts,
    maxResponses: intake.maxResponses,

    // Questions for vendors to answer
    questions: questions,
  }
}

/**
 * Transform legal services intake (lawfirm or ALSP) into RFP format
 */
const transformLegalServicesIntake = (intake, baseRFP, serviceType) => {
  // Format budget from budgetFrom/To
  const budget = (intake.budgetFrom && intake.budgetTo)
    ? formatBudget(intake.budgetFrom, intake.budgetTo)
    : 'Budget not specified'

  // Build questions array: use ALSP-specific questions for ALSPs, law firm questions for law firms
  const baseQuestions = (serviceType === 'alsp' || intake.deliveryModel === 'alsp') ? alspQuestions : legalServicesQuestions
  const questions = [...baseQuestions]

  // Parse custom questions string into proper question objects
  const customQuestions = parseCustomQuestions(intake.customQuestions)
  if (customQuestions.length > 0) {
    questions.push(...customQuestions)
  }

  // Format bar licenses/jurisdictions into array of strings
  // Lawfirm intake uses barLicenses as array of {state, country} objects
  // ALSP intake uses locationJurisdiction as array
  // We need to convert both to simple array of strings for question generation
  let formattedBarLicenses = null

  if (serviceType === 'lawfirm' && intake.barLicenses && Array.isArray(intake.barLicenses)) {
    // For law firm RFPs: show state only. If no state, show country.
    formattedBarLicenses = intake.barLicenses
      .map(license => {
        if (typeof license === 'string') return license // Already a string
        if (license.state) return license.state // State only
        if (license.country) return license.country // Country if no state
        return null
      })
      .filter(Boolean) // Remove any null values
  } else if (serviceType === 'alsp' && intake.locationJurisdiction && Array.isArray(intake.locationJurisdiction)) {
    // For ALSP, use locationJurisdiction field
    formattedBarLicenses = intake.locationJurisdiction
  }

  // Convert lawfirmTechStack product IDs to product names for question generation
  let lawfirmTechStackNames = null
  if (intake.lawfirmTechStack && Array.isArray(intake.lawfirmTechStack) && intake.lawfirmTechStack.length > 0) {
    lawfirmTechStackNames = intake.lawfirmTechStack
      .map(productId => {
        const product = productsData.find(p => p.id === productId)
        return product ? product.name : null
      })
      .filter(Boolean) // Remove any null values
  }

  return {
    ...baseRFP,
    rfpType: intake.rfpType, // Preserve specific type: lawfirm or alsp
    budget,
    description: intake.workDescription || intake.companyDescription || '',

    // Legal services specific fields
    deliveryModel: intake.deliveryModel, // 'lawfirm' or 'alsp'
    practiceGroups: intake.practiceAreas || null, // Map practiceAreas to practiceGroups for consistency with mock data
    practiceAreas: intake.practiceAreas || null, // Keep original for backward compatibility
    experienceLevel: intake.experienceLevel || null,
    barLicenses: formattedBarLicenses, // Use formatted bar licenses
    pricingModel: intake.preferredPricingModel || null,
    additionalBudgetInfo: intake.additionalBudgetInfo,

    // Tech stack (for lawfirm RFPs)
    lawfirmTechStack: intake.lawfirmTechStack || null, // Array of product IDs
    lawfirmTechStackNames: lawfirmTechStackNames, // Array of product names for question generation

    // ALSP specific
    clientIndustryExperience: intake.clientIndustryExperience || null,
    locationJurisdiction: intake.locationJurisdiction || null,
    languagesRequired: intake.languagesRequired || null,
    volumeScale: intake.volumeScale || null,

    // Project details
    projectStartDate: intake.projectStartDate,
    projectEndDate: intake.projectEndDate,
    projectDateRange: formatDateRange(intake.projectStartDate, intake.projectEndDate),

    // Custom questions
    customQuestions: intake.customQuestions,
    maxResponses: intake.maxResponses,

    // Questions for vendors to answer
    questions: questions,
  }
}

/**
 * Format budget from numbers to currency string
 */
const formatBudget = (from, to) => {
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  return `${formatCurrency(from)} - ${formatCurrency(to)}`
}

/**
 * Format date range for display
 */
const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

/**
 * Transform all buyer intakes into RFP format
 * @param {Array} intakes - Array of buyer intake objects
 * @returns {Array} Array of RFP-formatted objects
 */
export const transformAllIntakesToRFPs = (intakes) => {
  if (!Array.isArray(intakes)) return []

  return intakes
    .map(intake => transformIntakeToRFP(intake))
    .filter(Boolean) // Remove any null results
}
