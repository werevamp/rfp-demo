# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# RFP System for Sellers

## Project Overview

Build an RFP (Request for Proposal) management system that allows sellers to view available RFPs and submit proposals. **This is a sales demo tool designed for presentation at conference booths.** It's a wireframe/mockup using fake data to showcase what the future RFP tool on the platform will look like.

### Purpose

This tool demonstrates the complete RFP workflow for both buyers and sellers in the legal industry. The fake data is curated to present realistic scenarios to conference attendees.

## Technology Stack

- React (with hooks)
- TanStack Router (for page routing)
- Tailwind CSS
- Lucide-react (for icons)
- Fake data stored in a local data file

## RFP Types

The system supports 4 distinct buyer experiences, each representing a different type of RFP:

1. **New Legal Tech Product Purchase** - Buyer looking to purchase new legal technology
2. **Replace Legal Tech with New Product** - Buyer looking to replace existing legal tech solution
3. **Lawfirm (Legal Services RFP)** - Buyer seeking legal services from a law firm
4. **ALSP (Alternative Legal Service Provider RFP)** - Buyer seeking alternative legal service providers

Each RFP type has its own set of questions and requirements that vendors must respond to.

## Complete User Flow

The demo demonstrates the following workflow:

1. **Buyer Creates RFP** - Buyer fills out an intake form (this part will be built with admin tools later)
2. **Seller Views Opportunities** - The completed intake form appears in the seller's RFP opportunities/inbox page
3. **Seller Selects RFP** - Seller clicks on an RFP to view details
4. **Display Type-Specific Content** - Based on the RFP type, the correct overview and questions are displayed
5. **Vendor Responds** - Vendor fills out the questions form to apply to the RFP
6. **Status Update** - Once vendor submission is complete, the RFP state changes to "Shortlisted" (indicating the response is being reviewed by the buyer)

### Future Admin Tool

An admin interface will be added later to allow conference booth staff to:
- Create/edit buyer intake forms
- Switch between different RFP scenarios
- Manage demo data

## Routing Structure

Use TanStack Router for type-safe navigation between pages:

- `/` - RFP Inbox (home page)
- `/rfp/$rfpId` - Individual RFP Response page

## Core Features

### 1. RFP Inbox Page (Route: `/`)

The home page that displays a list of available RFPs.

**Display Requirements:**

- Show all RFPs in a card/list format
- Each RFP card should display:
  - RFP title
  - Company name
  - Location (Remote/Hybrid/On-site)
  - Budget range
  - Deadline date
  - Posted date
  - Brief description (truncated)
  - Status badge (new, reviewed, etc.)
  - "Apply" button to view details and respond

**Functionality:**

- Clicking an RFP card or "Apply" button should navigate to `/rfp/$rfpId` route
- Cards should have hover states for better UX
- Use TanStack Router's `Link` component for navigation

### 2. RFP Response Page (Route: `/rfp/$rfpId`)

Individual page for each RFP with detailed information and proposal submission form.

**Display Requirements:**

_RFP Details Section:_

- Full RFP title
- Company name and location
- Budget range
- Deadline date
- Posted date
- Status badge
- Complete project description
- List of requirements
- List of deliverables

_Proposal Submission Form:_

- Cover Letter (large textarea)
- Proposed Budget (text input)
- Timeline (text input)
- Technical Approach (large textarea)
- Attachments section (UI only - file upload mockup)
- Submit button
- Cancel button

**Functionality:**

- Use route params to get `rfpId` from URL
- Fetch/find the RFP data based on the `rfpId`
- Back button navigates to `/` (home/inbox)
- Cancel button navigates to `/` (home/inbox)
- Submit button shows a success alert then navigates back to `/`
- Form inputs should be controlled components with state
- Handle 404 case if RFP with given ID doesn't exist

## Data Structure

Create a mock data file with the following structure for each RFP:

```javascript
{
  id: number,
  title: string,
  company: string,
  rfpType: string, // "legal-tech-new", "legal-tech-replace", "lawfirm", "alsp"
  budget: string, // e.g., "$50,000 - $75,000"
  deadline: string, // ISO date format
  postedDate: string, // ISO date format
  status: string, // "new", "reviewed", "shortlisted", etc.
  location: string, // "Remote", "Hybrid - City", "On-site - City"
  description: string, // Full description
  requirements: string[], // Array of requirement strings
  deliverables: string[] // Array of deliverable strings
}
```

### RFP Type Values

- `"legal-tech-new"` - New Legal Tech Product Purchase
- `"legal-tech-replace"` - Replace Legal Tech with New Product
- `"lawfirm"` - Lawfirm (Legal Services RFP)
- `"alsp"` - ALSP RFP

### Status Values

- `"new"` - Newly posted RFP, not yet viewed
- `"reviewed"` - RFP has been viewed by vendor
- `"shortlisted"` - Vendor has submitted response, under buyer review
- Additional statuses can be added as needed

Include at least 4-5 sample RFPs with varied data to demonstrate different states and types. **Ensure each RFP type is represented in the mock data.**

## Component Structure

Suggested component/page organization:

- `routes/`
  - `__root.tsx` - Root route component with Outlet
  - `index.tsx` - Home page showing all RFPs (route: `/`)
  - `rfp.$rfpId.tsx` - Individual RFP detail and proposal form (route: `/rfp/$rfpId`)
- `components/`
  - `RFPCard.tsx` - Individual RFP card component used in inbox
  - `ProposalForm.tsx` - Form for submitting proposals
- `data/`
  - `mockRFPs.ts` - Mock RFP data
- `routeTree.gen.ts` - Auto-generated route tree (generated by TanStack Router)
- `main.tsx` - Entry point with router setup

## State Management

- Use React useState for:
  - Proposal form inputs in rfp.$rfpId route (coverLetter, budget, timeline, approach)
- Use TanStack Router features:
  - Route params to get rfpId from URL
  - `useNavigate` hook for programmatic navigation (back to inbox, after submit, etc.)
  - `Link` component for navigation from RFPCard to RFP detail page

## Styling Guidelines

- Use Tailwind utility classes
- Clean, professional design
- Clear visual hierarchy
- Responsive design (mobile-friendly)
- Use appropriate colors for status badges
- Include hover states and transitions for interactivity

## Icons to Use (from lucide-react)

- Mail/Inbox icon for main page
- Calendar for dates
- DollarSign for budget
- Clock for time-related info
- Building2 for company
- MapPin for location
- FileText for documents
- Send for submit
- Paperclip for attachments
- ChevronLeft for back navigation

## File Organization

```
src/
  routes/
    __root.tsx
    index.tsx
    rfp.$rfpId.tsx
  components/
    RFPCard.tsx
    ProposalForm.tsx
  data/
    mockRFPs.ts
  routeTree.gen.ts
  main.tsx
```

## TanStack Router Setup

1. Install @tanstack/react-router
2. Configure routes using file-based routing:
   - `__root.tsx` - Contains the root layout with `<Outlet />` for nested routes
   - `index.tsx` - Home page at `/` with RFP inbox
   - `rfp.$rfpId.tsx` - Dynamic route at `/rfp/$rfpId` for individual RFPs
3. Generate route tree with TanStack Router CLI or configure manually
4. Create router instance in main.tsx and wrap app with `<RouterProvider>`

## Route File Structure

**\_\_root.tsx:**

- Export a Route component using `createRootRoute()`
- Render `<Outlet />` for child routes
- Can include common layout elements (header, footer, etc.)

**index.tsx:**

- Export a Route component using `createFileRoute('/')`
- Contains the RFP inbox/list view

**rfp.$rfpId.tsx:**

- Export a Route component using `createFileRoute('/rfp/$rfpId')`
- Access route params via route context
- Contains RFP details and proposal form

## Notes

- **This is a conference booth demo/sales tool** - designed to showcase the future product
- This is a wireframe/mockup - no backend integration needed
- All data should be static/mock data curated for presentation
- Focus on demonstrating the UI and user flow for both buyers and sellers
- No actual form submission or file upload functionality required
- Use alerts or console.logs to simulate successful actions
- When vendor submits a proposal, update the RFP status to "shortlisted"
- Ensure all 4 RFP types are represented in the demo data with type-specific questions

## Development Commands

**Start development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Run linting:**
```bash
npm run lint
```

**Preview production build:**
```bash
npm run preview
```

## Current Project State

The project is currently a basic React + Vite setup with placeholder content in `App.jsx`. The actual RFP system needs to be built according to the specifications above.

**Required Setup Steps:**
1. Install `@tanstack/react-router`
2. Set up file-based routing structure in `src/routes/`
3. Create mock data structure for RFPs in `src/data/mockRFPs.js`
4. Implement the two main routes: RFP inbox (`/`) and individual RFP view (`/rfp/$rfpId`)

## Technology Details

- **React:** Version 19 with hooks, uses JSX
- **Build Tool:** Vite with React plugin
- **Styling:** Tailwind CSS v4 with PostCSS
- **Linting:** ESLint with React Hooks and React Refresh plugins
- **Icons:** Lucide React (already installed)
- **Router:** TanStack Router (needs to be installed)

## ESLint Configuration

- Uses modern ESLint flat config
- React Hooks plugin for hooks rules
- React Refresh plugin for HMR
- Custom rule: `no-unused-vars` with exception for uppercase variables
- Ignores `dist` directory
