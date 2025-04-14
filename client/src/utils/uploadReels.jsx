import axios from "axios";
import ImageKit from "imagekit-javascript";
import { BASE_URL } from "../constants/info";
export const uploadFileToS3 = async (file) => {
  try {
    const fileName = file.name + Date.now();
    const response = await fetch(`${BASE_URL}/putObject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName, contentType: file.type }),
    });
    console.log(response, "res");
    
    if (!response.ok) {
      throw new Error("Failed to get the pre-signed URL for " + file.name);
    }
    const presignedUrl = await response.json();
    console.log(presignedUrl, "pre");
    
    const imagekit = new ImageKit({
      publicKey: "public_lk3duY+8qOYKNvaEMratL2x7ktA=",
      urlEndpoint: "https://ik.imagekit.io/osu3dgofo",
      authenticationEndpoint: "http://localhost:5000/api/get-upload-token",
    });
    // console.log(presignedUrl);
    
    // const fileReader = new FileReader();
    // const binaryData = await new Promise((resolve, reject) => {
    //   fileReader.onloadend = () => resolve(fileReader.result);
    //   fileReader.onerror = () => reject(fileReader.error);
    //   fileReader.readAsArrayBuffer(file); 
    // });

    // const uploadResponse = await axios.put(presignedUrl, binaryData, {
    //   headers: {
    //     "Content-Type": file.type,
    //   },
    // });

    const uploadResponse = new Promise((resolve, reject) => {
      imagekit.upload(
        {
          file, // file object
          fileName: file.name,
          ...presignedUrl,
        },
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.url);
          }
        }
      );
    });
    console.log(uploadResponse);
    
    return uploadResponse;

    // if (uploadResponse.status === 200) {
    //   const url = `https://reels-anshu.s3.eu-north-1.amazonaws.com/uploads/${fileName}`;
    //   return url;
    // } else {
    //   throw new Error(`Error while uploading the file: ${uploadResponse.status}`);
    // }
  } catch (error) {
    console.log("Error while uploading file:", error);
    throw error; 
  }
};