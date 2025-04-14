// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import channelReducer from './features/channel/channelSlice'
import reelsReducer from './features/reel/reelSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    channel:channelReducer,
    reels:reelsReducer
  },
});

export default store;
