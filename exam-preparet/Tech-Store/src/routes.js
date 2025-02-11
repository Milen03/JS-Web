import { Router } from "express";
import homeControler from "./controllers/homeController.js";
import authController from "./controllers/authController.js"
import deviceController from "./controllers/deviceContoller.js";

const routes = Router()

routes.use(homeControler)
routes.use('/auth',authController)
routes.use('/devices',deviceController)


routes.get('*',(req,res)=>{
    res.render('404')
})

export default routes