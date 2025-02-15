import { Router } from "express";
import courseService from "../services/courseService.js";

//set Name of Router
const homeControler = Router()


homeControler.get('/',async (req,res) =>{
    const latestDevices = await courseService.getLatest()
    res.render('home',{
        courses: latestDevices,
        pageTittle:'Home'})
})

export default homeControler