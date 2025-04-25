import multer from "multer";
import path from "path";
import fs from "fs";

const uploadFolder = path.join("uploads", "reels");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });


const profileUploadFolder = path.join("uploads", "profiles");
if (!fs.existsSync(profileUploadFolder)) {
  fs.mkdirSync(profileUploadFolder, { recursive: true });
}

const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, profileUploadFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

export const uploadProfile = multer({ storage: profileStorage });
