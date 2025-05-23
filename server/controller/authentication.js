import User from "../model/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import { sendEmail } from "./sendEmail.js";
import dotenv from "dotenv";
import ImageKit from "imagekit";
import { OAuth2Client } from 'google-auth-library';

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const serverUrl = process.env.SERVER_URL || "http://localhost:5000";
const createToken = async (user) => {
    try {
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET
        )
        return token;
    } catch (error) {
        console.log("Error while creating the token ", error)
    }
}
export const signup = async (req, res) => {
    try {
      const { firstName, lastName, email ,  password } = req.body;

      if (!firstName || !lastName || !email ) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log(existingUser)
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });  
      
      const isMailSend =  await  sendEmail(email , newUser) ; 
      // Generate token
      const token = await createToken(newUser);
  
      // Set token in cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Requires HTTPS
        sameSite: "none", // Allows cross-origin requests
    });
  
      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };
  
export const login = async (req , res ) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

         if( existingUser &&  !existingUser.isVerified){
          await  sendEmail(email , existingUser) ;    
          return res.status(400).json({message:"Please verify your Email , we have sent the mail"})
         }
       
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = await createToken(existingUser);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true, 
            sameSite: "none", 
        });

        res.status(200).json(existingUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
}



export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);
    
    if (!token) return res.status(400).json({ message: 'No token provided' });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        firstName: given_name || 'Google',
        lastName: family_name || 'User',
        email,
        password: null,
      });
    }

    const jwtToken = await createToken(user);

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.status(200).json(user);
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Google login failed' });
  }
};



export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true, 
            sameSite: "none", 
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error while logging out:", error);
        return res.status(500).json({ message: "Error while logging out" });
    }
}
export const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error while getting the current user:", error);
        return res.status(500).json({ message: "Error while getting the current user" });
    }
};

export const updateProfile = async (req, res) => {
  const id = req.query.id;

  try {
    let updates = { ...req.body };
    console.log("this is for updates", updates);
    
    if (req.file) {
      const buffer = req.file.buffer; // Get in-memory file buffer

      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: req.file.originalname,
        folder: "/profiles", // optional
      });

      updates = {
        ...updates,
        profileImage: uploadResponse.url,
      };
    }

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};
  


export const verifyUser = async (req, res) => {
    try {
        const id = req.query.id;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json("User not found");
        }

        if (user.isVerified) {
            return res.status(200).json("User is already verified");
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { isVerified: true },
            { new: true }
        );
        res.status(200).json("User Verified successfully");
    } catch (error) {
        res.status(500).json(error?.message || "Something went wrong while verifying the user");
    }
};






