import mongoose from "mongoose";
import Report from "../model/Report.js";

export const createReport = async (req, res) => {
    try {
          const {reelId , reporterId } = req.body 
        if(!reelId || !reporterId ) {
              return res.status(400).json({message:"Payload is required"})
        }
         const check = await Report.findOne({reelId , reporterId}) ; 
         if(check){
              return res.status(400).json({message:"Already Reported"})
         }
        const newReport = new Report(req.body);
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({message:error.message || "Error while creating the Report"})
    }
}

export const deleteReport = async (req, res) => {
    try {
        const id = req.query.id;
        const deleted = await Report.findByIdAndDelete(id);
        res.status(200).json("Report Deleted Successfully")
    } catch (error) {
        res.status(500).json({message:error.message || "Error while deleting the Report"})
    }
}

export const getReportedVideoByUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const data = await Report.aggregate([
            { $match: { creatorId: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "Reels",
                    localField: "reelId",
                    foreignField: "_id",
                    as: "reel"
                }
            }
        ])
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message || "Error while getting  the Report"})
    }
}


export const getReportedVideoCreator = async (req, res) => {
    try {
        const creatorId = req.body.creatorId;
        const data = await Report.aggregate([
            { $match: { creatorId: new mongoose.Types.ObjectId(creatorId) } },
            {
                $lookup: {
                    from: "Reels",
                    localField: "reelId",
                    foreignField: "_id",
                    as: "reel"
                }
            }
        ])
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message || "Error while getting  the Report"})
    }
}


