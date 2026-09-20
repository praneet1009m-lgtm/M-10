import React from 'react'
import { Link } from 'react-router-dom'

const homebottomtext = () => {
  return (
    <div className="home-ref__bottom">
      <div className="home-ref__links">
        <Link to="/about">About me</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="home-ref__stats">
        <div><b>10+</b><span>Projects</span></div>
      <div><b>3+</b><span>Years coding</span></div>
        <div><b>100%</b><span>Passion</span></div>
      </div>
    </div>
  )
}

export default homebottomtext   
