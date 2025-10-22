import { defaultRFPQuestions, legalServicesQuestions, alspQuestions } from './questionTemplates'

export const mockRFPs = [
  {
    id: 25,
    rfpType: "lawfirm",
    title: "Outside Counsel for Commercial SaaS Agreements (US/UK) — FY26",
    company: "Anonymous SaaS Company",
    budget: "$85,000 - $120,000",
    deadline: "2026-03-31T23:59:59.000Z",
    postedDate: "2025-10-22T10:00:00.000Z",
    status: "new",
    location: "United States / United Kingdom",
    description: "Standardize and negotiate commercial SaaS agreements (MSAs, DPAs, SOWs) during EMEA rollout; align playbooks, manage redlines, and second-chair escalations. Mix of US and UK law advice; occasional vendor paper.",

    // Legal Services Specific Fields
    companyOverview: "US/EU SaaS company (~1,200 employees); rapid EMEA expansion.",
    companySize: "1000-1500 employees",
    industry: "Technology & SaaS",

    practiceGroups: [
      "Commercial Contracts",
      "Technology Transactions",
      "Data Privacy (GDPR/CCPA)"
    ],
    experienceLevel: "5+ years",
    barLicenses: ["California", "New York", "England & Wales"],

    lawfirmTechStack: [681, 790, 934],
    lawfirmTechStackNames: ["Clio Manage", "DocuSign", "iManage Work"],

    pricingModel: "Fixed Fee / Capped Hourly",
    additionalBudgetInfo: "Phase 1 (playbook + templates) fixed fee; Phase 2 (negotiations) capped hourly. Excludes filing/translation fees.",

    // Bidders
    invitedVendors: [
      "Orrick, Herrington & Sutcliffe LLP",
      "Cooley LLP",
      "Wilson Sonsini Goodrich & Rosati",
      "Bird & Bird LLP",
      "Baker McKenzie"
    ],
    expandToNetwork: true,
    maxResponses: 8,

    // Project Timeline
    projectDateRange: "November 2025 - March 2026",

    // Demo/Requirements
    demoRequirements: "Demonstrate team composition, pricing structure, relevant case experience in B2B SaaS negotiations (US/UK), data security controls, and conflict check processes.",

    requirements: [
      "Experience with commercial SaaS agreements (MSAs, DPAs, SOWs)",
      "Expertise in US and UK law",
      "EMEA expansion experience",
      "Playbook development and contract standardization",
      "Data security and confidentiality controls including generative AI policies"
    ],

    deliverables: [
      "Contract playbooks and templates",
      "Negotiation support for commercial agreements",
      "Redline management",
      "Legal advisory on US and UK law matters",
      "Conflict check and turnaround SLA commitments"
    ],

    // Attachments
    attachments: {
      rfp_template_url: "file:law-firm-rfp-template.docx",
      supporting_docs: [
        "file:contracting-volumes-2024.xlsx",
        "file:outside-counsel-guidelines.pdf"
      ]
    },

    // Metadata
    notes: "Toggle Theorem Network to show panel + marketplace routing; emphasize fixed-fee + capped hourly hybrid.",

    questions: legalServicesQuestions
  },
  {
    id: 26,
    rfpType: "alsp",
    title: "ALSP for High-Volume Contract Review & Abstraction (Global) — FY26",
    company: "Anonymous Global SaaS Company",
    budget: "$85,000 - $120,000",
    deadline: "2026-10-31T23:59:59.000Z",
    postedDate: "2025-10-22T10:00:00.000Z",
    status: "new",
    location: "Global (AMER/EMEA/APAC)",
    description: "Playbook-driven review and abstraction of buy-side and sell-side agreements (NDAs, MSAs, order forms, DPAs), including metadata capture, routing, and QA reporting. Vendor to provide managed team, tooling, and process governance.",

    // ALSP Specific Fields
    companyOverview: "Global B2B SaaS (~1,800 employees); scaling procurement & sales ops across AMER/EMEA/APAC.",
    companySize: "1500-2000 employees",
    industry: "Software/SaaS",

    // Client Industry Experience
    clientIndustryExperience: [
      "Software/SaaS",
      "Financial Services (B2B)",
      "Telecommunications"
    ],

    // Jurisdictions & Languages
    jurisdictions: ["AMER", "EMEA", "APAC"],
    languages: ["English", "Spanish", "German", "Japanese"],

    // Practice Areas (from metadata)
    practiceGroups: [
      "Commercial Contracts",
      "Technology Transactions",
      "Data Privacy",
      "Corporate"
    ],

    // Volume Scale
    volumeScale: "High Volume Ongoing",
    volumeContext: "~12,000 agreements/year; 1,000/month average; peak seasonal spikes to 1,600/month",

    // Pricing
    pricingModel: "Monthly Managed Service Fee",
    additionalBudgetInfo: "Monthly managed service fee inclusive of PM, QA, reporting; unit-rate card for overflow and specialty languages; volume-based discounts after 1,200 docs/month.",

    // Bidders
    invitedVendors: [
      "UnitedLex",
      "Elevate",
      "Integreon",
      "QuisLex",
      "Consilio",
      "Morae"
    ],
    expandToNetwork: true,
    maxResponses: 8,

    // Project Timeline
    projectDateRange: "November 2025 - October 2026",

    // Requirements & Deliverables
    requirements: [
      "Playbook-driven contract review and abstraction",
      "Buy-side and sell-side agreement handling (NDAs, MSAs, order forms, DPAs)",
      "Metadata capture and routing",
      "QA reporting and accuracy tracking",
      "Multi-region coverage (AMER/EMEA/APAC)",
      "Multi-language support (English, Spanish, German, Japanese)",
      "High-volume capacity (~12,000 agreements/year)"
    ],

    deliverables: [
      "Managed team with regional/time zone coverage",
      "Playbook-driven review process",
      "Metadata extraction and abstraction",
      "QA methodology and reporting",
      "Technology stack integration (DMS/CLM)",
      "SLA commitments with escalation paths",
      "Data security and confidentiality controls",
      "Governance with KPIs and continuous improvement"
    ],

    demoRequirements: "Demonstrate staffing model, throughput assumptions, QA methodology, technology stack (intake/workflow/OCR/AI), SLAs, data security controls, and governance framework with KPIs.",

    // Attachments
    attachments: {
      rfp_template_url: "file:alsp-rfp-template.docx",
      supporting_docs: [
        "file:volume-by-month-fy24-fy25.csv",
        "file:playbook-v2-redlines.pdf",
        "file:metadata-schema.json"
      ]
    },

    // Metadata
    notes: "Demonstrate toggle to Theorem Network first, then add named ALSPs; highlight monthly managed service + unit-rate overflow and multilingual coverage.",

    questions: alspQuestions
  },
  {
    id: 27,
    rfpType: "lawfirm",
    title: "Interim Commercial/Privacy Counsel (US/UK) — 0.6 FTE for 6 Months",
    company: "Anonymous Global SaaS Company",
    budget: "$140 - $190/hour",
    deadline: "2026-04-30T23:59:59.000Z",
    postedDate: "2025-10-22T10:00:00.000Z",
    status: "new",
    location: "Remote (US/UK Coverage)",
    description: "Provide interim Commercial/Privacy counsel support for sales/procurement contracting, playbook-aligned redlines, and privacy reviews. Coverage needed across US East/West and UK time zones; collaborate with in-house Legal, Sales Ops, and Security.",

    // Flex Talent Specific Fields
    flexTalent: true, // Flag to indicate this is flex/interim counsel
    companyOverview: "Global B2B SaaS (~1,500 employees); accelerating EU/UK expansion.",
    companySize: "1000-1500 employees",
    industry: "Technology & SaaS",

    practiceGroups: [
      "Commercial Contracts",
      "Technology Transactions",
      "Data Privacy (GDPR/CCPA)"
    ],
    experienceLevel: "5+ years",
    barLicenses: ["California", "New York", "England & Wales"],

    lawfirmTechStack: [],
    lawfirmTechStackNames: [],

    // Flex Talent Pricing (hourly, not total)
    pricingModel: "Hourly Rate",
    hourlyRateRange: "$140 - $190/hour",
    fteRequirement: "0.6 FTE (24-28 hours/week)",
    duration: "6 months",
    additionalBudgetInfo: "Target 24–28 hrs/week (0.6 FTE) for 6 months; request blended rate inclusive of supervision/QA. Overtime pre-approval required.",

    // Flex Talent Providers
    invitedVendors: [
      "Axiom",
      "Paragon Legal",
      "Priori Legal",
      "Lawtrades",
      "Hire an Esquire"
    ],
    expandToNetwork: true,
    maxResponses: 7,

    // Project Timeline
    projectDateRange: "November 2025 - April 2026",

    // Time Zone Coverage
    timezones: ["US ET/PT", "UK"],
    coverageRequirement: "US East/West Coast and UK time zone coverage required",

    demoRequirements: "Submit 2-3 candidate profiles with relevant experience, confirm time zone coverage, describe supervision model, and provide conflict check timeline.",

    requirements: [
      "Interim/contract attorney with 5+ years experience",
      "Commercial contracts and privacy expertise",
      "GDPR/CCPA compliance knowledge",
      "US and UK time zone coverage (ET/PT and UK)",
      "Playbook-aligned contract review and redlining",
      "Sales/procurement contracting experience",
      "Collaboration with in-house Legal, Sales Ops, and Security teams"
    ],

    deliverables: [
      "Candidate profiles with bios and relevant matter summaries",
      "Time zone coverage plan (US ET/PT, UK)",
      "Supervision and QA model for flex talent",
      "Conflict check and onboarding timeline",
      "GDPR/DPA review expertise demonstration",
      "Client references for similar interim engagements"
    ],

    // Attachments
    attachments: {
      rfp_template_url: "file:flex-talent-intake-template.docx",
      supporting_docs: [
        "file:contracting-playbook-v3.pdf",
        "file:volume-forecast-q1-q2.csv",
        "file:security-access-matrix.xlsx"
      ]
    },

    // Metadata
    notes: "Show multiple flex-network toggles first, then add named providers; emphasize hours/week, rate band, and multi-time-zone coverage.",

    questions: legalServicesQuestions
  },
  {
    id: 28,
    rfpType: "legal-tech-replace",
    title: "CLM Replacement for Global Fintech – 2026 Renewal",
    company: "Anonymous Global Fintech",
    budget: "$85,000 - $150,000", // Estimated based on 150 users
    deadline: "2025-12-01T23:59:59.000Z",
    postedDate: "2025-10-22T10:00:00.000Z",
    status: "new",
    location: "North America & Europe",
    description: "We manage ~5,500 contracts/year (sales, procurement, NDAs). We need clause library/playbooks, workflow automation, and robust search/reporting for SOX audits. Current system struggles with Salesforce-initiated intake and large redline files.",

    // Legal Tech Replace Specific Fields
    companyOverview: "Global fintech (~2,100 employees); in-house legal supports sales, procurement, and compliance across NA/EU.",
    companySize: "2,000-3,000 employees",
    industry: "Financial Services",
    region: "North America & Europe",
    legalTeamSize: "32 FTE",

    // Incumbent/Replacement Context
    replacing: "ContractWorks (Onit)",
    currentSolution: "ContractWorks",
    currentVendor: "Onit",
    currentVersion: "2022.x",
    replacingReason: "Feature gaps, support quality, pricing concerns",
    replacementStatus: "Intend to leave (not yet cancelled)",

    // Replacement Drivers
    replacementDrivers: ["features", "support", "price"],

    // Pain Points
    painPoints: [
      "No native Salesforce intake; manual reentry creates delays",
      "Search precision is poor; difficult to find executed agreements",
      "Playbook and clause management are limited",
      "Support response times exceed 2 business days"
    ],

    // Purchase Context
    purchaseFactors: ["features", "support", "price"],
    purchaseStatus: "Budget Allocated",

    // Contract Volume & Users
    contractVolume: "~5,500 contracts/year",
    userSeats: 150,
    requiredLicenses: 150,

    // Core Requirements (Must-Have Features)
    coreRequirements: [
      "Clause library with approvals",
      "Playbooks & guidance during review",
      "Advanced search (OCR + metadata)",
      "Salesforce-initiated intake & status sync",
      "Bulk import & migration utilities"
    ],

    // Nice-to-Have Features
    niceToHaveFeatures: [
      "Vendor portal/external collaboration",
      "AI extraction for legacy contracts"
    ],

    requirements: [
      "Clause library with approval workflows",
      "Playbook guidance during contract review",
      "Advanced search with OCR and metadata filtering",
      "Native Salesforce intake and 2-way status sync",
      "Bulk import and migration utilities for ~25k legacy contracts",
      "Vendor portal for external collaboration",
      "AI-powered extraction for legacy contract data",
      "SOX audit reporting capabilities"
    ],

    deliverables: [
      "Salesforce intake and status sync architecture",
      "Migration plan for ~25k legacy contracts with timeline",
      "Search capabilities demonstration (OCR, filters, semantic options)",
      "Playbook/clause maintenance effort estimates",
      "Support SLAs (response/resolve times) and escalation paths",
      "Implementation timeline and training plan"
    ],

    // Tech Stack & Integrations
    techStack: [
      { name: "Okta SSO", category: "Identity", status: "Active" },
      { name: "SCIM (User Provisioning)", category: "Identity", status: "Active" },
      { name: "Salesforce", category: "CRM", status: "Active" },
      { name: "DocuSign", category: "eSignature", status: "Active" },
      { name: "NetSuite", category: "ERP", status: "Active" },
      { name: "Google Drive", category: "Storage", status: "Active" },
      { name: "Slack", category: "Communication", status: "Active" }
    ],
    techStackIntegration: "Must integrate with Salesforce for intake/status sync, DocuSign for signatures, NetSuite for financial data, and support SSO via Okta.",

    // Invited Vendors
    invitedVendors: [
      "Ironclad",
      "Agiloft",
      "Icertis",
      "Evisort",
      "LinkSquares",
      "Sirion"
    ],
    maxResponses: 5,

    // Timeline
    signTimeline: "90 days",
    desiredStartDate: "2026-02-01",
    targetDecisionDate: "2025-12-01",
    projectDateRange: "December 2025 - February 2026",

    // Business Terms
    contractTerm: "Multi-year",
    contractTermDetails: "36 months preferred",
    billingInterval: "Annual",
    paymentTerms: "Net 30",

    // Demo Requirements
    demoRequirements: "Demonstrate Salesforce intake architecture, migration approach for 25k contracts, search capabilities with benchmarks, playbook maintenance workflow, and support SLA structure.",
    demoStrategy: [
      "Show native Salesforce integration with 2-way status sync",
      "Demo advanced search with OCR and semantic options",
      "Present migration plan and timeline for legacy contracts",
      "Demonstrate clause library and playbook management",
      "Outline support SLAs and escalation procedures"
    ],

    // Attachments
    attachments: {
      rfp_template_url: null,
      supporting_docs: [
        "file:business-case-v1.pdf",
        "file:current-process-map.png"
      ]
    },

    // Metadata
    notes: "Use to show replacement storyline: feature gaps, support expectations, and tighter SFDC integration. Emphasize migration volume and timeline.",

    questions: defaultRFPQuestions
  },
  {
    id: 29,
    rfpType: "legal-tech-new",
    title: "Corporate Legal DMS – New Purchase FY26",
    company: "Anonymous US MedTech Company",
    budget: "$75,000 - $120,000", // Estimated based on 120 users
    deadline: "2025-11-30T23:59:59.000Z",
    postedDate: "2025-10-22T10:00:00.000Z",
    status: "new",
    location: "North America & Europe",
    description: "We need a centralized document repository for matters and contracts with strong search, email filing from Outlook, and ethical walls. Today content is spread across shared drives and SharePoint sites, which creates versioning issues and audit risk.",

    // Legal Tech New Purchase Specific Fields
    companyOverview: "US medtech (~1,400 employees); Legal supports R&D/IP, commercial, and compliance across NA/EU.",
    companySize: "1,000-1,500 employees",
    industry: "Medical Devices",
    region: "North America & Europe",
    legalTeamSize: "24 FTE",

    // New Purchase Context (not replacing)
    solutionType: "Document Management System (DMS)",
    solutionCategory: "DMS",
    buyingStage: "Evaluating Solutions",

    // Pain Points (current state issues)
    painPoints: [
      "Scattered repositories (drives/SharePoint) lead to duplicate and outdated files",
      "Limited search; no consistent metadata or OCR",
      "Email filing is manual and inconsistent",
      "Access controls and ethical walls are difficult to manage"
    ],

    // Purchase Context
    purchaseFactors: ["features", "support", "price"],
    purchaseStatus: "Budget Allocated",

    // User & Volume
    userSeats: 120,
    requiredLicenses: 120,

    // Core Requirements (Must-Have Features)
    coreRequirements: [
      "Matter workspaces & metadata profiles",
      "Advanced search with OCR and facets",
      "Outlook add-in for email filing",
      "Version control & compare",
      "Ethical walls and granular permissions"
    ],

    // Nice-to-Have Features
    niceToHaveFeatures: [
      "External sharing with audit trail",
      "Retention policies & legal hold",
      "Mobile access with offline sync"
    ],

    requirements: [
      "Matter-centric workspaces with customizable metadata profiles",
      "Advanced search with OCR, facets, and full-text indexing",
      "Native Outlook add-in for seamless email filing",
      "Comprehensive version control with document comparison",
      "Ethical walls and granular permission controls",
      "External sharing capabilities with full audit trail",
      "Retention policies and legal hold functionality",
      "Mobile access with offline document sync",
      "Migration support from shared drives and SharePoint"
    ],

    deliverables: [
      "Outlook email filing add-in demonstration and setup guide",
      "Search/OCR capabilities overview with PDF/scan indexing",
      "Ethical walls and permissioning architecture explanation",
      "Migration plan from shared drives/SharePoint with timeline",
      "Support SLAs (response/resolution times) and escalation paths",
      "Implementation timeline and training plan"
    ],

    // Tech Stack & Integrations
    techStack: [
      { name: "Okta SSO", category: "Identity", status: "Active" },
      { name: "SCIM (User Provisioning)", category: "Identity", status: "Active" },
      { name: "Microsoft 365", category: "Productivity", status: "Active" },
      { name: "DocuSign", category: "eSignature", status: "Active" },
      { name: "Adobe Acrobat/Sign", category: "Document Tools", status: "Active" },
      { name: "Slack", category: "Communication", status: "Active" }
    ],
    techStackIntegration: "Must integrate with Microsoft 365 (Outlook add-in, Word), DocuSign for signatures, Adobe for PDF workflows, and support SSO via Okta.",

    // Invited Vendors
    invitedVendors: [
      "NetDocuments",
      "iManage",
      "OpenText eDOCS",
      "Egnyte",
      "ShareFile"
    ],
    maxResponses: 5,

    // Timeline
    signTimeline: "90 days",
    desiredStartDate: "2026-01-15",
    targetDecisionDate: "2025-11-30",
    projectDateRange: "November 2025 - January 2026",

    // Business Terms
    contractTerm: "Multi-year",
    contractTermDetails: "36 months preferred",
    billingInterval: "Annual",
    paymentTerms: "Net 30",

    // Demo Requirements
    demoRequirements: "Demonstrate Outlook email filing add-in, search/OCR capabilities on PDFs and scanned documents, ethical walls and permissioning architecture, and migration approach from shared drives/SharePoint.",
    demoStrategy: [
      "Show Outlook add-in email filing workflow and server-side capture options",
      "Demo advanced search with OCR, facets, and full-text indexing",
      "Present ethical walls implementation at workspace/folder/document levels",
      "Outline migration strategy from shared drives and SharePoint",
      "Review support SLAs and typical response/resolution times"
    ],

    // Attachments
    attachments: {
      rfp_template_url: null,
      supporting_docs: [
        "file:current-repo-inventory.xlsx",
        "file:security-baseline.pdf"
      ]
    },

    // Metadata
    notes: "Use to showcase new-purchase flow focused on DMS search, email filing, and ethical walls; emphasize migration and support SLAs.",

    questions: defaultRFPQuestions
  },
  /*{
    id: 1,
    rfpType: "legal-tech-replace",
    title: "E-commerce Website Redesign",
    company: "TechStyle Inc.",
    budget: "$75,000 - $100,000",
    deadline: "2025-10-09T23:59:59.000Z",
    postedDate: "2025-09-25T09:00:00.000Z",
    status: "new",
    location: "Remote",
    description: "We are seeking a skilled development team to redesign our e-commerce platform. The project involves modernizing our current website with improved user experience, mobile responsiveness, and enhanced performance. We need a scalable solution that can handle high traffic volumes during peak shopping seasons.",
    // Legal Tech Specific Fields
    companyOverview: "TechStyle Inc. is a fast-growing fashion and apparel retail company with over 250 employees and $45M in annual revenue. Operating across North America and the UK, we're a private company focused on delivering exceptional online shopping experiences to our customers.",
    solutionCategory: "E-commerce Platform",
    topConsideration: "Performance and scalability during high-traffic periods, with seamless integration to existing CRM and payment systems",
    buyingStage: "Evaluating Solutions",
    requirements: [
      "Experience with React and Node.js",
      "E-commerce platform expertise (Shopify, WooCommerce, or custom)",
      "Mobile-first responsive design",
      "Payment gateway integration",
      "SEO optimization",
      "Performance optimization for high traffic"
    ],
    deliverables: [
      "Complete website redesign",
      "Mobile-responsive layout",
      "Payment system integration",
      "Admin dashboard",
      "Documentation and training",
      "3 months post-launch support"
    ],
    // RFP Snapshot
    replacing: "Legacy Magento Platform",
    decisionTimeline: "60 Days",
    maxResponses: "5 vendors",
    userSeats: "12 admin users",
    // Quick Stats
    requiredLicenses: 12,
    daysToDecision: 60,
    maxVendors: 5,
    billingFrequency: "Annual",
    // Current Solution & Replacement Context
    currentSolution: "Magento 1.x",
    replacingReason: "Platform End-of-Life, Performance Issues",
    replacementStatus: "Committed to replacement",
    competitiveRisk: "Exploring multiple modern platforms. Must demonstrate superior performance, ease of use, and cost-effectiveness compared to Shopify Plus and BigCommerce Enterprise.",
    // Core Requirements
    coreRequirements: [
      "Product Catalog Management",
      "Shopping Cart & Checkout",
      "Payment Processing",
      "Order Management",
      "Customer Account Management",
      "Inventory Management"
    ],
    // Demo Requirements
    demoRequirements: "Live demonstration of product catalog management, shopping cart flows, mobile responsiveness, and admin dashboard capabilities",
    demoStrategy: [
      "Showcase mobile-first responsive design with live device testing",
      "Demonstrate checkout flow optimization (addressing slow performance issues)",
      "Highlight advanced product filtering and search capabilities",
      "Show real-time inventory management and order processing"
    ],
    // Contract & Payment Terms
    contractTerm: "Multi-year",
    contractTermDetails: "3-year commitment with option to extend",
    billingInterval: "Annual",
    billingIntervalDetails: "Upfront yearly payment with 10% discount",
    paymentTerms: "Net 30",
    paymentTermsDetails: "30 days from invoice",
    userLicenses: "12 seats",
    userLicensesDetails: "Admin and content manager access",
    // Company Overview
    industry: "Fashion & Apparel Retail",
    headquarters: "Los Angeles, CA",
    companySize: "250+ employees",
    revenue: "$45M (2024)",
    publicPrivate: "Private",
    geographicPresence: "North America, UK",
    // Department Profile
    departmentStructure: "12 active system users across e-commerce operations, marketing, and customer service teams managing the online storefront.",
    technologyNeeds: "Need modern, scalable e-commerce platform to support growing online sales and seasonal traffic spikes. Current platform struggles during Black Friday and holiday sales.",
    painPoints: "Magento 1.x is end-of-life with security concerns. Platform performance degrades during high traffic, affecting conversion rates. Team struggles with outdated admin interface and limited mobile optimization.",
    // Current Tech Stack
    techStack: [
      {
        name: "Magento 1.x",
        category: "E-commerce Platform",
        year: "2016",
        status: "Replacing"
      },
      {
        name: "Stripe",
        category: "Payment Processing",
        status: "Active"
      },
      {
        name: "Salesforce",
        category: "CRM & Marketing",
        status: "Active"
      },
      {
        name: "Google Analytics",
        category: "Analytics",
        status: "Active"
      }
    ],
    techStackIntegration: "Must integrate seamlessly with Stripe for payments, Salesforce for customer data sync, and Google Analytics for tracking.",
    // Key Stakeholders
    stakeholders: [
      {
        name: "Sarah Johnson",
        title: "Chief Technology Officer",
        role: "Decision Maker",
        email: "sjohnson@techstyle.com",
        linkedin: "linkedin.com/in/sarahjohnson"
      },
      {
        name: "Michael Chen",
        title: "Director of E-commerce",
        role: "Primary Contact",
        email: "mchen@techstyle.com",
        phone: "(310) 555-0198"
      },
      {
        name: "Emily Rodriguez",
        title: "VP of Marketing",
        role: "Influencer",
        email: "erodriguez@techstyle.com"
      },
      {
        name: "James Wilson",
        title: "Head of IT Security",
        role: "Gatekeeper",
        email: "jwilson@techstyle.com"
      }
    ],
    // Competitive Intelligence
    incumbentRisk: [
      "Magento 1.x is end-of-life (EOL since June 2020)",
      "Status: Must replace due to security and compliance",
      "No renewal option - committed to migration"
    ],
    expectedCompetitors: [
      "Shopify Plus",
      "BigCommerce Enterprise",
      "Adobe Commerce (Magento 2)",
      "Max 5 responses allowed"
    ],
    ourAdvantages: [
      "Custom React-based solution vs templated platforms",
      "Superior performance optimization",
      "Flexible, headless architecture",
      "Dedicated development support"
    ],
    // Budget Intelligence
    estimatedAnnualValue: "$85K - $110K",
    estimatedAnnualDetails: "12 seats × $7,000-$9,000/seat + hosting",
    contractValue: "$255K - $330K",
    contractValueDetails: "3-year term",
    // Decision Timeline
    decisionMilestones: [
      {
        name: "RFP Issued",
        date: "Oct 1, 2024",
        status: "completed"
      },
      {
        name: "Demos & Presentations",
        date: "Oct 20-30 (Est.)",
        status: "upcoming"
      },
      {
        name: "Final Decision",
        date: "Nov 30, 2024 (Est.)",
        status: "upcoming"
      }
    ],
    // Relationship History
    relationshipHistory: [
      {
        event: "Trade Show Meeting",
        description: "Met at Shopify Unite 2024, discussed e-commerce challenges"
      },
      {
        event: "Product Demo",
        description: "Aug 2024 - General platform capabilities demo"
      },
      {
        event: "Webinar Attendee",
        description: "Sept 2024 - Headless commerce webinar"
      }
    ],
    // RFP Questions
    questions: defaultRFPQuestions
  },
  {
    id: 2,
    rfpType: "legal-tech-new",
    title: "Mobile App Development - FinTech Startup",
    company: "FinanceFlow Solutions",
    budget: "$50,000 - $75,000",
    deadline: "2025-09-28T23:59:59.000Z",
    postedDate: "2025-09-10T14:30:00.000Z",
    status: "reviewed",
    location: "Hybrid - San Francisco",
    description: "Looking for an experienced mobile development team to build a fintech mobile application. The app will provide personal finance management tools, budgeting features, and investment tracking. Security and compliance with financial regulations are paramount.",
    companyOverview: "FinanceFlow Solutions is a fintech startup revolutionizing personal finance management through innovative mobile technology.",
    solutionCategory: "Mobile Application Development",
    topConsideration: "Security, compliance with financial regulations, and seamless user experience",
    buyingStage: "Ready to Purchase",
    requirements: [
      "React Native or Flutter expertise",
      "Financial services compliance knowledge",
      "Strong security implementation",
      "API integration experience",
      "App store deployment experience",
      "Biometric authentication implementation"
    ],
    deliverables: [
      "iOS and Android native apps",
      "Backend API development",
      "Security audit and compliance documentation",
      "App store submission",
      "User onboarding flow",
      "6 months maintenance and updates"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 3,
    rfpType: "legal-tech-new",
    title: "Healthcare Management System",
    company: "MedTech Innovations",
    budget: "$100,000 - $150,000",
    deadline: "2025-11-20T23:59:59.000Z",
    postedDate: "2025-10-01T11:15:00.000Z",
    status: "new",
    location: "On-site - Boston",
    description: "Development of a comprehensive healthcare management system for a mid-sized medical practice. The system needs to handle patient records, appointment scheduling, billing, and compliance with HIPAA regulations. Integration with existing medical equipment and third-party services is required.",
    requirements: [
      "HIPAA compliance expertise",
      "Healthcare industry experience",
      "Database design and management",
      "Integration with medical devices",
      "Electronic Health Records (EHR) systems",
      "Audit trail and security logging"
    ],
    deliverables: [
      "Complete healthcare management platform",
      "Patient portal",
      "Staff management interface",
      "Billing and insurance integration",
      "HIPAA compliance documentation",
      "Staff training and ongoing support"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 4,
    rfpType: "legal-tech-replace",
    title: "AI-Powered Analytics Dashboard",
    company: "DataVision Analytics",
    budget: "$60,000 - $90,000",
    deadline: "2025-10-25T23:59:59.000Z",
    postedDate: "2025-09-30T16:45:00.000Z",
    status: "reviewed",
    location: "Remote",
    description: "We need a sophisticated analytics dashboard that leverages AI and machine learning to provide predictive insights for our clients. The dashboard should handle large datasets, provide real-time visualizations, and offer customizable reporting features.",
    requirements: [
      "Machine learning and AI expertise",
      "Data visualization libraries (D3.js, Chart.js)",
      "Big data processing capabilities",
      "Real-time data streaming",
      "Python/R integration for ML models",
      "Cloud platform experience (AWS, Azure, GCP)"
    ],
    deliverables: [
      "Interactive analytics dashboard",
      "AI/ML model integration",
      "Real-time data processing pipeline",
      "Custom reporting engine",
      "API documentation",
      "Performance optimization and scaling plan"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 5,
    rfpType: "legal-tech-new",
    title: "Educational Platform Development",
    company: "EduTech Solutions",
    budget: "$40,000 - $65,000",
    deadline: "2026-01-15T23:59:59.000Z",
    postedDate: "2025-10-02T10:20:00.000Z",
    status: "new",
    location: "Hybrid - Austin",
    description: "Build a comprehensive online learning platform for K-12 education. The platform should support video lectures, interactive assignments, progress tracking, and communication tools for students, teachers, and parents. Accessibility and scalability are key requirements.",
    requirements: [
      "Educational technology experience",
      "Video streaming and content delivery",
      "Accessibility compliance (WCAG 2.1)",
      "Learning Management System (LMS) expertise",
      "Parent-teacher communication features",
      "Progress tracking and analytics"
    ],
    deliverables: [
      "Complete learning management system",
      "Student and teacher portals",
      "Parent dashboard",
      "Content management system",
      "Mobile-responsive design",
      "Teacher training and documentation"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 6,
    rfpType: "lawfirm",
    title: "Real Estate Management Platform",
    company: "PropertyTech Pro",
    budget: "$80,000 - $120,000",
    deadline: "2025-10-07T23:59:59.000Z",
    postedDate: "2025-10-18T13:45:00.000Z",
    status: "reviewed",
    location: "Hybrid - Denver",
    description: "Develop a comprehensive property management platform for real estate agencies. The system should handle property listings, client management, transaction tracking, and document management. Integration with MLS systems and virtual tour capabilities are essential.",
    companySize: "50-100 employees",
    industry: "Real Estate & Property Management",
    lawfirmTechStack: [5061, 790, 2647],
    lawfirmTechStackNames: ["Salesforce Sales Cloud", "DocuSign", "SAP Ariba"],
    requirements: [
      "Real estate industry experience",
      "MLS integration expertise",
      "Document management systems",
      "Virtual tour integration",
      "CRM functionality",
      "Financial reporting and analytics"
    ],
    deliverables: [
      "Property management platform",
      "Agent and client portals",
      "MLS integration",
      "Document management system",
      "Virtual tour capabilities",
      "Training and support documentation"
    ],
    questions: legalServicesQuestions
  },
  {
    id: 7,
    rfpType: "legal-tech-new",
    title: "Inventory Management System for Retail",
    company: "RetailFlow Technologies",
    budget: "$35,000 - $50,000",
    deadline: "2025-09-25T23:59:59.000Z",
    postedDate: "2025-09-08T08:30:00.000Z",
    status: "new",
    location: "Remote",
    description: "Create an advanced inventory management system for multi-location retail operations. The system needs real-time tracking, automated reordering, supplier management, and comprehensive reporting capabilities. POS system integration is required.",
    requirements: [
      "Retail industry experience",
      "POS system integration",
      "Barcode/RFID scanning support",
      "Multi-location inventory tracking",
      "Supplier management",
      "Automated reordering algorithms"
    ],
    deliverables: [
      "Complete inventory management system",
      "POS integration",
      "Mobile scanning application",
      "Supplier portal",
      "Reporting dashboard",
      "System migration and training"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 8,
    rfpType: "alsp",
    title: "Social Media Marketing Automation Tool",
    company: "SocialBoost Digital",
    budget: "$45,000 - $70,000",
    deadline: "2025-10-18T23:59:59.000Z",
    postedDate: "2025-10-19T12:00:00.000Z",
    status: "reviewed",
    location: "Remote",
    description: "Build a comprehensive social media management and automation platform. The tool should support scheduling, content creation, analytics, and engagement tracking across multiple social media platforms. AI-powered content suggestions are a plus.",
    requirements: [
      "Social media API integration (Facebook, Twitter, Instagram, LinkedIn)",
      "Content scheduling and automation",
      "Analytics and reporting",
      "AI/ML for content recommendations",
      "Team collaboration features",
      "White-label capabilities"
    ],
    deliverables: [
      "Social media management platform",
      "Multi-platform posting capabilities",
      "Analytics dashboard",
      "Content calendar",
      "Team collaboration tools",
      "API documentation and training"
    ],
    questions: alspQuestions
  },
  {
    id: 9,
    rfpType: "legal-tech-new",
    title: "Fleet Management Solution",
    company: "TransportTech Solutions",
    budget: "$90,000 - $130,000",
    deadline: "2025-12-31T23:59:59.000Z",
    postedDate: "2025-09-22T15:20:00.000Z",
    status: "new",
    location: "On-site - Chicago",
    description: "Develop a comprehensive fleet management system for transportation companies. The platform should include GPS tracking, route optimization, maintenance scheduling, fuel management, and driver performance monitoring. Integration with telematics devices is essential.",
    requirements: [
      "GPS and telematics integration",
      "Route optimization algorithms",
      "Maintenance scheduling systems",
      "Fuel management and reporting",
      "Driver performance analytics",
      "Compliance and safety reporting"
    ],
    deliverables: [
      "Complete fleet management platform",
      "GPS tracking integration",
      "Mobile driver application",
      "Maintenance management module",
      "Reporting and analytics dashboard",
      "Hardware installation and training"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 10,
    rfpType: "lawfirm",
    title: "Customer Support Ticketing System",
    company: "SupportFlow Inc.",
    budget: "$30,000 - $45,000",
    deadline: "2025-11-10T23:59:59.000Z",
    postedDate: "2025-10-20T09:15:00.000Z",
    status: "reviewed",
    location: "Remote",
    description: "Create a modern customer support ticketing system with automation features. The system should handle multi-channel support (email, chat, phone), automatic ticket routing, SLA management, and customer satisfaction tracking. Integration with existing CRM is required.",
    companySize: "100-200 employees",
    industry: "Technology & SaaS",
    lawfirmTechStack: [774, 773, 712],
    lawfirmTechStackNames: ["Microsoft Office 365", "Microsoft Teams", "Brightflag"],
    requirements: [
      "Multi-channel support integration",
      "Automatic ticket routing and prioritization",
      "SLA management and alerts",
      "Knowledge base integration",
      "Customer satisfaction surveys",
      "CRM system integration"
    ],
    deliverables: [
      "Complete ticketing system",
      "Multi-channel integration",
      "Agent dashboard",
      "Customer portal",
      "Knowledge base system",
      "Analytics and reporting tools"
    ],
    questions: legalServicesQuestions
  },
  {
    id: 11,
    rfpType: "legal-tech-new",
    title: "Restaurant Management Platform",
    company: "FoodTech Innovations",
    budget: "$55,000 - $80,000",
    deadline: "2025-10-05T23:59:59.000Z",
    postedDate: "2025-09-18T11:30:00.000Z",
    status: "new",
    location: "Hybrid - Miami",
    description: "Build a comprehensive restaurant management system including POS, inventory, staff scheduling, and online ordering. The platform should support multiple locations and integrate with popular delivery services. Real-time analytics and reporting are crucial.",
    requirements: [
      "Restaurant industry experience",
      "POS system development",
      "Online ordering and delivery integration",
      "Staff scheduling and payroll",
      "Inventory and menu management",
      "Multi-location support"
    ],
    deliverables: [
      "Complete restaurant management platform",
      "POS system",
      "Online ordering platform",
      "Staff management module",
      "Inventory tracking system",
      "Analytics dashboard and training"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 12,
    rfpType: "alsp",
    title: "Construction Project Management Tool",
    company: "BuildTech Solutions",
    budget: "$70,000 - $100,000",
    deadline: "2026-01-31T23:59:59.000Z",
    postedDate: "2025-10-17T14:45:00.000Z",
    status: "reviewed",
    location: "On-site - Phoenix",
    description: "Develop a project management platform specifically for construction companies. The system should handle project planning, resource allocation, progress tracking, budget management, and compliance documentation. Mobile access for field workers is essential.",
    requirements: [
      "Construction industry experience",
      "Project planning and scheduling (Gantt charts)",
      "Resource and equipment management",
      "Budget tracking and cost control",
      "Compliance and safety documentation",
      "Mobile field application"
    ],
    deliverables: [
      "Project management platform",
      "Mobile field application",
      "Resource planning tools",
      "Budget management system",
      "Compliance tracking module",
      "Training and implementation support"
    ],
    questions: alspQuestions
  },
  {
    id: 13,
    rfpType: "legal-tech-new",
    title: "Event Management Platform",
    company: "EventFlow Technologies",
    budget: "$40,000 - $60,000",
    deadline: "2025-09-20T23:59:59.000Z",
    postedDate: "2025-09-05T16:00:00.000Z",
    status: "new",
    location: "Remote",
    description: "Create a comprehensive event management platform for corporate and social events. The system should handle event planning, attendee registration, ticketing, venue management, and post-event analytics. Integration with payment gateways and marketing tools is required.",
    requirements: [
      "Event management experience",
      "Registration and ticketing systems",
      "Payment gateway integration",
      "Venue and vendor management",
      "Email marketing integration",
      "Event analytics and reporting"
    ],
    deliverables: [
      "Complete event management platform",
      "Registration and ticketing system",
      "Venue management tools",
      "Payment processing integration",
      "Marketing automation features",
      "Analytics dashboard and support"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 14,
    rfpType: "lawfirm",
    title: "Legal Practice Management Software",
    company: "LegalTech Innovations",
    budget: "$85,000 - $125,000",
    deadline: "2025-12-15T23:59:59.000Z",
    postedDate: "2025-10-16T10:45:00.000Z",
    status: "reviewed",
    location: "Hybrid - New York",
    description: "Build a comprehensive practice management system for law firms. The platform should include case management, document automation, time tracking, billing, client communication, and calendar management. Compliance with legal industry standards is mandatory.",
    companySize: "25-50 attorneys",
    industry: "Legal Services",
    lawfirmTechStack: [775, 746, 1302, 680],
    lawfirmTechStackNames: ["Microsoft Outlook", "Ironclad", "Adobe Sign", "LexisNexis"],
    requirements: [
      "Legal industry experience",
      "Case and matter management",
      "Document automation and templates",
      "Time tracking and billing",
      "Client portal and communication",
      "Compliance and security standards"
    ],
    deliverables: [
      "Complete practice management system",
      "Case management module",
      "Document automation tools",
      "Time and billing system",
      "Client portal",
      "Security audit and training"
    ],
    questions: legalServicesQuestions
  },
  {
    id: 15,
    rfpType: "legal-tech-new",
    title: "Fitness Center Management System",
    company: "FitTech Solutions",
    budget: "$35,000 - $55,000",
    deadline: "2025-09-30T23:59:59.000Z",
    postedDate: "2025-09-15T08:00:00.000Z",
    status: "new",
    location: "Remote",
    description: "Develop a gym and fitness center management platform. The system should handle member management, class scheduling, equipment tracking, payment processing, and fitness tracking integration. Mobile app for members is required.",
    requirements: [
      "Fitness industry experience",
      "Member management and check-in",
      "Class scheduling and booking",
      "Payment and membership billing",
      "Equipment maintenance tracking",
      "Fitness tracker integration"
    ],
    deliverables: [
      "Gym management platform",
      "Member mobile application",
      "Class booking system",
      "Payment processing integration",
      "Equipment tracking module",
      "Member analytics and reporting"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 16,
    rfpType: "alsp",
    title: "Supply Chain Optimization Platform",
    company: "LogisticsPro Systems",
    budget: "$120,000 - $180,000",
    deadline: "2026-02-28T23:59:59.000Z",
    postedDate: "2025-10-15T13:30:00.000Z",
    status: "reviewed",
    location: "Hybrid - Seattle",
    description: "Create an advanced supply chain management platform with AI-powered optimization. The system should handle procurement, supplier management, demand forecasting, inventory optimization, and logistics coordination. Integration with ERP systems is essential.",
    requirements: [
      "Supply chain and logistics experience",
      "AI/ML for demand forecasting",
      "Supplier relationship management",
      "Inventory optimization algorithms",
      "ERP system integration",
      "Real-time tracking and visibility"
    ],
    deliverables: [
      "Supply chain management platform",
      "AI-powered forecasting engine",
      "Supplier portal",
      "Inventory optimization tools",
      "ERP integration modules",
      "Training and implementation support"
    ],
    questions: alspQuestions
  },
  {
    id: 17,
    rfpType: "legal-tech-new",
    title: "HR Management and Payroll System",
    company: "HRTech Innovations",
    budget: "$65,000 - $95,000",
    deadline: "2025-11-25T23:59:59.000Z",
    postedDate: "2025-10-01T15:15:00.000Z",
    status: "new",
    location: "Remote",
    description: "Build a comprehensive HR management system with integrated payroll processing. The platform should handle employee onboarding, performance management, benefits administration, time tracking, and compliance reporting. Self-service employee portal is required.",
    requirements: [
      "HR and payroll expertise",
      "Employee lifecycle management",
      "Performance review systems",
      "Benefits administration",
      "Compliance and reporting",
      "Time and attendance tracking"
    ],
    deliverables: [
      "Complete HR management platform",
      "Payroll processing system",
      "Employee self-service portal",
      "Performance management module",
      "Benefits administration tools",
      "Compliance reporting and training"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 18,
    rfpType: "lawfirm",
    title: "Insurance Claims Processing System",
    company: "InsurTech Solutions",
    budget: "$95,000 - $140,000",
    deadline: "2026-01-10T23:59:59.000Z",
    postedDate: "2025-10-14T09:45:00.000Z",
    status: "reviewed",
    location: "On-site - Hartford",
    description: "Develop an automated insurance claims processing platform with AI-powered fraud detection. The system should handle claim intake, processing workflows, adjuster assignment, and settlement processing. Integration with existing policy management systems is required.",
    companySize: "500+ employees",
    industry: "Insurance",
    lawfirmTechStack: [829, 11000],
    lawfirmTechStackNames: ["Counsel Link", "Harvey"],
    requirements: [
      "Insurance industry experience",
      "Claims processing workflows",
      "AI/ML for fraud detection",
      "Document processing and OCR",
      "Policy system integration",
      "Regulatory compliance"
    ],
    deliverables: [
      "Claims processing platform",
      "Fraud detection engine",
      "Adjuster workflow tools",
      "Customer claims portal",
      "Policy system integration",
      "Compliance documentation and training"
    ],
    questions: legalServicesQuestions
  },
  {
    id: 19,
    rfpType: "legal-tech-new",
    title: "Manufacturing Execution System",
    company: "IndustryTech Corp",
    budget: "$110,000 - $160,000",
    deadline: "2026-03-15T23:59:59.000Z",
    postedDate: "2025-09-19T12:20:00.000Z",
    status: "new",
    location: "On-site - Detroit",
    description: "Create a manufacturing execution system (MES) for automotive parts production. The system should handle production scheduling, quality control, equipment monitoring, and compliance tracking. Real-time data collection from shop floor equipment is essential.",
    requirements: [
      "Manufacturing and MES experience",
      "Equipment integration (PLCs, SCADA)",
      "Production scheduling algorithms",
      "Quality control and traceability",
      "Real-time data collection",
      "Compliance and audit trails"
    ],
    deliverables: [
      "Complete MES platform",
      "Equipment integration modules",
      "Production scheduling system",
      "Quality management tools",
      "Real-time monitoring dashboard",
      "System integration and training"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 20,
    rfpType: "legal-tech-new",
    title: "Nonprofit Donor Management Platform",
    company: "CharityTech Solutions",
    budget: "$25,000 - $40,000",
    deadline: "2025-09-22T23:59:59.000Z",
    postedDate: "2025-09-08T14:00:00.000Z",
    status: "new",
    location: "Remote",
    description: "Build a donor management and fundraising platform for nonprofit organizations. The system should handle donor relationships, campaign management, event fundraising, grant tracking, and financial reporting. Integration with payment processors and email marketing tools is required.",
    requirements: [
      "Nonprofit sector experience",
      "Donor relationship management",
      "Campaign and event management",
      "Grant tracking and reporting",
      "Payment processing integration",
      "Email marketing automation"
    ],
    deliverables: [
      "Donor management platform",
      "Campaign management tools",
      "Event fundraising system",
      "Grant tracking module",
      "Financial reporting dashboard",
      "Training and ongoing support"
    ],
    questions: defaultRFPQuestions
  },
  {
    id: 21,
    rfpType: "lawfirm",
    title: "Corporate M&A Transaction Legal Support",
    company: "TechVentures Capital",
    budget: "$150,000 - $250,000",
    deadline: "2025-10-20T23:59:59.000Z",
    postedDate: "2025-10-21T09:00:00.000Z",
    status: "new",
    location: "New York, NY",
    description: "We are seeking experienced legal counsel to support a complex merger and acquisition transaction. The deal involves a multi-state technology company acquisition with significant IP assets, regulatory considerations, and cross-border elements. We need a firm with deep M&A expertise and the ability to move quickly through due diligence, negotiation, and closing.",
    // Legal Services Specific Fields
    companySize: "50-100 employees",
    industry: "Venture Capital & Private Equity",
    lawfirmTechStack: [5061, 774, 12021],
    lawfirmTechStackNames: ["Salesforce Sales Cloud", "Microsoft Office 365", "Thomson Reuters CoCounsel Drafting"],
    practiceGroups: ["Mergers & Acquisitions", "Corporate Law", "Intellectual Property", "Securities Law"],
    experienceLevel: "Partner level with 15+ years M&A experience, supported by senior associates",
    barLicenses: ["New York", "Delaware", "California"],
    pricingModel: "Blended Hourly Rate",
    additionalBudgetInfo: "Budget includes partner rates at $800-1000/hr, senior associates at $450-600/hr, and associates at $300-400/hr. Estimated 200-300 billable hours for transaction completion.",
    projectDateRange: "October 2025 - January 2026",
    demoRequirements: "Provide case studies of similar M&A transactions in the technology sector, demonstrate your due diligence process, and outline your approach to managing cross-border regulatory compliance. We'd like to see examples of transaction documents you've drafted and your team's availability for rapid turnaround.",
    provisionsSpecialRequests: [
      "Conflict check must be completed within 48 hours",
      "Weekly status updates required",
      "All work product must be reviewed by partner before delivery",
      "Availability for evening/weekend calls during critical negotiation periods",
      "Experience with regulatory filings in technology sector required"
    ],
    questions: legalServicesQuestions
  },
  {
    id: 22,
    rfpType: "lawfirm",
    title: "Employment Law Defense - Class Action",
    company: "Retail Solutions Inc.",
    budget: "$75,000 - $125,000",
    deadline: "2025-10-15T23:59:59.000Z",
    postedDate: "2025-10-21T14:30:00.000Z",
    status: "reviewed",
    location: "Los Angeles, CA",
    description: "Our company is facing a potential class action lawsuit related to wage and hour practices across our California retail locations. We need immediate legal representation with extensive experience defending employment class actions, particularly in the retail sector. The matter involves allegations of missed meal breaks, unpaid overtime, and employee misclassification.",
    companySize: "1000+ employees",
    industry: "Retail",
    lawfirmTechStack: [790, 680, 746],
    lawfirmTechStackNames: ["DocuSign", "LexisNexis", "Ironclad"],
    practiceGroups: ["Employment Law", "Class Action Defense", "Labor & Employment Litigation"],
    experienceLevel: "Senior partner with class action defense experience, supported by litigation team",
    barLicenses: ["California"],
    pricingModel: "Fixed Fee with Success Bonus",
    additionalBudgetInfo: "Seeking fixed fee arrangement for case management through summary judgment or settlement, with performance-based bonus for favorable resolution. Budget covers initial 12 months of representation.",
    projectDateRange: "October 2025 - October 2026",
    demoRequirements: "Present your experience with similar retail employment class actions in California, demonstrate your case assessment methodology, provide settlement negotiation success rates, and outline your strategy for early case resolution. References from retail clients required.",
    provisionsSpecialRequests: [
      "Must have trial experience in California state courts",
      "Dedicated paralegal support required",
      "Monthly budget reconciliation and forecasting",
      "Immediate availability for court appearances",
      "Prior experience with Plaintiff's counsel firm involved is highly preferred"
    ],
    questions: legalServicesQuestions
  },
  {
    id: 23,
    rfpType: "alsp",
    title: "Intellectual Property Portfolio Management",
    company: "BioInnovate Labs",
    budget: "$60,000 - $90,000",
    deadline: "2025-11-01T23:59:59.000Z",
    postedDate: "2025-10-21T10:00:00.000Z",
    status: "new",
    location: "Boston, MA",
    description: "We are a biotech startup seeking ongoing legal counsel for comprehensive IP portfolio management. This includes patent prosecution for multiple pending applications, trademark protection, trade secret strategy, and IP due diligence for upcoming fundraising. We need a firm that understands the biotech industry and can work within startup budget constraints while delivering high-quality work.",
    practiceGroups: ["Intellectual Property", "Patent Prosecution", "Trademark", "Life Sciences"],
    experienceLevel: "IP partner or senior counsel with biotech/pharma experience, patent agent credentials preferred",
    barLicenses: ["Massachusetts", "USPTO Registration Required"],
    pricingModel: "Monthly Retainer",
    additionalBudgetInfo: "Seeking monthly retainer arrangement covering ongoing patent prosecution (3-5 applications), trademark monitoring, and general IP counseling. Retainer should include 15-20 hours per month with additional work billed at reduced hourly rates.",
    projectDateRange: "November 2025 - November 2026 (12-month initial term)",
    demoRequirements: "Showcase your experience with biotech patent prosecution, particularly in our therapeutic area (oncology). Provide examples of successful patent grants, demonstrate your approach to patent strategy for startups, and explain how you've helped similar companies prepare IP for due diligence. Understanding of venture capital expectations for IP portfolios is essential.",
    provisionsSpecialRequests: [
      "Startup-friendly billing terms with Net 45 payment",
      "Quarterly IP strategy review meetings included in retainer",
      "Direct partner access for urgent matters",
      "Willingness to attend board meetings 2x per year (travel costs separate)",
      "Experience with patent landscape analysis and freedom-to-operate opinions"
    ],
    questions: alspQuestions
  },
  {
    id: 24,
    rfpType: "alsp",
    title: "Real Estate Transaction - Commercial Lease Negotiation",
    company: "Metro Office Spaces LLC",
    budget: "$15,000 - $25,000",
    deadline: "2025-10-12T23:59:59.000Z",
    postedDate: "2025-10-21T11:00:00.000Z",
    status: "new",
    location: "Chicago, IL",
    description: "We need legal representation for negotiating and finalizing a commercial office lease for our new headquarters (approximately 25,000 sq ft). The lease involves complex tenant improvement allowances, expansion options, and specific technology infrastructure requirements. We need counsel experienced in representing tenants in commercial real estate transactions.",
    practiceGroups: ["Real Estate", "Commercial Leasing"],
    experienceLevel: "Mid-level to senior associate with commercial lease experience",
    barLicenses: ["Illinois"],
    pricingModel: "Fixed Fee",
    additionalBudgetInfo: "Fixed fee should cover lease negotiation, document review and revision, landlord negotiations, and closing. Estimate 30-40 hours of work. Prefer firms that can provide predictable pricing for this transaction type.",
    projectDateRange: "October 2025 - November 2025",
    demoRequirements: "Provide examples of tenant-side lease negotiations you've handled, particularly for office spaces over 20,000 sq ft. Demonstrate your understanding of market terms in the Chicago commercial real estate market and your approach to negotiating favorable tenant improvement and expansion provisions.",
    provisionsSpecialRequests: [
      "Fast turnaround required - lease must be finalized by November 15, 2025",
      "Must be available for in-person meetings with landlord's counsel",
      "Experience with technology company office requirements preferred",
      "Provide standard lease checklist and negotiation strategy memo",
      "Final lease must be reviewed and approved by our in-house counsel"
    ],
    questions: alspQuestions
  }*/
];