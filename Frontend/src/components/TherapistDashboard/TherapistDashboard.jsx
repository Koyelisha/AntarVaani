import React from 'react';
import { useState,useEffect } from 'react';

const TherapistDashboard = () => {
    

  return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          {/* Profile Header */}
          <div className="flex items-center space-x-6">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-28 h-28 rounded-full border"
            />
            <div>
              <h2 className="text-2xl font-bold">Dr. Jane Smith</h2>
              <p className="text-gray-600">Clinical Psychologist</p>
              <p className="text-sm text-gray-500">MindCare Clinic</p>
            </div>
          </div>
    
          {/* Contact Info */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <p className="text-gray-600"><strong>Email:</strong> jane.smith@example.com</p>
            <p className="text-gray-600"><strong>Phone:</strong> +1 234 567 890</p>
          </div>
    
          {/* License Details */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">License Information</h3>
            <p className="text-gray-600"><strong>License Number:</strong> XYZ-123456</p>
            <p className="text-gray-600"><strong>Issued By:</strong> Medical Council</p>
            <p className="text-gray-600"><strong>Expiry Date:</strong> Jan 10, 2030</p>
          </div>
    
          {/* Availability */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Availability</h3>
            <p className="text-gray-600"><strong>Days:</strong> Monday - Friday</p>
            <p className="text-gray-600"><strong>Time:</strong> 10:00 AM - 5:00 PM</p>
          </div>
    
          {/* Actions */}
          <div className="mt-6 flex justify-between">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Profile</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
          </div>
        </div>
      );
};

export default TherapistDashboard;