import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import {Link, useLocation, useNavigate} from "react-router-dom"
import Menu from '../components/Menu.tsx'
import axios from 'axios'
import moment from "moment"
import { AuthContext } from '../context/authContext'
import { Helmet } from "react-helmet-async";


const Single = () => {
  
  const [post,setPost] = useState({});


  


  
  const location = useLocation(); 
  const navigate = useNavigate();

  
  const postId = location.pathname.split("/")[2];

  const {currentUser} = useContext(AuthContext);

 
  


  useEffect(() => {
    const fetchData = async () =>{
      try {
        const res = await axios.get(`http://localhost:8080/api/posts/${postId}`);
        setPost(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[postId])

  const handleDelete = async() => {
    try {
      await axios.delete(`http://localhost:8080/api/posts/${postId}`,{withCredentials:true});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
   
  //when admin can delete othe post
  const handleDelete1 = async() => {
    try {
      await axios.delete(`http://localhost:8080/api/adminUsers/${postId}`,{withCredentials:true});
      navigate("/");
    } catch (error) {
      // console.log(error);
    }
  }

  

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.title}/>
      </Helmet>
      <div className='sinContainer'>
        <div className='single'>
          <main className="content">
            <img src={`../upload/${post?.img}`} alt="" />
            <section className="user">
             <Link to={ post.uid === currentUser.id && `/profile/${post?.uid}`} state={post}>
              <img src={post.userImg ? `../upload/${post?.userImg}` : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" />
              </Link>
               <article className="info">
                <span>{post?.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
               </article>
               {currentUser.username === post.username &&
               <article className="edit">
               <Link to={`/write?edit=${postId}`} state={post}>
               <img src={Edit} alt="" />
               </Link>
                {!currentUser.myAdmin && <img onClick={handleDelete} src={Delete} alt="" />}
               </article>
               }{currentUser.myAdmin && 
                <article className="edit">
                 <img onClick={handleDelete1} src={Delete} alt="" />
                </article>
                }
            </section>
            <h1>{post.title}</h1>
            <br />
            <div className="post__description" dangerouslySetInnerHTML={{ __html:post.desc}}  />
          </main>
          <Menu cat={post.cat}/>
        </div>
      </div>
    </>
  )
}

export default Single;