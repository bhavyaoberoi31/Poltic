import { Router } from "express";
import { createReel, deleteReelById, getAllReels, getReelById, getReelsByUserId, updateReelById } from "../controller/reels.js";

const router = Router() ; 
router.route('/create').post(createReel) ; 
router.route('/delete').delete(deleteReelById);
router.route('/update').put(updateReelById) ; 
router.route('/get-all').get(getAllReels) ; 
router.route('/getByUserId').get(getReelsByUserId); 
router.route('/getReelById').get(getReelById);
export default router; 