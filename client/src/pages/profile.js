import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { Helmet } from "react-helmet-async";

const Profile = () => {

  const {logout} = useContext(AuthContext);

  const state = useLocation().state;
  const [user,setUser] = useState({});

  const navigate = useNavigate();
  const location = useLocation(); 
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const res = await axios.get(`http://localhost:8080/api/users/${userId}`);
        setUser(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[userId])



  
  const [username, setUsername] = useState( state.username || "");
  const [email, setEmail] = useState(state.email || "");
  const [file, setFile] = useState(null);
  
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file); // the name "file" is the same name in backend in mullter upload "file"
      const res = await axios.post("http://localhost:8080/api/upload", formData,{withCredentials:true});
      return res.data;
    } catch (error) {
      // console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
     await axios.put(`http://localhost:8080/api/users/${user.id}`, {
        username,
        email,
        image: file ? imgUrl : user?.image 
      },{withCredentials:true})
      logout();
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

 


  return (
   <>
      <Helmet>
        <title>{user.username}</title>
        <meta name="description" content={user.username}/>
      </Helmet>
     <div className='profile'>
       <div className='profileCon'>
         <main className='profilePage'>
           <label htmlFor="file" className='img' >
           <img src={user.image ? `../upload/${user?.image}` : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" />
           </label>
          <input type="file" name="" id="file" style={{display:"none"}}  onChange={(e) => setFile(e.target.files[0])}/>
          <label htmlFor="username" style={{textAlign:'center',marginTop:"20px"}}><b>Username</b></label>
          <input type="text" name="" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="email"style={{textAlign:'center'}}><b>Email</b></label>
          <input type="email" name="" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <button onClick={handleClick} >Update</button>
         </main>
       </div>
     </div>
   </>
  )
}

export default Profile;