export default function AboutPage({ onBack }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="px-6 py-5 bg-white border-b border-gray-100 flex items-center gap-3">
        <button onClick={onBack} className="text-gray-400 hover:text-gray-600 mr-1">←</button>
        <div className="w-8 h-8 bg-purple-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-black text-xs">MV</span>
        </div>
        <span className="text-purple-900 font-bold">About MedVerify</span>
      </header>

      <div className="flex-1 px-6 py-8 max-w-sm mx-auto w-full">

        {/* Logo */}
        <div className="bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 rounded-2xl p-8 text-center mb-6">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">💊</span>
          </div>
          <h1 className="text-white text-2xl font-black mb-1">MedVerify</h1>
          <p className="text-purple-300 text-sm">Verify your drugs. Protect your life.</p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
          <h2 className="text-gray-800 font-bold text-sm uppercase tracking-wide mb-3">Our Mission</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            1 in 10 drugs in Nigeria is counterfeit. MedVerify exists to put the power of NAFDAC's 
            drug registry in the hands of every Nigerian — free, instant, and accessible on any phone.
          </p>
        </div>

        {/* Buildathon */}
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 mb-4">
          <h2 className="text-purple-800 font-bold text-sm uppercase tracking-wide mb-3">Built At</h2>
          <p className="text-purple-700 text-sm leading-relaxed">
            NACOS Buildathon 1.0 — McPherson University Innovation Challenge
          </p>
          <p className="text-purple-500 text-xs mt-1">
            Theme: Building Scalable Solutions for Nigeria's Digital Future
          </p>
        </div>

        {/* NAFDAC Contact */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-4">
          <h2 className="text-red-700 font-bold text-sm uppercase tracking-wide mb-3">
            🚨 Report to NAFDAC Directly
          </h2>
          <p className="text-red-600 text-sm mb-2">Found a fake drug? Contact NAFDAC:</p>
          <a href="tel:08001623322" className="block text-red-700 font-black text-lg">
            0800-162-3322
          </a>
          <p className="text-red-400 text-xs mt-1">Toll free · Available 24/7</p>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
          <h2 className="text-gray-800 font-bold text-sm uppercase tracking-wide mb-3">Built With</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB Atlas', 'Vercel', 'Render'].map((tech) => (
              <span key={tech} className="bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full border border-purple-100">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Version */}
        <p className="text-center text-gray-400 text-xs mt-4">
          MedVerify v1.0 · NACOS Buildathon 2026
        </p>
      </div>
    </div>
  )
}
