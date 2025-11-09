import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/Signup'
import Report from './pages/ReportDetails'
import ReportCC from './pages/ReportCC'
import AllReports from './pages/AllReports'
import LookUp from './pages/LookUp'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Analytics } from "@vercel/analytics/react"


function App() {

  return (

   <div className="min-h-screen">
    <Analytics />
  <Toaster />
      <Navbar/>
      <Routes>
        <Route path='/'  exact element={<Home/>} />
        <Route path='/login'  exact element={<LogIn/>}/>
        <Route path='/signup' exact element={<SignUp/>} />
        <Route path='/report-cc'  exact element={<ReportCC/>} />
        <Route path='/all-reports'  exact element={<AllReports/>} />
        <Route path='/report/:id'  exact element={<Report/>} />
        <Route path="/look-up" exact element={<LookUp/>}/>
      </Routes>
   <Footer/> 

   </div>
  )
  
}

export default App
