// LocalStorage utility for buyer intake form data
import buyerProfiles from '../data/buyerProfiles.json'

const STORAGE_KEY = 'buyer_intakes'
const DRAFT_KEY = 'buyer_intake_draft'

/**
 * Generate a unique RFP ID
 * @returns {string} Unique RFP ID
 */
export const generateRFPId = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `rfp_${timestamp}_${random}`
}

/**
 * Get a random buyer profile (for demo purposes)
 * In production, this would be based on authenticated user
 * @returns {Object} Buyer profile
 */
const getBuyerProfile = () => {
  // For now, randomly select a buyer profile
  // In production, this would be determined by the logged-in user
  const randomIndex = Math.floor(Math.random() * buyerProfiles.length)
  return buyerProfiles[randomIndex]
}

/**
 * Save a completed buyer intake to localStorage
 * @param {Object} formData - The complete form data
 * @returns {string} The generated RFP ID
 */
export const saveBuyerIntake = (formData) => {
  try {
    const rfpId = generateRFPId()
    const currentDate = new Date().toISOString()
    const buyerProfile = getBuyerProfile()

    const intake = {
      ...formData,
      rfpId,
      createdAt: currentDate,
      postedDate: currentDate,
      status: 'Open',
      // Add buyer profile data
      buyerProfileId: buyerProfile.id,
      company: buyerProfile.companyName,
      location: buyerProfile.workLocation || buyerProfile.location,
      // Optional: add more enrichment fields
      industry: buyerProfile.industry,
      companySize: buyerProfile.companySize,
      headquarters: buyerProfile.headquarters
    }

    const intakes = getAllBuyerIntakes()
    intakes[rfpId] = intake
    localStorage.setItem(STORAGE_KEY, JSON.stringify(intakes))

    // Clear draft after successful save
    clearDraft()

    return rfpId
  } catch (error) {
    console.error('Error saving buyer intake to localStorage:', error)
    throw error
  }
}

/**
 * Get a specific buyer intake by ID
 * @param {string} rfpId - The RFP ID
 * @returns {Object|null} The intake data or null if not found
 */
export const getBuyerIntake = (rfpId) => {
  try {
    const intakes = getAllBuyerIntakes()
    return intakes[rfpId] || null
  } catch (error) {
    console.error('Error reading buyer intake from localStorage:', error)
    return null
  }
}

/**
 * Get all buyer intakes from localStorage
 * @returns {Object} Object with RFP IDs as keys and intake data as values
 */
export const getAllBuyerIntakes = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error reading buyer intakes from localStorage:', error)
    return {}
  }
}

/**
 * Get all buyer intakes as an array
 * @returns {Array} Array of intake objects
 */
export const getAllBuyerIntakesArray = () => {
  const intakes = getAllBuyerIntakes()
  return Object.values(intakes)
}

/**
 * Delete a buyer intake
 * @param {string} rfpId - The RFP ID to delete
 */
export const deleteBuyerIntake = (rfpId) => {
  try {
    const intakes = getAllBuyerIntakes()
    delete intakes[rfpId]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(intakes))
  } catch (error) {
    console.error('Error deleting buyer intake from localStorage:', error)
  }
}

/**
 * Clear all buyer intakes from localStorage
 */
export const clearAllBuyerIntakes = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing buyer intakes from localStorage:', error)
  }
}

// ============================================
// Draft Management Functions
// ============================================

/**
 * Generate a draft key for a specific form type
 * @param {string|null} formType - The form type (e.g., 'alsp', 'lawfirm', 'tech-new')
 * @returns {string} The storage key for this form type's draft
 */
const getDraftKey = (formType) => {
  return formType ? `${DRAFT_KEY}_${formType}` : DRAFT_KEY
}

/**
 * Save draft form data (in-progress intake)
 * @param {Object} formData - The current form data
 * @param {string|null} formType - The form type (e.g., 'alsp', 'lawfirm', 'tech-new')
 */
export const saveDraft = (formData, formType = null) => {
  try {
    const draft = {
      ...formData,
      lastUpdated: new Date().toISOString()
    }
    const key = getDraftKey(formType)
    localStorage.setItem(key, JSON.stringify(draft))
  } catch (error) {
    console.error('Error saving draft to localStorage:', error)
  }
}

/**
 * Get the saved draft
 * @param {string|null} formType - The form type (e.g., 'alsp', 'lawfirm', 'tech-new')
 * @returns {Object|null} The draft data or null if no draft exists
 */
export const getDraft = (formType = null) => {
  try {
    const key = getDraftKey(formType)
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Error reading draft from localStorage:', error)
    return null
  }
}

/**
 * Clear the saved draft
 * @param {string|null} formType - The form type (e.g., 'alsp', 'lawfirm', 'tech-new')
 */
export const clearDraft = (formType = null) => {
  try {
    const key = getDraftKey(formType)
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error clearing draft from localStorage:', error)
  }
}

/**
 * Check if a draft exists
 * @returns {boolean} True if a draft exists
 */
export const hasDraft = () => {
  return getDraft() !== null
}

/**
 * Update the status of a buyer intake
 * @param {string} rfpId - The RFP ID
 * @param {string} newStatus - The new status ('Open', 'Closed', 'In Review', 'Completed')
 * @returns {boolean} True if update was successful
 */
export const updateBuyerIntakeStatus = (rfpId, newStatus) => {
  try {
    const intakes = getAllBuyerIntakes()
    if (intakes[rfpId]) {
      intakes[rfpId].status = newStatus
      intakes[rfpId].statusUpdatedAt = new Date().toISOString()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(intakes))
      return true
    }
    return false
  } catch (error) {
    console.error('Error updating buyer intake status:', error)
    return false
  }
}
