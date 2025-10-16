// LocalStorage utility for tracking vendor responses to buyer RFPs

const STORAGE_KEY = 'vendor_responses'

/**
 * Vendor response statuses:
 * - responded: Vendor has submitted their RFP response
 * - declined: Vendor declined to respond
 * - shortlisted: Made it past initial review
 * - evaluating: Active evaluation/demo phase
 * - won: Vendor won the RFP
 * - lost: Vendor did not win
 */

/**
 * Get all vendor responses from localStorage
 * @returns {Object} Object with composite keys "rfpId_vendorId" mapping to response data
 */
export const getAllVendorResponses = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error reading vendor responses from localStorage:', error)
    return {}
  }
}

/**
 * Generate composite key for RFP + Vendor combination
 * @param {string|number} rfpId - The RFP ID
 * @param {string} vendorId - The vendor ID
 * @returns {string} Composite key
 */
const getResponseKey = (rfpId, vendorId) => {
  return `${rfpId}_${vendorId}`
}

/**
 * Save or update a vendor response
 * @param {string|number} rfpId - The RFP ID
 * @param {string} vendorId - The vendor ID
 * @param {string} status - Response status
 * @param {Object} additionalData - Additional data to store
 */
export const saveVendorResponse = (rfpId, vendorId, status, additionalData = {}) => {
  try {
    const responses = getAllVendorResponses()
    const key = getResponseKey(rfpId, vendorId)

    responses[key] = {
      rfpId,
      vendorId,
      status,
      submittedAt: responses[key]?.submittedAt || Date.now(), // Keep original submission time
      updatedAt: Date.now(),
      ...additionalData
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(responses))
  } catch (error) {
    console.error('Error saving vendor response:', error)
  }
}

/**
 * Get a specific vendor response
 * @param {string|number} rfpId - The RFP ID
 * @param {string} vendorId - The vendor ID
 * @returns {Object|null} Response data or null
 */
export const getVendorResponse = (rfpId, vendorId) => {
  const responses = getAllVendorResponses()
  const key = getResponseKey(rfpId, vendorId)
  return responses[key] || null
}

/**
 * Get all vendor responses for a specific RFP
 * @param {string|number} rfpId - The RFP ID
 * @returns {Array} Array of vendor response objects
 */
export const getResponsesForRFP = (rfpId) => {
  const responses = getAllVendorResponses()
  return Object.values(responses).filter(r => r.rfpId === rfpId)
}

/**
 * Update vendor response status
 * @param {string|number} rfpId - The RFP ID
 * @param {string} vendorId - The vendor ID
 * @param {string} newStatus - New status
 */
export const updateResponseStatus = (rfpId, vendorId, newStatus) => {
  const response = getVendorResponse(rfpId, vendorId)
  if (response) {
    saveVendorResponse(rfpId, vendorId, newStatus, {
      matchPercentage: response.matchPercentage,
      notes: response.notes
    })
  }
}

/**
 * Calculate match percentage for vendor response
 * This is a mock calculation for demo purposes
 * In production, this would analyze question responses against requirements
 * @param {string|number} rfpId - The RFP ID
 * @param {string} vendorId - The vendor ID
 * @returns {number} Match percentage (0-100)
 */
export const calculateMatchPercentage = (rfpId, vendorId) => {
  // Mock calculation: generate consistent but random-looking percentage
  // Use RFP ID and vendor ID to create deterministic value
  const seed = `${rfpId}_${vendorId}`.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const percentage = 60 + (seed % 36) // Range: 60-95%
  return Math.min(95, percentage)
}

/**
 * Check if vendor has responded to an RFP
 * @param {string|number} rfpId - The RFP ID
 * @param {string} vendorId - The vendor ID
 * @returns {boolean} True if vendor has responded
 */
export const hasVendorResponded = (rfpId, vendorId) => {
  return getVendorResponse(rfpId, vendorId) !== null
}

/**
 * Get response count for an RFP
 * @param {string|number} rfpId - The RFP ID
 * @returns {number} Number of vendor responses
 */
export const getResponseCount = (rfpId) => {
  return getResponsesForRFP(rfpId).length
}

/**
 * Get top match for an RFP (highest match percentage)
 * @param {string|number} rfpId - The RFP ID
 * @returns {Object|null} Vendor response with highest match or null
 */
export const getTopMatch = (rfpId) => {
  const responses = getResponsesForRFP(rfpId)
  if (responses.length === 0) return null

  return responses.reduce((top, current) => {
    const currentMatch = current.matchPercentage || 0
    const topMatch = top.matchPercentage || 0
    return currentMatch > topMatch ? current : top
  })
}

/**
 * Delete a vendor response
 * @param {string|number} rfpId - The RFP ID
 * @param {string} vendorId - The vendor ID
 */
export const deleteVendorResponse = (rfpId, vendorId) => {
  try {
    const responses = getAllVendorResponses()
    const key = getResponseKey(rfpId, vendorId)
    delete responses[key]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(responses))
  } catch (error) {
    console.error('Error deleting vendor response:', error)
  }
}

/**
 * Clear all vendor responses
 */
export const clearAllVendorResponses = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing vendor responses:', error)
  }
}

/**
 * Get response statistics for an RFP
 * @param {string|number} rfpId - The RFP ID
 * @returns {Object} Stats object
 */
export const getResponseStats = (rfpId) => {
  const responses = getResponsesForRFP(rfpId)

  return {
    total: responses.length,
    responded: responses.filter(r => r.status === 'responded').length,
    shortlisted: responses.filter(r => r.status === 'shortlisted').length,
    evaluating: responses.filter(r => r.status === 'evaluating').length,
    won: responses.filter(r => r.status === 'won').length,
    lost: responses.filter(r => r.status === 'lost').length,
    declined: responses.filter(r => r.status === 'declined').length,
  }
}
