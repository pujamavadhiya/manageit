import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
// import Navbar from "../component/Home/Navbar"


const SignUp = () => {
  let history = useNavigate()
  const host = "http://localhost:5000"
  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword: "" });
  const handleSubmit = async (e) => {
    console.log("Clicked")
    e.preventDefault();  
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: credentials.name, email: credentials.email , password: credentials.password }),
    });
    const json = await response.json()
    console.log(json)
      // redirect
      localStorage.setItem('token',json.authToken)
      history("/login")
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      
      <section className="gradient-form h-full bg-primary md:h-screen">
        <div className="container h-full py-12 px-6">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-gray-800">
            <div className="xl:w-10/12">
              <div className="block rounded-lg bg-white shadow-lg">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <img
                          className="mx-auto w-16"
                          src="./images/logo.png"
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-12 pb-1 text-xl font-semibold">
                          We are The StockHive Team
                        </h4>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <p className="mb-4">Please SignUp to your account</p>
                        
                        <div className="mb-4">
                          <input
                            type="text"
                            name="name"
                            className=""
                            value={credentials.name}
                            onChange={onChange}
                            placeholder="Name"
                            minLength={5}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="email"
                            className=""
                            id="exampleFormControlInput1"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            placeholder="Email"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className=""
                            id="exampleFormControlInput1"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            placeholder="Password"
                            minLength={5}
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className=""
                            id="exampleFormControlInput1"
                            name="cpassword"
                            value={credentials.cpassword}
                            onChange={onChange}
                            placeholder="Confirm Password"
                            minLength={5}
                            required
                          />
                        </div>
                        <div className="mb-12 pt-1 pb-1 text-center">
                          <button
                            className=""
                            type='submit'
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            Sign Up
                          </button>
                          <a className="text-gray-500" href="#!">
                            Forgot password?
                          </a>
                        </div>
                        <div className="flex items-center justify-between pb-6"></div>
                      </form>
                    </div>
                  </div>
                  <div className="flex items-center rounded-b-lg bg-gradient-to-r from-[#F9790E] to-[#ff7300]  lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
                        We are more than just a company
                      </h4>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp
