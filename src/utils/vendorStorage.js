// LocalStorage utility for managing selected vendor/seller

import sellers from '../data/sellers.json'

const STORAGE_KEY = 'selected_vendor_id'

/**
 * Get all available vendors/sellers
 * @returns {Array} Array of vendor objects
 */
export const getAllVendors = () => {
  return sellers
}

/**
 * Get a vendor by ID
 * @param {string} vendorId - The vendor ID
 * @returns {Object|null} Vendor object or null if not found
 */
export const getVendorById = (vendorId) => {
  return sellers.find(v => v.id === vendorId) || null
}

/**
 * Get the selected vendor ID from localStorage
 * @returns {string|null} Vendor ID or null if not set
 */
export const getSelectedVendorId = () => {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error reading selected vendor from localStorage:', error)
    return null
  }
}

/**
 * Set the selected vendor ID in localStorage
 * @param {string} vendorId - The vendor ID to select
 */
export const setSelectedVendor = (vendorId) => {
  try {
    localStorage.setItem(STORAGE_KEY, vendorId)
  } catch (error) {
    console.error('Error saving selected vendor to localStorage:', error)
  }
}

/**
 * Get the current vendor object
 * If no vendor is selected, returns the first vendor from the list
 * @returns {Object} Current vendor object
 */
export const getCurrentVendor = () => {
  const selectedId = getSelectedVendorId()

  // If a vendor is selected, return it
  if (selectedId) {
    const vendor = getVendorById(selectedId)
    if (vendor) return vendor
  }

  // Otherwise, return the first vendor as default
  return sellers[0]
}

/**
 * Clear the selected vendor from localStorage
 */
export const clearSelectedVendor = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing selected vendor from localStorage:', error)
  }
}

/**
 * Check if a vendor is currently selected
 * @returns {boolean} True if a vendor is selected
 */
export const hasSelectedVendor = () => {
  return getSelectedVendorId() !== null
}

/**
 * Get vendor display name (short name or company name)
 * @param {Object} vendor - Vendor object
 * @returns {string} Display name
 */
export const getVendorDisplayName = (vendor) => {
  return vendor.shortName || vendor.companyName
}
