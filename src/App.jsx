import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import "./App.css";

import Adduser from "./page/Adduser";
import Login from "./page/Login";
import Home from "./page/Home";
import Pnavbr from "./page/Pnavbr";
import { useState } from 'react';

  function ProtectedRoute({isLoggedIn,children}){
  return isLoggedIn ? children:<Navigate to="/" replace/>;
}

export default function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLogin") === "true");
  
  return (

    <>
<Router>
  <Pnavbr/>
<Routes>

<Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>

<Route path="/home" element={<ProtectedRoute isLoggedIn={isLoggedIn}>
  <Home/> </ProtectedRoute>} />

        <Route path="/signup" element={<Adduser/>}  />

</Routes>

</Router>


</>
   
          );
}

