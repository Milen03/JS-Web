import { Router } from "express";
import homeControler from "./controllers/homeController.js";
import authController from "./controllers/authController.js"
import volcanoController from "./controllers/volcanoController.js";

const routes = Router()

routes.use(homeControler)
routes.use('/auth',authController)
routes.use('/volcanos',volcanoController)

routes.get('*',(req,res)=>{
    res.render('404')
})

export default routes