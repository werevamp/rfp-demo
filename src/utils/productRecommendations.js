// Product recommendation utility for Step 8
import productsData from '../data/products.json'

const STORAGE_KEY = 'user_selected_products'

/**
 * Get 5 random products from the products.json file
 * @returns {Array} Array of 5 random product objects
 */
export const getRandomProducts = (count = 5) => {
  const shuffled = [...productsData].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

/**
 * Get previously selected products from localStorage
 * @returns {Array} Array of product IDs that user has previously selected
 */
export const getPreviouslySelectedProducts = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading previously selected products:', error)
    return []
  }
}

/**
 * Save selected products to localStorage for future use
 * @param {Array} productIds - Array of product IDs that were selected
 */
export const saveSelectedProducts = (productIds) => {
  try {
    const existing = getPreviouslySelectedProducts()
    // Merge with existing, keep unique values
    const merged = [...new Set([...existing, ...productIds])]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  } catch (error) {
    console.error('Error saving selected products:', error)
  }
}

/**
 * Get recommended products: prioritize previously selected, then fill with random
 * @param {number} count - Total number of products to recommend (default 5)
 * @returns {Array} Array of recommended product objects with metadata
 */
export const getRecommendedProducts = (count = 5) => {
  const previouslySelectedIds = getPreviouslySelectedProducts()

  // Get previously selected products that still exist in the products list
  const previousProducts = productsData.filter(p =>
    previouslySelectedIds.includes(p.id)
  )

  // If we have enough previous products, return them
  if (previousProducts.length >= count) {
    return previousProducts.slice(0, count).map((product, index) => ({
      ...product,
      isPrevious: true,
      isRecommended: index === 0
    }))
  }

  // Otherwise, fill remaining slots with random products
  const remainingCount = count - previousProducts.length
  const previousIds = previousProducts.map(p => p.id)
  const availableProducts = productsData.filter(p => !previousIds.includes(p.id))
  const randomProducts = availableProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, remainingCount)

  // Combine: previous products first, then random
  const combined = [
    ...previousProducts.map(product => ({
      ...product,
      isPrevious: true,
      isRecommended: false
    })),
    ...randomProducts.map(product => ({
      ...product,
      isPrevious: false,
      isRecommended: false
    }))
  ]

  // Mark first product as recommended (PRO+)
  if (combined.length > 0) {
    combined[0].isRecommended = true
  }

  return combined
}

/**
 * Format product for display in the UI
 * @param {Object} product - Product object from products.json
 * @returns {Object} Formatted product with value, label, and other display properties
 */
export const formatProductForDisplay = (product) => {
  return {
    id: product.id,
    value: `product-${product.id}`,
    label: product.name,
    logoUrl: product.details?.squareLogoUrl || product.details?.logoUrl || '',
    isRecommended: product.isRecommended || false,
    isPrevious: product.isPrevious || false
  }
}

/**
 * Get initials from product name for avatar fallback
 * @param {string} name - Product name
 * @returns {string} Initials (first 2 letters of first 2 words)
 */
export const getProductInitials = (name) => {
  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

/**
 * Generate consistent color from product name for avatar
 * @param {string} name - Product name
 * @returns {string} Mantine color name
 */
export const getProductColor = (name) => {
  const colors = [
    'blue', 'cyan', 'teal', 'green', 'lime',
    'yellow', 'orange', 'red', 'pink', 'grape',
    'violet', 'indigo'
  ]
  const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return colors[charSum % colors.length]
}
