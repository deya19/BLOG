import { db } from "../db.js"
import jwt from "jsonwebtoken"


export const getUser = (req,res)=>{
  
  const q = "SELECT `id` , `username` , `email` , `image` from users WHERE id=? "

  db.query(q,[req.params.id],(err,data) => {
    
    if(err) return res.status(500).json(err)

    return res.status(200).json(data[0]);
  })
}






export const updateUsers = (req,res)=>{
  const token = req.cookies.access_token;
  
  if(!token) return res.status(401).json("not authenticated!")

  jwt.verify(token,"jwtkey",(err,userInfo) => {
   if(err) return res.status(403).json("Token is not valid!");
   
   const postId = req.params.id;
   const q = "UPDATE users SET `username`=? , `email`=? , `image`=?  WHERE `id`=?";

   const values =[
   req.body.username,
   req.body.email,
   req.body.image,
   ]
  
   db.query(q,[...values,userInfo.id],(err,data)=>{
    if(err) return res.status(500).json(err);
    return res.json("user has been updated.")
   })
  })
}