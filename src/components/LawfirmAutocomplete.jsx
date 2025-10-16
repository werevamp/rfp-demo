import { useState } from 'react'
import {
  Box,
  Autocomplete,
  Avatar,
  Group,
  Text,
  Stack,
  Badge
} from '@mantine/core'
import { Search } from 'lucide-react'
import lawfirmsData from '../data/lawfirms.json'

/**
 * Reusable Law Firm Autocomplete Component
 * Provides a searchable law firm dropdown with logos
 *
 * @param {Function} onSelect - Callback when a firm is selected, receives firm object
 * @param {string} placeholder - Placeholder text
 * @param {string} size - Mantine size prop (default: "md")
 * @param {Array} excludeIds - Array of firm IDs to exclude from results
 */
export default function LawfirmAutocomplete({
  onSelect,
  placeholder = "Search for a law firm",
  size = "md",
  excludeIds = []
}) {
  const [searchValue, setSearchValue] = useState('')

  // Helper function to get firm initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase()
  }

  // Helper function to generate consistent color based on name
  const getColorFromName = (name) => {
    const colors = [
      'blue', 'cyan', 'teal', 'green', 'lime',
      'yellow', 'orange', 'red', 'pink', 'grape',
      'violet', 'indigo'
    ]
    const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return colors[charSum % colors.length]
  }

  // Helper function to get logo URL with fallback
  const getLogoUrl = (firm) => {
    return firm.details?.logoUrl || firm.details?.logo || ''
  }

  // Filter out excluded firms
  const availableFirms = lawfirmsData.filter(firm => !excludeIds.includes(firm.id))

  // Prepare firm data for autocomplete
  const firmOptions = availableFirms.map(firm => ({
    value: firm.name,
    label: firm.name,
    id: firm.id,
    logoUrl: getLogoUrl(firm),
    size: firm.details?.lawfirmSize || '',
    firmData: firm
  }))

  const handleFirmSelect = (value) => {
    const selectedOption = firmOptions.find(opt => opt.value === value)
    if (selectedOption && onSelect) {
      onSelect(selectedOption.firmData)
      setSearchValue('') // Clear search after selection
    }
  }

  const handleSearchChange = (value) => {
    setSearchValue(value)
  }

  return (
    <Box>
      <Autocomplete
        value={searchValue}
        onChange={handleSearchChange}
        onOptionSubmit={handleFirmSelect}
        data={firmOptions}
        placeholder={placeholder}
        leftSection={<Search size={16} />}
        leftSectionPointerEvents="none"
        size={size}
        maxDropdownHeight={300}
        filter={({ options, search }) => {
          return options.filter((option) =>
            option.label.toLowerCase().includes(search.toLowerCase().trim())
          )
        }}
        renderOption={({ option }) => (
          <Group gap="sm" wrap="nowrap">
            {option.logoUrl ? (
              <Avatar
                src={option.logoUrl}
                size={40}
                radius="sm"
                alt={option.label}
              />
            ) : (
              <Avatar
                size={40}
                radius="sm"
                color={getColorFromName(option.label)}
              >
                {getInitials(option.label)}
              </Avatar>
            )}
            <Stack gap={0} style={{ flex: 1 }}>
              <Text size="sm" fw={500}>{option.label}</Text>
              {option.size && (
                <Badge size="xs" variant="light" color="gray">
                  {option.size}
                </Badge>
              )}
            </Stack>
          </Group>
        )}
      />
    </Box>
  )
}
