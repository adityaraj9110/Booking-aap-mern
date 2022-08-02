import './navbar.css'
import {Link} from "react-router-dom"

import useAuth from '../hookes/useAuth';
const Navbar = () => {
  const {user } = useAuth()
  return (
    
    <div className='navbar'>
      
        <div className="navContainer">
          <Link to="/" style={{color:"inherit",textDecoration:"none"}} >
            <span className='logo'>OT Booking</span>
            </Link>
            {user? user.username: ( <div className="navItems">
                <button className="navButton">Register</button>
                <button className="navButton">login</button>
            </div>)}
            
        </div>
      
    </div>

  )
}

export default Navbar
