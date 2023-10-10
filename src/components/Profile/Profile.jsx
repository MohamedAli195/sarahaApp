import React, { useContext, useEffect, useState } from 'react'
import style from './Profile.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { tokenContext } from '../../Context/tokenContext'
import jwtDecode from 'jwt-decode'
import avatar from '../../images/avatar.png'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from 'react-query'
export default function Profile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const[userid,setUserid] = useState()
  const[AllData,setAllData]=useState()
  const { data, error, isLoading } = useQuery('data', getMessages);
  useEffect(()=>{
    getUserID()
  },[])
  async function getMessages(){
   
  let res =  await axios.get('https://sara7aiti.onrender.com/api/v1/message',{
      headers:{
        token:localStorage.getItem("userToken")
      }
    })
    // console.log(data.allMessages)
    // setAllData(data.allMessages)
    return res.data.allMessages;
  }
  if(isLoading){
    return <div>loding...</div>
  }
  if(error){
    return <div>error:{error.message}</div>
  }
  function getUserID(){
    let decode = jwtDecode(localStorage.getItem("userToken"))
    setUserid(decode.id)
    console.log(decode.id)
  }

  return (

   
    <>
    <div className="container text-center py-5 my-5 text-center">
        <div className="card py-5 mb-5">
            <a href="" data-toggle="modal" data-target="#profile">
                <img src={avatar} className="avatar " alt=""/>

            </a>
        </div>
        
        <Link data-toggle="modal" to={'/messages/'+userid} data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt"></i>  Share Profile</Link>
        <Button variant="primary" onClick={handleShow}>
        share profile Modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`http://localhost:3000/messages/${userid}`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>

  
   
    <div className="container text-center my-5 text-center">
          <div className="row">
            {data.length == 0 ? <div className="col-md-12">
              <div className="card py-5">
                <p>You don't have any messages... </p>
              </div>
            </div> : <>
            {data.map((ele) => <div key={ele._id} className="col-md-12 mb-5">
              <div className="card py-5">
                <p>{ele.messageContent} </p>
              </div>
            </div>)}
            </> }

          

          </div>
        </div>
   
    </>
  )
}
