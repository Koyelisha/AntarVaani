import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import OTPVerification from './components/OTPVerfication/OTPVerification.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp.jsx'
import UserSessions from './components/Sessions/UserSessions.jsx'
import Therapists from './components/Therapists/Therapists.jsx'
import UserProfile from './components/UserProfile.jsx/UserProfile.jsx'
import ChooseRole from './components/ChooseRole/ChooseRole.jsx'
import TherapistsSignUp from './components/Therapists/TherapistsSignUp.jsx'
import TherapistDashboard from './components/TherapistDashboard/TherapistDashboard.jsx'
import TherapistSessions from './components/TherapistSessions/TherapistSessions.jsx'
import Booking from './components/Booking/Booking.jsx'
import { AuthProvider } from "./Context/AuthContext";
import UserEditProfile from './components/UserProfile.jsx/UserProfileEdit.jsx'
import Assessments from './components/Assesments/Assesments.jsx'
import Chatbot from './components/Chatbot/Chatbot.jsx'
import DailyChallenge from './components/DailyChallenge/DailyChallenge.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='role' element={<ChooseRole />} />
      <Route path='patient'>
        <Route path='signup' element={<SignUp />} />
        <Route path='sessions' element={<UserSessions />} />
        <Route path='therapists' element={<Therapists />} />
        <Route path='booking/:therapistId' element={<Booking />} />
        <Route path='profile' element={<UserProfile />} />
        <Route path='edit/:patientId' element={<UserEditProfile/>}/>
        <Route path='quiz' element={<Assessments/>}/>
        <Route path='chatbot' element={<Chatbot/>}/>
        <Route path='dailyChallenge' element={<DailyChallenge/>}/>
        
      </Route>
      <Route path='therapist'>
        <Route path='signup' element={<TherapistsSignUp />} />
        <Route path='dashboard' element={<TherapistDashboard />} />
        <Route path='sessions' element={<TherapistSessions />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
