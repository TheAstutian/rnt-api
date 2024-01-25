import {db} from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export const register = (req,res)=>{

    //CHECK IF USER EXISTS ALREADY
console.log("Step 1")
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q,[req.body.email, req.body.username], (err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exists!")
        console.log("Step 2")
    //HASH PASSWORD AND CREATE USER
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log("Step 3")
    const q = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)"
    const values = [
        req.body.username,
        req.body.email,
        hash
    ]
    console.log("Step 4")
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json("New user successfully created!")
    })
    console.log("Step 5")
    })
}



export const login = (req,res)=>{
    //CHECK USER

    const q = "SELECT * FROM users WHERE username = ?"
    db.query (q, [req.body.username], (err,data)=>{
        if (err) return res.json(err);
        if(data.length===0) return res.status(404).json('User not found')
       
        //CHECK PASSWORD
        const isPassCorrect = bcrypt.compareSync(req.body.password, data[0].password)
        if (!isPassCorrect) return res.status(400).json("Wrong username or password")
      
       const{password, ...other} = data[0]
        res.status(200).json(other)

      /* const token = jwt.sign({id:data[0].id}, "jwtkey");
        console.log("JWSON token generated: ", token)
        const {password, ...other} = data[0]
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true
        }).status(200).json(other)*/
    })
}


export const logout = (req,res)=>{
    res.clearCookie("access_token",{
        sameSite: "none",
        secure: true
    }).status(200).json("signed out")
}


/*you have to intall cors middleware and set like this

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true

}));
and then call the login  API like this

await axios.post("http://localhost:8800/api/auth/login",inputs,{withCredentials: true});




I added cors options in index.js (server side). 
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    ///..other options
};

app.use(cors(corsOptions));

app.use(cookieParser());

*/
