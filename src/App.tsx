import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { InternshipMatchingPlatform } from './components/InternshipMatchingPlatform'
import { InternshipManagement } from './components/InternshipManagement'
import { LoginModal } from './components/LoginModal'
import { Internship, Student, Application } from './types'

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [userRole, setUserRole] = React.useState<'student' | 'employer' | null>(null)
  const [currentUser, setCurrentUser] = React.useState<Student | null>(null)
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
  }

  const handleLogin = (email: string) => {
    const role = email.includes('@company.com') ? 'employer' : 'student'
    setIsAuthenticated(true)
    setUserRole(role)

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
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    setCurrentUser(null)
  }

  const handleUpdateInternship = (id: string, updates: Partial<Internship>) => {
    setInternships(prev => 
      prev.map(internship => 
        internship.id === id ? { ...internship, ...updates } : internship
      )
    )
  }

  const handleDeleteInternship = (id: string) => {
    setInternships(prev => prev.filter(internship => internship.id !== id))
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App