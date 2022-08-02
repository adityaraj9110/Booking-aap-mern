import React, { useContext } from 'react'
import { BrowserRouter,Routes,Route, useLocation } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Home from './pages/home/Home'
import Hotel from './pages/hotel/Hotel'
import List from './pages/list/List'
import Login from './pages/login/Login'

const App = () => {
  const {user } = useContext(AuthContext);
  console.log("===>",user)
  const location = useLocation();
  
  return (
    
    
    <Routes>

      <Route path='/'  element={<Home/>}  />
      <Route path='/hotels'  element={<List/>}  />
      <Route path='/hotels/:id'  element={<Hotel/>}  />
      <Route path='/login'  element={<Login/>}  />
      
    </Routes>
    
  )
}

export default App

