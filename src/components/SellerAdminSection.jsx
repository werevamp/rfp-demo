import { Building2, Inbox } from 'lucide-react'
import { Group, Select, Button } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { getAllVendors, getCurrentVendor, getVendorDisplayName } from '../utils/vendorStorage'

export default function SellerAdminSection({ onVendorChange }) {
  const vendors = getAllVendors()
  const currentVendor = getCurrentVendor()

  return (
    <Group gap="md">
      <Button
        component={Link}
        to="/"
        variant="light"
        color="gray"
        size="sm"
        leftSection={<Inbox size={16} />}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
      >
        Seller RFP Inbox
      </Button>

      {/* Vendor Selector */}
      <Select
        value={currentVendor.id}
        onChange={onVendorChange}
        data={vendors.map(v => ({
          value: v.id,
          label: getVendorDisplayName(v)
        }))}
        leftSection={<Building2 size={16} />}
        size="sm"
        w={200}
        styles={{
          input: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            fontWeight: 600,
          },
          dropdown: {
            backgroundColor: 'white',
          },
          option: {
            color: '#1a1a1a',
          }
        }}
      />
    </Group>
  )
}
