import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants/info";

// Login
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/users/login`,
                { email, password },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || "Something went wrong";
            return rejectWithValue(errorMessage);
        }
    } 
);

// Signup
export const signup = createAsyncThunk(
    "auth/signup",
    async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/users/signup`,
                { firstName, lastName, email, password },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong";
            return rejectWithValue(errorMessage);
        }
    }
);

// Fetch Current User
export const fetchCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/current`, {
                withCredentials: true,
            });
            // console.log(response.data)
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch current user";
            console.log(errorMessage)
            return rejectWithValue(errorMessage);
        }
    }
);

// Logout
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/users/logout`,
                {},
                { withCredentials: true }
            )
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something went wrong while logging out";
            return rejectWithValue(errorMessage);
        }
    }
);


export const updateProfile = createAsyncThunk(
    'auth/update',
    async ({ id, formData }, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${BASE_URL}/users/update?id=${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        return response.data;
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong while updating the profile";
        return rejectWithValue(errorMessage);
      }
    }
  );
  