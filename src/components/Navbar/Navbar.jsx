import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Register from '../Register/Register'
import CounterContext from '../../Context/counter'
import brandImg from '../../../src/images/favicon-32x32.png'
import { tokenContext } from '../../Context/tokenContext'
export default function Navbar() {
    let navigate = useNavigate();
  let x = useContext(CounterContext)
  let {token} =useContext(tokenContext)
  console.log(token)
  function LogOut(){
    localStorage.removeItem("userToken")
    navigate('/login')
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark">
        <div className="container">
            <a className="navbar-brand" href="index.html"><img src={brandImg} width="54" alt=""/> </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                {token?<><li className="nav-item">
                        <Link className="nav-link" to={'profile'}>Profile</Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link"onClick={LogOut} >Logout</button>
                    </li>
                    </>
                    :<><li className="nav-item">
                        <Link className="nav-link" to={'register'}>Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'login'}>Login</Link>
                    </li></>}
                 
                    
                </ul>

            </div>
        </div>
    </nav>
   
    </>
  )
}
