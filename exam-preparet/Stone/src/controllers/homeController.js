import { Router } from "express";
import stoneService from "../services/stoneService.js";

//set Name of Router
const homeControler = Router()


homeControler.get('/',async(req,res) =>{
    const latestDevices = await stoneService.getLatest()
    res.render('home',{
        stones: latestDevices,
        pageTittle:'Home'})
})

export default homeControler