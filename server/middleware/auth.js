import jwt from 'jsonwebtoken'
import User from '../model/User.js';
export const verifyToken = async (req, res, next) => {
    try {
        const token =  req.cookies.token;
        if (!token) {
            return res.status(401).json("No token provided")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await  User.findById(decoded.id) ; 
          if(!user.isVerified){
             return res.status(400).json("Please Verify your Email")
          }
          console.log(user);
        req.user = user;
        console.log( "this is user from the verify Token " ,  req.user)
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}