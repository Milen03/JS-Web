import { JWT_SECRET } from "../confing.js"
import jwt from "jsonwebtoken"

export const generateToken = (user) =>{
    //create Token 
  const payload = {
    id:user.id,
    email: user.email,

}
    const token = jwt.sign(payload,JWT_SECRET,{ expiresIn: '2h' })

    return token

  } 