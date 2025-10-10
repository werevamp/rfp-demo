// RFP Question Templates
// These can be customized per RFP or used as defaults

export const defaultRFPQuestions = [
  // ==================== PRODUCT & FIT ====================
  {
    id: 1,
    section: "Product & Fit",
    text: "Which product are you submitting this RFP response for?",
    fieldType: "dropdown",
    priority: "urgent",
    options: [
      "E-Commerce Platform v3.0",
      "Enterprise CRM Solution",
      "Marketing Automation Suite",
      "Analytics Dashboard Pro",
      "Custom Development Services",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select your primary product offering for this RFP. All answers below will be saved to the product ID selected here."
  },
  {
    id: 2,
    section: "Product & Fit",
    text: "Do you have a minimum or maximum user count requirement?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No"],
    conditionalText: "Yes",
    required: true,
    supportingDocs: false,
    helpText: "If yes, please specify the user count requirements in the text field"
  },
  {
    id: 3,
    section: "Product & Fit",
    text: "Which regions or countries can you support?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "United States",
      "Canada",
      "United Kingdom",
      "European Union",
      "Asia-Pacific",
      "Latin America",
      "Middle East",
      "Africa",
      "Other"
    ],
    required: true,
    supportingDocs: true,
    helpText: "Select all regions you can support. You can optionally upload a deployment overview document.",
    supportingDocsLabel: "Optional deployment overview"
  },
  {
    id: 4,
    section: "Product & Fit",
    text: "Which languages are supported in your product (UI and/or documentation)?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "English",
      "Spanish",
      "French",
      "German",
      "Chinese (Simplified)",
      "Chinese (Traditional)",
      "Japanese",
      "Korean",
      "Portuguese",
      "Italian",
      "Dutch",
      "Russian",
      "Arabic",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all languages supported in your product UI and/or documentation"
  },

  // ==================== SECURITY ====================
  {
    id: 5,
    section: "Security",
    text: "Which security certifications do you currently hold?",
    fieldType: "multiselect",
    priority: "urgent",
    options: [
      "SOC 2 Type II",
      "ISO 27001",
      "FedRAMP",
      "HIPAA",
      "PCI DSS",
      "GDPR Compliant",
      "Other"
    ],
    required: true,
    supportingDocs: true,
    helpText: "Select all applicable certifications",
    supportingDocsLabel: "Certificate PDFs or security overview deck"
  },
  {
    id: 6,
    section: "Security",
    text: "What data residency and hosting options can you provide (e.g., US, EU, Canada, multi-region)?",
    fieldType: "multiselect",
    priority: "urgent",
    options: [
      "United States",
      "European Union",
      "Canada",
      "United Kingdom",
      "Australia",
      "Asia-Pacific",
      "Multi-region",
      "Other"
    ],
    required: true,
    supportingDocs: true,
    helpText: "Select all data residency and hosting options available",
    supportingDocsLabel: "Hosting/data residency map if available"
  },
  {
    id: 7,
    section: "Security",
    text: "Which SSO/Identity providers does your product support?",
    fieldType: "multiselect",
    priority: "urgent",
    options: [
      "Okta",
      "Azure AD / Microsoft Entra ID",
      "Google Workspace",
      "OneLogin",
      "Auth0",
      "SAML 2.0",
      "OAuth 2.0",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all SSO and identity providers you support"
  },

  // ==================== IMPLEMENTATION & SUPPORT ====================
  {
    id: 8,
    section: "Implementation & Support",
    text: "What is your typical implementation timeline?",
    fieldType: "textarea",
    priority: "normal",
    rows: 3,
    placeholder: "e.g., 8-12 weeks, 2-3 months, etc.",
    required: true,
    supportingDocs: false,
    helpText: "Describe your typical implementation timeline in weeks or months"
  },
  {
    id: 9,
    section: "Implementation & Support",
    text: "Which support services are included in your standard offering?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "Onboarding",
      "Admin Training",
      "End-user Training",
      "Technical Setup",
      "24/7 Support",
      "Business Hours Support",
      "SLA Guarantees",
      "CSM Assignment",
      "Dedicated Account Manager",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Check all support services included in your standard package"
  },
  {
    id: 10,
    section: "Implementation & Support",
    text: "What ongoing support or resources will the buyer need to plan for?",
    fieldType: "textarea",
    priority: "normal",
    rows: 4,
    placeholder: "Describe any ongoing support, maintenance, or resource requirements...",
    required: true,
    supportingDocs: false,
    helpText: "Help the buyer understand what ongoing support they should expect to provide or budget for"
  },
  {
    id: 11,
    section: "Implementation & Support",
    text: "Do you provide a dedicated customer success manager or account manager?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No"],
    conditionalText: "Yes",
    required: true,
    supportingDocs: false,
    helpText: "If yes, please provide details about the CSM/AM engagement model"
  },

  // ==================== COMMERCIALS ====================
  {
    id: 12,
    section: "Commercials",
    text: "What billing terms do you accept?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "Net 30",
      "Net 45",
      "Net 60",
      "Net 90",
      "Due on Receipt",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all billing terms you can accommodate"
  },
  {
    id: 13,
    section: "Commercials",
    text: "Which billing intervals are supported?",
    fieldType: "singleselect",
    priority: "normal",
    options: [
      "Monthly",
      "Quarterly",
      "Annual",
      "Multi-year",
      "Flexible/Multiple options"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select your primary billing interval option"
  },
  {
    id: 14,
    section: "Commercials",
    text: "Which payment methods do you accept?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "ACH / Bank Transfer",
      "Wire Transfer",
      "Credit Card",
      "Check",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all payment methods you accept"
  },
  {
    id: 15,
    section: "Commercials",
    text: "What is your standard contract term?",
    fieldType: "dropdown",
    priority: "normal",
    options: [
      "1 year",
      "2 years",
      "3 years",
      "Flexible",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select your standard contract term length"
  },
  {
    id: 16,
    section: "Commercials",
    text: "Do you offer discounts for multi-year or seat-based purchases?",
    fieldType: "textarea",
    priority: "normal",
    rows: 3,
    placeholder: "e.g., 10% discount for 50+ seats, 15% for 2-year commitment, etc.",
    required: false,
    supportingDocs: true,
    helpText: "Describe your discount structure, if applicable",
    supportingDocsLabel: "Pricing sheet (optional)"
  },
  {
    id: 17,
    section: "Commercials",
    text: "Do your contracts auto-renew?",
    fieldType: "singleselect",
    priority: "normal",
    options: [
      "Yes",
      "No",
      "Optional (buyer's choice)"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Specify your auto-renewal policy"
  },

  // ==================== FEATURES & EXTENSIBILITY ====================
  {
    id: 18,
    section: "Features & Extensibility",
    text: "Do you provide open APIs or developer tools for extending functionality?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No"],
    conditionalText: "Yes",
    required: true,
    supportingDocs: true,
    helpText: "If yes, please provide details or a link to your API documentation",
    supportingDocsLabel: "API documentation (link or file)"
  },
  {
    id: 19,
    section: "Features & Extensibility",
    text: "Is your product accessible on mobile devices (native app, responsive web)?",
    fieldType: "singleselect",
    priority: "normal",
    options: [
      "Native App (iOS and Android)",
      "Native App (iOS only)",
      "Native App (Android only)",
      "Responsive Web",
      "Limited Mobile Support",
      "Not Supported"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select your mobile access option"
  },
  {
    id: 20,
    section: "Features & Extensibility",
    text: "What AI/ML features does your product include (e.g., contract redlining, clause extraction, predictive analytics)?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "Natural Language Processing",
      "Document Analysis",
      "Contract Redlining",
      "Clause Extraction",
      "Predictive Analytics",
      "Automated Recommendations",
      "Sentiment Analysis",
      "None",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all AI/ML features included in your product. If 'Other', please specify."
  },

  // ==================== DIFFERENTIATION / MARKET FIT ====================
  {
    id: 21,
    section: "Differentiation / Market Fit",
    text: "What differentiates your product from competitors?",
    fieldType: "textarea",
    priority: "normal",
    rows: 8,
    placeholder: "Describe your unique value proposition, key differentiators, and competitive advantages...",
    required: true,
    supportingDocs: false,
    helpText: "Help the buyer understand what makes your solution unique"
  },
  {
    id: 22,
    section: "Differentiation / Market Fit",
    text: "Can you share key wins with similar customer profiles?",
    fieldType: "textarea",
    priority: "normal",
    rows: 5,
    placeholder: "Provide brief case summaries of similar implementations...",
    required: false,
    supportingDocs: true,
    helpText: "Share success stories from customers with similar needs or profiles",
    supportingDocsLabel: "Optional case study"
  },
  {
    id: 23,
    section: "Differentiation / Market Fit",
    text: "Can you provide a customer reference or case study?",
    fieldType: "file",
    priority: "normal",
    allowText: true,
    placeholder: "Reference contact name/email (optional)",
    required: false,
    supportingDocs: false,
    helpText: "Upload a case study PDF or one-pager, and optionally provide reference contact information"
  },
  {
    id: 24,
    section: "Differentiation / Market Fit",
    text: "Do you have a primary industry or vertical focus (e.g., manufacturing, financial services, healthcare, legal)?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "Manufacturing",
      "Financial Services",
      "Healthcare",
      "Legal",
      "Retail & E-commerce",
      "Technology",
      "Education",
      "Government",
      "Nonprofit",
      "Professional Services",
      "Other"
    ],
    required: true,
    supportingDocs: true,
    helpText: "Select all industries or verticals where you have significant experience",
    supportingDocsLabel: "Customer list or case study upload (optional)"
  },

  // ==================== RFP TEMPLATE / STANDARD PACK ====================
  {
    id: 25,
    section: "RFP Template / Standard Pack",
    text: "Do you have a standard RFP response template you can provide to support our evaluation?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No"],
    conditionalText: "Yes",
    required: false,
    supportingDocs: true,
    helpText: "If yes, please provide details about what the template includes",
    supportingDocsLabel: "File upload (RFP template or due diligence documents)"
  },

  // ==================== CATCH-ALL ====================
  {
    id: 26,
    section: "Catch-All",
    text: "Is there anything else you'd like us to know about your product or company?",
    fieldType: "textarea",
    priority: "normal",
    rows: 8,
    placeholder: "Share any additional information that would be valuable for the buyer's decision...",
    required: false,
    supportingDocs: true,
    helpText: "Use this space to share any additional information not covered in the questions above"
  }
]

// Generate buyer-specific questions based on RFP data
export const generateBuyerSpecificQuestions = (rfp) => {
  const buyerQuestions = []

  // Q1: Must-have requirements
  const coreRequirements = (rfp.coreRequirements && rfp.coreRequirements.length > 0)
    ? rfp.coreRequirements
    : ['Requirement 1', 'Requirement 2', 'Requirement 3'] // Fallback options

  buyerQuestions.push({
    id: 'buyer-1',
    section: 'Buyer-Specific Requirements',
    text: 'Please confirm which of our must-have requirements your product supports.',
    fieldType: 'multiselect',
    priority: 'urgent',
    options: coreRequirements,
    required: true,
    supportingDocs: true,
    helpText: 'Select all requirements that your solution supports',
    supportingDocsLabel: 'Optional feature matrix (XLS/PDF)',
    buyerSpecific: true
  })

  // Q2: Tool integrations
  const techStack = (rfp.techStack && rfp.techStack.length > 0)
    ? [...rfp.techStack.map(tech => tech.name || tech), 'Other']
    : ['CRM', 'ERP', 'Payment Gateway', 'Other'] // Fallback options

  buyerQuestions.push({
    id: 'buyer-2',
    section: 'Buyer-Specific Requirements',
    text: 'Which of the tools listed in our technology stack do you integrate with?',
    fieldType: 'multiselect',
    priority: 'urgent',
    options: techStack,
    required: true,
    supportingDocs: true,
    helpText: 'Select all tools/systems you can integrate with',
    supportingDocsLabel: 'Optional integration/API documentation link',
    buyerSpecific: true
  })

  // Q3: User count support
  const userCount = rfp.userSeats || rfp.requiredLicenses || 'the stated number of users/licenses'
  buyerQuestions.push({
    id: 'buyer-3',
    section: 'Buyer-Specific Requirements',
    text: `Can your product support ${userCount}?`,
    fieldType: 'singleselect',
    priority: 'urgent',
    options: ['Yes', 'No', 'With conditions'],
    conditionalText: 'With conditions',
    required: true,
    supportingDocs: false,
    helpText: 'If "With conditions", please provide details in the text field',
    buyerSpecific: true
  })

  // Q4: Demo requirements
  const demoText = rfp.demoRequirements || 'the requirements listed in the RFP'
  buyerQuestions.push({
    id: 'buyer-4',
    section: 'Buyer-Specific Requirements',
    text: 'Can you demonstrate that your solution meets our supplier demonstration requirements?',
    fieldType: 'textarea',
    priority: 'urgent',
    rows: 6,
    placeholder: `Please explain how you can demonstrate: ${demoText}`,
    required: true,
    supportingDocs: true,
    helpText: 'Describe how you will demonstrate the required capabilities',
    supportingDocsLabel: 'Demo deck or video link (optional)',
    buyerSpecific: true
  })

  // Q5: Enterprise system integration
  buyerQuestions.push({
    id: 'buyer-5',
    section: 'Buyer-Specific Requirements',
    text: 'Can you provide details on how you integrate with our specific enterprise systems (e.g., ERP, procurement platforms)?',
    fieldType: 'textarea',
    priority: 'normal',
    rows: 5,
    placeholder: 'Describe your integration capabilities with enterprise systems like SAP, Oracle, Ariba, etc.',
    required: false,
    supportingDocs: true,
    helpText: 'Provide details on enterprise system integrations relevant to this buyer',
    supportingDocsLabel: 'Optional integration overview',
    buyerSpecific: true
  })

  return buyerQuestions
}

// Helper function to customize questions for specific RFP
export const customizeQuestionsForRFP = (rfp) => {
  // You can customize questions based on RFP data
  // For example, replace placeholders with actual RFP requirements
  return defaultRFPQuestions.map(question => {
    // Customize Product dropdown based on seller's actual products
    if (question.id === 1 && rfp.sellerProducts) {
      return {
        ...question,
        options: [...rfp.sellerProducts, "Other"]
      }
    }
    return question
  })
}
