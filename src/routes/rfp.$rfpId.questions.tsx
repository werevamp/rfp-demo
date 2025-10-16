import { createFileRoute } from '@tanstack/react-router'
import { mockRFPs } from '../data/mockRFPs'
import { getAllBuyerIntakesArray } from '../utils/buyerIntakeStorage'
import { transformAllIntakesToRFPs } from '../utils/intakeToRFP'
import QuestionsSection from '../components/QuestionsSection'

// Helper to get all RFPs (mock + buyer intakes)
const getAllRFPs = () => {
  const buyerIntakes = getAllBuyerIntakesArray()
  const transformedIntakes = transformAllIntakesToRFPs(buyerIntakes)
  return [...transformedIntakes, ...mockRFPs]
}

// Helper to find RFP by ID
const findRFPById = (rfpId) => {
  const allRFPs = getAllRFPs()

  // Try to find by string ID first (buyer intake RFPs use string IDs like "rfp_123...")
  let rfp = allRFPs.find(r => r.id === rfpId)

  // If not found, try parsing as integer (mock RFPs use integer IDs)
  if (!rfp) {
    rfp = allRFPs.find(r => r.id === parseInt(rfpId))
  }

  return rfp
}

export const Route = createFileRoute('/rfp/$rfpId/questions')({
  component: RFPQuestions,
})

function RFPQuestions() {
  const { rfpId } = Route.useParams()
  const rfp = findRFPById(rfpId)

  if (!rfp) {
    return <div>RFP not found</div>
  }

  return <QuestionsSection rfp={rfp} />
}
