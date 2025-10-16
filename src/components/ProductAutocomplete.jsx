import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Box,
  Autocomplete,
  Avatar,
  Group,
  Text,
  Paper,
  Button
} from '@mantine/core'
import { Search } from 'lucide-react'
import productsData from '../data/products.json'

/**
 * Reusable Product Autocomplete Component
 * Provides a searchable product dropdown with logos/avatars and "Request Product" fallback
 *
 * @param {string} fieldName - The form field name to register with react-hook-form
 * @param {string} label - Label text for the autocomplete field
 * @param {string} placeholder - Placeholder text
 * @param {object} error - Error object from form validation
 * @param {string} size - Mantine size prop (default: "md")
 */
export default function ProductAutocomplete({
  fieldName,
  label = "Product Name",
  placeholder = "Search for a product",
  error = null,
  size = "md"
}) {
  const { watch, setValue } = useFormContext()
  const [searchValue, setSearchValue] = useState(watch(fieldName) || '')
  const [showRequestButton, setShowRequestButton] = useState(false)

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

  // Prepare product data for autocomplete
  const productOptions = productsData.map(product => ({
    value: product.name,
    label: product.name,
    id: product.id,
    logoUrl: getLogoUrl(product)
  }))

  const handleProductSelect = (value) => {
    setValue(fieldName, value)
    setSearchValue(value)
    setShowRequestButton(false)
  }

  const handleProductChange = (value) => {
    setSearchValue(value)
    setValue(fieldName, value)
    // Check if the entered value matches any product
    const matchedProduct = productsData.find(
      p => p.name.toLowerCase() === value.toLowerCase()
    )
    setShowRequestButton(value.length > 0 && !matchedProduct)
  }

  // Find the selected product to display its logo
  const selectedProductData = productsData.find(
    p => p.name.toLowerCase() === searchValue.toLowerCase()
  )

  // Render the left section based on whether a product is selected
  const renderProductLeftSection = () => {
    if (selectedProductData) {
      const logoUrl = getLogoUrl(selectedProductData)
      if (logoUrl) {
        return (
          <Avatar
            src={logoUrl}
            size={24}
            radius="sm"
            alt={selectedProductData.name}
          />
        )
      } else {
        return (
          <Avatar
            size={24}
            radius="sm"
            color={getColorFromName(selectedProductData.name)}
          >
            {getInitials(selectedProductData.name)}
          </Avatar>
        )
      }
    }
    return <Search size={16} />
  }

  return (
    <Box style={{ position: 'relative' }}>
      <Autocomplete
        value={searchValue}
        onChange={handleProductChange}
        onOptionSubmit={handleProductSelect}
        data={productOptions}
        label={label}
        placeholder={placeholder}
        leftSection={renderProductLeftSection()}
        leftSectionPointerEvents="none"
        size={size}
        maxDropdownHeight={300}
        error={error?.message}
        filter={({ options, search }) => {
          return options.filter((option) =>
            option.label.toLowerCase().includes(search.toLowerCase().trim())
          )
        }}
        renderOption={({ option }) => (
          <Group gap="sm">
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
            <Text size="sm">{option.label}</Text>
          </Group>
        )}
      />

      {showRequestButton && (
        <Paper p="md" mt="sm" withBorder style={{ textAlign: 'center' }}>
          <Text size="sm" c="gray.6" mb="sm">
            We couldn't find your product
          </Text>
          <Button color="cyan" size="md">
            Request Product
          </Button>
        </Paper>
      )}
    </Box>
  )
}
