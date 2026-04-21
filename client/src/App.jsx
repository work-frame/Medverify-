import { useState } from 'react'
import SearchPage from './pages/SearchPage'
import ResultPage from './pages/ResultPage'
import ReportPage from './pages/ReportPage'
import AboutPage from './pages/AboutPage'

function App() {
  const [page, setPage] = useState('search')
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {page === 'search' && (
        <SearchPage
          onResult={(data) => {
            setResult(data)
            setPage('result')
          }}
          onAbout={() => setPage('about')}
        />
      )}
      {page === 'result' && (
        <ResultPage
          result={result}
          onBack={() => setPage('search')}
          onReport={() => setPage('report')}
        />
      )}
      {page === 'report' && (
        <ReportPage onBack={() => setPage('search')} />
      )}
      {page === 'about' && (
        <AboutPage onBack={() => setPage('search')} />
      )}
    </div>
  )
}

export default App
