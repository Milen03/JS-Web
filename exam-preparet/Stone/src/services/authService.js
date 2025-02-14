import User from "../models/User.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/autUtils.js"

export const login = async(email,password) =>{
    // Vilidet user
    const user = await User.findOne({email})
  if(!user){
      throw new Error('Invalid user or email')
  }
  //Validet Password
  const isValid = await bcrypt.compare(password, user.password)
  
  if(!isValid){
      throw new Error('Invalid user or email')
  }
  const token = generateToken(user)

  return token
  
  }

  

export const register = async(userData) => {
    if(userData.password!==userData.confirmPassword){
        throw new Error('password missmatch!')
    }

    const user = await User.findOne({email: userData.email}).select({_id:true})
    if(user>0){
        throw new Error('User already exists')
    }

const createdUser = await User.create(userData)

const token = generateToken(createdUser)

return token
} 

const authService = {
register,
login
}

export default authService