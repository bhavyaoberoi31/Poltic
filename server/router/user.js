import { Router } from "express";
import { getCurrentUser, login, logout, signup, updateProfile, verifyUser } from "../controller/authentication.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.route('/signup').post(signup)
router.route('/login').post(login);
router.route('/logout').post(verifyToken, logout);
router.route('/current').get(verifyToken, getCurrentUser);
router.route('/update').put(verifyToken , updateProfile)
router.route('/verify').get(verifyUser)
export default router;












































