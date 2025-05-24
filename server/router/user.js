import { Router } from "express";
import { googleLogin, login, logout, signup, updateProfile, verifyUser } from "../controller/authentication.js";
import { verifyToken } from "../middleware/auth.js";
import { uploadProfile } from "../utils/multer.js";

const router = Router();

router.route('/signup').post(signup)
router.route('/login').post(login);
router.route('/logout').post(verifyToken, logout);
router.route('/current').get(verifyToken, getCurrentUser);
router.route('/auth/google').post(googleLogin);
router
  .route("/update")
  .put(verifyToken, uploadProfile.single("profileImage"), updateProfile);
router.route('/verify').get(verifyUser)
export default router;












































