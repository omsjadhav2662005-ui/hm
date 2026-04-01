import { useState } from 'react'

const DoctorsPage = ({ doctors, onBookDoctor }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState('')
  const [availabilityFilter, setAvailabilityFilter] = useState('')

  const getStarRating = (rating) => {
    let stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>)
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>)
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>)
    }
    
    return stars
  }

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = !searchTerm || 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpecialty = !specialtyFilter || doctor.specialty.toLowerCase() === specialtyFilter.toLowerCase()
    
    let matchesAvailability = true
    if (availabilityFilter === "today") {
      matchesAvailability = doctor.availableToday
    } else if (availabilityFilter === "tomorrow") {
      matchesAvailability = !doctor.availableToday
    }
    
    return matchesSearch && matchesSpecialty && matchesAvailability
  })

  return (
    <section id="doctorsPage">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold font-poppins text-gray-800 mb-2">Our Medical Specialists</h2>
        <p className="text-gray-600 mb-8">Browse profiles of our experienced doctors and specialists. Check availability and book appointments directly.</p>
        
        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg card-shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Doctor</label>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg" 
                placeholder="Name or specialty"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
              <select 
                value={specialtyFilter}
                onChange={(e) => setSpecialtyFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Specialties</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="dermatology">Dermatology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <select 
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Any Time</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this-week">This Week</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => {}} // filtering is automatic via state, no need for explicit search button but keep for consistency
                className="w-full bg-hospital-blue text-white p-2 rounded-lg font-medium hover:bg-hospital-dark transition"
              >
                Search Doctors
              </button>
            </div>
          </div>
        </div>
        
        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <i className="fas fa-user-md text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold font-poppins text-gray-700 mb-2">No doctors found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          ) : (
            filteredDoctors.map(doctor => (
              <div key={doctor._id} className="bg-white rounded-xl card-shadow overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start">
                    <img src={doctor.image} alt={doctor.name} className="w-20 h-20 rounded-full object-cover mr-4" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-poppins">{doctor.name}</h3>
                      <div className="flex items-center mb-2">
                        <span className="bg-hospital-light text-hospital-blue text-sm font-medium px-2 py-1 rounded mr-2">
                          {doctor.specialty}
                        </span>
                        <span className="text-gray-600 text-sm">{doctor.experience} experience</span>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400 mr-2">
                          {getStarRating(doctor.rating)}
                        </div>
                        <span className="text-gray-700 font-medium">{doctor.rating}</span>
                      </div>
                      <p className="text-gray-600 mb-4">{doctor.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className={`${doctor.availableToday ? 'text-accent' : 'text-gray-500'} font-medium`}>
                            <i className={`fas ${doctor.availableToday ? 'fa-check-circle' : 'fa-clock'} mr-1`}></i>
                            {doctor.availableToday ? 'Available Today' : 'Next available: Tomorrow'}
                          </span>
                        </div>
                        <button 
                          onClick={() => onBookDoctor(doctor._id)}
                          className="bg-hospital-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-hospital-dark transition"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default DoctorsPage