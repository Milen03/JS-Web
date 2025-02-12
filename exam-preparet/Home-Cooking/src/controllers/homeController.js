import { Router } from "express";
import recipeService from "../services/recipeService.js";

//set Name of Router
const homeControler = Router()


homeControler.get('/', async (req,res) =>{
    const latestDevices = await recipeService.getLatest()
    res.render('home',{
        recipes: latestDevices,
        pageTittle:'Home'})
})

export default homeControler