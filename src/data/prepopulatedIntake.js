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

// ========================================
// FLEX TALENT PREPOPULATED DATA
// ========================================

export const prepopulatedFlexTalentIntake = {
  // Meta fields
  serviceType: 'legal-services',
  deliveryModel: 'lawfirm',
  rfpType: 'lawfirm', // Using lawfirm type for flex talent
  legalNeed: '', // Not specified in source JSON

  // Step 1: Title & Company Description
  title: "Interim Commercial/Privacy Counsel (US/UK) — 0.6 FTE for 6 Months",
  companyDescription: "Global B2B SaaS (~1,500 employees); accelerating EU/UK expansion.",

  // Step 2: Work Description
  workDescription: "Provide interim Commercial/Privacy counsel support for sales/procurement contracting, playbook-aligned redlines, and privacy reviews. Coverage needed across US East/West and UK time zones; collaborate with in-house Legal, Sales Ops, and Security.",

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
  lawfirmTechStack: [], // Not applicable for flex talent

  // Step 5: Pricing (Note: hourly rate, not total budget)
  preferredPricingModel: ["Hourly"], // "hourly_rate" mapped to Hourly
  budgetFrom: 140, // Per hour rate
  budgetTo: 190, // Per hour rate
  additionalBudgetInfo: "Target 24–28 hrs/week (0.6 FTE) for 6 months; request blended rate inclusive of supervision/QA. Overtime pre-approval required.",

  // Step 6: Bidders
  selectYourFirms: true, // User specified invited vendors
  useTheoremMarketplace: true, // flex_network_toggles enabled
  serviceProviders: [], // Flex talent provider IDs would be looked up
  // Invited flex talent providers from source JSON (for reference):
  // - "Axiom"
  // - "Paragon Legal"
  // - "Priori Legal"
  // - "Lawtrades"
  // - "Hire an Esquire"
  maxResponses: 7,

  // Step 7: Finishing Touches
  deadline: "2026-04-30",
  projectStartDate: "2025-11-01",
  projectEndDate: "2026-04-30",
  customQuestions: [
    "Submit 2–3 candidate profiles with bios, relevant matter summaries, and rates.",
    "Confirm coverage windows (US ET/PT, UK) and proposed weekly hours.",
    "Describe supervision, escalation, and QA model for flex talent.",
    "Outline conflict check and start-readiness timeline (background checks, equipment, security onboarding).",
    "Detail experience with GDPR/DPA reviews and typical turnaround times.",
    "Provide two client references for similar interim counsel engagements."
  ],
  uploadedFiles: [], // Attachments from source JSON (for reference):
  // - rfp_template_url: "file:flex-talent-intake-template.docx"
  // - supporting_docs: ["file:contracting-playbook-v3.pdf", "file:volume-forecast-q1-q2.csv", "file:security-access-matrix.xlsx"]

  // Step 8: Email & Terms
  email: '',
  acceptedTerms: false,

  // Additional metadata from source JSON (for reference/future use)
  _sourceMetadata: {
    version: "1.0",
    created_at: "2025-10-08",
    author: "@josh",
    notes_for_demo: "Show multiple flex-network toggles first, then add named providers; emphasize hours/week, rate band, and multi-time-zone coverage.",
    flex_network_toggles: [
      { name: "theorem_flex_talent_network", enabled: true },
      { name: "global_flex_specialists", enabled: true }
    ],
    decision_criteria: [],
    stakeholders: []
  }
}

// Helper - invited flex talent provider names
export const invitedFlexTalentProviders = [
  "Axiom",
  "Paragon Legal",
  "Priori Legal",
  "Lawtrades",
  "Hire an Esquire"
]

// Helper - flex talent attachments
export const flexTalentAttachments = {
  rfp_template_url: "file:flex-talent-intake-template.docx",
  supporting_docs: [
    "file:contracting-playbook-v3.pdf",
    "file:volume-forecast-q1-q2.csv",
    "file:security-access-matrix.xlsx"
  ]
}

// ========================================
// TECH REPLACEMENT PREPOPULATED DATA
// ========================================

export const prepopulatedTechReplaceIntake = {
  // Meta fields
  serviceType: 'legal-tech-replace',
  rfpType: 'legal-tech-replace',
  deliveryModel: null,

  // Step 1: Title & Company Description
  title: "CLM Replacement for Global Fintech – 2026 Renewal",
  companyDescription: "Global fintech (~2,100 employees); in-house legal supports sales, procurement, and compliance across NA/EU.",

  // Step 2: Product to Replace
  productToReplace: '', // "ContractWorks" - ID would be looked up from products.json

  // Step 3: Replacement Reasons
  replacementReasons: ["features", "support", "price"],
  replacementReasonsOther: '',

  // Step 4: Current Status
  currentStatus: "intend_leave_not_cancelled",
  currentStatusOther: '',

  // Step 5: Use Case Description
  useCaseDescription: "We manage ~5,500 contracts/year (sales, procurement, NDAs). We need clause library/playbooks, workflow automation, and robust search/reporting for SOX audits. Current system struggles with Salesforce-initiated intake and large redline files.",

  // Step 6: Core Features (exact features from requirements)
  coreFeatures: [
    { feature: "Clause library with approvals", priority: "must_have" },
    { feature: "Playbooks & guidance during review", priority: "must_have" },
    { feature: "Advanced search (OCR + metadata)", priority: "must_have" },
    { feature: "Salesforce-initiated intake & status sync", priority: "must_have" },
    { feature: "Bulk import & migration utilities", priority: "must_have" },
    { feature: "Vendor portal/external collaboration", priority: "nice_to_have" },
    { feature: "AI extraction for legacy contracts", priority: "nice_to_have" }
  ],
  featureFiles: [],

  // Step 7: Existing Tech Stack / Integrations (exact integrations from requirements)
  existingTechStack: [], // Product IDs would be looked up for: ["Okta SSO", "SCIM (User Provisioning)", "Salesforce", "DocuSign", "NetSuite", "Google Drive (archive)", "Slack (notifications)"]
  integrationRequired: true,

  // Step 8: Product Selection (invited vendors)
  selectedProducts: [], // Product IDs would be looked up for: ["Ironclad", "Agiloft", "Icertis", "Evisort", "LinkSquares", "Sirion"]
  maxResponses: 5,

  // Step 9: Number of Users
  numberOfUsers: 150,

  // Step 10: Timeline
  signTimeline: "90_days",
  signTimelineOther: '',
  deadline: "2025-12-01",

  // Step 11: Business Terms
  contractTerm: ["multi_year"],
  billingTerm: ["annually"],
  paymentTerm: ["net_30"],

  // Step 12: Custom Questions
  customQuestions: `Describe your Salesforce intake and 2-way status sync architecture.
Provide a migration plan for ~25k legacy contracts, including timeline and cutover.
Outline your search capabilities (OCR coverage, filters, semantic options) and benchmark results.
Share typical admin effort for playbook/clause maintenance (hours/month).
List standard SLAs for support (response/resolve) and escalation paths.`,

  // Email & Terms
  email: '',
  acceptedTerms: false,

  // Additional metadata from source JSON (for reference/future use)
  _sourceMetadata: {
    version: "1.0",
    created_at: "2025-10-08",
    author: "@josh",
    notes_for_demo: "Use to show replacement storyline: feature gaps, support expectations, and tighter SFDC integration. Emphasize migration volume and timeline.",
    buyer_profile: {
      industry: "Financial Services",
      region: "North America & Europe",
      company_size: "2,000–3,000",
      legal_team_size: "32 FTE"
    },
    incumbent: {
      product: "ContractWorks",
      vendor: "Onit",
      version: "2022.x"
    },
    use_case: {
      pain_points: [
        "No native Salesforce intake; manual reentry creates delays",
        "Search precision is poor; difficult to find executed agreements",
        "Playbook and clause management are limited",
        "Support response times exceed 2 business days"
      ]
    },
    purchase_factors: {
      most_important: ["features", "support", "price"]
    },
    purchase_status: {
      status: "budget_allocated"
    },
    timeline: {
      desired_start: "2026-02-01"
    },
    business: {
      term_other_text: "36 months preferred"
    },
    decision_criteria: [],
    stakeholders: []
  }
}

// Helper - invited tech replacement vendors
export const invitedTechReplacementVendors = [
  "Ironclad",
  "Agiloft",
  "Icertis",
  "Evisort",
  "LinkSquares",
  "Sirion"
]

// Helper - integration requirements
export const techReplacementIntegrations = [
  "Okta SSO",
  "SCIM (User Provisioning)",
  "Salesforce",
  "DocuSign",
  "NetSuite",
  "Google Drive (archive)",
  "Slack (notifications)"
]

// Helper - tech replacement attachments
export const techReplacementAttachments = {
  rfp_template_url: null,
  supporting_docs: [
    "file:business-case-v1.pdf",
    "file:current-process-map.png"
  ]
}

// ========================================
// TECH NEW PURCHASE PREPOPULATED DATA
// ========================================

export const prepopulatedTechNewIntake = {
  // Meta fields
  serviceType: 'legal-tech-new',
  rfpType: 'legal-tech-new',
  deliveryModel: null,

  // Step 1: Title & Company Description
  title: "Corporate Legal DMS – New Purchase FY26",
  companyDescription: "US medtech (~1,400 employees); Legal supports R&D/IP, commercial, and compliance across NA/EU.",

  // Step 2: Solution Type (not replacing a product, looking for new solution)
  productToReplace: '', // Not replacing - new purchase
  solutionCategory: "DMS", // Document Management System

  // Step 3: Use Case Description
  useCaseDescription: "We need a centralized document repository for matters and contracts with strong search, email filing from Outlook, and ethical walls. Today content is spread across shared drives and SharePoint sites, which creates versioning issues and audit risk.",

  // Step 4: Core Features (exact features from requirements)
  coreFeatures: [
    { feature: "Matter workspaces & metadata profiles", priority: "must_have" },
    { feature: "Advanced search with OCR and facets", priority: "must_have" },
    { feature: "Outlook add-in for email filing", priority: "must_have" },
    { feature: "Version control & compare", priority: "must_have" },
    { feature: "Ethical walls and granular permissions", priority: "must_have" },
    { feature: "External sharing with audit trail", priority: "nice_to_have" },
    { feature: "Retention policies & legal hold", priority: "nice_to_have" },
    { feature: "Mobile access with offline sync", priority: "nice_to_have" }
  ],
  featureFiles: [],

  // Step 5: Existing Tech Stack / Integrations (exact integrations from requirements)
  existingTechStack: [], // Product IDs would be looked up for: ["Okta SSO", "SCIM", "Microsoft 365", "DocuSign", "Adobe Acrobat/Sign", "Slack"]
  integrationRequired: true,

  // Step 6: Product Selection (invited vendors)
  selectedProducts: [], // Product IDs would be looked up for: ["NetDocuments", "iManage", "OpenText eDOCS", "Egnyte", "ShareFile"]
  maxResponses: 5,

  // Step 7: Number of Users
  numberOfUsers: 120,

  // Step 8: Timeline
  signTimeline: "90_days",
  signTimelineOther: '',
  deadline: "2025-11-30",

  // Step 9: Business Terms
  contractTerm: ["multi_year"],
  billingTerm: ["annually"],
  paymentTerm: ["net_30"],

  // Step 10: Custom Questions
  customQuestions: `Describe your Outlook email filing add-in and any server-side capture options.
Detail your search/OCR capabilities and indexing of PDFs and scanned documents.
Outline your approach to ethical walls and permissioning at workspace/folder/document levels.
Provide a recommended migration plan from shared drives/SharePoint with estimated timeline.
List standard support SLAs and typical response/resolution times.`,

  // Email & Terms
  email: '',
  acceptedTerms: false,

  // Additional metadata from source JSON (for reference/future use)
  _sourceMetadata: {
    version: "1.0",
    created_at: "2025-10-08",
    author: "@josh",
    notes_for_demo: "Use to showcase new-purchase flow focused on DMS search, email filing, and ethical walls; emphasize migration and support SLAs.",
    buyer_profile: {
      industry: "Medical Devices",
      region: "North America & Europe",
      company_size: "1,000–1,500",
      legal_team_size: "24 FTE"
    },
    consideration_set: {
      specific_product: null,
      solution_type: "DMS"
    },
    use_case: {
      pain_points: [
        "Scattered repositories (drives/SharePoint) lead to duplicate and outdated files",
        "Limited search; no consistent metadata or OCR",
        "Email filing is manual and inconsistent",
        "Access controls and ethical walls are difficult to manage"
      ]
    },
    purchase_factors: {
      most_important: ["features", "support", "price"]
    },
    purchase_status: {
      status: "budget_allocated"
    },
    timeline: {
      desired_start: "2026-01-15"
    },
    business: {
      term_other_text: "36 months preferred"
    },
    decision_criteria: [],
    stakeholders: []
  }
}

// Helper - invited tech new purchase vendors
export const invitedTechNewVendors = [
  "NetDocuments",
  "iManage",
  "OpenText eDOCS",
  "Egnyte",
  "ShareFile"
]

// Helper - tech new integration requirements
export const techNewIntegrations = [
  "Okta SSO",
  "SCIM (User Provisioning)",
  "Microsoft 365 (Word/Outlook add-ins)",
  "DocuSign",
  "Adobe Acrobat/Sign",
  "Slack (notifications)"
]

// Helper - tech new attachments
export const techNewAttachments = {
  rfp_template_url: null,
  supporting_docs: [
    "file:current-repo-inventory.xlsx",
    "file:security-baseline.pdf"
  ]
}
