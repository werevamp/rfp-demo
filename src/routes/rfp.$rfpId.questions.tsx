import { createFileRoute } from '@tanstack/react-router'
import { mockRFPs } from '../data/mockRFPs'
import QuestionsSection from '../components/QuestionsSection'

export const Route = createFileRoute('/rfp/$rfpId/questions')({
  component: RFPQuestions,
})

function RFPQuestions() {
  const { rfpId } = Route.useParams()
  const rfp = mockRFPs.find(r => r.id === parseInt(rfpId))

  if (!rfp) {
    return <div>RFP not found</div>
  }

  return <QuestionsSection rfp={rfp} />
}
