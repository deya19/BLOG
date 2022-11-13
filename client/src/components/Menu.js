import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Menu = ({cat}) => {

const [posts,setPosts] = useState([]);



useEffect(() => {
  const fetchData = async () =>{
    try {
      const res = await axios.get(`http://localhost:8080/api/posts/?cat=${cat}`);
      setPosts(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  fetchData();
},[cat])



  return (
    <aside className='menu'>
     <h1>Other posts you may like</h1>
     {posts.map(post=>(
      <section className='post' key={post.id}>
        <img src={`../upload/${post.img}`} alt="" />
        <Link className='link' to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
        </Link>
        <Link className='link' to={`/more/${post.id}`}><button>Read More</button></Link>
      </section>
     ))}
    </aside>
  )
}

export default Menu;