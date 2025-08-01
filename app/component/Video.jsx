'use client';

import { useRef, useState, useEffect } from 'react';
import {
  Pause,
  Play,
  Heart,
  MessageCircle,
  Share,
  MoreVertical,
  CircleUser,
  Clock,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Loader from './Loader';

const Video = ({ reel, isMuted, videoRef }) => {
  const localRef = useRef(null);
  const router = useRouter();

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (localRef.current) {
      if (localRef.current.paused) {
        localRef.current.play();
        setIsPlaying(true);
      } else {
        localRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (localRef.current) {
      localRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (localRef.current && videoRef) {
      videoRef(localRef.current);
    }
  }, [videoRef]);

  useEffect(() => {
    const video = localRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    };

    const handleLoadedData = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  if (!reel) return <Loader />;

  return (
    <motion.div
      key={reel._id}
      className="reel w-full h-full flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {/* Video Container */}
      <div className="relative w-full h-full overflow-hidden sm:rounded-2xl">
        <video
          ref={localRef}
          data-reel-id={reel._id}
          src={reel.videoUrl}
          loop
          muted={isMuted}
          onClick={togglePlayPause}
          className="w-full h-full object-cover cursor-pointer"
        />

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <Loader />
          </div>
        )}

        {/* Play/Pause Indicator */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <div className="w-20 h-20 rounded-full glass border border-white/20 flex items-center justify-center">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none">
          {/* Top Info */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-sm pointer-events-auto">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Live</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>1.2K</span>
            </div>
          </div>

          {/* Bottom Info */}
          <motion.div
            className="absolute bottom-16 left-4 right-20 text-white pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* User Info */}
            <div
              className="flex items-center gap-3 mb-3 cursor-pointer"
              onClick={() => {
                if(reel.userId._id == localStorage.getItem("id")) {
                  router.push("/profile/dashboard");
                } else {
                  router.push(`/user/${reel.userId._id}`)}}

                }              
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {reel.userId?.profileImgUrl ? (
                  <img
                    src={reel.userId.profileImgUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-2 border-white/20">
                    <CircleUser className="w-6 h-6 text-white" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </motion.div>

              <div>
                <p className="font-bold text-white">
                  {`${reel.userId?.firstName || 'Anonymous'} ${reel.userId?.lastName || 'User'}`}
                </p>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Clock className="w-3 h-3" />
                  <span>
                    {new Date(reel.createdAt).getDate()}{" "}
                    {new Date(reel.createdAt).toLocaleString('default', { month: 'short' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <motion.p
              className="text-white text-sm leading-relaxed line-clamp-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {reel.description}
            </motion.p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {['#trending', '#news', '#breaking'].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full text-white/80"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Video;
