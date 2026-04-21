import { useState } from 'react'
import API_URL from '../config'

export default function SearchPage({ onResult, onAbout }) {
  const [nafdacNumber, setNafdacNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!nafdacNumber.trim()) {
      setError('Please enter a NAFDAC number')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/verify/${nafdacNumber.trim()}`)
      const data = await res.json()
      onResult(data)
    } catch (err) {
      setError('Could not connect to server. Please try again.')
    } finally {
      setLoading(false)
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
            onChange={(e) => setNafdacNumber(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="e.g. A4-0123"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
          />
          {error && (
            <p className="text-red-500 text-xs mb-3">{error}</p>
          )}
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full bg-purple-800 hover:bg-purple-700 text-white font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Verify Drug ✓'}
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
