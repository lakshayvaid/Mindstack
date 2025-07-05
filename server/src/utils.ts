
import { Response, NextFunction } from "express";

import { customRequest } from './customRequest'
import { LinkModel } from "./db";


const randomletters = "jjkshakjhjkakjhkjha1223456hjsghjgtyuwqioqoiz"

export const generatelinkmiddleware = async (req: customRequest, res: Response, next: NextFunction) => {
        const existingLink=await LinkModel.find({
            userid:req.link
           
         })
         await LinkModel.deleteMany({
            userid:req.id
         })
         
   
    let link = "";
    try {
        for (let i: number = 0; i < 10; i++) {
            link += randomletters[Math.floor(Math.random() * randomletters.length)]
        }
        console.log(link);
        req.link = link;
        next();
    }
    catch (err) {
        res.json("error in creating link");
    }
}