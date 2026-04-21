export default function ResultPage({ result, onBack, onReport }) {
  const verified = result?.status === 'verified'

  const handleShare = async () => {
    const text = verified
      ? `I just verified ${result.drugName} (NAFDAC: ${result.nafdacNumber}) with MedVerify and it's authentic ✅. Check your drugs at medverify.vercel.app`
      : `⚠️ Warning: NAFDAC number ${result.nafdacNumber} could not be verified. Stay safe — check your drugs at medverify.vercel.app`

    if (navigator.share) {
      await navigator.share({ title: 'MedVerify', text })
    } else {
      await navigator.clipboard.writeText(text)
      alert('Result copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 mr-1">←</button>
        <div className="w-8 h-8 bg-purple-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-black text-xs">MV</span>
        </div>
        <span className="text-purple-900 font-bold">MedVerify</span>
      </header>

      <div className="flex-1 px-6 py-8 max-w-sm mx-auto w-full">

        {/* Result Badge */}
        <div className={`rounded-2xl p-6 text-center mb-6 ${verified ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="text-5xl mb-3">{verified ? '✅' : '⚠️'}</div>
          <h2 className={`text-xl font-black mb-1 ${verified ? 'text-green-700' : 'text-red-700'}`}>
            {verified ? 'Verified Authentic' : 'Not Verified'}
          </h2>
          <p className={`text-sm ${verified ? 'text-green-600' : 'text-red-600'}`}>
            {verified
              ? 'This drug is registered with NAFDAC'
              : 'This drug could not be verified. Do not consume.'}
          </p>
          {verified && result.category && (
            <span className="inline-block mt-3 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              {result.category} · {result.dosageForm}
            </span>
          )}
        </div>

        {/* Drug Details */}
        {verified && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            <div className="px-5 py-4 border-b border-gray-50">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Drug Details</h3>
            </div>
            {[
              { label: 'Drug Name',    value: result.drugName },
              { label: 'Manufacturer', value: result.manufacturer },
              { label: 'NAFDAC No.',   value: result.nafdacNumber },
              { label: 'Batch Number', value: result.batchNumber },
              { label: 'Expiry Date',  value: result.expiryDate },
              { label: 'Category',     value: result.category },
              { label: 'Dosage Form',  value: result.dosageForm },
            ].map((item) => (
              <div key={item.label} className="px-5 py-3 flex justify-between items-center border-b border-gray-50 last:border-0">
                <span className="text-gray-500 text-sm">{item.label}</span>
                <span className="text-gray-800 text-sm font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Warning box for unverified */}
        {!verified && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">
            <h4 className="text-red-700 font-bold text-sm mb-2">⚠️ What to do</h4>
            <ul className="text-red-600 text-sm space-y-1">
              <li>• Do not consume this drug</li>
              <li>• Return it to where you bought it</li>
              <li>• Report it using the button below</li>
              <li>• Contact NAFDAC on 0800-162-3322</li>
            </ul>
          </div>
        )}

        {/* Actions */}
        <button
          onClick={handleShare}
          className="w-full bg-purple-800 hover:bg-purple-700 text-white font-bold py-3 rounded-xl text-sm mb-3 transition-all"
        >
          📤 Share Result
        </button>
        <button
          onClick={onBack}
          className="w-full bg-white hover:bg-gray-50 text-purple-800 font-bold py-3 rounded-xl text-sm border border-purple-200 mb-3 transition-all"
        >
          Verify Another Drug
        </button>
        <button
          onClick={onReport}
          className="w-full bg-white hover:bg-gray-50 text-red-500 font-bold py-3 rounded-xl text-sm border border-red-200 transition-all"
        >
          🚩 Report Suspicious Drug
        </button>
      </div>
    </div>
  )
}
