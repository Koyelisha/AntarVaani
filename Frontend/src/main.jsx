import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import OTPVerification from './components/OTPVerfication/OTPVerification.jsx'
import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } from 'react-router-dom'
import SignUp from './components/SignUp/SignUp.jsx'
import UserSessions from './components/Sessions/UserSessions.jsx'
import Therapists from './components/Therapists/Therapists.jsx'
import UserProfile from './components/UserProfile.jsx/UserProfile.jsx'
import ChooseRole from './components/ChooseRole/ChooseRole.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='role' element={<ChooseRole/>}/>
      <Route index element={<Home />} />
      <Route path='/patient'>
        <Route index element={<Home />} />
        <Route path='signup' element={<SignUp />}>
          <Route path='otp' element={<OTPVerification/>}/>
        </Route>
        {/* <Route path='login'/> */}
        <Route path='sessions' element={<UserSessions/>}/>
        <Route path='therapists' element={<Therapists/>}/>
        <Route path='profile' element={<UserProfile/>}/>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
