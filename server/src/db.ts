import  { model,Schema} from 'mongoose';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

// mongoose.connect('mongodb+srv://lvxdev1:KCrjdQAnRAUPmmYt@cluster0.qyyjggb.mongodb.net/')
// mongoose.connect('mongodb://localhost:27017/brainly')
mongoose.connect(process.env.MONGODB_URI!)
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("database not connected",err))



//User's schema 
const UserSchema = new Schema({
    
    username:{
        type:String,
        require:true,
    },

    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }

})
export const UserModel=model("User",UserSchema);



//Tag Schema 
const TagSchema=new Schema({
    tags:{
        type:[]
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:UserModel
    }
})
export const TagModel=model('Tags',TagSchema);




//Link schema
const LinkSchema=new Schema({
    hash:{
        type:String,
        unique:true,
    },
    userid:{
        type:mongoose.Types.ObjectId,
        unique:true,
        ref :UserModel,
        require:true,
    },
    share:{
        type:Boolean,
        require:true,
    }
})
export const LinkModel=model('links',LinkSchema);



//Content Schema
const contentSchema=new Schema({

    type:{
        type:String
    },
    link:{
        type:String,
        ref:LinkModel
    },
    tittle:{
        type:String
    },

    tags:{
        type:[],
        ref:TagModel
    },
    userid:{
        type:mongoose.Types.ObjectId,
        
        ref:UserModel,
    }
})
export const ContentModel=model("Content",contentSchema);