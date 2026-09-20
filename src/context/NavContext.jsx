import React from 'react'
import { useState } from 'react'


export const NavBarContext = React.createContext();

const NavContext = ({ children }) => {

    const [NavOpen, setNavOpen] = useState(false);
  return (
    <div>
        <NavBarContext.Provider value={[ NavOpen, setNavOpen ]}>
            {children}
        </NavBarContext.Provider>
    </div>
  )
}

export default NavContext