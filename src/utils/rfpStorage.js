// LocalStorage utility for tracking viewed RFPs and interest status

const STORAGE_KEY = 'rfp_viewed_ids'
const INTEREST_STORAGE_KEY = 'rfp_interested_ids'

/**
 * Get all viewed RFP IDs from localStorage
 * @returns {Object} Object with RFP IDs as keys and timestamps as values
 */
export const getViewedRFPs = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error reading viewed RFPs from localStorage:', error)
    return {}
  }
}

/**
 * Mark an RFP as viewed
 * @param {number|string} rfpId - The RFP ID to mark as viewed
 */
export const markRFPAsViewed = (rfpId) => {
  try {
    const viewed = getViewedRFPs()
    viewed[rfpId] = Date.now()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(viewed))
  } catch (error) {
    console.error('Error saving viewed RFP to localStorage:', error)
  }
}

/**
 * Check if an RFP has been viewed
 * @param {number|string} rfpId - The RFP ID to check
 * @returns {boolean} True if the RFP has been viewed
 */
export const isRFPViewed = (rfpId) => {
  const viewed = getViewedRFPs()
  return rfpId in viewed
}

/**
 * Get the timestamp when an RFP was viewed
 * @param {number|string} rfpId - The RFP ID
 * @returns {number|null} Timestamp or null if not viewed
 */
export const getViewedTimestamp = (rfpId) => {
  const viewed = getViewedRFPs()
  return viewed[rfpId] || null
}

/**
 * Clear all viewed RFPs from localStorage
 */
export const clearViewedRFPs = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing viewed RFPs from localStorage:', error)
  }
}

/**
 * Get count of viewed RFPs
 * @returns {number} Number of viewed RFPs
 */
export const getViewedCount = () => {
  const viewed = getViewedRFPs()
  return Object.keys(viewed).length
}

// ============================================
// Interest Tracking Functions
// ============================================

/**
 * Get all interested RFPs from localStorage
 * @returns {Object} Object with RFP IDs as keys and interest data as values
 * Format: { rfpId: { type: 'notify-now' | 'notify-later', timestamp: number } }
 */
export const getInterestedRFPs = () => {
  try {
    const stored = localStorage.getItem(INTEREST_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error reading interested RFPs from localStorage:', error)
    return {}
  }
}

/**
 * Mark an RFP as interested (Submit Application)
 * @param {number|string} rfpId - The RFP ID
 * @param {string} interestType - Either 'notify-now' or 'notify-later'
 */
export const markRFPInterest = (rfpId, interestType) => {
  try {
    const interested = getInterestedRFPs()
    interested[rfpId] = {
      type: interestType,
      timestamp: Date.now(),
      buyerResponse: null,
      responseTimestamp: null
    }
    localStorage.setItem(INTEREST_STORAGE_KEY, JSON.stringify(interested))
  } catch (error) {
    console.error('Error saving interested RFP to localStorage:', error)
  }
}

/**
 * Get the interest status for an RFP
 * @param {number|string} rfpId - The RFP ID
 * @returns {Object|null} Interest data or null if not interested
 */
export const getRFPInterest = (rfpId) => {
  const interested = getInterestedRFPs()
  return interested[rfpId] || null
}

/**
 * Check if an RFP is marked as interested
 * @param {number|string} rfpId - The RFP ID
 * @returns {boolean} True if the RFP is marked as interested
 */
export const isRFPInterested = (rfpId) => {
  const interested = getInterestedRFPs()
  return rfpId in interested
}

/**
 * Remove interest for an RFP
 * @param {number|string} rfpId - The RFP ID
 */
export const removeRFPInterest = (rfpId) => {
  try {
    const interested = getInterestedRFPs()
    delete interested[rfpId]
    localStorage.setItem(INTEREST_STORAGE_KEY, JSON.stringify(interested))
  } catch (error) {
    console.error('Error removing RFP interest from localStorage:', error)
  }
}

/**
 * Clear all interested RFPs from localStorage
 */
export const clearInterestedRFPs = () => {
  try {
    localStorage.removeItem(INTEREST_STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing interested RFPs from localStorage:', error)
  }
}

/**
 * Get count of interested RFPs
 * @returns {number} Number of interested RFPs
 */
export const getInterestedCount = () => {
  const interested = getInterestedRFPs()
  return Object.keys(interested).length
}

/**
 * Set buyer response for an RFP application
 * @param {number|string} rfpId - The RFP ID
 * @param {string} response - Either 'accepted' or 'rejected'
 */
export const setBuyerResponse = (rfpId, response) => {
  try {
    const interested = getInterestedRFPs()
    if (interested[rfpId]) {
      interested[rfpId].buyerResponse = response
      interested[rfpId].responseTimestamp = Date.now()
      localStorage.setItem(INTEREST_STORAGE_KEY, JSON.stringify(interested))
    }
  } catch (error) {
    console.error('Error setting buyer response:', error)
  }
}

/**
 * Get all pending applications (no buyer response yet)
 * @returns {Array} Array of { rfpId, data } for pending applications
 */
export const getPendingApplications = () => {
  const interested = getInterestedRFPs()
  return Object.entries(interested)
    .filter(([_, data]) => data.buyerResponse === null)
    .map(([rfpId, data]) => ({ rfpId, ...data }))
}

/**
 * Get all accepted applications
 * @returns {Array} Array of { rfpId, data } for accepted applications
 */
export const getAcceptedApplications = () => {
  const interested = getInterestedRFPs()
  return Object.entries(interested)
    .filter(([_, data]) => data.buyerResponse === 'accepted')
    .map(([rfpId, data]) => ({ rfpId, ...data }))
}

/**
 * Get all rejected applications
 * @returns {Array} Array of { rfpId, data } for rejected applications
 */
export const getRejectedApplications = () => {
  const interested = getInterestedRFPs()
  return Object.entries(interested)
    .filter(([_, data]) => data.buyerResponse === 'rejected')
    .map(([rfpId, data]) => ({ rfpId, ...data }))
}

/**
 * Get count of pending applications
 * @returns {number} Number of pending applications
 */
export const getPendingCount = () => {
  return getPendingApplications().length
}
