import { Router } from "express";
import homeControler from "./controllers/homeController.js";
import authController from "./controllers/authController.js"
import courseController from "./controllers/courseController.js";

const routes = Router()

routes.use(homeControler)
routes.use('/auth',authController)
routes.use('/courses',courseController)

routes.get('*',(req,res)=>{
    res.render('404')
})


export default routes