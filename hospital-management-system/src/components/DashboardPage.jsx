const DashboardPage = ({ currentUser, appointments, medicalRecords, onCancelAppointment, onUpdateAppointment }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'confirmed':
      case 'completed':
      case 'resolved':
        return 'text-accent'
      case 'pending':
      case 'treatment ongoing':
      case 'follow-up required':
        return 'text-warning'
      case 'cancelled':
        return 'text-danger'
      default:
        return 'text-gray-600'
    }
  }

  // Stats
  const upcomingAppointments = appointments.filter(app => app.status !== 'cancelled' && app.status !== 'completed').length
  const activePrescriptions = 5 // This would come from backend later
  const pendingReports = 3
  const pendingPayment = 245.50

  return (
    <section id="dashboardPage">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold font-poppins text-gray-800">Patient Dashboard</h2>
            <p className="text-gray-600">Welcome back, <span className="font-semibold">{currentUser?.firstName} {currentUser?.lastName}</span></p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-sm text-gray-500">Last login: Today, 10:30 AM</div>
          </div>
        </div>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl card-shadow dashboard-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-2xl font-bold text-hospital-blue">{upcomingAppointments}</div>
                <div className="text-gray-600">Upcoming Appointments</div>
              </div>
              <div className="bg-hospital-light p-3 rounded-lg">
                <i className="fas fa-calendar text-hospital-blue"></i>
              </div>
            </div>
            {/* <a href="#" className="text-primary text-sm font-medium mt-3 inline-block hover:underline">View All</a> */}
          </div>
          <div className="bg-white p-5 rounded-xl card-shadow dashboard-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-2xl font-bold text-accent">{activePrescriptions}</div>
                <div className="text-gray-600">Active Prescriptions</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <i className="fas fa-prescription text-accent"></i>
              </div>
            </div>
            {/* <a href="#" className="text-primary text-sm font-medium mt-3 inline-block hover:underline">View All</a> */}
          </div>
          <div className="bg-white p-5 rounded-xl card-shadow dashboard-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-2xl font-bold text-purple-600">{pendingReports}</div>
                <div className="text-gray-600">Pending Test Reports</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <i className="fas fa-file-medical-alt text-purple-600"></i>
              </div>
            </div>
            {/* <a href="#" className="text-primary text-sm font-medium mt-3 inline-block hover:underline">View All</a> */}
          </div>
          <div className="bg-white p-5 rounded-xl card-shadow dashboard-card">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-2xl font-bold text-warning">${pendingPayment.toFixed(2)}</div>
                <div className="text-gray-600">Pending Payment</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <i className="fas fa-file-invoice-dollar text-warning"></i>
              </div>
            </div>
            {/* <a href="#" className="text-primary text-sm font-medium mt-3 inline-block hover:underline">Pay Now</a> */}
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl card-shadow mb-6">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-xl font-bold font-poppins">Upcoming Appointments</h3>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  {appointments.filter(app => app.status !== 'cancelled' && app.status !== 'completed').length === 0 ? (
                    <p className="text-gray-500">No upcoming appointments</p>
                  ) : (
                    appointments.filter(app => app.status !== 'cancelled' && app.status !== 'completed').map(appointment => (
                      <div key={appointment._id} className="appointment-card bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="mb-3 md:mb-0">
                            <div className="flex items-center mb-1">
                              <h4 className="font-bold font-poppins text-lg">{appointment.doctorName}</h4>
                              <span className="ml-2 bg-hospital-light text-hospital-blue text-xs font-medium px-2 py-1 rounded">
                                {appointment.specialty}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <i className="fas fa-calendar-alt mr-2"></i>
                              <span>{formatDate(appointment.date)} at {appointment.time}</span>
                            </div>
                            <div className="mt-2">
                              <span className="text-sm text-gray-600">Reason: {appointment.reason}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <span className={`${getStatusColor(appointment.status)} font-medium mr-4`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                            <div className="flex space-x-2">
                              <button 
                                className="text-primary hover:text-hospital-dark" 
                                title="Reschedule"
                                onClick={() => onUpdateAppointment(appointment._id, 'confirmed')} // example
                              >
                                <i className="fas fa-calendar-alt"></i>
                              </button>
                              <button 
                                className="text-gray-500 hover:text-gray-700" 
                                title="Cancel"
                                onClick={() => onCancelAppointment(appointment._id)}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            {/* Medical History Summary */}
            <div className="bg-white rounded-xl card-shadow">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-xl font-bold font-poppins">Recent Medical History</h3>
              </div>
              <div className="p-5">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-gray-700 font-medium">Date</th>
                        <th className="text-left py-3 text-gray-700 font-medium">Doctor</th>
                        <th className="text-left py-3 text-gray-700 font-medium">Diagnosis</th>
                        <th className="text-left py-3 text-gray-700 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicalRecords.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="py-4 text-center text-gray-500">No medical records found</td>
                        </tr>
                      ) : (
                        medicalRecords.map((record, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3">{formatDate(record.date)}</td>
                            <td className="py-3">{record.doctor}</td>
                            <td className="py-3">{record.diagnosis}</td>
                            <td className="py-3">
                              <span className={`${getStatusColor(record.status)} font-medium`}>
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div>          
            {/* Health Reminders */}
            <div className="bg-hospital-light rounded-xl p-5">
              <h3 className="text-xl font-bold font-poppins mb-4">Health Reminders</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-lg mr-3">
                    <i className="fas fa-syringe text-hospital-blue"></i>
                  </div>
                  <div>
                    <div className="font-medium">Flu Vaccine Due</div>
                    <div className="text-sm text-gray-600">Recommended before winter season</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-lg mr-3">
                    <i className="fas fa-heartbeat text-hospital-blue"></i>
                  </div>
                  <div>
                    <div className="font-medium">Annual Checkup</div>
                    <div className="text-sm text-gray-600">Scheduled for next month</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-lg mr-3">
                    <i className="fas fa-pills text-hospital-blue"></i>
                  </div>
                  <div>
                    <div className="font-medium">Prescription Refill</div>
                    <div className="text-sm text-gray-600">Blood pressure medication due in 5 days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashboardPage