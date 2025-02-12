import { Router } from "express";
import homeControler from "./controllers/homeController.js";
import authController from "./controllers/authController.js"
import recipeController from "./controllers/recipeController.js";

const routes = Router()

routes.use(homeControler)
routes.use('/auth',authController)
routes.use('/recipes',recipeController)

routes.get('*',(req,res)=>{
    res.render('404')
})

export default routes