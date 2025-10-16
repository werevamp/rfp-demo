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

// ==================== ALSP QUESTIONS ====================
// Questions specifically for ALSPs (Alternative Legal Service Providers)
export const alspQuestions = [
  // ==================== SERVICE SCOPE & CAPABILITIES ====================
  {
    id: 'alsp-1',
    section: "Service Scope & Capabilities",
    text: "Which service areas are you submitting this RFP response for?",
    fieldType: "multiselect",
    priority: "urgent",
    options: [
      "Contract Management",
      "eDiscovery",
      "Compliance",
      "Legal Operations",
      "Litigation Support",
      "IP Management",
      "Legal Research",
      "Document Review",
      "Due Diligence",
      "Regulatory Filings",
      "Other"
    ],
    required: true,
    supportingDocs: true,
    helpText: "Select all service areas you can provide. If 'Other', please specify in supporting docs.",
    supportingDocsLabel: "Optional: Service overview or capability statement"
  },
  {
    id: 'alsp-2',
    section: "Service Scope & Capabilities",
    text: "Do you have a primary industry or client focus (e.g., financial services, technology, life sciences)?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "Financial Services",
      "Technology",
      "Life Sciences",
      "Healthcare",
      "Manufacturing",
      "Retail & E-commerce",
      "Energy & Utilities",
      "Media & Entertainment",
      "Professional Services",
      "Government & Public Sector",
      "Other"
    ],
    required: true,
    supportingDocs: true,
    helpText: "Select your primary industry focus areas",
    supportingDocsLabel: "Optional: Case study or client list (anonymized)"
  },
  {
    id: 'alsp-3',
    section: "Service Scope & Capabilities",
    text: "What is the size and composition of your delivery team?",
    fieldType: "textarea",
    priority: "urgent",
    rows: 6,
    placeholder: "Describe your team size (FTEs), roles (lawyers/paralegals/analysts), average tenure, and team structure...",
    required: true,
    supportingDocs: false,
    helpText: "Provide details about your delivery team including size, roles, and experience levels"
  },
  {
    id: 'alsp-4',
    section: "Service Scope & Capabilities",
    text: "Do you operate globally? If so, which regions or delivery centers do you cover?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "North America",
      "Latin America",
      "Europe",
      "United Kingdom",
      "Middle East",
      "Africa",
      "Asia-Pacific",
      "India",
      "Australia",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all regions where you have delivery centers or operations"
  },
  {
    id: 'alsp-5',
    section: "Service Scope & Capabilities",
    text: "Which languages can your team support in service delivery?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "English",
      "Spanish",
      "French",
      "German",
      "Portuguese",
      "Mandarin Chinese",
      "Cantonese",
      "Japanese",
      "Korean",
      "Hindi",
      "Arabic",
      "Russian",
      "Italian",
      "Dutch",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all languages your team can support for service delivery"
  },
  {
    id: 'alsp-6',
    section: "Service Scope & Capabilities",
    text: "Do you partner with law firms or technology vendors to deliver your services?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No"],
    conditionalText: "Yes",
    required: true,
    supportingDocs: false,
    helpText: "If yes, please describe your partnership model and key partners in the text field"
  },

  // ==================== EXPERIENCE & TRACK RECORD ====================
  {
    id: 'alsp-7',
    section: "Experience & Track Record",
    text: "What relevant experience do you have with clients in our industry?",
    fieldType: "textarea",
    priority: "urgent",
    rows: 8,
    placeholder: "Describe your experience with similar clients, including representative clients (can be anonymized)...",
    required: true,
    supportingDocs: true,
    helpText: "Provide detailed examples of your industry experience",
    supportingDocsLabel: "Optional: Case study upload"
  },
  {
    id: 'alsp-8',
    section: "Experience & Track Record",
    text: "Can you provide examples of similar projects or managed service engagements you've delivered?",
    fieldType: "textarea",
    priority: "urgent",
    rows: 8,
    placeholder: "Describe 2-3 similar engagements including scope, duration, outcomes...",
    required: true,
    supportingDocs: true,
    helpText: "Share specific examples of similar work you've completed",
    supportingDocsLabel: "Optional: Anonymized project summaries or case studies"
  },
  {
    id: 'alsp-9',
    section: "Experience & Track Record",
    text: "Can you provide client references?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No", "Upon request"],
    conditionalText: "Yes",
    required: true,
    supportingDocs: true,
    helpText: "If yes, please provide contact details in the text field or upload reference list",
    supportingDocsLabel: "Optional: Reference letter or testimonial"
  },

  // ==================== SERVICE DELIVERY & OPERATIONS ====================
  {
    id: 'alsp-10',
    section: "Service Delivery & Operations",
    text: "What is your typical engagement model (e.g., dedicated team, hybrid onshore/offshore, on-demand)?",
    fieldType: "textarea",
    priority: "urgent",
    rows: 6,
    placeholder: "Describe your engagement model, staffing approach, and how you structure client relationships...",
    required: true,
    supportingDocs: false,
    helpText: "Explain your typical engagement and service delivery model"
  },
  {
    id: 'alsp-11',
    section: "Service Delivery & Operations",
    text: "What technology platforms do you use to deliver your services (e.g., CLM tools, eDiscovery platforms, workflow tools)?",
    fieldType: "multiselect",
    priority: "urgent",
    options: [
      "Contract Management (CLM)",
      "eDiscovery Platforms (Relativity, Nuix, etc.)",
      "Document Management Systems",
      "Workflow Automation Tools",
      "Legal Project Management",
      "Legal Research Platforms",
      "AI/ML Analytics Tools",
      "Collaboration Platforms",
      "Custom Proprietary Tools",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all technology platforms and tools you use for service delivery"
  },
  {
    id: 'alsp-12',
    section: "Service Delivery & Operations",
    text: "Do you provide client access to dashboards, portals, or reporting tools?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No"],
    conditionalText: "Yes",
    required: true,
    supportingDocs: true,
    helpText: "If yes, describe your client reporting capabilities and tools in the text field",
    supportingDocsLabel: "Optional: Dashboard/portal screenshots or overview"
  },
  {
    id: 'alsp-13',
    section: "Service Delivery & Operations",
    text: "What service-level standards (SLAs, KPIs, turnaround times) do you typically commit to?",
    fieldType: "textarea",
    priority: "urgent",
    rows: 6,
    placeholder: "Describe your typical SLAs, KPIs, response times, and quality standards...",
    required: true,
    supportingDocs: true,
    helpText: "Provide details about your service-level commitments and performance standards",
    supportingDocsLabel: "Optional: SLA or KPI sample document"
  },
  {
    id: 'alsp-14',
    section: "Service Delivery & Operations",
    text: "What quality assurance or review processes do you follow to ensure accuracy and consistency?",
    fieldType: "textarea",
    priority: "normal",
    rows: 6,
    placeholder: "Describe your QA processes, review protocols, error rates, and quality standards...",
    required: true,
    supportingDocs: true,
    helpText: "Explain your quality assurance methodology and processes",
    supportingDocsLabel: "Optional: QA policy or process documentation"
  },
  {
    id: 'alsp-15',
    section: "Service Delivery & Operations",
    text: "Do you provide 24/7 or follow-the-sun support coverage?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes - 24/7 coverage", "Yes - Follow-the-sun coverage", "No - Business hours only", "Custom coverage available"],
    required: true,
    supportingDocs: false,
    helpText: "Specify your support coverage model"
  },
  {
    id: 'alsp-16',
    section: "Service Delivery & Operations",
    text: "What tools or practices do you use for knowledge management and continuous improvement?",
    fieldType: "textarea",
    priority: "normal",
    rows: 5,
    placeholder: "Describe your knowledge management systems, best practices, and continuous improvement initiatives...",
    required: false,
    supportingDocs: true,
    helpText: "Explain your approach to knowledge management and service improvement",
    supportingDocsLabel: "Optional: KM overview or playbook"
  },

  // ==================== SECURITY, DATA HANDLING & COMPLIANCE ====================
  {
    id: 'alsp-17',
    section: "Security, Data Handling & Compliance",
    text: "What data security and confidentiality measures are in place across your operations?",
    fieldType: "textarea",
    priority: "urgent",
    rows: 6,
    placeholder: "Describe your data security protocols, access controls, encryption, confidentiality measures...",
    required: true,
    supportingDocs: true,
    helpText: "Provide comprehensive details about your security and confidentiality practices",
    supportingDocsLabel: "Optional: Security policy or client confidentiality summary"
  },
  {
    id: 'alsp-18',
    section: "Security, Data Handling & Compliance",
    text: "Are your facilities or systems certified under any data security standards (e.g., ISO 27001, SOC 2, GDPR)?",
    fieldType: "multiselect",
    priority: "urgent",
    options: [
      "ISO 27001",
      "SOC 2 Type II",
      "GDPR Compliant",
      "HIPAA",
      "PCI DSS",
      "FedRAMP",
      "NIST Cybersecurity Framework",
      "Other"
    ],
    required: true,
    supportingDocs: true,
    helpText: "Select all security certifications and compliance standards you meet",
    supportingDocsLabel: "Certificate PDFs or compliance summary"
  },
  {
    id: 'alsp-19',
    section: "Security, Data Handling & Compliance",
    text: "What data residency and hosting options are available?",
    fieldType: "multiselect",
    priority: "urgent",
    options: [
      "United States",
      "European Union",
      "Canada",
      "United Kingdom",
      "Australia",
      "Asia-Pacific",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all data residency and hosting regions available"
  },
  {
    id: 'alsp-20',
    section: "Security, Data Handling & Compliance",
    text: "How do you handle cross-border data transfers and client data jurisdiction requirements?",
    fieldType: "textarea",
    priority: "urgent",
    rows: 5,
    placeholder: "Describe your approach to cross-border data transfers, compliance with local laws, data localization...",
    required: true,
    supportingDocs: false,
    helpText: "Explain your data transfer and jurisdiction compliance approach"
  },
  {
    id: 'alsp-21',
    section: "Security, Data Handling & Compliance",
    text: "Do you use AI or automation tools in delivering your services (e.g., document review, extraction, analysis)?",
    fieldType: "singleselect",
    priority: "urgent",
    options: ["Yes", "No"],
    conditionalText: "Yes",
    required: true,
    supportingDocs: true,
    helpText: "If yes, describe which AI/automation tools you use and for what purposes in the text field",
    supportingDocsLabel: "Optional: AI policy or client communication on responsible use"
  },
  {
    id: 'alsp-22',
    section: "Security, Data Handling & Compliance",
    text: "What governance is in place to ensure ethical and compliant use of AI?",
    fieldType: "textarea",
    priority: "normal",
    rows: 5,
    placeholder: "Describe your AI governance framework, oversight processes, ethical guidelines, human review protocols...",
    required: false,
    supportingDocs: true,
    helpText: "Explain your AI governance and ethical use policies",
    supportingDocsLabel: "Optional: AI governance policy document"
  },

  // ==================== COMMERCIALS & ENGAGEMENT TERMS ====================
  {
    id: 'alsp-23',
    section: "Commercials & Engagement Terms",
    text: "What pricing models do you support?",
    fieldType: "multiselect",
    priority: "urgent",
    options: [
      "Hourly",
      "Per-document",
      "Per-matter",
      "Subscription/Retainer",
      "Project-based",
      "Outcome-based",
      "FTE/Dedicated resource",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all pricing models you can offer"
  },
  {
    id: 'alsp-24',
    section: "Commercials & Engagement Terms",
    text: "What are your standard rates or fee ranges?",
    fieldType: "textarea",
    priority: "urgent",
    rows: 5,
    placeholder: "Provide your standard rates, fee ranges, or pricing structure...",
    required: true,
    supportingDocs: true,
    helpText: "Share your standard pricing information",
    supportingDocsLabel: "Optional: Rate card or pricing schedule upload"
  },
  {
    id: 'alsp-25',
    section: "Commercials & Engagement Terms",
    text: "Do you offer discounts for volume, long-term engagements, or multi-service bundles?",
    fieldType: "textarea",
    priority: "normal",
    rows: 4,
    placeholder: "Describe any volume discounts, long-term commitment discounts, or bundle pricing...",
    required: false,
    supportingDocs: false,
    helpText: "If applicable, describe your discount structure"
  },
  {
    id: 'alsp-26',
    section: "Commercials & Engagement Terms",
    text: "What are your standard payment terms?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "Net 30",
      "Net 45",
      "Net 60",
      "Monthly in advance",
      "Upon completion",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all payment terms you can accommodate"
  },
  {
    id: 'alsp-27',
    section: "Commercials & Engagement Terms",
    text: "What is your standard contract term for managed services?",
    fieldType: "dropdown",
    priority: "normal",
    options: [
      "3 months",
      "6 months",
      "1 year",
      "2 years",
      "Flexible",
      "Project-based (no term)",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select your typical contract term length"
  },

  // ==================== DIFFERENTIATION & INNOVATION ====================
  {
    id: 'alsp-28',
    section: "Differentiation & Innovation",
    text: "What differentiates your ALSP offering from competitors?",
    fieldType: "textarea",
    priority: "normal",
    rows: 8,
    placeholder: "Describe your unique value proposition, competitive advantages, and key differentiators...",
    required: true,
    supportingDocs: false,
    helpText: "Help us understand what makes your service unique"
  },
  {
    id: 'alsp-29',
    section: "Differentiation & Innovation",
    text: "Can you describe any proprietary technology, process innovation, or automation that enhances your services?",
    fieldType: "textarea",
    priority: "normal",
    rows: 6,
    placeholder: "Describe proprietary tools, innovative processes, automation capabilities, or unique methodologies...",
    required: false,
    supportingDocs: true,
    helpText: "Share details about your proprietary technology or innovative approaches",
    supportingDocsLabel: "Optional: Product/innovation overview"
  },
  {
    id: 'alsp-30',
    section: "Differentiation & Innovation",
    text: "Can you share metrics demonstrating efficiency or cost savings for similar clients?",
    fieldType: "textarea",
    priority: "normal",
    rows: 5,
    placeholder: "Provide specific metrics: cost savings %, time reduction, efficiency gains, quality improvements...",
    required: false,
    supportingDocs: true,
    helpText: "Share quantifiable results and metrics from similar engagements",
    supportingDocsLabel: "Optional: Case study or data snapshot"
  },
  {
    id: 'alsp-31',
    section: "Differentiation & Innovation",
    text: "Do you have thought leadership or research publications you can share?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No"],
    conditionalText: "Yes",
    required: false,
    supportingDocs: true,
    helpText: "If yes, please upload or provide links to relevant publications",
    supportingDocsLabel: "Articles, whitepapers, or research publications"
  },
  {
    id: 'alsp-32',
    section: "Differentiation & Innovation",
    text: "Do you have a standard RFP or due diligence pack for client evaluations?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No"],
    conditionalText: "Yes",
    required: false,
    supportingDocs: true,
    helpText: "If yes, please upload your standard RFP response template or DDQ pack",
    supportingDocsLabel: "File upload: Overview or DDQ pack"
  },

  // ==================== CATCH-ALL ====================
  {
    id: 'alsp-33',
    section: "Catch-All",
    text: "Is there anything else you'd like us to know about your ALSP capabilities or operations?",
    fieldType: "textarea",
    priority: "normal",
    rows: 8,
    placeholder: "Share any additional information that would be valuable for our decision...",
    required: false,
    supportingDocs: true,
    helpText: "Use this space to share any additional information not covered above",
    supportingDocsLabel: "Optional: Additional supporting documents"
  }
]

// ==================== LEGAL SERVICES QUESTIONS ====================
// Questions for law firms and ALSPs
export const legalServicesQuestions = [
  // ==================== FIRM PROFILE ====================
  {
    id: 'legal-1',
    section: "Firm Profile",
    text: "What is your firm name and primary office location?",
    fieldType: "text",
    priority: "urgent",
    placeholder: "e.g., Smith & Associates LLP - New York, NY",
    required: true,
    supportingDocs: false,
    helpText: "Provide your firm's legal name and main office location"
  },
  {
    id: 'legal-2',
    section: "Firm Profile",
    text: "What type of legal service provider are you?",
    fieldType: "singleselect",
    priority: "urgent",
    options: [
      "Full-Service Law Firm",
      "Boutique Law Firm",
      "Alternative Legal Service Provider (ALSP)",
      "Solo Practitioner",
      "Legal Technology Provider with Legal Services",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select the category that best describes your firm"
  },
  {
    id: 'legal-3',
    section: "Firm Profile",
    text: "How many attorneys does your firm have?",
    fieldType: "dropdown",
    priority: "normal",
    options: [
      "Solo practitioner",
      "2-10 attorneys",
      "11-50 attorneys",
      "51-200 attorneys",
      "201-500 attorneys",
      "500+ attorneys"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Provide the current attorney headcount at your firm"
  },
  {
    id: 'legal-4',
    section: "Firm Profile",
    text: "In which jurisdictions is your firm licensed to practice?",
    fieldType: "multiselect",
    priority: "urgent",
    options: [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
      "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
      "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
      "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
      "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
      "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
      "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
      "Wisconsin", "Wyoming", "Federal Courts", "International"
    ],
    required: true,
    supportingDocs: true,
    helpText: "Select all jurisdictions where your firm's attorneys are admitted to practice",
    supportingDocsLabel: "Optional: Attorney bar admission documentation"
  },

  // ==================== PRACTICE AREAS & EXPERIENCE ====================
  {
    id: 'legal-5',
    section: "Practice Areas & Experience",
    text: "What are your firm's primary practice areas?",
    fieldType: "multiselect",
    priority: "urgent",
    options: [
      "Corporate Law",
      "Mergers & Acquisitions",
      "Intellectual Property",
      "Employment Law",
      "Litigation",
      "Real Estate",
      "Tax Law",
      "Securities Law",
      "Environmental Law",
      "Healthcare Law",
      "Technology & Privacy",
      "Banking & Finance",
      "Bankruptcy & Restructuring",
      "Antitrust & Competition",
      "International Law",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all practice areas your firm specializes in"
  },
  {
    id: 'legal-6',
    section: "Practice Areas & Experience",
    text: "How many years of experience does your firm have in the relevant practice area(s) for this RFP?",
    fieldType: "dropdown",
    priority: "urgent",
    options: [
      "Less than 2 years",
      "2-5 years",
      "6-10 years",
      "11-20 years",
      "20+ years"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Indicate your firm's experience level in the practice areas relevant to this RFP"
  },
  {
    id: 'legal-7',
    section: "Practice Areas & Experience",
    text: "Please provide 2-3 case studies or examples of similar matters your firm has handled.",
    fieldType: "textarea",
    priority: "urgent",
    rows: 10,
    placeholder: "Describe relevant cases, transactions, or matters (maintain client confidentiality as needed)...",
    required: true,
    supportingDocs: true,
    helpText: "Provide detailed examples demonstrating your firm's relevant experience",
    supportingDocsLabel: "Optional: Case study documents or work samples (redacted as appropriate)"
  },
  {
    id: 'legal-8',
    section: "Practice Areas & Experience",
    text: "Can you provide client references for similar work?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No", "Upon request"],
    conditionalText: "Yes",
    required: true,
    supportingDocs: true,
    helpText: "If yes, please provide contact information in the text field or upload reference list",
    supportingDocsLabel: "Client reference list"
  },

  // ==================== TEAM & CREDENTIALS ====================
  {
    id: 'legal-9',
    section: "Team & Credentials",
    text: "Who would be the lead attorney(s) on this matter?",
    fieldType: "textarea",
    priority: "urgent",
    rows: 6,
    placeholder: "Provide name(s), title(s), years of experience, and relevant qualifications...",
    required: true,
    supportingDocs: true,
    helpText: "Identify the primary attorney(s) who would work on this matter",
    supportingDocsLabel: "Attorney biographies or resumes"
  },
  {
    id: 'legal-10',
    section: "Team & Credentials",
    text: "What is the seniority level of attorneys who would work on this matter?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "Partner",
      "Senior Counsel",
      "Of Counsel",
      "Senior Associate",
      "Associate",
      "Junior Associate",
      "Paralegal"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all seniority levels that would be involved"
  },
  {
    id: 'legal-11',
    section: "Team & Credentials",
    text: "Does your firm have any specialized certifications or recognitions relevant to this matter?",
    fieldType: "textarea",
    priority: "normal",
    rows: 4,
    placeholder: "e.g., Board certifications, industry awards, rankings (Chambers, Legal 500), specialized training...",
    required: false,
    supportingDocs: true,
    helpText: "List any relevant certifications, awards, or recognitions",
    supportingDocsLabel: "Optional: Certificates or award documentation"
  },

  // ==================== APPROACH & METHODOLOGY ====================
  {
    id: 'legal-12',
    section: "Approach & Methodology",
    text: "Describe your proposed approach to this matter.",
    fieldType: "textarea",
    priority: "urgent",
    rows: 10,
    placeholder: "Outline your strategy, timeline, key milestones, and methodology...",
    required: true,
    supportingDocs: true,
    helpText: "Provide a detailed description of how you would approach this matter",
    supportingDocsLabel: "Optional: Proposed work plan or timeline"
  },
  {
    id: 'legal-13',
    section: "Approach & Methodology",
    text: "What is your estimated timeline for completion?",
    fieldType: "text",
    priority: "urgent",
    placeholder: "e.g., 3-6 months, or specific date range",
    required: true,
    supportingDocs: false,
    helpText: "Provide realistic timeline expectations for completing this matter"
  },
  {
    id: 'legal-14',
    section: "Approach & Methodology",
    text: "How do you plan to communicate and collaborate with our team?",
    fieldType: "textarea",
    priority: "normal",
    rows: 5,
    placeholder: "Describe communication frequency, reporting methods, collaboration tools, meeting cadence...",
    required: true,
    supportingDocs: false,
    helpText: "Explain your communication and project management approach"
  },

  // ==================== PRICING & BILLING ====================
  {
    id: 'legal-15',
    section: "Pricing & Billing",
    text: "What is your proposed fee structure for this matter?",
    fieldType: "singleselect",
    priority: "urgent",
    options: [
      "Hourly Rate",
      "Fixed Fee",
      "Contingency Fee",
      "Blended Hourly Rate",
      "Capped Fee",
      "Hybrid (combination of above)",
      "Other"
    ],
    conditionalText: "Other",
    required: true,
    supportingDocs: false,
    helpText: "Select your preferred fee structure and provide details in the text field if needed"
  },
  {
    id: 'legal-16',
    section: "Pricing & Billing",
    text: "Please provide detailed pricing information.",
    fieldType: "textarea",
    priority: "urgent",
    rows: 8,
    placeholder: "Include hourly rates by attorney level, fixed fee amounts, estimated total cost, any retainers required, etc.",
    required: true,
    supportingDocs: true,
    helpText: "Provide comprehensive pricing details including all anticipated costs",
    supportingDocsLabel: "Optional: Detailed fee schedule or estimate"
  },
  {
    id: 'legal-17',
    section: "Pricing & Billing",
    text: "What are your payment terms?",
    fieldType: "text",
    priority: "normal",
    placeholder: "e.g., Net 30, monthly billing, retainer arrangement...",
    required: true,
    supportingDocs: false,
    helpText: "Specify your standard payment terms and billing cycle"
  },
  {
    id: 'legal-18',
    section: "Pricing & Billing",
    text: "Are you open to alternative fee arrangements?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No", "Willing to discuss"],
    conditionalText: "Yes",
    required: true,
    supportingDocs: false,
    helpText: "If yes, please describe what alternative arrangements you would consider in the text field"
  },

  // ==================== COMPLIANCE & RISK ====================
  {
    id: 'legal-19',
    section: "Compliance & Risk Management",
    text: "Does your firm carry professional liability (malpractice) insurance?",
    fieldType: "singleselect",
    priority: "urgent",
    options: ["Yes", "No"],
    conditionalText: "Yes",
    required: true,
    supportingDocs: true,
    helpText: "If yes, please provide coverage amount and carrier information in the text field",
    supportingDocsLabel: "Certificate of insurance"
  },
  {
    id: 'legal-20',
    section: "Compliance & Risk Management",
    text: "Have you conducted a conflicts check for this matter?",
    fieldType: "singleselect",
    priority: "urgent",
    options: ["Yes, no conflicts", "Yes, conflicts identified (details below)", "Not yet conducted", "In progress"],
    conditionalText: "Yes, conflicts identified (details below)",
    required: true,
    supportingDocs: false,
    helpText: "If conflicts exist, please describe them and proposed management approach in the text field"
  },
  {
    id: 'legal-21',
    section: "Compliance & Risk Management",
    text: "Describe your firm's information security and data privacy practices.",
    fieldType: "textarea",
    priority: "urgent",
    rows: 6,
    placeholder: "Include details about data protection measures, confidentiality protocols, cybersecurity practices...",
    required: true,
    supportingDocs: true,
    helpText: "Explain how you protect client information and maintain confidentiality",
    supportingDocsLabel: "Optional: Security policies or certifications"
  },

  // ==================== TECHNOLOGY & COLLABORATION ====================
  {
    id: 'legal-22',
    section: "Technology & Collaboration",
    text: "What legal technology tools does your firm use?",
    fieldType: "multiselect",
    priority: "normal",
    options: [
      "Document Management Systems",
      "E-Discovery Software",
      "Legal Research Platforms",
      "Practice Management Software",
      "Contract Management Tools",
      "Litigation Analytics",
      "AI-Powered Legal Tools",
      "Secure Client Portals",
      "Other"
    ],
    required: true,
    supportingDocs: false,
    helpText: "Select all technology tools your firm utilizes"
  },
  {
    id: 'legal-23',
    section: "Technology & Collaboration",
    text: "Can you work with our preferred collaboration platforms and tools?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No", "Depends on the platform"],
    conditionalText: "Depends on the platform",
    required: true,
    supportingDocs: false,
    helpText: "If conditional, please specify which platforms you can and cannot support in the text field"
  },

  // ==================== DIVERSITY & INCLUSION ====================
  {
    id: 'legal-24',
    section: "Diversity & Inclusion",
    text: "Does your firm have a diversity and inclusion policy?",
    fieldType: "singleselect",
    priority: "normal",
    options: ["Yes", "No", "In development"],
    conditionalText: "Yes",
    required: false,
    supportingDocs: true,
    helpText: "If yes, please describe your diversity initiatives in the text field",
    supportingDocsLabel: "Optional: Diversity policy or statistics"
  },

  // ==================== ADDITIONAL INFORMATION ====================
  {
    id: 'legal-25',
    section: "Additional Information",
    text: "Is there anything else you'd like us to know about your firm or your proposal?",
    fieldType: "textarea",
    priority: "normal",
    rows: 8,
    placeholder: "Share any additional information that would be valuable for our decision...",
    required: false,
    supportingDocs: true,
    helpText: "Use this space to share any additional information not covered in the questions above",
    supportingDocsLabel: "Optional: Additional supporting documents"
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
