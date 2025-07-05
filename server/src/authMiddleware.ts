import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';


import{customRequest} from './customRequest'

export const authmiddleware=(req:customRequest,res:Response,next:NextFunction):void=>{

         try{     
              const token=req.headers.authorization?.split(' ')[1];
              if(!token){
             res.status(401).json({err:"token missing"});
             return;
                
              }
               
          const decodedtoken=  jwt.verify(token,JWT_SECRET) as jwt.JwtPayload
          if(decodedtoken.userid===null){
           res.status(401).send("userid is null")
           console.log("this is from auth middleware userid is null");
           return ;
            
          }
             req.id=decodedtoken.userid;
              
             next();
         }
         catch(err){
            res.status(401).json({error:"invalid token",details:err});
         }
}


