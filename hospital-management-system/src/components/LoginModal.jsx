import { useState } from 'react'

const LoginModal = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: ''
  })

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setLoginData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegisterChange = (e) => {
    const { name, value } = e.target
    setRegisterData(prev => ({ ...prev, [name]: value }))
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    
    if (!loginData.email || !loginData.password) {
      alert("Please enter both email and password")
      return
    }

    onLogin(loginData.email, loginData.password)
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    
    const { firstName, lastName, email, phone, dob, password, confirmPassword } = registerData
    
    if (!firstName || !lastName || !email || !phone || !dob || !password || !confirmPassword) {
      alert("Please fill in all required fields")
      return
    }
    
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    onRegister(registerData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold font-poppins">Patient Portal Login</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          {/* Login Form */}
          {isLoginForm ? (
            <div id="loginFormContainer">
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="w-full p-3 border border-gray-300 rounded-lg" 
                    placeholder="patient@example.com" 
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="w-full p-3 border border-gray-300 rounded-lg" 
                    placeholder="Enter your password" 
                    required
                  />
                  <div className="text-right mt-1">
                    <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-hospital-blue text-white p-3 rounded-lg font-bold hover:bg-hospital-dark transition mb-4"
                >
                  Login to Dashboard
                </button>
              </form>
              
              <div className="text-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">New to MediCare Plus?</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setIsLoginForm(false)}
                className="w-full border-2 border-hospital-blue text-hospital-blue p-3 rounded-lg font-bold hover:bg-hospital-light transition"
              >
                Create New Account
              </button>
            </div>
          ) : (
            /* Register Form */
            <div id="registerFormContainer">
              <form onSubmit={handleRegisterSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={registerData.firstName}
                      onChange={handleRegisterChange}
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={registerData.lastName}
                      onChange={handleRegisterChange}
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    className="w-full p-3 border border-gray-300 rounded-lg" 
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    className="w-full p-3 border border-gray-300 rounded-lg" 
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input 
                    type="date" 
                    name="dob"
                    value={registerData.dob}
                    onChange={handleRegisterChange}
                    className="w-full p-3 border border-gray-300 rounded-lg" 
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                      type="password" 
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-start">
                    <input 
                      type="checkbox" 
                      id="registerTerms" 
                      className="mt-1 mr-2" 
                      required
                    />
                    <label htmlFor="registerTerms" className="text-sm text-gray-700">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-hospital-blue text-white p-3 rounded-lg font-bold hover:bg-hospital-dark transition mb-4"
                >
                  Create Account
                </button>
              </form>
              
              <div className="text-center">
                <button 
                  onClick={() => setIsLoginForm(true)}
                  className="text-primary hover:underline"
                >
                  Already have an account? Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginModal