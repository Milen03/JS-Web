import { Router } from "express";
import homeControler from "./controllers/homeController.js";
import authController from "./controllers/authController.js"

const routes = Router()

routes.use(homeControler)
routes.use('/auth',authController)

export default routes