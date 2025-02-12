import { Schema,model,Types } from "mongoose";

const recipeShema = new Schema({
    title:{
        type:String,
        required: true,
        minLength: 2,
    },
   ingredients:{
    type:String,
        required: true,
        minLength: 10,
        maxLength: 200
   },
   instructions:{
    type:String,
    required: true,
    minLength: 10,
   },
  description:{
    type:String,
    required: true,
    minLength: 10,
    maxLength: 100
  },
  image:{
    type:String,
    required: true,
    match: /^https?:\/\//
  },
  recommendList: [{
    type:Types.ObjectId,
    ref: 'User'
  }],
  owner:{
    type:Types.ObjectId,
    ref:"User"
  }
   
})

const Recipe = model ('Recipe',recipeShema)


export default Recipe