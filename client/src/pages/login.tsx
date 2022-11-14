import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Helmet } from "react-helmet-async";

const Login = () => {

interface Data{
  username:String;
  password:String;
}

  const [inputs,setInput] = useState<Data>({
    username:"",
    password:""
  })

  const [error,setError] = useState<null|String>(null);
  const navigate = useNavigate();


  const {login} = useContext(AuthContext);
  


 

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
    setInput(prev=>({...prev,[e.target.name]:e.target.value}))
   }
   
   
  const handleSubment = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate("/")
    } catch (error:any) {
      setError(error.response.data)
    }
  }





  return (
  <>
      <Helmet>
        <title>LOGIN</title>
        <meta name="description" content="LOGIN"/>
      </Helmet>
      <div className='auth'>
        <h1>Login</h1>
        <form>
        <input required type="text" name="username" placeholder='username' onChange={handleChange} />
        <input required type="password" name="password" placeholder='password' onChange={handleChange} />
        <button onClick={handleSubment}>Login</button>
        {
        error &&  
         <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert style={{fontSize:"10px"}} severity="error">{error} — check it out!</Alert>
         </Stack>
        }
      
        <Link to="/register"><span>Don't you have account?</span ></Link>
        </form>
      </div>
  </>
  )
}

export default Login;