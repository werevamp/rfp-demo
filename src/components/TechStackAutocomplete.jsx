import { useState } from 'react'
import {
  Box,
  Autocomplete,
  Avatar,
  Group,
  Text,
  Stack
} from '@mantine/core'
import { Search } from 'lucide-react'
import productsData from '../data/products.json'

// Specific product IDs for tech stack
const TECH_STACK_PRODUCT_IDS = [5061, 790, 2647, 774, 773, 775, 712, 746, 1302, 680, 829, 11000, 12021]

/**
 * Reusable Tech Stack Product Autocomplete Component
 * Provides a searchable product dropdown for tech stack items
 *
 * @param {Function} onSelect - Callback when a product is selected, receives product object
 * @param {string} placeholder - Placeholder text
 * @param {string} size - Mantine size prop (default: "md")
 * @param {Array} excludeIds - Array of product IDs to exclude from results
 */
export default function TechStackAutocomplete({
  onSelect,
  placeholder = "Search for a product",
  size = "md",
  excludeIds = []
}) {
  const [searchValue, setSearchValue] = useState('')

  // Helper function to get product initials
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
  const getLogoUrl = (product) => {
    return product.details?.squareLogoUrl || product.details?.logoUrl || ''
  }

  // Filter products to only include tech stack items
  const techStackProducts = productsData.filter(product =>
    TECH_STACK_PRODUCT_IDS.includes(product.id) && !excludeIds.includes(product.id)
  )

  // Prepare product data for autocomplete
  const productOptions = techStackProducts.map(product => ({
    value: product.name,
    label: product.name,
    id: product.id,
    logoUrl: getLogoUrl(product),
    productData: product
  }))

  const handleProductSelect = (value) => {
    const selectedOption = productOptions.find(opt => opt.value === value)
    if (selectedOption && onSelect) {
      onSelect(selectedOption.productData)
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
        onOptionSubmit={handleProductSelect}
        data={productOptions}
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
                size={32}
                radius="sm"
                alt={option.label}
              />
            ) : (
              <Avatar
                size={32}
                radius="sm"
                color={getColorFromName(option.label)}
              >
                {getInitials(option.label)}
              </Avatar>
            )}
            <Text size="sm" fw={500}>{option.label}</Text>
          </Group>
        )}
      />
    </Box>
  )
}
