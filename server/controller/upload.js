import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import ImageKit from "imagekit";
// const s3Client = new S3Client({
//   region: "eu-north-1",
//   credentials: {
//     accessKeyId: process.env.ACCESS_KEY,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY,
//   },
// });
// console.log(
//   "this is for credancial object ",
//   process.env.ACCESS_KEY,
//   process.env.SECRET_ACCESS_KEY
// );


const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const putObject = async (req, res) => {
  try {
    // console.log(  
    //   "this is for credancial object ",
    //   process.env.ACCESS_KEY,
    //   process.env.SECRET_ACCESS_KEY
    // );
    // const { fileName, contentType } = req.body;
    // console.log("this is req.body from putObject", req.body);
    // console.log(fileName, contentType);
    // if (!fileName || !contentType) {
    //   throw new Error("Please provide the fileName and contentType ");
    // }
    // const command = new PutObjectCommand({
    //   Bucket: "reels-anshu",
    //   Key: `uploads/${fileName}`,
    //   ContentType: contentType,
    // });
    // const getUrl = await getSignedUrl(s3Client, command);
    // console.log(getUrl);
    const getUrl = imagekit.getAuthenticationParameters();
    res.status(200).json(getUrl);

  } catch (error) {
    res.status(500).json(error?.message);
    console.log(error);
  }
};    