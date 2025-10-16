# RFP Data Collection Reference

This document outlines all data collected from each RFP intake form type. Use this as a reference when designing the RFP Opportunities page and RFP Response pages.

---

## Common Fields (All RFP Types)

These fields are collected across all RFP types:

| Field Name | Type | Required | Description | Character Limit |
|------------|------|----------|-------------|-----------------|
| `rfpType` | hidden | ✓ | Type identifier: `legal-tech-new`, `legal-tech-replace`, `lawfirm`, `alsp` | - |
| `serviceType` | hidden | ✓ | Service category: `legal-tech-new`, `legal-tech-replace`, `legal-services` | - |
| `title` | text | ✓ | RFP title | - |
| `companyDescription` | textarea | ✓ | Anonymous company description shown to vendors | 100 chars |
| `email` | email | ✓ | Buyer's email for notifications | - |
| `acceptedTerms` | checkbox | ✓ | Terms of service acceptance | - |

---

## 1. Legal Tech - New Purchase (`legal-tech-new`)

**Total Steps: 12**

### Step 1: Title & Company Description
- `title` - Text input (required)
- `companyDescription` - Textarea, 100 char limit (required)

### Step 2: Product Search
- `productSearch` - Product autocomplete search (conditional)
- `categorySearch` - Category autocomplete search (conditional)
- Search type toggle: "Specific Product" or "Product Category"

### Step 3: Use Case Description
- `useCaseDescription` - Textarea, 500 char limit (required)

### Step 4: Purchase Factors
- `purchaseFactors` - Multi-select buttons (required)
  - Options: Price, Feature/Functionality, Support, Other
- `purchaseFactorsOther` - Text input (shown if "Other" selected)

### Step 5: Budget Status
- `budgetStatus` - Radio buttons (required)
  - Options: "We don't have a budget allocated", "We have budget allocated", "Other"
- `budgetStatusOther` - Text input (shown if "Other" selected)

### Step 6: Core Features
- `coreFeatures` - Dynamic array of objects (at least 1)
  - Each item has:
    - `feature` - Text input for feature name
    - `priority` - Dropdown: "Must Have", "Nice to have", "Must Have / Nice to have"
- `featureFiles` - File upload area (optional, UI mockup only)

### Step 7: Existing Technology
- `existingTechStack` - Array (optional)
- `integrationRequired` - Boolean (optional)
- Note: Currently shows empty state with "ADD TO STACK" and "Manage My Stack" buttons

### Step 8: Product Selection
- `selectedProducts` - Array of product IDs (at least 1 required)
  - Shows 5 recommended products with logos/avatars
  - Products marked with star icon for recommendations
- `maxResponses` - Number input (optional)

### Step 9: Number of Users
- `numberOfUsers` - Text input (required)

### Step 10: Sign Timeline
- `signTimeline` - Button group (required)
  - Options: ASAP, 30 Days, 90 Days, 6 Months, 1 Year, Other
- `signTimelineOther` - Text input (shown if "Other" selected)

### Step 11: Additional Information
- `contractTerm` - Multi-select buttons (optional)
  - Options: One Year, Multi-year, Other
- `billingTerm` - Multi-select buttons (optional)
  - Options: Monthly, Quarterly, Annually, Other
- `paymentTerm` - Multi-select buttons (optional)
  - Options: Upfront, Net 30, Net 45, Other
- `customQuestions` - Textarea (optional)

### Step 12: Submit
- `email` - Email input (required)
- `acceptedTerms` - Checkbox (required)

**Key Display Fields for Opportunities Page:**
- Title, Company Description, Product/Category searched, Budget status, Sign timeline, Selected products

---

## 2. Legal Tech - Replacement (`legal-tech-replace`)

**Total Steps: 12**

### Step 1: Title & Company Description
- `title` - Text input (required)
- `companyDescription` - Textarea, 100 char limit (required)

### Step 2: Product to Replace
- `productToReplace` - Product autocomplete search (required)

### Step 3: Replacement Reasons
- `replacementReasons` - Multi-select buttons (required)
  - Options: Price, Feature/Functionality, Support, Other
- `replacementReasonsOther` - Text input (shown if "Other" selected)

### Step 4: Current Status
- `currentStatus` - Radio buttons (required)
  - Options: "We are looking around but may renew", "We intend to leave, but have yet to cancel", "We have sent a cancellation notice", "Other"
- `currentStatusOther` - Text input (shown if "Other" selected)

### Step 5: Use Case Description
- `useCaseDescription` - Textarea, 500 char limit (required)

### Step 6: Core Features
- `coreFeatures` - Dynamic array of objects (at least 1)
  - Each item has:
    - `feature` - Text input for feature name
    - `priority` - Dropdown: "Must Have", "Nice to have", "Must Have / Nice to have"
- `featureFiles` - File upload area (optional, UI mockup only)

### Step 7: Existing Technology
- `existingTechStack` - Array (optional)
- `integrationRequired` - Boolean (optional)

### Step 8: Product Selection
- `selectedProducts` - Array of product IDs (at least 1 required)
- `maxResponses` - Number input (optional)

### Step 9: Number of Users
- `numberOfUsers` - Text input (required)

### Step 10: Sign Timeline
- `signTimeline` - Button group (required)
  - Options: ASAP, 30 Days, 90 Days, 6 Months, 1 Year, Other
- `signTimelineOther` - Text input (shown if "Other" selected)

### Step 11: Additional Information
- `contractTerm` - Multi-select buttons (optional)
- `billingTerm` - Multi-select buttons (optional)
- `paymentTerm` - Multi-select buttons (optional)
- `customQuestions` - Textarea (optional)

### Step 12: Submit
- `email` - Email input (required)
- `acceptedTerms` - Checkbox (required)

**Key Display Fields for Opportunities Page:**
- Title, Company Description, Product to replace, Replacement reasons, Current status, Sign timeline

---

## 3. Lawfirm RFP (`lawfirm`)

**Total Steps: 7**

Additional hidden field:
- `deliveryModel: 'lawfirm'`

### Step 1: Title & Company Description
- `title` - Text input (required)
- `companyDescription` - Textarea, 100 char limit (required)

### Step 2: Description of Work
- `workDescription` - Textarea, 300 char limit (required)

### Step 3: Requirements
- `practiceAreas` - MultiSelect dropdown (required)
  - Options: Corporate Law, M&A, Litigation, IP, Employment & Labor, Real Estate, Tax, Bankruptcy, Securities, Antitrust, Environmental, Healthcare, Privacy & Data, White Collar, Family, Immigration, Regulatory, Contracts, Other
- `experienceLevel` - Select dropdown (required)
  - Options: Junior (0-3 years), Mid-level (4-7 years), Senior (8-12 years), Partner level (12+ years), Mixed experience team
- `barLicenses` - Dynamic array of objects (optional)
  - Each item has:
    - `state` - Text input
    - `country` - Text input

### Step 4: Pricing
- `preferredPricingModel` - MultiSelect dropdown (required)
  - Options: Hourly Rate, Fixed Fee, Blended Hourly Rate, Contingency, Monthly Retainer, Success Fee, Hybrid Model, Other
- `budgetFrom` - Number input with $ prefix (required)
- `budgetTo` - Number input with $ prefix (required)
- `additionalBudgetInfo` - Textarea (optional)

### Step 5: Who should we request bids from?
- `selectYourFirms` - Checkbox (optional)
- `serviceProviders` - Array of firm IDs (optional, conditional on selectYourFirms)
- `useTheoremMarketplace` - Checkbox (default: true)
- `maxResponses` - Number input (optional)

### Step 6: Finishing Touches
- `projectStartDate` - Date input (required)
- `projectEndDate` - Date input (required)
- `customQuestions` - Dynamic array of text inputs (at least 1 item)
- `uploadedFiles` - File upload area (optional, UI mockup only)

### Step 7: Submit
- `email` - Email input (required)
- `acceptedTerms` - Checkbox (required)

**Key Display Fields for Opportunities Page:**
- Title, Company Description, Work description (truncated), Practice areas, Experience level, Budget range, Project dates

---

## 4. ALSP RFP (`alsp`)

**Total Steps: 7**

Additional hidden field:
- `deliveryModel: 'alsp'`

### Step 1: Title & Company Description
- `title` - Text input (required)
- `companyDescription` - Textarea, 100 char limit (required)

### Step 2: Description of Work
- `workDescription` - Textarea, 300 char limit (required)

### Step 3: Requirements
- `clientIndustryExperience` - MultiSelect dropdown (required)
  - Options: Legal Services, Financial Services, Healthcare, Technology, Manufacturing, Retail & E-commerce, Real Estate, Insurance, Energy & Utilities, Telecommunications, Transportation & Logistics, Hospitality, Education, Government & Public Sector, Nonprofit, Other
- `locationJurisdiction` - MultiSelect dropdown (required)
  - Options: US National, US regions, individual states, Canada, UK, EU, APAC, Latin America, Middle East, Africa, Global/Multi-Jurisdiction
- `languagesRequired` - MultiSelect dropdown (required)
  - Options: English, Spanish, French, German, Mandarin, Cantonese, Japanese, Korean, Portuguese, Italian, Russian, Arabic, Hindi, Dutch, Polish
- `volumeScale` - Select dropdown (required)
  - Options: One-time project, Low volume (1-10/year), Medium volume (11-50/year), High volume (51-200/year), Enterprise volume (200+/year), Ongoing retainer, Other
- `volumeScaleOther` - Text input (shown if "Other" selected)

### Step 4: Pricing
- `preferredPricingModel` - MultiSelect dropdown (required)
  - Options: Hourly Rate, Fixed Fee, Blended Hourly Rate, Contingency, Monthly Retainer, Success Fee, Hybrid Model, Other
- `budgetFrom` - Number input with $ prefix (required)
- `budgetTo` - Number input with $ prefix (required)
- `additionalBudgetInfo` - Textarea (optional)

### Step 5: Who should we request bids from?
- `useTheoremMarketplace` - Checkbox (default: true)
- `maxResponses` - Number input (optional)

### Step 6: Finishing Touches
- `projectStartDate` - Date input (required)
- `projectEndDate` - Date input (required)
- `customQuestions` - Dynamic array of text inputs (at least 1 item)
- `uploadedFiles` - File upload area (optional, UI mockup only)

### Step 7: Submit
- `email` - Email input (required)
- `acceptedTerms` - Checkbox (required)

**Key Display Fields for Opportunities Page:**
- Title, Company Description, Work description (truncated), Client industries, Jurisdictions, Languages, Volume/scale, Budget range, Project dates

---

## Summary: Fields to Display

### RFP Opportunities/Inbox Page (Card View)
Display concise, scannable information:

**All RFPs:**
- RFP Title
- Company Description
- Budget Range (if applicable)
- Status badge
- Posted date / Deadline

**Tech RFPs (new/replace):**
- Product name or category being sought/replaced
- Number of selected products/vendors to bid

**Legal Services RFPs (lawfirm/alsp):**
- Practice areas or industries
- Project date range
- Location/jurisdiction

### RFP Response/Detail Page
Display comprehensive information organized by sections:

**Header Section:**
- Full title
- Company description
- RFP type badge
- Status
- Key dates

**Requirements Section:**
- Use case / work description
- Core features/functions needed (for tech)
- Practice areas / industries (for legal services)
- Experience level / qualifications
- Bar licenses (lawfirm)
- Languages and jurisdictions (ALSP)

**Scope & Scale Section:**
- Number of users (tech)
- Volume/scale expectations (ALSP)
- Project timeline/dates

**Budget & Terms Section:**
- Budget range
- Preferred pricing model
- Contract/billing/payment terms (tech)
- Additional budget information

**Custom Questions Section:**
- List of buyer's custom questions for vendors to answer

**Integration/Technical Section (Tech RFPs):**
- Existing tech stack
- Integration requirements
- Selected competing products
