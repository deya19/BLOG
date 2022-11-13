import express from "express";
const app = express();
import postRoutes from "./routes/posts.js" //don't forget the .js
import authRoutes from "./routes/auth.js" 
import adminRoutes from "./routes/adminUsers.js" 
import userRoutes from "./routes/users.js" 
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors"


//port that uses
let port = 8080;

//middlewares
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials",true);
  next();
})
app.use(express.json());
app.use(cors({
  origin:"http://localhost:3000",
}))
app.use(cookieParser()); //save accsess token 


// to use specific name for files that uploaded
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload') //to upload every things inside public
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname) //the same name that upload and specific another with date
  }
})

//Multer used to upload files
const upload = multer({ storage }) //the file that create to put every filles after uploads

app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file
  res.status(200).json(file.filename)
})



app.use("/api/posts",postRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/adminUsers",adminRoutes)
app.use("/api/users",userRoutes)





app.listen(port, () => {
  console.log("Connected!");
});




// use to test the api only 
app.get("/test" , (req,res)=>{
  res.json("It works!")
})