const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <i className="fas fa-hospital text-hospital-blue text-xl"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold font-poppins">MediCare Plus</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-4">Providing 24/7 access to healthcare services through our secure online portal.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="text-gray-300 hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold font-poppins mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="text-gray-300 hover:text-white"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('doctors')}
                  className="text-gray-300 hover:text-white"
                >
                  Find a Doctor
                </button>
              </li>
              <li><a href="#" className="text-gray-300 hover:text-white">Our Services</a></li>
              <li>
                <button 
                  onClick={() => onNavigate('appointments')}
                  className="text-gray-300 hover:text-white"
                >
                  Book Appointment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="text-gray-300 hover:text-white"
                >
                  Patient Portal
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold font-poppins mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Online Consultations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Appointment Booking</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Medical Records Access</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Prescription Refills</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Billing & Payments</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold font-poppins mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-gray-300"></i>
                <span className="text-gray-300">123 Medical Center Drive, Health City, HC 12345</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-gray-300"></i>
                <span className="text-gray-300">(555) 123-HEAL</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-gray-300"></i>
                <span className="text-gray-300">support@medicareplus.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-3 text-gray-300"></i>
                <span className="text-gray-300">24/7 Emergency Support</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025-2026 MediCare Plus Hospital Management System. All rights reserved.</p>
          <p className="mt-2 text-sm">This is a demonstration system for patient portal functionality.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer