import { Router } from "express";
import { createReport, deleteReport, getReportedVideoByUser, getReportedVideoCreator } from "../controller/report.js";
const router = Router();
router.route('/create').post(createReport);
router.route('/delete').delete(deleteReport);
router.route('/getByUser').get(getReportedVideoByUser);
router.route('/getByCreator').get(getReportedVideoCreator);

export default router; 