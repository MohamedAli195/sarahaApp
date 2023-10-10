import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import CounterContextProvider from '../../Context/counter'
export default function Layout() {
  return (
    <>
    {/* <CounterContextProvider> */}
    <Navbar/>
    <Outlet/>
    <Footer/>
    {/* </CounterContextProvider> */}
   
    </>
  )
}
