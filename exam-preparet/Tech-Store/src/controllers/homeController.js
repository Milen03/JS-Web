import { Router } from "express";
import deviceService from "../services/deviceService.js";

//set Name of Router
const homeControler = Router()


homeControler.get('/',async(req,res) =>{
    //const devices = await deviceService.getAll()
    const latestDevices = await deviceService.getLatest()
    res.render('home',{
        devices:latestDevices,
        //pageTittle:'Home'
        })
})

homeControler.get('/about',(req,res)=>{
    res.render('about',{pageTittle: 'About'})
})

export default homeControler