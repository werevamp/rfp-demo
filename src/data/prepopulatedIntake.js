// Prepopulated intake form data
// This data is structured to match the buyer intake form fields exactly
// Derived from the sample RFP JSON for law firm services

export const prepopulatedLawfirmIntake = {
  // Meta fields
  serviceType: 'legal-services',
  deliveryModel: 'lawfirm',
  rfpType: 'lawfirm',
  legalNeed: '', // Not specified in source JSON

  // Step 1: Title & Company Description
  title: "Outside Counsel for Commercial SaaS Agreements (US/UK) — FY26",
  companyDescription: "US/EU SaaS company (~1,200 employees); rapid EMEA expansion.",

  // Step 2: Work Description
  workDescription: "Standardize and negotiate commercial SaaS agreements (MSAs, DPAs, SOWs) during EMEA rollout; align playbooks, manage redlines, and second-chair escalations. Mix of US and UK law advice; occasional vendor paper.",

  // Step 3: Requirements
  practiceAreas: [
    "Commercial Contracts",
    "Technology Transactions",
    "Data Privacy (GDPR/CCPA)"
  ],
  experienceLevel: "5+ years",
  barLicenses: [
    { state: "California", country: "United States" },
    { state: "New York", country: "United States" },
    { state: "England & Wales", country: "United Kingdom" }
  ],

  // Step 4: Technology Stack
  lawfirmTechStack: [], // No tech stack requirements specified in source JSON

  // Step 5: Pricing
  preferredPricingModel: ["Fixed Fee", "Capped Hourly"], // "alt_fee_fixed" mapped to Fixed Fee + inferred Capped Hourly from additionalBudgetInfo
  budgetFrom: 85000,
  budgetTo: 120000,
  additionalBudgetInfo: "Phase 1 (playbook + templates) fixed fee; Phase 2 (negotiations) capped hourly. Excludes filing/translation fees.",

  // Step 6: Bidders
  selectYourFirms: true, // User specified invited vendors
  useTheoremMarketplace: true, // expand_to_theorem_network was true
  serviceProviders: [], // Note: Firm IDs would need to be looked up from lawfirms.json
  // Invited vendor names from source JSON (for reference):
  // - "Orrick, Herrington & Sutcliffe LLP"
  // - "Cooley LLP"
  // - "Wilson Sonsini Goodrich & Rosati"
  // - "Bird & Bird LLP"
  // - "Baker McKenzie"
  maxResponses: 8,

  // Step 7: Finishing Touches
  deadline: "2026-03-31",
  projectStartDate: "2025-11-15",
  projectEndDate: "2026-03-31",
  customQuestions: [
    "Propose team composition, hourly rates, and partner/associate leverage.",
    "Provide 3 recent, relevant matter summaries for B2B SaaS negotiations (US/UK).",
    "Outline fixed-fee scope, assumptions, and any excluded tasks.",
    "Describe your data security/confidentiality controls and use of generative AI.",
    "Detail conflict check timeline and anticipated turnaround SLAs.",
    "Share KPIs/reporting cadence you recommend for this engagement."
  ],
  uploadedFiles: [], // Attachments from source JSON (for reference):
  // - rfp_template_url: "file:law-firm-rfp-template.docx"
  // - supporting_docs: ["file:contracting-volumes-2024.xlsx", "file:outside-counsel-guidelines.pdf"]

  // Step 8: Email & Terms
  email: '',
  acceptedTerms: false,

  // Additional metadata from source JSON (for reference/future use)
  _sourceMetadata: {
    version: "1.0",
    created_at: "2025-10-08",
    author: "@josh",
    notes_for_demo: "Toggle Theorem Network to show panel + marketplace routing; emphasize fixed-fee + capped hourly hybrid.",
    decision_criteria: [],
    stakeholders: []
  }
}

// Helper to map invited vendor names to firm IDs
// This would need to query lawfirms.json to find matching IDs
export const invitedVendorNames = [
  "Orrick, Herrington & Sutcliffe LLP",
  "Cooley LLP",
  "Wilson Sonsini Goodrich & Rosati",
  "Bird & Bird LLP",
  "Baker McKenzie"
]

// Helper to map attachments
export const attachments = {
  rfp_template_url: "file:law-firm-rfp-template.docx",
  supporting_docs: [
    "file:contracting-volumes-2024.xlsx",
    "file:outside-counsel-guidelines.pdf"
  ]
}

// ========================================
// ALSP PREPOPULATED DATA
// ========================================

export const prepopulatedALSPIntake = {
  // Meta fields
  serviceType: 'legal-services',
  deliveryModel: 'alsp',
  rfpType: 'alsp',
  legalNeed: '', // Not specified in source JSON

  // Step 1: Title & Company Description
  title: "ALSP for High-Volume Contract Review & Abstraction (Global) — FY26",
  companyDescription: "Global B2B SaaS (~1,800 employees); scaling procurement & sales ops across AMER/EMEA/APAC.",

  // Step 2: Work Description
  workDescription: "Playbook-driven review and abstraction of buy-side and sell-side agreements (NDAs, MSAs, order forms, DPAs), including metadata capture, routing, and QA reporting. Vendor to provide managed team, tooling, and process governance.",

  // Step 3: Requirements
  clientIndustryExperience: [
    "Software/SaaS",
    "Financial Services",
    "Telecommunications"
  ],
  locationJurisdiction: ["AMER", "EMEA", "APAC"],
  languagesRequired: ["English", "Spanish", "German", "Japanese"],
  volumeScale: "other", // "high_volume_ongoing" → custom description
  volumeScaleOther: "~12,000 agreements/year; 1,000/month average; peak seasonal spikes to 1,600/month",

  // Step 4: Pricing
  preferredPricingModel: ["Monthly Retainer"], // "monthly_rate" mapped to Monthly Retainer
  budgetFrom: 85000,
  budgetTo: 120000,
  additionalBudgetInfo: "Monthly managed service fee inclusive of PM, QA, reporting; unit-rate card for overflow and specialty languages; volume-based discounts after 1,200 docs/month.",

  // Step 5: Bidders
  useTheoremMarketplace: true,
  serviceProviders: [], // ALSP form doesn't have firm selection UI
  maxResponses: 8,

  // Step 6: Finishing Touches
  deadline: "2026-10-31",
  projectStartDate: "2025-11-01",
  projectEndDate: "2026-10-31",
  customQuestions: [
    "Describe your staffing model (roles, coverage by region/time zone) and proposed team ramp plan.",
    "Provide throughput assumptions (docs/FTE/day), QA methodology, and target accuracy rates.",
    "Detail your technology stack (intake, workflow, OCR/AI extraction) and integration approach with our DMS/CLM.",
    "Share standard SLAs (intake-to-first-touch, turnaround for low/medium/high complexity) and escalation paths.",
    "Outline data security controls, access provisioning, and confidentiality measures (including AI usage policies).",
    "Propose a governance cadence with KPIs, dashboards, and continuous improvement plan."
  ],
  uploadedFiles: [], // Attachments from source JSON (for reference):
  // - rfp_template_url: "file:alsp-rfp-template.docx"
  // - supporting_docs: ["file:volume-by-month-fy24-fy25.csv", "file:playbook-v2-redlines.pdf", "file:metadata-schema.json"]

  // Step 7: Email & Terms
  email: '',
  acceptedTerms: false,

  // Additional metadata from source JSON (for reference/future use)
  _sourceMetadata: {
    version: "1.0",
    created_at: "2025-10-08",
    author: "@josh",
    notes_for_demo: "Demonstrate toggle to Theorem Network first, then add named ALSPs; highlight monthly managed service + unit-rate overflow and multilingual coverage.",
    practice_areas: ["Commercial Contracts", "Technology Transactions", "Data Privacy", "Corporate"],
    decision_criteria: [],
    stakeholders: []
  }
}

// Helper - invited ALSP vendor names
export const invitedALSPNames = [
  "UnitedLex",
  "Elevate",
  "Integreon",
  "QuisLex",
  "Consilio",
  "Morae"
]

// Helper - ALSP attachments
export const alspAttachments = {
  rfp_template_url: "file:alsp-rfp-template.docx",
  supporting_docs: [
    "file:volume-by-month-fy24-fy25.csv",
    "file:playbook-v2-redlines.pdf",
    "file:metadata-schema.json"
  ]
}
