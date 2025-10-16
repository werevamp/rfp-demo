// LocalStorage utility for RFP question responses

const STORAGE_KEY = 'rfp_question_responses'
const GLOBAL_ANSWERS_KEY = 'rfp_global_answers'

/**
 * Get all question responses for an RFP
 * @param {number|string} rfpId - The RFP ID
 * @returns {Object} Object with question IDs as keys and response data as values
 */
export const getQuestionResponses = (rfpId) => {
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY}_${rfpId}`)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error reading question responses from localStorage:', error)
    return {}
  }
}

/**
 * Save a question response
 * @param {number|string} rfpId - The RFP ID
 * @param {number|string} questionId - The question ID
 * @param {*} response - The response data (can be string, array, object)
 */
export const saveQuestionResponse = (rfpId, questionId, response) => {
  try {
    // Save to RFP-specific storage
    const responses = getQuestionResponses(rfpId)

    // Preserve the existing status if the question is already marked as completed
    const existingStatus = responses[questionId]?.status
    const newStatus = existingStatus === 'completed'
      ? 'completed'
      : (response ? 'in_progress' : 'not_started')

    responses[questionId] = {
      value: response,
      timestamp: Date.now(),
      status: newStatus,
      ...(existingStatus === 'completed' && { completedAt: responses[questionId].completedAt })
    }
    localStorage.setItem(`${STORAGE_KEY}_${rfpId}`, JSON.stringify(responses))

    // Only save to global storage for non-buyer-specific questions
    // Buyer-specific questions (IDs starting with "buyer-") should NOT be shared across RFPs
    const isBuyerSpecific = typeof questionId === 'string' && questionId.startsWith('buyer-')
    if (response && !isBuyerSpecific) {
      saveGlobalAnswer(questionId, response)
    }
  } catch (error) {
    console.error('Error saving question response to localStorage:', error)
  }
}

/**
 * Mark a question as complete
 * @param {number|string} rfpId - The RFP ID
 * @param {number|string} questionId - The question ID
 */
export const markQuestionComplete = (rfpId, questionId) => {
  try {
    const responses = getQuestionResponses(rfpId)
    if (responses[questionId]) {
      responses[questionId].status = 'completed'
      responses[questionId].completedAt = Date.now()
    } else {
      // Create a new response entry if one doesn't exist
      // This handles cases where questions are marked complete without having been answered
      // (e.g., optional questions or multiselect with no selections)
      responses[questionId] = {
        value: null,
        status: 'completed',
        completedAt: Date.now(),
        timestamp: Date.now()
      }
    }
    localStorage.setItem(`${STORAGE_KEY}_${rfpId}`, JSON.stringify(responses))
  } catch (error) {
    console.error('Error marking question complete:', error)
  }
}

/**
 * Get all global answers (shared across RFPs)
 * @returns {Object} Object with question IDs as keys and response values
 */
export const getGlobalAnswers = () => {
  try {
    const stored = localStorage.getItem(GLOBAL_ANSWERS_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error reading global answers from localStorage:', error)
    return {}
  }
}

/**
 * Save answer to global store
 * @param {number|string} questionId - The question ID
 * @param {*} response - The response value
 */
export const saveGlobalAnswer = (questionId, response) => {
  try {
    const global = getGlobalAnswers()
    global[questionId] = response
    localStorage.setItem(GLOBAL_ANSWERS_KEY, JSON.stringify(global))
  } catch (error) {
    console.error('Error saving global answer:', error)
  }
}

/**
 * Get response for a specific question (with global fallback)
 * @param {number|string} rfpId - The RFP ID
 * @param {number|string} questionId - The question ID
 * @returns {Object|null} Response data or null if not found
 */
export const getQuestionResponse = (rfpId, questionId) => {
  // First check RFP-specific response
  const responses = getQuestionResponses(rfpId)
  if (responses[questionId]) {
    return responses[questionId]
  }

  // Fallback to global answer if RFP-specific doesn't exist
  const globalAnswers = getGlobalAnswers()
  if (globalAnswers[questionId]) {
    return {
      value: globalAnswers[questionId],
      status: 'pre_filled',
      timestamp: Date.now()
    }
  }

  return null
}

/**
 * Calculate progress statistics
 * @param {number|string} rfpId - The RFP ID
 * @param {number} totalQuestions - Total number of questions
 * @returns {Object} Progress stats (completed, inProgress, remaining, percentage)
 */
export const getProgressStats = (rfpId, totalQuestions) => {
  const responses = getQuestionResponses(rfpId)
  const stats = {
    completed: 0,
    inProgress: 0,
    remaining: 0,
    percentage: 0
  }

  Object.values(responses).forEach(response => {
    if (response.status === 'completed') {
      stats.completed++
    } else if (response.status === 'in_progress') {
      stats.inProgress++
    }
  })

  stats.remaining = totalQuestions - stats.completed - stats.inProgress
  stats.percentage = totalQuestions > 0
    ? Math.round((stats.completed / totalQuestions) * 100)
    : 0

  return stats
}

/**
 * Check if a question is completed
 * @param {number|string} rfpId - The RFP ID
 * @param {number|string} questionId - The question ID
 * @returns {boolean} True if completed
 */
export const isQuestionCompleted = (rfpId, questionId) => {
  const response = getQuestionResponse(rfpId, questionId)
  return response?.status === 'completed'
}

/**
 * Clear all responses for an RFP
 * @param {number|string} rfpId - The RFP ID
 */
export const clearQuestionResponses = (rfpId) => {
  try {
    localStorage.removeItem(`${STORAGE_KEY}_${rfpId}`)
  } catch (error) {
    console.error('Error clearing question responses:', error)
  }
}

/**
 * Export responses for download/submission
 * @param {number|string} rfpId - The RFP ID
 * @returns {Object} Formatted responses
 */
export const exportResponses = (rfpId) => {
  const responses = getQuestionResponses(rfpId)
  return {
    rfpId,
    exportedAt: Date.now(),
    responses: responses
  }
}

/**
 * Clear all question data from localStorage (all RFPs and global answers)
 */
export const clearAllQuestionData = () => {
  try {
    // Clear global answers
    localStorage.removeItem(GLOBAL_ANSWERS_KEY)

    // Clear all RFP-specific question responses
    // Find all keys that match the pattern rfp_question_responses_*
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(STORAGE_KEY)) {
        keysToRemove.push(key)
      }
    }

    // Remove all matching keys
    keysToRemove.forEach(key => localStorage.removeItem(key))
  } catch (error) {
    console.error('Error clearing all question data:', error)
  }
}
