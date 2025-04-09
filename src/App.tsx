import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { InternshipProvider, useInternship } from './contexts/InternshipContext'
import { InternshipMatchingPlatform } from './components/InternshipMatchingPlatform'
import InternshipManagement from "./components/InternshipManagement"
import { LoginModal } from './components/LoginModal'
import { Student } from './types'

const PrivateRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

const AppContent: React.FC = () => {
  const { isAuthenticated, userRole, user } = useAuth()
  const { internships, applications, applyForInternship } = useInternship()

  const handleApply = (internshipId: string) => {
    if (!isAuthenticated || !user) {
      return
    }
    applyForInternship(internshipId, 'Cover letter for application')
  }

  const getStudentFromUser = (user: any): Student => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      university: 'Unknown University',
      major: 'Unknown Major',
      skills: [],
      userId: user.id
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold text-gray-900">InternMatch</span>
              </Link>
            </div>
            <div className="flex items-center">
              {!isAuthenticated ? (
                <LoginModal />
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">{userRole}</span>
                  <button
                    onClick={() => {/* TODO: Implement logout */}}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <InternshipMatchingPlatform 
                internships={internships}
                students={user ? [getStudentFromUser(user)] : []}
                applications={applications}
                onApply={handleApply}
                isAuthenticated={isAuthenticated}
                onLogin={() => {/* TODO: Implement login */}}
              />
            } 
          />
          <Route
            path="/manage"
            element={
              <PrivateRoute roles={['employer']}>
                <InternshipManagement />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  )
}

const App: React.FC = () => {
  return (
    <Router basename="/">
      <AuthProvider>
        <InternshipProvider>
          <AppContent />
        </InternshipProvider>
      </AuthProvider>
    </Router>
  )
}

export default App