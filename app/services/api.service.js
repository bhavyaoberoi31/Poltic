import { servicesAxiosInstance } from "./config";


export const checkLoggedIn = async () => {
  const response = await servicesAxiosInstance.get('/auth/check');
  return response.data;
}

export const signUp = async (payload) => {
  const response = await servicesAxiosInstance.post('auth/signup', payload);
  return response.data;
}

export const signIn = async (payload) => {
  const response = await servicesAxiosInstance.post('auth/login', payload);
  return response.data;
}

export const googleLogin = async (payload) => {
  const response = await servicesAxiosInstance.post('auth/google', payload);
  return response.data;
}

export const feedApi = async ({page, limit = 20}) => {
  const response = await servicesAxiosInstance.get(`/feed?page=${page}&limit=${limit}`);
  return response.data;
}

export const uploadReel = async (formData) => {
  const response = await servicesAxiosInstance.post('/reel', formData);
  return response.data;
}

export const deleteReelApi = async (id) => {
  const response = await servicesAxiosInstance.delete(`/reel/${id}`);
  return response.data;
}

export const uploadProfileImg = async (formData) => {
  const response = await servicesAxiosInstance.put('/user', formData);
  return response.data;
}

export const getProfile = async () => {
  const response = await servicesAxiosInstance.get('/user');
  return response.data;
}

export const reelsApi = async ({page, limit = 20}) => {
  const response = await servicesAxiosInstance.get(`/reel?page=${page}&limit=${limit}`);
  return response.data;
}

export const likePost = async (postId) => {
  const response = await servicesAxiosInstance.post(`/like/${postId}`);
  return response.data;
}

export const getUser  = async (userId) => {
  const response = await servicesAxiosInstance.get(`/profile/${userId}`);
  return response.data;
}

export const getUserReels = async ({page, limit = 20, userId}) => {
  const response = await servicesAxiosInstance.get(`/profile/reels/${userId}?page=${page}&limit=${limit}`);
  return response.data;
}