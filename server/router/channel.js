import { Router } from "express";
import { createChannel, getChannelByEmail, getChannels, updateChannel } from "../controller/channel.js";

const router = Router() ; 

router.route('/create').post(createChannel) ; 
router.route('/getByEmail').get(getChannelByEmail) ; 
router.route('/get').get(getChannels) ; 
router.route('/update').put(updateChannel) ; 
export default router ; 
