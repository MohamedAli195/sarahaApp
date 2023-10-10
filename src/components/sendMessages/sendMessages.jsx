import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React from 'react'
import { useParams } from 'react-router-dom'
//  
export default function SendMessages() {

  let x =useParams()
  console.log(x)
  async function addMessage(values){
    let data ={
      ...values,
      receivedId:x.id
    }
    let res = await axios.post('https://sara7aiti.onrender.com/api/v1/message',data)
    console.log(res)
  }
  let formik = useFormik({
    initialValues:{messageContent:""},
    onSubmit: (values)=>{addMessage(values)}
  })
  return (
    <>
      <div className="container w-50 m-auto">
                <form action="" method="post" onSubmit={formik.handleSubmit}>
                    <textarea className="form-control" value={formik.messageContent} onChange={formik.handleChange} name="messageContent" id="" cols="10" rows="9" placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"></textarea>
                    <button className="btn btn-outline-info mt-3" type='submit'><i className="far fa-paper-plane"></i> Send</button>
                </form>
            </div>
    </>
  )
}
