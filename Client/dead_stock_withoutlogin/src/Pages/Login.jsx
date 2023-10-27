import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

// import Navbar from "../component/Home/Navbar"

const Login = () => {
  let navigate = useNavigate()
  const host = "http://localhost:5000"
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    console.log("Clicked")
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email , password: credentials.password }),
    });
    const json = await response.json()
    console.log(json)
    if(json.success){
    // redirect
    localStorage.setItem('token',json.authToken)
    navigate("/dashboard")
    }else{
      alert("Invalid Type")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      
      <label htmlFor="email">email:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={credentials.email}
        onChange={onChange}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        value={credentials.password}
        onChange={onChange}
      />
      <br />
      <button type="submit">Login</button>
    </form>
    </>
  )
}

export default Login
