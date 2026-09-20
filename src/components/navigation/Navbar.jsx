import React from "react";
import { Link } from "react-router-dom";
import logo from '../navigation/logo.png';
import { useRef } from "react";
import { useContext } from "react";
import { NavBarContext } from "../../context/NavContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navGrayRef = useRef(null);
  const [NavOpen, setNavOpen] = useContext(NavBarContext);
  const navigate = useNavigate();



  return (
    <nav className="site-nav">
      <button onClick={() => navigate("/")} className="site-nav__brand" aria-label="Go to home">
        <img src={logo} alt="M10" />
      </button>

     <div
  onClick={() => setNavOpen(true)}
  onMouseEnter={() => {
    navGrayRef.current.style.height = "100%";
  }}
  onMouseLeave={() => {
    navGrayRef.current.style.height = "0%";
  }}
  className="site-nav__menu" aria-label="Open navigation">
        <div ref={navGrayRef} className='site-nav__menu-fill'></div>
        <div className='site-nav__menu-lines'>
          <div></div><div></div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;  
