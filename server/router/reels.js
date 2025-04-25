import { Router } from "express";
import { createReel, deleteReelById, getAllReels, getReelById, getReelsByUserId, updateReelById } from "../controller/reels.js";
import { upload } from "../utils/multer.js";

const router = Router() ; 
router
  .route('/create')
  .post(upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), createReel);
router.route('/delete').delete(deleteReelById);
router.route('/update').put(updateReelById) ; 
router.route('/get-all').get(getAllReels) ; 
router.route('/getByUserId').get(getReelsByUserId); 
router.route('/getReelById').get(getReelById);
export default router; 