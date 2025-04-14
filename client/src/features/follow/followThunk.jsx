import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/info";

export const follow = createAsyncThunk(
    "reort/reel",
    async ({ creatorId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/follow/create`,
                { creatorId, userId},
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || "Failed to follow Creator";
            return rejectWithValue(errorMessage);
        }
    }
);

export const isFollowed = async (creatorId, userId) => {
    if (!creatorId || !userId) {
      throw new Error("creatorId and userId are required");
    }
  
    try {
      const response = await axios.post(
        `${BASE_URL}/follow/check`, 
        { creatorId, userId }, 
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return response.data?.isFollowed; // Ensure safe access to the response data
    } catch (error) {
      console.error("Error checking follow status:", error);
      throw new Error(error.response?.data?.message || "Failed to check follow status");
    }
  };


  export const  unFollow = async (id)=> {
      try {
        if(!id) {
             throw new Error ("Id is required")
        }
        const response  = await  axios.delete(`${BASE_URL}/follow/delete?id=${id}`) ;
      } catch (error) {
         throw new Error("Failled to unFollow ")
      }
  }
  