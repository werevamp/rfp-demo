# RFP Data Integration Analysis

This document analyzes how buyer intake form data should integrate with the RFP Opportunities and RFP Response pages, identifies gaps, and recommends changes.

---

## Current State Analysis

### RFP Opportunities Page (Inbox)
**Location:** `src/routes/index.tsx` + `src/components/RFPCard.jsx`

**Currently Displays:**
- RFP Type badge (legal-tech or legal-services)
- Status badge
- Title
- Company name
- Location
- Description (truncated to 3 lines)
- Solution Category (legal-tech only)
- Budget
- Days remaining
- Posted date
- Application progress (for in-progress RFPs)

### RFP Response Page (Detail View)
**Location:** `src/routes/rfp.$rfpId.index.tsx`

**Currently Displays (Legal Tech):**
- Company Profile (industry, company size, headquarters)
- Company Overview text
- Solution Category
- Project Description
- Core Software Requirements
- Buying Stage & Top Consideration
- Application Deadline
- Current Tech Stack (with replacement status)
- Demo Requirements
- Commercial Terms (seats, contract term, billing, payment)

**Currently Displays (Legal Services):**
- Project Overview & Title
- Description
- Practice Groups (badges)
- Experience Level Required
- Bar Licenses Required
- Preferred Pricing Model
- Budget Range
- Additional Budget Info
- Project Date Range
- Application Deadline
- What Suppliers Need to Demonstrate
- Provisions & Special Requests

---

## Data Mapping: Intake Forms → Display Pages

### 1. Legal Tech - New Purchase

#### Fields Currently Used ✅
- `title` → Detail page title
- `companyDescription` → Could map to company overview
- `useCaseDescription` → Could map to project description
- `budgetStatus` → Partially used (needs explicit display)
- `numberOfUsers` → Maps to userSeats/userLicenses
- `signTimeline` → Maps to decision timeline
- `contractTerm`, `billingTerm`, `paymentTerm` → Commercial terms
- `selectedProducts` → Maps to expected competitors

#### Fields NOT Currently Displayed ❌
- `productSearch` / `categorySearch` → Should show what product/category they're looking for
- `purchaseFactors` → Important buying criteria (not shown)
- `coreFeatures` (array with feature + priority) → Should replace generic "requirements" list
- `existingTechStack` → Not mapped (currently uses hardcoded techStack)
- `maxResponses` → Should show vendor cap
- `customQuestions` → Not displayed to vendors

#### Missing Fields in Mock Data ⚠️
- `deadline` - Needs to be added to intake form
- `postedDate` - System-generated, OK
- `location` / `headquarters` - Should be in intake form
- `industry` / `companySize` / `revenue` - Optional enrichment fields

---

### 2. Legal Tech - Replacement

#### Fields Currently Used ✅
- `title` → Detail page title
- `companyDescription` → Company overview
- `productToReplace` → Maps to "currentSolution" or "replacing"
- `useCaseDescription` → Project description
- `numberOfUsers` → User seats
- `signTimeline` → Decision timeline
- `contractTerm`, `billingTerm`, `paymentTerm` → Commercial terms

#### Fields NOT Currently Displayed ❌
- `replacementReasons` (array) → Should show why they're replacing
- `currentStatus` → Critical info (e.g., "cancellation notice sent")
- `coreFeatures` (array with priority) → Must-have features
- `existingTechStack` → Integration needs
- `selectedProducts` → Vendors being invited
- `maxResponses` → Vendor cap
- `customQuestions` → Vendor-specific questions

#### Missing Fields in Mock Data ⚠️
- `deadline` - Needs to be in intake form
- `location` - Should be in intake form
- Product-to-replace should map to `currentSolution` field

---

### 3. Lawfirm RFP

#### Fields Currently Used ✅
- `title` → Detail page title
- `companyDescription` → Company overview
- `workDescription` → Maps to description
- `practiceAreas` → Display as badges
- `experienceLevel` → Experience level required
- `barLicenses` (array of {state, country}) → Bar licenses display
- `preferredPricingModel` → Pricing model
- `budgetFrom` + `budgetTo` → Budget range
- `additionalBudgetInfo` → Additional budget details
- `projectStartDate` + `projectEndDate` → Project date range
- `customQuestions` → Vendor questions (NOT currently displayed)

#### Fields NOT Currently Displayed ❌
- `selectYourFirms` - Internal workflow field (don't show to vendors)
- `serviceProviders` - Internal (selected firms list)
- `useTheoremMarketplace` - Internal setting
- `maxResponses` → Should show vendor cap
- `uploadedFiles` → Should show attached RFP documents

#### Missing Fields in Mock Data ⚠️
- `deadline` - Needs to be in intake form
- `location` - Should be in intake form or mapped from company info
- `postedDate` - System-generated

---

### 4. ALSP RFP

#### Fields Currently Used ✅
- `title` → Detail page title
- `companyDescription` → Company overview
- `workDescription` → Description
- `preferredPricingModel` → Pricing model
- `budgetFrom` + `budgetTo` → Budget range
- `additionalBudgetInfo` → Additional budget info
- `projectStartDate` + `projectEndDate` → Project date range
- `customQuestions` → Vendor questions (NOT currently displayed)

#### Fields NOT Currently Displayed ❌
- `clientIndustryExperience` (array) → Should show required industry expertise
- `locationJurisdiction` (array) → Critical for vendor matching
- `languagesRequired` (array) → Language requirements
- `volumeScale` + `volumeScaleOther` → Project scope/size
- `useTheoremMarketplace` - Internal
- `maxResponses` → Vendor cap
- `uploadedFiles` → Attached documents

#### Missing Fields in Mock Data ⚠️
- `deadline` - Needs to be in intake form
- `location` - Should be in intake form
- `postedDate` - System-generated

---

## Required Changes

### A. Add to Buyer Intake Forms

#### All Forms Need:
1. **`deadline`** (date) - Application/response deadline
2. **`location`** (text) - Geographic location/work location
3. **File upload handling** - Currently mockup only, needs real implementation

#### Tech Forms Need:
4. **Better tech stack management** - Currently shows empty state, needs actual data collection
5. **Integration requirements** - Explicit yes/no with details

#### Legal Services Forms Need:
6. **`deliveryModel`** already exists but consider adding more detail
7. **Jurisdictions** for lawfirm (similar to ALSP)

---

### B. Changes to RFP Opportunities Page (Inbox Cards)

#### Add These Fields to Display:

**For Tech RFPs:**
```javascript
// In RFPCard component
- Product/Category being sought (productSearch or categorySearch)
- Product being replaced (productToReplace) - for replacements
- Key requirement count (e.g., "8 must-have features")
- Replacement urgency (currentStatus) - for replacements
```

**For Legal Services RFPs:**
```javascript
- Practice areas (show 2-3 key areas as badges)
- Experience level badge
- Project duration (calculated from start/end dates)
- Key jurisdictions (show top 2-3)
```

#### Modify Existing:
- `location` → Use intake form's location field
- Description → Prefer `workDescription` (300 chars) over generic description
- Add "Max Vendors" badge when `maxResponses` is set

---

### C. Changes to RFP Detail Page (Overview Tab)

#### Tech New Purchase - Add Sections:

**1. "What They're Looking For" Section**
```javascript
{
  title: "What They're Looking For",
  fields: [
    productSearch || categorySearch, // Which product/category
    solutionCategory, // Existing field
    useCaseDescription, // Use case details
    purchaseFactors, // Price, Features, Support, etc.
  ]
}
```

**2. "Core Requirements" Section** (REPLACE current static list)
```javascript
{
  title: "Core Requirements & Priorities",
  data: coreFeatures.map(f => ({
    feature: f.feature,
    priority: f.priority // "Must Have" | "Nice to have"
  }))
}
```

**3. "Buying Context" Section** (enhance existing)
```javascript
{
  buyingStage: "Evaluating Solutions", // Could infer from budgetStatus
  budgetStatus: "We have budget allocated", // Add this explicitly
  signTimeline: "30 Days", // Show decision timeline
  topConsideration: purchaseFactors.join(', ')
}
```

**4. "Competition & Selection" Section** (NEW)
```javascript
{
  title: "Vendor Selection Process",
  fields: [
    maxResponses: "5 vendors maximum",
    selectedProducts: [...], // List of invited vendors
    note: "To ensure clarity, avoid applying if you're already in discussions"
  ]
}
```

**5. "Integration Requirements" Section** (enhance)
```javascript
{
  title: "Integration Requirements",
  existingTechStack: [...], // From intake form
  integrationRequired: true/false,
  mustIntegrateWith: [...] // Key systems
}
```

**6. "Custom Questions from Buyer" Section** (NEW)
```javascript
{
  title: "Additional Questions",
  description: "The buyer has requested you address these questions in your proposal:",
  questions: customQuestions // Array of strings
}
```

---

#### Tech Replacement - Add Sections:

**1. "Replacement Context" Section** (enhance existing)
```javascript
{
  title: "What They're Replacing",
  productToReplace: "Magento 1.x",
  replacementReasons: ["Price", "Features", "Support"], // Array
  currentStatus: "We have sent a cancellation notice", // Critical!
  useCaseDescription: "..." // Why they need replacement
}
```

**2. All other sections same as "Tech New Purchase"**

---

#### Lawfirm RFP - Add Sections:

**1. "Scope of Work" Section** (enhance existing)
```javascript
{
  title: "Scope of Work",
  workDescription: "...", // 300 char description
  practiceAreas: [...], // Already shown
  customQuestions: [...] // NEW - buyer's specific questions
}
```

**2. "Qualifications Required" Section**
```javascript
{
  experienceLevel: "Partner level (12+ years)",
  barLicenses: [{state: "NY", country: "USA"}, ...],
  // Could add specialty certifications if collected
}
```

**3. "Selection Process" Section** (NEW)
```javascript
{
  maxResponses: "3 firms",
  selectionCriteria: "Listed in customQuestions",
  uploadedFiles: [...] // RFP documents
}
```

---

#### ALSP RFP - Add Sections:

**1. "Provider Requirements" Section** (NEW)
```javascript
{
  title: "Provider Requirements",
  clientIndustryExperience: ["Legal Services", "Technology"],
  locationJurisdiction: ["US National", "UK", "EU"],
  languagesRequired: ["English", "Spanish"],
  volumeScale: "Medium volume (11-50 matters/year)"
}
```

**2. "Scope of Work" Section** (same as Lawfirm)

**3. Rest same as Lawfirm structure**

---

### D. Changes to Mock Data Structure

#### Update `mockRFPs.js` to Use Intake Form Structure:

```javascript
// OLD Structure (current mockRFPs.js)
{
  id: 1,
  rfpType: "legal-tech",
  title: "...",
  company: "...",
  budget: "$75,000 - $100,000", // String format
  requirements: [...], // Generic array
  // ... many custom fields
}

// NEW Structure (should match intake forms)
{
  id: 1,
  rfpType: "legal-tech-new", // More specific
  serviceType: "legal-tech-new",

  // Common fields
  title: "...",
  companyDescription: "...",
  email: "...", // Buyer email (internal only)
  deadline: "2025-10-09T23:59:59.000Z",
  postedDate: "2025-09-25T09:00:00.000Z", // System-generated
  location: "Remote",

  // Tech-specific fields (match intake form exactly)
  productSearch: "Shopify Plus",
  categorySearch: null,
  useCaseDescription: "...",
  purchaseFactors: ["price", "features"],
  purchaseFactorsOther: "",
  budgetStatus: "have-budget",
  budgetStatusOther: "",
  coreFeatures: [
    { feature: "Product Catalog Management", priority: "must-have" },
    { feature: "Shopping Cart", priority: "must-have" },
    { feature: "Advanced Analytics", priority: "nice-to-have" }
  ],
  existingTechStack: [...],
  integrationRequired: true,
  selectedProducts: ["product-123", "product-456"],
  maxResponses: 5,
  numberOfUsers: "12",
  signTimeline: "30-days",
  contractTerm: ["one-year"],
  billingTerm: ["monthly"],
  paymentTerm: ["net-30"],
  customQuestions: "How do you handle Black Friday traffic spikes?",

  // System/enrichment fields (not from intake)
  status: "new", // System status
  questions: defaultRFPQuestions // Vendor response questions
}
```

---

### E. Fields to Remove from Mock Data

These fields in current `mockRFPs.js` don't come from intake forms and should be reconsidered:

**Either Remove or Mark as "Enrichment Data":**
- `companyOverview` - Not in intake (could derive from companyDescription)
- `industry`, `headquarters`, `companySize`, `revenue`, `publicPrivate`, `geographicPresence` - Company enrichment (not in intake)
- `solutionCategory` - Not explicitly in intake (could derive from productSearch/categorySearch)
- `topConsideration` - Not in intake (could derive from purchaseFactors)
- `buyingStage` - Not in intake (could infer from budgetStatus)
- `requirements` (generic array) - Should use `coreFeatures` from intake
- `deliverables` - Not in intake forms (vendor proposes these)
- `replacing`, `decisionTimeline`, `maxResponses`, `userSeats` - Redundant with intake fields
- All "Quick Stats", "Stakeholders", "Competitive Intelligence", "Budget Intelligence", "Decision Timeline" - Enrichment data not from intake

**Keep but Clarify:**
- `questions` - These are questions vendors must answer (separate from customQuestions which buyer asks)

---

### F. New Components Needed

1. **CoreFeaturesDisplay Component**
   - Shows feature name + priority badge
   - Separates "Must Have" vs "Nice to have"

2. **CustomQuestionsSection Component**
   - Displays buyer's custom questions prominently
   - Helps vendors know what to address in proposal

3. **VendorSelectionInfo Component**
   - Shows max responses, selected products
   - Displays competition/selection context

4. **JurisdictionBadges Component** (for ALSP)
   - Displays geographic requirements clearly

5. **IndustryExperience Component** (for ALSP)
   - Shows required industry experience

---

## Summary of Required Actions

### 1. Intake Form Updates
- [ ] Add `deadline` field to all intake forms
- [ ] Add `location` field to all intake forms
- [ ] Implement real file upload (not just UI mockup)
- [ ] Add jurisdictions to lawfirm form (similar to ALSP)

### 2. Mock Data Updates
- [ ] Restructure mockRFPs.js to match intake form field names exactly
- [ ] Add intake form fields currently missing from mock data
- [ ] Mark enrichment fields vs intake fields clearly
- [ ] Create consistent field naming (e.g., budgetFrom/budgetTo vs budget string)

### 3. RFP Card (Opportunities Page) Updates
- [ ] Add product/category being sought
- [ ] Add "Max Vendors" badge
- [ ] Show practice areas for legal services
- [ ] Show key jurisdictions for ALSP
- [ ] Use workDescription for legal services RFPs

### 4. RFP Detail Page Updates
- [ ] Add "What They're Looking For" section (Tech)
- [ ] Replace static requirements with coreFeatures from intake
- [ ] Add "Replacement Context" section (Tech Replace)
- [ ] Add "Custom Questions from Buyer" section (All types)
- [ ] Add "Vendor Selection Process" section (All types)
- [ ] Add "Provider Requirements" section (ALSP)
- [ ] Show integration requirements explicitly (Tech)
- [ ] Display uploaded RFP documents (Legal Services)

### 5. Component Development
- [ ] Build CoreFeaturesDisplay component
- [ ] Build CustomQuestionsSection component
- [ ] Build VendorSelectionInfo component
- [ ] Build JurisdictionBadges component (ALSP)
- [ ] Build IndustryExperience component (ALSP)

### 6. Data Storage Integration
- [ ] Update `saveBuyerIntake()` to store all intake fields
- [ ] Create mapping function: intakeData → displayData
- [ ] Handle field transformations (e.g., budgetFrom/To → "budget" string)
- [ ] Store files/attachments properly

---

## Priority Recommendations

### High Priority (Must Have)
1. Add `deadline` to all intake forms
2. Add `location` to all intake forms
3. Display `coreFeatures` array instead of generic requirements
4. Display `customQuestions` to vendors
5. Show `maxResponses` (vendor cap)
6. Update mockRFPs.js structure to match intake forms

### Medium Priority (Should Have)
7. Show `purchaseFactors` / `replacementReasons`
8. Display `currentStatus` for replacements
9. Show `selectedProducts` (competition info)
10. Add jurisdictions to lawfirm intake
11. Display industry/language requirements (ALSP)
12. Show volume/scale (ALSP)

### Low Priority (Nice to Have)
13. Implement real file upload
14. Company enrichment data (size, revenue, etc.)
15. Stakeholder information
16. Competitive intelligence sections
17. Relationship history

---

## Data Flow Diagram

```
Buyer Intake Form (Step 1-12)
    ↓
saveBuyerIntake() → localStorage
    ↓
RFP Created with intake data structure
    ↓
    ├─→ RFP Opportunities Page (Card View)
    │       - Shows: title, company, budget, location,
    │         product/category, practice areas, key info
    │
    └─→ RFP Detail Page (Full View)
            - Overview Tab: All intake data organized by sections
            - Questions Tab: Vendor response questions
            - Documents Tab: Uploaded RFP files
```

---

## Field Mapping Reference

### Budget Display
```javascript
// Intake: budgetFrom, budgetTo (numbers)
// Display: "$50,000 - $75,000" (string)

function formatBudget(budgetFrom, budgetTo) {
  return `$${budgetFrom.toLocaleString()} - $${budgetTo.toLocaleString()}`
}
```

### Timeline Display
```javascript
// Intake: projectStartDate, projectEndDate (dates)
// Display: "October 2025 - January 2026" (string)

function formatDateRange(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  return `${start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} -
          ${end.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
}
```

### Core Features Display
```javascript
// Intake: coreFeatures = [{ feature: "...", priority: "must-have" | "nice-to-have" }]
// Display: Group by priority

const mustHave = coreFeatures.filter(f => f.priority === 'must-have')
const niceToHave = coreFeatures.filter(f => f.priority === 'nice-to-have')
```

---

This analysis provides a comprehensive roadmap for integrating buyer intake form data with the RFP display pages. The key insight is that the current mock data structure doesn't match the intake forms, creating a disconnect that needs to be resolved.
