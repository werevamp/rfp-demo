import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Send, Paperclip, X } from 'lucide-react'

export default function ProposalForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    coverLetter: '',
    proposedBudget: '',
    timeline: '',
    technicalApproach: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Simulate successful submission
    alert('Proposal submitted successfully!')
    console.log('Proposal submitted:', formData)

    // Navigate back to inbox
    navigate({ to: '/' })
  }

  const handleCancel = () => {
    navigate({ to: '/' })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Submit Your Proposal</h2>
        <p className="text-sm text-gray-600 mt-1">
          Please fill out all sections of your proposal below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <FormField
          label="Cover Letter"
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleChange}
          placeholder="Introduce yourself and explain why you're the best fit for this project..."
          rows={6}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Proposed Budget"
            name="proposedBudget"
            value={formData.proposedBudget}
            onChange={handleChange}
            placeholder="e.g., $75,000"
            type="text"
            required
          />

          <FormField
            label="Timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            placeholder="e.g., 12 weeks"
            type="text"
            required
          />
        </div>

        <FormField
          label="Technical Approach"
          name="technicalApproach"
          value={formData.technicalApproach}
          onChange={handleChange}
          placeholder="Describe your technical approach, methodology, and any relevant experience..."
          rows={8}
          required
        />

        <AttachmentsSection />

        <FormActions onCancel={handleCancel} />
      </form>
    </div>
  )
}

function FormField({ label, name, value, onChange, placeholder, rows, type = 'text', required = false }) {
  const isTextarea = !!rows

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-vertical"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      )}
    </div>
  )
}

function AttachmentsSection() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Attachments
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-2">
          Upload your portfolio, resume, or other relevant documents
        </p>
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Browse files
        </button>
        <p className="text-xs text-gray-500 mt-1">
          PDF, DOC, or image files up to 10MB
        </p>
      </div>
    </div>
  )
}

function FormActions({ onCancel }) {
  return (
    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <X className="h-4 w-4 mr-2" />
        Cancel
      </button>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        <Send className="h-4 w-4 mr-2" />
        Submit Proposal
      </button>
    </div>
  )
}