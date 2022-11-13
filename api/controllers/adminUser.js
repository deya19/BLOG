import { db } from "../db.js"
import jwt from "jsonwebtoken"

// for admin to delete any post
export const deletePostAdmin = (req,res)=>{
  const token = req.cookies.access_token;
  
  if(!token) return res.status(401).json("not authenticated!")

  jwt.verify(token,"jwtkey",(err,userInfo) => {
   if(err) return res.status(403).json("Token is not valid!")
   
   const postId = req.params.id;
   const q = "DELETE FROM posts WHERE `id` = ?"


   db.query(q,[postId],(err,data)=>{
    if(err) return res.status(403).json("the post can't be deleted")

    return res.json("Post has been deleted!")
   })
  })
}