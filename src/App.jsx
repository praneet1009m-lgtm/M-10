import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Projects from './pages/projects'
import About from './pages/about'
import Navbar from './components/navigation/Navbar'
import FullScreenNav from './components/navigation/FullScreenNav'
import NavContext from './context/NavContext'
import { useContext } from 'react'
import { NavBarContext } from './context/NavContext'
import Contact from './pages/contact'
import Services from './pages/services'


const App = () => {
  return (

    
      
  <div className="text-white text-6xl">
    <div className="text-lg mt-4">


      <FullScreenNav />
        <Navbar /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
          </Routes> 
    </div>
  </div>
    

    
    
  )
}

export default App  
