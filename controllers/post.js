import { db } from "../db.js";
import jwt from 'jsonwebtoken';


export const getPosts = (req,res)=>{
    const q = req.query.cat ? "SELECT * FROM posts  WHERE cat=?" 
    : "SELECT * FROM posts"; 
    db.query(q,[req.query.cat], (err,data)=>{
        if(err) return res.status(500).send(err);

        return res.status(200).json(data);
    })
}

export const getPost = (req,res)=>{
    const q= "SELECT p.id, `username`, `title`, `body`, `blurb`, p.img, u.img as userImg, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?"
    db.query(q, [req.params.id], (err, data)=>{
        if (err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })
}

export const addPost = (req,res)=>{
    const q = "INSERT INTO posts (`title`, `body`, `img`, `cat`, `date`, `uid`, `blurb`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.date,
        req.body.id,
        req.body.blurb
    ]
    db.query(q,[values], (err,data)=>{
        if(err) return res.status(500).json(err)
        return res.json("Post has been created")
    })
}

export const deletePost = (req,res)=>{

    const postId = req.params.id
    const q= "DELETE FROM posts WHERE `id`= ? "
    
    db.query(q, [postId], (err,data)=>{
        if(err) return res.status(403).json(err)
        return res.json("Post has been deleted")
    })

    /*/CHECK JSON WEB TOKEN
    const token = req.cookies.access_token
    console.log(token)
    if (!token) return res.status(401).json("User not authenticated to perform action")
    jwt.verify(token,"jwtkey", (err, userInfo)=>{
        if(err) return res.status(403). json("Token not valid")

        const postId = req.params.id
        const q= 'DELETE FROM posts WHERE `id`= ? AND `uid`= ?'
        db.query(q,[postId, userInfo.id], (err,data)=>{
            if(err) return res.status(403).json("You can delete only your posts")
            return res.json("Post has been deleted")
        })
    })*/
}

export const updatePost = (req,res)=>{
    const q = "UPDATE posts SET `title` = ? `body` = ? `img` = ? `cat` = ? WHERE `id` = ? "
    /*UPDATE `blog`.`posts` SET `title` = 'New Title Tested', `desc` = '<p>No test but yes there is test</p>', `cat` = 'science' WHERE (`id` = '21');*/ 

    const postId = req.params.id

    const x = "UPDATE `blog`.`posts` SET `title` = ?, `body` = ?, `cat` = ?, `blurb` = ?, `img`= ? WHERE (`id` = ?)"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cat,
        req.body.blurb,
        req.body.img,        
    ]
    db.query(x,[...values, postId], (err,data)=>{
        if(err) return res.status(500).json(err)
        return res.json("Post created")
    })
}