import express from 'express';
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer'


const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })

const upload = multer({storage: storage})

app.post('/api/upload', upload.single('file'), function (req, res) {  
  
  if (req.file){
    const file=req.file
    res.status(200).json(file.filename)
  }
    else {
      res.status(200).json("no file sent over to server")
    }
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  })

app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)


app.listen(8080, ()=>{
    console.log("It's Connected!")
}) 