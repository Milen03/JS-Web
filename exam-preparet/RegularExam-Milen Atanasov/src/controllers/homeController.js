import { Router } from "express";

//set Name of Router
const homeControler = Router()


homeControler.get('/',(req,res) =>{
    res.render('home',{pageTittle:'Home'})
})

export default homeControler