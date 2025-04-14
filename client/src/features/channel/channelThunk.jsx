import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/info";
// Create Channel
export const createChannel = createAsyncThunk(
    "channel/create",
    async ({ channelName, niche, language , email }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/channels/create`,
                { channelName, niche, language,email},
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to create channel";
            return rejectWithValue(errorMessage);
        }
    }
);
 
// Get Single Channel
export const getChannelByEmail  = createAsyncThunk(
    "channel/get",
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/channels/getByEmail?email=${email}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch the channel";
            return rejectWithValue(errorMessage);
        }
    }
);

// Update Channel
export const updateChannel = createAsyncThunk(
    "channel/update",
    async ({ channelId, updates }, { rejectWithValue }) => {
        try {
            // console.log(channelId , updates)
            // return ; 
            const response = await axios.put(
                `${BASE_URL}/channels/update?id=${channelId}`,
                updates,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update the channel";
            return rejectWithValue(errorMessage);
        }
    }
);