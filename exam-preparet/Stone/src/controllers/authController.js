import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKI_NAME } from "../confing.js";
import { isAuth } from "../middlewares/authMiddlewares.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router()


authController.get('/login',(req,res)=>{
    res.render('auth/login')
})

authController.post('/login',async(req,res)=>{
    const {email,password} = req.body

    try{
        const token = await authService.login(email,password)

        res.cookie(AUTH_COOKI_NAME,token,{httpOnly: true})
        res.redirect('/')
    }catch (err){
        res.render('auth/login',{
            error: getErrorMessage(err),
            user: { email }})
    }

    
})


authController.get('/register', (req,res)=>{
    res.render('auth/register')
})

authController.post('/register',async(req,res)=>{
    const userData = req.body
try{
    const token = await authService.register(userData)

    res.cookie(AUTH_COOKI_NAME,token,{httpOnly: true})
    res.redirect('/')
        
}catch(err){
    res.render('auth/register',{
        error: getErrorMessage(err),
        user: userData})
}
    
})

authController.get('/logout',isAuth,(req,res)=>{
    res.clearCookie(AUTH_COOKI_NAME)
    res.redirect('/')
})


export default authController