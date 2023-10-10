import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { tokenContext } from '../../Context/tokenContext'
export default function Login() {
  let navigate = useNavigate() // for navigate to login page
  const [isLoading,setIsLoading] =useState(false) //for spiner
  const [apiError,setApiLoading] = useState("") // for show api error 
  let {setToken} = useContext(tokenContext)

    function login (values){
      setIsLoading(true)
      axios.post('https://sara7aiti.onrender.com/api/v1/user/signin',values).then((data)=>{
      console.log(data)
      if(data.data.message=="welcome"){
        setIsLoading(false)
        localStorage.setItem("userToken",data.data.token)
        setToken(data.data.token)
        navigate('/profile')
      }
    }).catch((error)=>{
      console.log(error.response.data.error)
      setApiLoading(error.response.data.error)
      setIsLoading(false)
    })
    
   }
  const validationSchema= Yup.object({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"password sould start wit cap").required("pass word is required") ,
  })
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",

    },validationSchema ,
    onSubmit: (values) => { login (values) }
  })
  return (
    <>
      <div className="container text-center my-5">
        <div className="user my-3">
          <i className="far fa-edit user-icon"></i>
          <h4 className="login">Login</h4>
        </div>
        <div className="card p-5 w-50 m-auto">
          <form onSubmit={formik.handleSubmit}>
            {apiError?<div className='alert alert-danger'>{apiError}</div>:""}
            <div className='form-group'>
              <input className="form-control my-2 " placeholder="Enter your email" onBlur={formik.handleBlur} type="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
              {formik.errors.email &&formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:""}
            </div>
            <div className='form-group'>
              <input className="form-control  " placeholder="Enter your Password" onBlur={formik.handleBlur} type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
              {formik.errors.password &&formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>:""}
            </div>
            <button className="btn btn-default-outline my-4 w-100 rounded">
            {isLoading? <i className="fa fa-spin fa-spinner"></i> :<>  <i className="far fa-edit user-icon"></i> Login </>}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
