import { useState, useEffect } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import DoctorsPage from './components/DoctorsPage'
import AppointmentsPage from './components/AppointmentsPage'
import DashboardPage from './components/DashboardPage'
import LoginModal from './components/LoginModal'
import NotificationPanel from './components/NotificationPanel'
import Footer from './components/Footer'
import api from './services/api'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showNotificationPanel, setShowNotificationPanel] = useState(false)
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [medicalRecords, setMedicalRecords] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)

  // Load user from token on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Verify token and get user profile
      api.get('/auth/profile')
        .then(res => {
          setCurrentUser(res.data)
          setIsLoggedIn(true)
        })
        .catch(err => {
          console.error('Token invalid', err)
          localStorage.removeItem('token')
        })
    }
  }, [])

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get('/doctors')
        setDoctors(res.data)
      } catch (error) {
        console.error('Error fetching doctors:', error)
      }
    }
    fetchDoctors()
  }, [])

  // Fetch user data when logged in
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      fetchUserData()
    }
  }, [isLoggedIn, currentUser])

  const fetchUserData = async () => {
    setLoading(true)
    try {
      const [appointmentsRes, medicalRes, notificationsRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/medical'),
        api.get('/notifications')
      ])
      setAppointments(appointmentsRes.data)
      setMedicalRecords(medicalRes.data)
      setNotifications(notificationsRes.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password })
      const { token, ...user } = res.data
      localStorage.setItem('token', token)
      setCurrentUser(user)
      setIsLoggedIn(true)
      setShowLoginModal(false)
      await fetchUserData()
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed')
    }
  }

  const handleRegister = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData)
      const { token, ...user } = res.data
      localStorage.setItem('token', token)
      setCurrentUser(user)
      setIsLoggedIn(true)
      setShowLoginModal(false)
      await fetchUserData()
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
    setIsLoggedIn(false)
    setCurrentPage('home')
    setAppointments([])
    setMedicalRecords([])
    setNotifications([])
  }

  const handleBookAppointment = async (appointmentData) => {
    try {
      const res = await api.post('/appointments', appointmentData)
      setAppointments(prev => [res.data, ...prev])
      // Refresh notifications
      const notificationsRes = await api.get('/notifications')
      setNotifications(notificationsRes.data)
      alert('Appointment booked successfully!')
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed')
    }
  }

  const handleCancelAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`)
      setAppointments(prev => prev.filter(app => app._id !== id))
    } catch (error) {
      alert('Failed to cancel appointment')
    }
  }

  const handleUpdateAppointmentStatus = async (id, status) => {
    try {
      const res = await api.put(`/appointments/${id}`, { status })
      setAppointments(prev => prev.map(app => app._id === id ? res.data : app))
    } catch (error) {
      alert('Failed to update appointment')
    }
  }

  const markNotificationAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`)
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n))
    } catch (error) {
      console.error('Failed to mark as read')
    }
  }

  const markAllNotificationsAsRead = async () => {
    try {
      await api.put('/notifications/read-all')
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    } catch (error) {
      console.error('Failed to mark all as read')
    }
  }

  const getUnreadNotificationCount = () => {
    return notifications.filter(n => !n.read).length
  }

  const handleClearAllNotifications = async () => {
    try {
      await api.delete('/notifications'); // we'll add this endpoint
      setNotifications([]);
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onBookAppointment={() => setCurrentPage('appointments')} />
      case 'doctors':
        return <DoctorsPage doctors={doctors} onBookDoctor={(doctorId) => {
          setCurrentPage('appointments')
          // Optionally pass selected doctor to appointments page
        }} />
      case 'appointments':
        return <AppointmentsPage 
          doctors={doctors} 
          onBookAppointment={handleBookAppointment} 
          isLoggedIn={isLoggedIn}
          onLoginRequired={() => setShowLoginModal(true)}
        />
      case 'dashboard':
        if (!isLoggedIn) {
          setShowLoginModal(true)
          return <HomePage onBookAppointment={() => setCurrentPage('appointments')} />
        }
        return <DashboardPage 
          currentUser={currentUser}
          appointments={appointments}
          medicalRecords={medicalRecords}
          onCancelAppointment={handleCancelAppointment}
          onUpdateAppointment={handleUpdateAppointmentStatus}
        />
      default:
        return <HomePage onBookAppointment={() => setCurrentPage('appointments')} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setShowLoginModal(true)}
        onNotificationClick={() => setShowNotificationPanel(!showNotificationPanel)}
        unreadNotificationCount={getUnreadNotificationCount()}
        onLogout={handleLogout}
      />
      
      <main>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hospital-blue"></div>
          </div>
        ) : (
          renderPage()
        )}
      </main>
      
      <Footer onNavigate={setCurrentPage} />
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      
      <NotificationPanel
        isOpen={showNotificationPanel}
        onClose={() => setShowNotificationPanel(false)}
        notifications={notifications}
        onMarkAllAsRead={markAllNotificationsAsRead}
        onMarkAsRead={markNotificationAsRead}
        onClearAll={handleClearAllNotifications}
      />
    </div>
  )
}

export default App