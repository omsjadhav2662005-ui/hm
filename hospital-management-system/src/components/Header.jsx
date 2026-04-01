import { useState } from 'react'

const Header = ({ 
  currentPage, 
  onNavigate, 
  isLoggedIn, 
  onLoginClick, 
  onNotificationClick, 
  unreadNotificationCount,
  onLogout 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavigation = (page) => {
    onNavigate(page)
    setMobileMenuOpen(false)
  }

  const handleLoginClick = () => {
    if (isLoggedIn) {
      onNavigate('dashboard')
    } else {
      onLoginClick()
    }
    setMobileMenuOpen(false)
  }

  return (
    <header className="gradient-bg text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('home')}>
            <div className="bg-white p-2 rounded-lg">
              <i className="fas fa-hospital text-hospital-blue text-2xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold font-poppins">MediCare Plus</h1>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation('home')}
              className={`hover:text-white font-medium ${currentPage === 'home' ? 'text-white font-semibold' : 'text-hospital-light'}`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('doctors')}
              className={`hover:text-white font-medium ${currentPage === 'doctors' ? 'text-white font-semibold' : 'text-hospital-light'}`}
            >
              Doctors
            </button>
            <button 
              onClick={() => handleNavigation('appointments')}
              className={`hover:text-white font-medium ${currentPage === 'appointments' ? 'text-white font-semibold' : 'text-hospital-light'}`}
            >
              Appointments
            </button>
            <button 
              onClick={() => handleNavigation('dashboard')}
              className={`hover:text-white font-medium ${currentPage === 'dashboard' ? 'text-white font-semibold' : 'text-hospital-light'}`}
            >
              Dashboard
            </button>
          </nav>
          
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={onNotificationClick}
                className="p-2 rounded-full hover:bg-hospital-dark relative"
              >
                <i className="fas fa-bell text-xl"></i>
                {unreadNotificationCount > 0 && (
                  <span className="notification-badge">{unreadNotificationCount}</span>
                )}
              </button>
            </div>
            <div className="hidden md:block">
              <button 
                onClick={handleLoginClick}
                className={`px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition ${
                  isLoggedIn 
                    ? 'bg-accent text-white hover:bg-green-600' 
                    : 'bg-white text-hospital-blue hover:bg-gray-100'
                }`}
              >
                {isLoggedIn ? 'My Dashboard' : 'Login / Register'}
              </button>
              {isLoggedIn && (
                <button 
                  onClick={onLogout}
                  className="ml-2 px-4 py-2 rounded-lg font-medium bg-danger text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              )}
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-hospital-dark"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-hospital-dark">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => handleNavigation('home')}
                className="text-left py-2 hover:text-white font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('doctors')}
                className="text-left py-2 hover:text-white font-medium"
              >
                Doctors
              </button>
              <button 
                onClick={() => handleNavigation('appointments')}
                className="text-left py-2 hover:text-white font-medium"
              >
                Appointments
              </button>
              <button 
                onClick={() => handleNavigation('dashboard')}
                className="text-left py-2 hover:text-white font-medium"
              >
                Dashboard
              </button>
              <div className="pt-2 border-t border-gray-600">
                <button 
                  onClick={handleLoginClick}
                  className={`w-full px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition ${
                    isLoggedIn 
                      ? 'bg-accent text-white hover:bg-green-600' 
                      : 'bg-white text-hospital-blue hover:bg-gray-100'
                  }`}
                >
                  {isLoggedIn ? 'My Dashboard' : 'Login / Register'}
                </button>
                {isLoggedIn && (
                  <button 
                    onClick={onLogout}
                    className="w-full mt-2 px-4 py-2 rounded-lg font-medium bg-danger text-white hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header