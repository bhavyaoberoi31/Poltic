import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './router/user.js';
import cookieParser from 'cookie-parser';
import reelsRouter from './router/reels.js';
import followRouter from './router/follow.js';
import reportRouter from './router/report.js';
import channelRouter from './router/channel.js'
import { putObject } from './controller/upload.js';

const app = express();
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json());
app.use(cookieParser());
dotenv.config({
  path: "./.env",
});

app.get("/" ,(req,res)=>{
  return res.status(200).json({
    "success": true,
    "message": "Welcome to politic"
  })
})

// app.get("/" , verifyToken ,  async (req , res)=> {
//       const data = await  readData('count' , 'value') ; 
//       if (data){
//         console.log("Mili")
//         // deleteData('count')
//          return res.status(200).json(data) ; 
//       }

//       let count = 0 ; 
//       for(let i = 0 ; i<10000000000; i++) {
//          count ++ ; 
//       } 
//       await createData('count', 'value', count); 
//       return res.status(200).json(count) ; 
// } )

// app.get("/" , verifyToken); 
app.use('/v1/users', userRouter);
app.use('/v1/reels', reelsRouter);
app.use('/v1/follow', followRouter);
app.use('/v1/report', reportRouter);
app.post("/v1/putObject", putObject);
app.use('/v1/channels' , channelRouter);
// sendEmail(
//   'anshur9608837@gmail.com',
//   'Test Email Subject',
//   'This is the plain text body of the email.',
//   '<h1>This is the HTML body of the email.</h1>'
// );
export { app };



