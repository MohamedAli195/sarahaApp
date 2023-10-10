import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Register() {
  let navigate = useNavigate() // for navigate to login page
  const [isLoading,setIsLoading] =useState(false) //for spiner
  const [apiError,setApiLoading] = useState("") // for show api error 
    function register (values){
      setIsLoading(true)
    let {data} =  axios.post('https://sara7aiti.onrender.com/api/v1/user',values).then((data)=>{
      console.log(data)
      if(data.data.message=="Added"){
        setIsLoading(false)
        navigate('/login')
      }
    }).catch((error)=>{
      console.log(error.response.data.error)
      setApiLoading(error.response.data.error)
      setIsLoading(false)
    })
    
   }
  // const validate = (values) => {
  //   let errors = {}
  //   if (!values.name) {
  //     errors.name = "user name is required"
  //   } else if (values.name.length < 3) {
  //     errors.name = "user name must be more than 3 chars"
  //   } else if (values.name.length > 15) {
  //     errors.name = "user name less thn 15 chars"
  //   }

  //   if (!values.email) {
  //     errors.email = "email is required"
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }
  //   if (!values.password) {
  //     errors.password = "password is required"
  //   } else if (!/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)) {
  //     errors.password = 'Invalid dont match';
  //   }
  //   if (!values.rePassword) {
  //     errors.rePassword = "password is required"
  //   } else if (values.rePassword!=values.password) {
  //     errors.rePassword = 'dont match password ';
  //   }
  //   if (!values.age) {
  //     errors.age = "password is required"
  //   } else if (values.age < 3) {
  //     errors.name = "age mus be more than 10years"
  //   } else if (values.age > 60) {
  //     errors.name = "age must be less than 60"
  //   }
  //   return errors;
  // }
  const validationSchema= Yup.object({
    name: Yup.string().max(15,"user name less thn 15 chars ").min(3,"user name must be more than 3 chars").required("user name is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"password sould start wit cap").required("pass word is required") ,
    rePassword: Yup.string().oneOf([Yup.ref("password")]).required("re password is required") ,
    age: Yup.number().required("age is required")
  })
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      age: 0
    },validationSchema ,
    onSubmit: (values) => { register(values) }
  })
  return (
    <>
      <div className="container text-center my-5">
        <div className="user my-3">
          <i className="far fa-edit user-icon"></i>
          <h4 className="login">Register</h4>
        </div>
        <div className="card p-5 w-50 m-auto">
          <form onSubmit={formik.handleSubmit}>
            {apiError?<div className='alert alert-danger'>{apiError}</div>:""}
            <div className='form-group'>
              <input className="form-control" onBlur={formik.handleBlur} placeholder="Enter your Name" type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
            {formik.errors.name &&formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div>:""}
            </div>
            <div className='form-group'>
              <input className="form-control my-2 " placeholder="Enter your email" onBlur={formik.handleBlur} type="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
              {formik.errors.email &&formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:""}
            </div>
            <div className='form-group'>
              <input className="form-control  " placeholder="Enter your Password" onBlur={formik.handleBlur} type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
              {formik.errors.password &&formik.touched.password ?<div className="alert alert-danger">{formik.errors.password}</div>:""}
            </div>
            <div className='form-group'>
              <input className="form-control  my-2" placeholder="enter repassword" onBlur={formik.handleBlur} type="password" name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} />
              {formik.errors.rePassword &&formik.touched.rePassword ?<div className="alert alert-danger">{formik.errors.rePassword}</div>:""}
            </div>
            <div className='form-group'>
              <input className="form-control  my-2" placeholder="enter your age" onBlur={formik.handleBlur} type="number" name="age" value={formik.values.age} onChange={formik.handleChange} />
              {formik.errors.age &&formik.touched.age ?<div className="alert alert-danger">{formik.errors.age}</div>:""}
            </div>
            <button className="btn btn-default-outline my-4 w-100 rounded">
              {isLoading? <i className="fa fa-spin fa-spinner"></i> :<>  <i className="far fa-edit user-icon"></i> Register </>}
            </button>
            <a className="btn btn-default-outline" type='submit' href="login.html">Login</a>
            
          </form>
        </div>
      </div>
    </>
  )
}
