import React,{useEffect} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Login from './components/Login'

import {AuthProvider} from './AuthProvider.jsx'
import Navbar from './components/Navbar.jsx'

const App = () => {


  return (
    <div  >
      <div className='fixed top-0 -z-10 h-full w-full' >
        <div className='bg-neutral-100 h-full w-full' >

        </div>
        </div>
      <AuthProvider >
       <Router>
        <Navbar />
         <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
         </Routes>
       </Router>
       </AuthProvider>
    </div>
  )
}

export default App