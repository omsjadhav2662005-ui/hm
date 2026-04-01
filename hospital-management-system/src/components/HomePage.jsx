const HomePage = ({ onBookAppointment }) => {
  return (
    <section id="homePage">
      {/* Hero Section */}
      <div className="gradient-bg text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Your Health, Our Priority</h2>
              <p className="text-lg mb-6">Access hospital services anytime, anywhere. Book appointments, view medical records, and communicate with healthcare providers through our secure patient portal.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={onBookAppointment}
                  className="bg-white text-hospital-blue px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
                >
                  Book Appointment
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="/images/homepage.jpeg" 
                alt="Doctor consulting with patient" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold font-poppins text-center text-gray-800 mb-10">How Our System Helps You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl card-shadow text-center">
            <div className="bg-hospital-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-calendar-check text-hospital-blue text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold font-poppins mb-3">Easy Appointment Booking</h3>
            <p className="text-gray-600">Book, reschedule or cancel appointments with doctors in real-time. Receive instant confirmation and reminders.</p>
          </div>
          <div className="bg-white p-6 rounded-xl card-shadow text-center">
            <div className="bg-hospital-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-file-medical text-hospital-blue text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold font-poppins mb-3">Medical Records Access</h3>
            <p className="text-gray-600">View your medical history, prescriptions, test reports and billing information securely from your dashboard.</p>
          </div>
          <div className="bg-white p-6 rounded-xl card-shadow text-center">
            <div className="bg-hospital-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-comments text-hospital-blue text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold font-poppins mb-3">24/7 Communication</h3>
            <p className="text-gray-600">Send messages to your healthcare providers, receive notifications and get answers to your medical queries.</p>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="bg-hospital-light">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-hospital-blue">50+</div>
              <div className="text-gray-700">Specialist Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-hospital-blue">24/7</div>
              <div className="text-gray-700">Online Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-hospital-blue">10K+</div>
              <div className="text-gray-700">Patients Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-hospital-blue">30min</div>
              <div className="text-gray-700">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage