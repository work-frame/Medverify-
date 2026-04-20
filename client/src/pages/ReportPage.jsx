import { useState } from 'react'
import API_URL from '../config'

export default function ReportPage({ onBack }) {
  const [form, setForm] = useState({
    nafdacNumber: '',
    drugName: '',
    location: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!form.nafdacNumber || !form.location) return
    try {
      await fetch(`${API_URL}/api/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch (err) {
      console.error(err)
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-6xl mb-4">🙏</div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Report Submitted</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-xs">
          Thank you for helping keep Nigerians safe. Your report has been recorded.
        </p>
        <button
          onClick={onBack}
          className="bg-purple-800 text-white font-bold py-3 px-8 rounded-xl text-sm"
        >
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-6 py-5 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 mr-1">←</button>
        <div className="w-8 h-8 bg-purple-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-black text-xs">MV</span>
        </div>
        <span className="text-purple-900 font-bold">Report a Fake Drug</span>
      </header>

      <div className="flex-1 px-6 py-8 max-w-sm mx-auto w-full">
        <p className="text-gray-500 text-sm mb-6">
          Help protect others by reporting suspected counterfeit drugs. All reports are reviewed.
        </p>

        <div className="space-y-4">
          {[
            { key: 'nafdacNumber', label: 'NAFDAC Number *', placeholder: 'e.g. A4-0123' },
            { key: 'drugName', label: 'Drug Name', placeholder: 'e.g. Coartem 80mg' },
            { key: 'location', label: 'Location / Pharmacy *', placeholder: 'e.g. Ojota Market, Lagos' },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">{field.label}</label>
              <input
                type="text"
                placeholder={field.placeholder}
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Additional Details</label>
            <textarea
              rows={3}
              placeholder="Describe what made you suspicious..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl text-sm mt-6 transition-all"
        >
          🚩 Submit Report
        </button>
      </div>
    </div>
  )
}
