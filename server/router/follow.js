import { Router } from "express";
import { createFollow, deleteFollow, getFollowCountByUserId, getFollowsByUserId, isFollowed } from "../controller/follow.js";

const router = Router() ; 

router.route('/create').post(createFollow) ; 
router.route('/getByUser').get(getFollowsByUserId) ; 
router.route('/getCount').get(getFollowCountByUserId); 
router.route('/delete').delete(deleteFollow) ; 
router.route('/check').post(isFollowed) ; 

export default router ; 
