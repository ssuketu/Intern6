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

  // Mock data for demonstration
  const mockInternships: Internship[] = [
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
  ]

  const mockStudents: Student[] = [
    {
      id: '1',
      userId: 'user1',
      name: 'John Doe',
      major: 'Computer Science',
      skills: ['JavaScript', 'React', 'TypeScript'],
      education: 'Bachelor of Science',
      resume: 'resume.pdf'
    }
  ]

  const mockApplications: Application[] = [
    {
      id: '1',
      studentId: '1',
      internshipId: '1',
      status: 'pending',
      appliedAt: new Date().toISOString()
    }
  ]

  const handleApply = (internshipId: string) => {
    if (!isAuthenticated) {
      // Show login modal
      return
    }
    // Add your application logic here
    console.log('Applying for internship:', internshipId)
  }

  const handleLogin = (email: string) => {
    // In a real app, you would validate the email and determine the role
    const role = email.includes('@company.com') ? 'employer' : 'student'
    setIsAuthenticated(true)
    setUserRole(role)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={
            <InternshipMatchingPlatform
              internships={mockInternships}
              students={mockStudents}
              applications={mockApplications}
              onApply={handleApply}
              isAuthenticated={isAuthenticated}
              onLogin={handleLogin}
            />
          } />
          <Route path="/manage" element={
            isAuthenticated && userRole === 'employer' ? (
              <InternshipManagement
                internships={mockInternships}
                onUpdate={(id: string, updates: Partial<Internship>) => console.log('Update internship:', id, updates)}
                onDelete={(id: string) => console.log('Delete internship:', id)}
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