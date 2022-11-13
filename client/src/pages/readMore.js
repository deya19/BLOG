import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const ReadMore = () => {
 
  const [post,setPost] = useState({});

  const location = useLocation(); 


  
  const postId = location.pathname.split("/")[2];



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

    // to remove p tag that show when use react-quill
    const getText = (html)=>{
      const doc = new DOMParser().parseFromString(html,"text/html")
      return doc.body.textContent
    } 


  return (
    <>
      <Helmet>
        <title>{getText(post.desc)}</title>
        <meta name="description" content={getText(post.desc)}/>
      </Helmet>
      <div className='more' >
      <main className='readMore'>
      <div className="post__description" dangerouslySetInnerHTML={{ __html:post.desc}}  />
      </main>
      </div>
    </>
  )
}

export default ReadMore;