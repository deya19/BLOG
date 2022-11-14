import React, { useContext, useEffect, useState } from 'react'
import {Link, useLocation} from "react-router-dom"
import axios from "axios"
import { AuthContext } from '../context/authContext';
import { Helmet } from "react-helmet-async";

const Home = () => {
 
  const [posts,setPosts] = useState<(string|Number)[]>([]);

  const cat = useLocation().search; 
  
  const {currentUser} = useContext(AuthContext);


  
  

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const res = await axios.get(`http://localhost:8080/api/posts${cat}`);
        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[cat])



  // to remove p tag that show when use react-quill
  const getText = (html:any)=>{
    const doc = new DOMParser().parseFromString(html,"text/html")
    return doc.body.textContent
  } 



  return (
    <>
    <Helmet>
        <title>HOME</title>
        <meta name="description" content="HOME"/>
      </Helmet>
      <div className='home'>
       <main className='posts'>
       {posts.map((post:any)=>(
        <section className='post' key={post.id}>
          <article className='img'>
            <img src={`../upload/${post.img}`} alt=""/>
          </article>
          <article className='content'>
          <Link className='link' to={currentUser? `/post/${post.id}`:"/login"}>
          <h1>{post.title}</h1>
          </Link>
          <p>{post.desc.length <= 400 ? getText(post.desc):getText(post.desc)?.slice(0,200)+ "..."}</p>
          <Link className='link' to={currentUser? `/more/${post.id}`:"/login"}><button>Read More</button></Link>
          </article>
        </section>
       ))}
       </main>
      </div>
    </>
  )
}

export default Home;