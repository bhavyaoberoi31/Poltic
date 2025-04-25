import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/info";
// Upload Reel
export const uploadReel = createAsyncThunk(
    "reels/upload",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/reels/create`,
          formData,
          {
            headers: {
              // Do NOT set Content-Type manually for FormData
              // It will be set automatically as 'multipart/form-data' with proper boundary
            },
            withCredentials: true,
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || "Failed to upload reel";
        return rejectWithValue(errorMessage);
      }
    }
  );
  

// Get All Reels
export const getReels = createAsyncThunk(
    "reels/get-all",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/reels/get-all`, {
                withCredentials: true,
            });
            console.log(response , "this is from thunk ")
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch reels";
            return rejectWithValue(errorMessage);
        }
    }
);

// Delete Reel
export const deleteReel = createAsyncThunk(
    "reels/delete",
    async (reelId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/reels/delete?id=${reelId}`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to delete reel";
            return rejectWithValue(errorMessage);
        }
    }
);

export const getReelById = createAsyncThunk(
    "reels/getById",
    async (reelId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/reels/getReelById?id=${reelId}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch reel";
            return rejectWithValue(errorMessage);
        }
    }
);

export const getReelsByUserId = async (userId) => {
        const response = await axios.get(`${BASE_URL}/reels/getByUserId?userId=${userId}`,
            {withCredentials:true}
        )
        return response.data
};