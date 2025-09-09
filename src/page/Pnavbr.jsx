import Image from 'react-bootstrap/Image';
import logo from '../assets/logo.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Pnavbr(){
const navigate=useNavigate();
   const location = useLocation();
      const[modalshowprofile,setModalShowProfile]=useState(false);
      const[modalshowchngpassword,setModalShowChngPassword]=useState(false);
      const[modalshowlogout,setModalShowLogOut]=useState(false);

      const [id, setId] = useState(()=> Number(localStorage.getItem("id")) || 0);
const [name, setName] = useState(()=> localStorage.getItem("name") || "");
const [password, setPassword] = useState(()=> localStorage.getItem("cpassword") || "");
const [mobile, setMobile] = useState(()=> localStorage.getItem("mobile") || "");
const[chngpassword,setChangepassword]=useState('');
      const [isLogin, setIsLogin] = useState(false);



      const handlepassword=(e)=>{setChangepassword(e.target.value)};

    // Logout Funcation;
      const handlelogout=()=>{ localStorage.clear();navigate('/');}



      useEffect(()=>{
          const storedId = localStorage.getItem("id");         
          const storedName = localStorage.getItem("name");
          const storedCpassword = localStorage.getItem("cpassword");
          const storedMobile = localStorage.getItem("mobile")
          if(storedId) setId(Number(storedId));
          if (storedName){setName(storedName);}
          if(storedCpassword){setPassword(storedCpassword);}
          if(storedMobile){setMobile(storedMobile);}
  })
  

   
   if(location.pathname==='/'){
    return null;
  }

  
const updtpassword=()=>{
   const uid = localStorage.getItem("id");

  const dt={
     uid: Number(uid),   
    password:chngpassword
  }
  axios.patch("https://ftrgqllvvkalmucafpwu.functions.supabase.co/personaltranscation/updt_password",dt)
    .then(res=>{
      if(res.data.status===200){
        alert("Password Updated successfully...✅");
        setModalShowChngPassword(false);
      }else{
        alert("Password Update Failed...❌");
      }
    })
}

     if(location.pathname==='/'){return null;}

  if(location.pathname==='/signup'){return null;}


      
    return(
        <>
     <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand style={{fontFamily:"cursive"}}>Personal Transaction </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
             <Col xs={12} md={4}>
         
    <Dropdown>

            <Dropdown.Toggle as="div" id="dropdown-basic" className="p-0 border-0 bg-transparent">
 <Image src={logo}  roundedCircle 
            style={{ width: "80px", height: "80px", objectFit: "cover", cursor:"pointer" }}          />
            </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={setModalShowProfile} >Profile</Dropdown.Item>
        <Dropdown.Item onClick={setModalShowChngPassword}>Change password</Dropdown.Item>
        <Dropdown.Item onClick={setModalShowLogOut}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
 
        </Col>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>




{/*} Log Out Module {*/}
    <Modal show={modalshowlogout} onHide={setModalShowLogOut}>
        <Modal.Header closeButton>
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='profile_box1'>
<div className='profile_inner_box1'>

          <h1>Come back again...! </h1>

</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{width:"20%",borderRadius: "30px",padding:".5rem" ,fontSize:"1.2rem"}} variant="success" onClick={()=>setModalShowLogOut(false)}>
            Close
          </Button>
          <Button style={{width:"20%",borderRadius: "30px",padding:".5rem" ,fontSize:"1.2rem"}} variant="danger" onClick={handlelogout} >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>




{/*} Password Module funcation  {*/}
      <Modal
      show={modalshowchngpassword} onHide={()=>setModalShowChngPassword(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          UPDATE PASSWORD...!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='profile_box'>
<div className='profile_inner_box'>

        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter New password :-</Form.Label>
              <Form.Control onChange={handlepassword} type="password" placeholder="Enter New Password" />
            </Form.Group>

        </Form>

</div>
</div>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{width:"20%",borderRadius: "30px",padding:".5rem" ,fontSize:"1.2rem"}} variant='success' onClick={()=>setModalShowChngPassword(false)}>Close</Button>
        <Button style={{width:"20%",borderRadius: "30px",padding:".5rem" ,fontSize:"1.2rem"}} onClick={updtpassword} variant="warning">Update</Button>
      </Modal.Footer>
    </Modal>


{/*} Profile Model{*/}

<Modal
      show={modalshowprofile} onHide={()=>setModalShowProfile(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          PROFILE DETAILS...!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        

        <div className='profile_box'>
<div className='profile_inner_box'>

  <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{fontSize:"1.2rem",fontWeight:"bold",fontFamily:"monospace",color:"black"}}> Name :-</Form.Label>
              <span style={{fontSize:"1.2rem",fontWeight:"bold",fontFamily:"monospace",color:"black"}}>{name}</span>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{fontSize:"1.2rem",fontWeight:"bold",fontFamily:"monospace",color:"black"}}>Mobile Number :-</Form.Label>
              <span style={{fontSize:"1.2rem",fontWeight:"bold",fontFamily:"monospace",color:"black"}}>{mobile}</span>
            </Form.Group>

 <Form.Group className="mb-3">
              <Form.Label style={{fontSize:"1.2rem",fontWeight:"bold",fontFamily:"monospace",color:"black"}}>Password :-</Form.Label>
              <span style={{fontSize:"1.2rem",fontWeight:"bold",fontFamily:"monospace",color:"black"}}>{password}</span>              
            </Form.Group>

        </Form>

</div>

        </div>



      </Modal.Body>
      <Modal.Footer>
         <small style={{marginTop:"8px",fontSize:"20px",color:"#666",fontFamily:"cursive"}}>
          © 2025 Ashirvad Kumar Dubey. All Rights Reserved.
        </small>
        <Button style={{width:"20%",borderRadius: "30px",padding:".5rem" ,fontSize:"1.2rem"}} variant='info' onClick={()=>setModalShowProfile(false)}>Close</Button>
       
      </Modal.Footer>
    </Modal>




    </>
    )
   
}