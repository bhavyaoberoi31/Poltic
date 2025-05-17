import multer from "multer";
import path from "path";
import fs from "fs";

export const upload = multer({ storage: multer.memoryStorage() });

export const uploadProfile = multer({ storage: multer.memoryStorage() });