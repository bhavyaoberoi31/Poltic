import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL configuration
const BASE_URL = "https://api.poltic.in/api/v1";

export const reportReel = createAsyncThunk(
    "reort/reel",
    async ({ creatorId, reporterId, reelId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/report/create`,
                { creatorId, reporterId, reelId },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data;
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || "Failed to report reel";
            return rejectWithValue(errorMessage);
        }
    }
);