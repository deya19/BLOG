import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Helmet } from "react-helmet-async";

const Register = () => {

  const [inputs,setInput] = useState({
    username:"",
    email:"",
    password:""
  })



  const [error,setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => { 
    setInput(prev=>({...prev,[e.target.name]:e.target.value}))
   }

  
    //validation of email
    let syntaxGood = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)

 
  const handleSubment = async (e) => {
    e.preventDefault()
    try {
      inputs.username !== "" && inputs.email !== "" && syntaxGood &&inputs.password !== "" && await axios.post("http://localhost:8080/api/auth/register",inputs,{withCredentials:true})
      inputs.username !== "" && inputs.email !== "" && syntaxGood && inputs.password !== "" && navigate("/login")
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <>
      <Helmet>
        <title>Create a New Account</title>
        <meta name="description" content="New Account"/>
      </Helmet>
      <div className='auth'>
        <h1>Register</h1>
        <form>
        <input required type="text" name="username" placeholder='username' onChange={handleChange} />
        <input required type="email" name="email" placeholder='email' onChange={handleChange} />
        <input required type="password" name="password" placeholder='password' onChange={handleChange} />
        <button onClick={handleSubment}>Register</button>
        {error && 
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert style={{fontSize:"10px"}} severity="error">{error} — check it out!</Alert>
       </Stack>
        }
        <Link to="/login"><span>Do you have an account?</span ></Link>
        </form>
      </div>
    </>
  )
}

export default Register;