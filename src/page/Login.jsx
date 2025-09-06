import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './Login.css';
import { useState } from 'react';

export default function Login({setIsLoggedIn}) {
  const navigate=useNavigate();


  const[mobile,setMobile]=useState('');
  const[password,setPassword]=useState('');
  const[error , setError]=useState({mobile:"",password:""});


  {/*}const handlemobile=(e)=>{setMobile(e.target.value)};
  const handlepassword=(e)=>{setPassword(e.target.value)};{*/}

  const handlemobile = (e) => {
  const value = e.target.value.replace(/\D/g, '').slice(0, 10); // sirf digit, max 10
  setMobile(value);
  setError((prev) => ({ ...prev, mobile: Mobilevalidation(value) }));
};

const handlepassword = (e) => {
  const value = e.target.value;
  setPassword(value);
  setError((prev) => ({ ...prev, password: PasswordValidation(value) }));
};

  const Mobilevalidation=()=>{
    if(!mobile)return "Enter Mobile Number";
    return "";
  }
  const PasswordValidation=()=>{
    if(!password)return "Enter Password";
  }

  const login=(e)=>{
    e.preventDefault();
    const mobileerror=Mobilevalidation();
    const passworderror=PasswordValidation();
    if(!mobile || !password){
      setError({mobile:mobileerror,password:passworderror})
      return;
    }


      const dt={
        mobile:mobile,
        password:password
      }
      axios.post("http://127.0.0.1:3000/user_login",dt)
        .then(res=>{
          if(res.data.status===200){
          
            
              alert("Login Successfully....!✅");
              localStorage.setItem("isLogin","true");
              localStorage.setItem("name", res.data.data.name);
              localStorage.setItem("openamt",res.data.data.openamt)
             localStorage.setItem("id", res.data.data.id);
             localStorage.setItem("cpassword",res.data.data.password)
             localStorage.setItem("mobile",res.data.data.mobile)


              setIsLoggedIn(true);
              navigate('/home');
              window.location.reload();

          }else{
               alert("Worng Mobile number / Password Login Failed....!❌"); }});}
  return (

<>
      

    <div className="loginpage">
      <Card className="logincard shadow-lg">
        <Card.Body>
          <Card.Title className="title">Login Page</Card.Title>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control onChange={handlemobile} type="text" maxLength={10} placeholder="Enter mobile number" />
               {error.mobile && <p style={{ color: "red" }}>{error.mobile}</p>}

            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={handlepassword} type="password" placeholder="Enter password" />
                   {error.password && <p style={{ color: "red" }}>{error.password}</p>}

            </Form.Group>

            <Button className="loginbtn" onClick={login} variant="primary" type="button">
              Login
            </Button>



            {/* Signup text below button */}
            <p className="signup-text">
              Don't have an account?  <span onClick={()=>navigate('/signup')} style={{cursor:"pointer", color:"blue"}}>Sign up</span>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>

    </>
  );
}
