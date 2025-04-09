import React from 'react'
import { Toaster } from 'sonner'
import { InternshipMatchingPlatform } from './components/InternshipMatchingPlatform'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InternshipMatchingPlatform />
      <Toaster position="top-right" />
    </div>
  )
}

export default App