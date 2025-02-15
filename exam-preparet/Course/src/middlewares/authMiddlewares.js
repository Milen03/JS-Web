import { 
    AUTH_COOKI_NAME, 
    JWT_SECRET } from "../confing.js"
import jwt from "jsonwebtoken"

export const auth =(req,res,next) =>{
    const token = req.cookies[AUTH_COOKI_NAME]

    if(!token){
        return next()
    }
try{
    const decodedToken = jwt.verify(token,JWT_SECRET)

    req.user = decodedToken
    res.locals.user = decodedToken //hbs user context in view

    next()
}catch(err){
    res.clearCookie(AUTH_COOKI_NAME)
    return res.redirect('/auth/login')
}
    

}

export const isAuth = (req,res,next) =>{
if(!req.user){
    return res.redirect('/auth/login')
}


    next()
}

export const isGuest = (req,res,next) =>{
    if(req.user){
        res.setError('You are already logged in!')
        return res.redirect('/')
    }

    next()
}