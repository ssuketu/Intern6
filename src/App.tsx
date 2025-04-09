import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './context/AuthContext'
import { InternshipProvider, useInternship } from './context/InternshipContext'
import { InternshipMatchingPlatform } from './components/InternshipMatchingPlatform'
import InternshipManagement from "./components/InternshipManagement"
import { LoginModal } from './components/LoginModal'

const AppContent: React.FC = () => {
  const { isAuthenticated, userRole, currentUser, login, logout } = useAuth()
  const { internships, applications, applyForInternship } = useInternship()
  const [showLoginModal, setShowLoginModal] = React.useState(false)

  const handleApply = (internshipId: string) => {
    if (!isAuthenticated || !currentUser) {
      setShowLoginModal(true)
      return
    }
    applyForInternship(internshipId, currentUser.id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-900">
                Internship Platform
              </Link>
              {isAuthenticated && userRole === 'employer' && (
                <Link
                  to="/manage"
                  className="ml-6 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Manage Internships
                </Link>
              )}
            </div>
            <div className="flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    {userRole === 'student' ? currentUser?.name : 'Employer'}
                  </span>
                  <button
                    onClick={logout}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={
            <InternshipMatchingPlatform
              internships={internships}
              students={currentUser ? [currentUser] : []}
              applications={applications}
              onApply={handleApply}
              isAuthenticated={isAuthenticated}
              onLogin={login}
            />
          } />
          <Route path="/manage" element={
            isAuthenticated && userRole === 'employer' ? (
              <InternshipManagement />
            ) : (
              <Navigate to="/" replace />
            )
          } />
        </Routes>
      </main>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={(email) => {
            login(email)
            setShowLoginModal(false)
          }}
        />
      )}

      <Toaster position="top-right" />
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <InternshipProvider>
          <AppContent />
        </InternshipProvider>
      </AuthProvider>
    </Router>
  )
}

export default App