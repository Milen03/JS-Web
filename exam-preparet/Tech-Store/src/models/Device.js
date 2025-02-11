import { Schema, model, Types} from 'mongoose'
import User from './User.js'

const deviceSchema = new Schema({
    brand: {
        type: String,
        required: true,
        minLength: 2
    },
    model: {
        type: String,
        required: true,
        minLength: 5
    },
    hardDisk: {
        type: String,
        required: true,
        minLength: 5
    },
    screenSize: {
        type: String,
        required: true,
        minLength: 1
    },
    ram: {
        type: String,
        required: true,
        minLength: 2
    },
    operatingSystem: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20
    },
    cpu:{
        type:String,
        required:true,
        minLength: 10,
        maxLength: 50
    },
    gpu:{
        type:String,
        required:true,
        minLength: 10,
        maxLength: 50
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    color:{
        type:String,
        required:true,
        minLength: 2,
        maxLength: 10
    },
    weight:{
        type:String,
        required:true,
        minLength: 1,
    },
    imageUrl:{
        type:String,
        required:true,
        match: /^https?:\/\//
    },
    creator:{
        type:Types.ObjectId,
        ref:'User'
       
    },
    preferredList: [{
        type:Types.ObjectId,
        ref: "User", // Референция към User модела
    }],

})

const Device = model ('Device',deviceSchema)

export default Device