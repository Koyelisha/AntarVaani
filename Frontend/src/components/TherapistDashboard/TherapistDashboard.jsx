import React from 'react';
import { 
  faEdit, 
  faSignOutAlt, 
  faCalendarAlt, 
  faEnvelope, 
  faPhone, 
  faIdCard,
  faClinicMedical,
  faUserTie,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TherapistDashboard = () => {
  // Static data matching your schema
  const therapistData = {
    fullname: "Dr. Sarah Johnson",
    email: "sarah.johnson@mindcare.com",
    contact: "+1 (555) 123-4567",
    licenseNumber: "PSY-789456",
    issuingAuthority: "State Psychology Board",
    licenseExpiryDate: "2025-12-31",
    specialization: "Clinical Psychologist",
    clinicName: "MindCare Wellness Center",
    availableDays: "Monday, Wednesday, Friday",
    availableTime: "9:00 AM - 5:00 PM",
    isVerified: true,
    sessions: [
      { _id: "1", patientName: "Alex Morgan", date: "2023-11-15T14:00:00" },
      { _id: "2", patientName: "Taylor Smith", date: "2023-11-17T10:30:00" }
    ]
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time for sessions
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    // <div className="min-h-screen bg-[#F5F7FA] py-20 px-4">
    <div className="min-h-screen bg-[#F1FAEE] py-20 px-4">
     
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D3748]">Therapist Dashboard</h1>
          <p className="text-[#4A5568]">Welcome back, {therapistData.fullname.split(' ')[0]}</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Profile Image */}
              <div className="bg-[#E2E8F0] h-40 w-40 rounded-full flex items-center justify-center">
                <span className="text-5xl">👩‍⚕️</span>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faUserTie} className="text-[#E07A5F] mr-3 text-xl" />
                  <h2 className="text-2xl font-bold text-[#2D3748]">{therapistData.fullname}</h2>
                </div>
                
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon icon={faClinicMedical} className="text-[#E07A5F] mr-3" />
                  <p className="text-lg text-[#E07A5F] font-semibold">{therapistData.specialization}</p>
                </div>

                {therapistData.clinicName && (
                  <p className="text-[#4A5568] mb-4">
                    <span className="font-medium">Clinic:</span> {therapistData.clinicName}
                  </p>
                )}

                {/* Verification Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  therapistData.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {therapistData.isVerified ? 'Verified Professional' : 'Verification Pending'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#E07A5F] mr-3 text-xl" />
              <h3 className="text-xl font-semibold text-[#2D3748]">Contact Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#718096] mt-1 mr-3" />
                <div>
                  <p className="font-medium text-[#4A5568]">Email</p>
                  <p className="text-[#4A5568]">{therapistData.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FontAwesomeIcon icon={faPhone} className="text-[#718096] mt-1 mr-3" />
                <div>
                  <p className="font-medium text-[#4A5568]">Phone</p>
                  <p className="text-[#4A5568]">{therapistData.contact}</p>
                </div>
              </div>
            </div>
          </div>

          {/* License Information */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faIdCard} className="text-[#E07A5F] mr-3 text-xl" />
              <h3 className="text-xl font-semibold text-[#2D3748]">License Information</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-[#4A5568]">License Number</p>
                <p className="text-[#4A5568]">{therapistData.licenseNumber}</p>
              </div>
              <div>
                <p className="font-medium text-[#4A5568]">Issuing Authority</p>
                <p className="text-[#4A5568]">{therapistData.issuingAuthority}</p>
              </div>
              <div>
                <p className="font-medium text-[#4A5568]">Expiry Date</p>
                <p className="text-[#4A5568]">{formatDate(therapistData.licenseExpiryDate)}</p>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-[#E07A5F] mr-3 text-xl" />
              <h3 className="text-xl font-semibold text-[#2D3748]">Availability</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-[#4A5568]">Days</p>
                <p className="text-[#4A5568]">{therapistData.availableDays}</p>
              </div>
              <div>
                <p className="font-medium text-[#4A5568]">Hours</p>
                <p className="text-[#4A5568]">{therapistData.availableTime}</p>
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faClock} className="text-[#E07A5F] mr-3 text-xl" />
              <h3 className="text-xl font-semibold text-[#2D3748]">Upcoming Sessions</h3>
            </div>
            <div className="space-y-4">
              {therapistData.sessions.length > 0 ? (
                therapistData.sessions.map(session => (
                  <div key={session._id} className="border-b border-[#EDF2F7] pb-3 last:border-0">
                    <p className="font-medium text-[#4A5568]">{session.patientName}</p>
                    <p className="text-sm text-[#718096]">
                      {formatDate(session.date)} at {formatTime(session.date)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-[#718096]">No upcoming sessions</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button className="bg-[#E07A5F] hover:bg-[#D1664A] text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors flex items-center justify-center">
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Edit Profile
          </button>
          <button className="bg-[#2D3748] hover:bg-[#1A202C] text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors flex items-center justify-center">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;