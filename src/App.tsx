import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { InternshipMatchingPlatform } from './components/InternshipMatchingPlatform'
import { InternshipManagement } from './components/InternshipManagement'
import { LoginModal } from './components/LoginModal'
import { Internship, Student, Application } from './types'

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [userRole, setUserRole] = React.useState<'student' | 'employer' | null>(null)
  const [currentUser, setCurrentUser] = React.useState<Student | null>(null)
  const [showLoginModal, setShowLoginModal] = React.useState(false)
  const [internships, setInternships] = React.useState<Internship[]>([
    {
      id: '1',
      employerId: 'emp1',
      title: 'Software Engineering Intern',
      description: 'Join our team as a software engineering intern',
      requirements: ['JavaScript', 'React', 'TypeScript'],
      location: 'Remote',
      duration: '3 months',
      salary: '$25/hour',
      deadline: '2024-06-01',
      status: 'open'
    }
  ])
  const [applications, setApplications] = React.useState<Application[]>([])

  const handleApply = (internshipId: string) => {
    if (!isAuthenticated || !currentUser) {
      setShowLoginModal(true)
      return
    }

    const newApplication: Application = {
      id: Date.now().toString(),
      studentId: currentUser.id,
      internshipId,
      status: 'pending',
      appliedAt: new Date().toISOString()
    }

    setApplications(prev => [...prev, newApplication])
    toast.success('Application submitted successfully!')
  }

  const handleLogin = (email: string) => {
    const role = email.includes('@company.com') ? 'employer' : 'student'
    setIsAuthenticated(true)
    setUserRole(role)
    setShowLoginModal(false)

    if (role === 'student') {
      setCurrentUser({
        id: '1',
        userId: 'user1',
        name: 'John Doe',
        major: 'Computer Science',
        skills: ['JavaScript', 'React', 'TypeScript'],
        education: 'Bachelor of Science',
        resume: 'resume.pdf'
      })
      toast.success('Logged in as student')
    } else {
      toast.success('Logged in as employer')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    setCurrentUser(null)
    toast.success('Logged out successfully')
  }

  const handleUpdateInternship = (id: string, updates: Partial<Internship>) => {
    setInternships(prev => 
      prev.map(internship => 
        internship.id === id ? { ...internship, ...updates } : internship
      )
    )
    toast.success('Internship updated successfully')
  }

  const handleDeleteInternship = (id: string) => {
    setInternships(prev => prev.filter(internship => internship.id !== id))
    toast.success('Internship deleted successfully')
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">Internship Platform</h1>
                </div>
              </div>
              <div className="flex items-center">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <InternshipMatchingPlatform
              internships={internships}
              students={currentUser ? [currentUser] : []}
              applications={applications}
              onApply={handleApply}
              isAuthenticated={isAuthenticated}
              onLogin={handleLogin}
            />
          } />
          <Route path="/manage" element={
            isAuthenticated && userRole === 'employer' ? (
              <InternshipManagement
                internships={internships}
                onUpdate={handleUpdateInternship}
                onDelete={handleDeleteInternship}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } />
        </Routes>

        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
          />
        )}

        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App