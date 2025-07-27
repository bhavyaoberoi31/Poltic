import { jwtVerify } from 'jose';
import jwt from 'jsonwebtoken'

export const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET, { expiresIn: 24 * 60 * 60 * 14}
  );
};


export const verifyToken = async (token) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return payload;
};