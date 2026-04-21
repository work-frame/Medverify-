import { useState } from 'react'
import API_URL from '../config'

export default function SearchPage({ onResult, onAbout }) {
  const [nafdacNumber, setNafdacNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [waking, setWaking] = useState(false)
  const [error, setError] = useState('')

  const validate = (value) => {
    if (!value.trim()) return 'Please enter a NAFDAC number'
    if (value.trim().length < 4) return 'NAFDAC number is too short'
    if (value.trim().length > 20) return 'NAFDAC number is too long'
    return null
  }

  const handleSearch = async () => {
    const validationError = validate(nafdacNumber)
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setLoading(true)

    // Show waking message after 4 seconds if still loading
    const wakingTimer = setTimeout(() => setWaking(true), 4000)

    try {
      const res = await fetch(`${API_URL}/api/verify/${nafdacNumber.trim()}`)
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      onResult(data)
    } catch (err) {
      setError('Could not connect to server. Please try again.')
    } finally {
      clearTimeout(wakingTimer)
      setLoading(false)
      setWaking(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 flex flex-col">
      <header className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
            <span className="text-purple-900 font-black text-sm">MV</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">MedVerify</span>
        </div>
        <button
          onClick={onAbout}
          className="text-purple-300 text-sm font-semibold hover:text-white transition-all"
        >
          About
        </button>
      </header>

      {/* Full screen loading overlay when waking Render */}
      {waking && (
        <div className="fixed inset-0 bg-purple-950/90 backdrop-blur flex flex-col items-center justify-center z-50">
          <svg className="animate-spin h-12 w-12 text-purple-300 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <h2 className="text-white font-black text-lg mb-2">Connecting to server...</h2>
          <p className="text-purple-300 text-sm text-center max-w-xs">
            Our server is waking up. This only happens once and takes about 30 seconds. Please wait.
          </p>
          {/* Progress dots */}
          <div className="flex gap-2 mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center pb-10">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur">
          <span className="text-3xl">💊</span>
        </div>

        <h1 className="text-white text-3xl font-black leading-tight mb-3">
          Is your drug <br />
          <span className="text-purple-300">safe to take?</span>
        </h1>

        <p className="text-purple-200 text-sm max-w-xs leading-relaxed mb-10">
          Enter the NAFDAC registration number on your drug packaging to instantly verify its authenticity.
        </p>

        <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            NAFDAC Registration Number
          </label>
          <input
            type="text"
            value={nafdacNumber}
            onChange={(e) => {
              setNafdacNumber(e.target.value)
              if (error) setError('')
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="e.g. A4-0123"
            maxLength={20}
            className={`w-full border rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-1 transition-all ${
              error ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }`}
          />
          <p className="text-right text-xs text-gray-400 mb-2">
            {nafdacNumber.length}/20
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-3">
              <p className="text-red-500 text-xs">⚠️ {error}</p>
            </div>
          )}
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-purple-800 hover:bg-purple-700 text-white font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Verifying...
              </span>
            ) : 'Verify Drug ✓'}
          </button>
        </div>

        {/* NAFDAC Hotline */}
        <div className="mt-6 bg-white/10 rounded-2xl px-5 py-3 backdrop-blur">
          <p className="text-purple-200 text-xs">🚨 NAFDAC Hotline</p>
          <a href="tel:08001623322" className="text-white font-black text-lg">0800-162-3322</a>
          <p className="text-purple-300 text-xs">Toll free · 24/7</p>
        </div>

        <div className="flex gap-6 mt-8">
          {[
            { value: '1 in 10', label: 'drugs are fake' },
            { value: 'Free', label: 'to verify' },
            { value: 'Instant', label: 'results' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-white font-black text-lg">{stat.value}</div>
              <div className="text-purple-300 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
