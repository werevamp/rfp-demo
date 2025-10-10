import { createFileRoute } from '@tanstack/react-router'
import { Stack, Text, Title } from '@mantine/core'
import { Folder } from 'lucide-react'

export const Route = createFileRoute('/rfp/$rfpId/documents')({
  component: RFPDocuments,
})

function RFPDocuments() {
  return (
    <Stack align="center" py={48}>
      <Folder size={48} color="var(--mantine-color-gray-5)" />
      <Title order={3} size="lg" c="gray.9">Documents</Title>
      <Text c="gray.6">Document library will be implemented here</Text>
    </Stack>
  )
}
