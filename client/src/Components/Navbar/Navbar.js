/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
// import { Button } from "@mui/material";
import "./Navbar.css";
import { setCurrentUser } from "../../Actions/CurrentUser";
import Avatar from "../Avatar/Avatar";

function Navbar() {
  const dispatch = useDispatch()
  var User = useSelector((state) => (state.currentUserReducer))
  const navigate = useNavigate();
  
  const handleLogout = () => {
      dispatch({ type: 'LOGOUT'});
      navigate('/Auth')
      dispatch(setCurrentUser(null))
  }
  
  useEffect(() => {
      const token = User?.token 
      if(token){
          const decodedToken = decode(token)
          if(decodedToken.exp * 1000 < new Date().getTime()){
              handleLogout()
          }
      }
      dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))))
  },[User?.token, dispatch])

  return (
      <nav className='main-nav'>
          <div className='navbar'>
              <Link to='/' className='nav-item nav-logo'>
              <img
              src="https://www.vectorlogo.zone/logos/stackoverflow/stackoverflow-official.svg"
              alt="logo"
            />
              </Link>
              <Link to='/' className='nav-item nav-btn'>About</Link>
              <Link to='/' className='nav-item nav-btn'>Products</Link>
              <Link to='/' className='nav-item nav-btn'>For Teams</Link>
              <form>
                  <input type="text" placeholder='Search...'/>
                  <SearchIcon />
              </form>
              { User === null ? 
                  <Link to='/Auth' className='nav-item nav-links'>Log in</Link> : 
                  <>
                      <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white'><Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:'none'}}>{User?.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                      <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                  </>
              }
          </div>
      </nav>
  )
}


export default Navbar;
