import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function Adduser(){
    const navigate=useNavigate();
  const[name,setName]=useState('');
  const[mobile,setMobile]=useState('');
  const[password,setPassword]=useState('');
  const[openamt,setOpenAmt]=useState('');
  const[error,setError]=useState({name:"",mobile:"",password:"",openamt:"",});

  const handlename=(e)=>{setName(e.target.value)};
  const handlemobile=(e)=>{setMobile(e.target.value)};
  const handlepassword=(e)=>{setPassword(e.target.value)};
  const handleopenamt=(e)=>{setOpenAmt(e.target.value)};

  const nameVaildation=()=>{if(!name){return "Enter Name";}return;}
  const passwordVaildation=()=>{if(!password){return "Enter Password";}return;}
  const amountVaildation=()=>{if(!openamt){return "Enter Opening Amount";}return;}
  const mobileVaildation=()=>{if(!mobile){return "Enter Mobile";}return;}


    

  const submit=(e)=>{
          e.preventDefault();
          const nameerror=nameVaildation();
          const passworderror=passwordVaildation();
          const  mobileerror=mobileVaildation();
          const  openamterror=amountVaildation();

          if(!name|| !password || !mobile || !openamt){
            setError({name:nameerror,password:passworderror,mobile:mobileerror,openamt:openamterror})
            return;
          }
          const dt={
            name:name,
            mobile:mobile,
            password:password,
            openamt:openamt
          }
          axios.post("https://ftrgqllvvkalmucafpwu.functions.supabase.co/personaltranscation/add_user",dt)
          .then(res=>{
            if(res.data.status=="200"){
              alert("Register Successfully....!✅");
              navigate('/');
            }else{
              alert("Register Failed....!❌")
            }})}
    return(
        <>
<div className="loginpage">
      <Card className="logincard_adduser shadow-lg">
        <Card.Body>
          <Card.Title className="title">Register New User</Card.Title>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control onChange={handlename} type="text" placeholder="Enter name " />
            </Form.Group>
               {error.name && <p style={{ color: "red" }}>{error.name}</p>}


            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control onChange={handlemobile} type="text" maxLength={10} placeholder="Enter mobile number" />
            </Form.Group>
               {error.mobile && <p style={{ color: "red" }}>{error.mobile}</p>}

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handlepassword} type="password" placeholder="Enter password" />
            </Form.Group>
               {error.password && <p style={{ color: "red" }}>{error.password}</p>}


            <Form.Group className="mb-3">
              <Form.Label>Opeing Amount</Form.Label>
              <Form.Control onChange={handleopenamt} type="number" placeholder="Enter opening amount" />
            </Form.Group>
              {error.openamt && <p style={{ color: "red" }}>{error.openamt}</p>}




            <Button className="loginbtn" onClick={submit} variant="primary" type="submit">
              Register
            </Button>
 <p className="signup-text">
              Already have an account? <a onClick={()=>navigate('/')} style={{cursor:"pointer", color:"blue"}}>Login here</a>
            </p>          </Form>
        </Card.Body>
      </Card>
    </div>


        </>
    )
}