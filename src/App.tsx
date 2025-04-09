import * as React from 'react'
import { Toaster } from 'sonner'
import { InternshipMatchingPlatform } from './components/InternshipMatchingPlatform'
import { Internship, Student, Application } from './types'

const App: React.FC = () => {
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
    console.log('Applying for internship:', internshipId)
    // Add your application logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InternshipMatchingPlatform
        internships={mockInternships}
        students={mockStudents}
        applications={mockApplications}
        onApply={handleApply}
      />
      <Toaster position="top-right" />
    </div>
  )
}

export default App