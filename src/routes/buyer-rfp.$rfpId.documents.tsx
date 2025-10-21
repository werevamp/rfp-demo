import { createFileRoute } from '@tanstack/react-router'
import { Title, Text, Box, Group, Stack, Paper, Button } from '@mantine/core'
import { FileText } from 'lucide-react'
import fakeRFPDetails from '../data/fakeRFPDetails.json'

export const Route = createFileRoute('/buyer-rfp/$rfpId/documents')({
  component: DocumentsTab,
})

function DocumentsTab() {
  return (
    <Group align="flex-start" gap="xl" wrap="nowrap">
      {/* Left Side: Buyer Attachments */}
      <Box style={{ flex: 1 }}>
        <Title order={3} mb="xs">Buyer Attachments</Title>
        <Text size="sm" c="dimmed" mb="lg">Original RFP materials</Text>

        <Stack gap="md">
          {fakeRFPDetails.documents.buyerAttachments.map((doc) => (
            <Paper key={doc.id} withBorder p="md" radius="sm">
              <Group justify="space-between">
                <Group gap="md">
                  <FileText size={24} />
                  <Box>
                    <Text fw={600}>{doc.name}</Text>
                    <Text size="xs" c="dimmed">{doc.type} • {doc.size}</Text>
                  </Box>
                </Group>
                <Button variant="light" size="sm">Preview</Button>
              </Group>
            </Paper>
          ))}

          <Button variant="outline" fullWidth>
            Upload addendum
          </Button>
        </Stack>
      </Box>

      {/* Right Side: Provider Uploads */}
      <Box style={{ flex: 1 }}>
        <Title order={3} mb="xs">Provider Uploads</Title>
        <Text size="sm" c="dimmed" mb="lg">Filter by vendor</Text>

        <Paper bg="gray.0" p="xl" radius="sm">
          <Text size="sm" c="dimmed" ta="center">
            (Placeholder) Show a list grouped by vendor with preview/download.
          </Text>
        </Paper>
      </Box>
    </Group>
  )
}
