import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import UserProfile from './components/UserProfile.jsx/UserProfile'
import Therapists from './components/Therapists/Therapists'
import Booking from './components/Booking/Booking'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <Booking/>
     <Footer/>
    </>
  )
}

export default App
