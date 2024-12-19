import express from "express"; 
const router = express.Router(); 
import * as UserController from "../app/controllers/UserController.js"; 
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js"




// Users API 
router.post("/Registration", UserController.Registration) 
router.post("/Login", UserController.Login) 
router.get("/ProfileDetails", AuthMiddleware, UserController.ProfileDetails) 
router.get("/AllProfileDetails", AuthMiddleware, UserController.AllProfileDetails) 
router.post("/ProfileUpdate", AuthMiddleware, UserController.ProfileUpdate) 
router.get("/DeleteProfile/:id", AuthMiddleware, UserController.DeleteProfile) 


export default router; 