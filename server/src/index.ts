import express from 'express';
import jwt from 'jsonwebtoken'
import cors from 'cors';

import { LinkModel, UserModel } from './db';
import { ContentModel } from './db';

import { JWT_SECRET } from './config'

import {Request,Response} from 'express'
import { customRequest } from './customRequest'
import { authmiddleware } from './authMiddleware';
import { generatelinkmiddleware } from './utils';

import { Frontend_url } from './config';



import { z } from 'zod';
import bcrypt from 'bcrypt';

const app = express();

app.use(express.json());

app.use(cors({ origin: Frontend_url  }));

//routes 



//zod schema
const signupSchema = z.object({
  username: z.string()
    .min(4, "Username must be at least 4 characters")
    .max(60, "Username must be at most 60 characters")
    .regex(/^[A-Za-z]+$/, "Username must contain only alphabets")
    .nonempty("Username is required"),

  email: z.string()
    .email("Invalid email")
    .min(12, "Email must be at least 12 characters")
    .max(60, "Email must be at most 60 characters")
    .nonempty("Email is required"),

  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    .nonempty("Password is required")
});





//signup
app.post('/api/v1/signup', async (req:Request, res:Response) => {
    try {
   const { username, email, password } = signupSchema.parse(req.body);

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
     res.status(411).json("email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   

        await UserModel.create({
            username,
            email,
            password:hashedPassword
        });
        res.json("you are signed up");

    }
    catch (err:any){
        if(err instanceof z.ZodError){
            res.status(400).json({errors:err.errors});
            return ;
        }
   
    }

});




//signin

app.post('/api/v1/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const founduser = await UserModel.findOne({
            email})

        if (!founduser) {
       res.status(403).json("wrong email or password if you haven't signed up first sign up to Login in");
      
        }
//@ts-ignore
        const isPasswordCorrect=await bcrypt.compare(password, founduser.password);
        
        
    if (!isPasswordCorrect) {
      res.status(403).json("wrong email or password");
    }
            const token = jwt.sign({
                userid: founduser?._id,
                username:founduser?.username
            }, JWT_SECRET)

          res.status(200).json({ message: "signin successful", token });
        
    }
    catch (err) {
     res.status(500).json("you are not signed in");
    }

});


//add new content
app.post('/api/v1/content', authmiddleware, async (req: customRequest, res) => {
    const type = req.body.type;

    const link = type==="youtube"? req.body.link.split("?")[0].replace('https://youtu.be/','https://www.youtube.com/embed/'):req.body.link.replace('x.com','twitter.com');
    const tittle = req.body.tittle;
    console.log(link);


    try {

        await ContentModel.create({
            type,
            link,
            tittle,
            userid: req.id,
        })



       
        

        res.status(200).json("content added successfully");
        const content = await ContentModel.find({
            userid: req.id
        })
        console.log(content);

    }
    catch (err) {
        res.status(500).json("error in adding content");
    }
})



// get whole content
app.get('/api/v1/dashboard', authmiddleware, async (req: customRequest, res:Response) => {

    try {
        const fetchedcontent = await ContentModel.find({
            userid: req.id
        }).populate("userid", "username")
        if (!fetchedcontent) {
            res.json("error in fetching content for this particular user")
            return
        }
        res.json({
            content: fetchedcontent
        })
        console.log(fetchedcontent)
    }
    catch (err) {
        res.json({ error: err })
    }

})


//delete some content
app.delete('/api/v1/content', authmiddleware, async (req: customRequest, res:Response) => {
    const contentid = req.headers.contentid

    try{
        console.log(req.id);
        console.log(contentid);
    await ContentModel.deleteOne({
        userid: req.id,
        _id: contentid
    })
    console.log(req.url);
   res.status(200).send("content deleted successfully");
}
    catch(err){
        res.status(401).send(err)
    }
})


// create a sharable link 
app.post('/api/v1/mindstack/share', authmiddleware, generatelinkmiddleware, async (req: customRequest, res:Response) => {

   

    try {

   const newLink=  await LinkModel.create({
                hash: req.link,
                userid: req.id,
                share:true,
            })
            res.status(200).send(newLink.hash )}
    
    

    catch (err) {
        
        res.status(500).json({cantgenerateshareablelinkforthis: err})
    }

})

//delete sharable link

app.delete('/api/v1/mindstack/share',authmiddleware,async (req:customRequest,res:Response)=>{
         
      try{await LinkModel.deleteMany({
      userid:req.id
       
      })
   
       console.log('this id is deleted ',req.link);
         res.json("sharable link deleted ");
    }
      catch(err){
    
            res.json({"not able to delete id ":err});
      }
})

// fetch another users's shared mindstack content
app.get('/api/v1/mindstack/share/:sharelink',async (req:customRequest,res:Response)=>{


   try{
    
    const founduser=await LinkModel.findOne({
        hash:req.params.sharelink,
        share:true,
    })

    if(!founduser){
        res.json("user didn't found for this link")
        return 
    }
    else{
        let content =await ContentModel.find({
            userid:founduser.userid
        })
          res.status(200).json({
            content
          })
    }}
   catch(err){
    res.json(err);
   }


})



app.listen(3000,'0.0.0.0', () => {
    console.log("server started on the port : 3000")
})