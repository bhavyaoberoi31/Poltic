'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, MoreVertical, Heart, MessageCircle, Share, ThumbsUp, ThumbsDown, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './Loader';
import Video from './Video';
import { feedApi, likePost } from '../services/api.service';

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <motion.div 
          className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl border border-gray-200"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button 
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group" 
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
          <div className="mt-4">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Feed = () => {
  const [reels, setReels] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReelId, setCurrentReelId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [likingPost, setLikingPost] = useState(null);

  const observer = useRef(null);
  const videoRefs = useRef({});
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const fetchReels = async (pageNum) => {
    try {
      setLoading(true);

      const response = await feedApi({ page: pageNum });

      const newReels = response.feed;

      if (pageNum === 1) {
        setReels(newReels);
      } else {
        setReels((prev) => [...prev, ...newReels]);
      }

      setHasMore(pageNum < response.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching reels:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReels(1);
  }, []);

  // Handle scroll to snap to videos
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isScrolling.current) return;
    
    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    // Account for navbar height on mobile
    const videoHeight = window.innerWidth >= 768 ? containerHeight : containerHeight;
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set timeout to snap to nearest video after scroll ends
    scrollTimeoutRef.current = setTimeout(() => {
      const newIndex = Math.round(scrollTop / videoHeight);
      const targetIndex = Math.max(0, Math.min(newIndex, reels.length - 1));
      
      if (targetIndex !== currentIndex) {
        setCurrentIndex(targetIndex);
        setCurrentReelId(reels[targetIndex]?._id);
        
        // Snap to the video
        isScrolling.current = true;
        container.scrollTo({
          top: targetIndex * videoHeight,
          behavior: 'smooth'
        });
        
        // Reset scrolling flag after animation
        setTimeout(() => {
          isScrolling.current = false;
        }, 300);
      }
    }, 150);
  }, [reels, currentIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Play current video and pause others
    if (reels.length > 0 && currentIndex < reels.length) {
      const currentReel = reels[currentIndex];
      const currentVideo = videoRefs.current[currentReel._id];
      
      // Pause all videos first
      Object.entries(videoRefs.current).forEach(([id, vid]) => {
        if (vid) vid.pause();
      });
      
      // Play current video
      if (currentVideo) {
        setTimeout(() => {
          currentVideo.play().catch(() => {
            currentVideo.muted = true;
            currentVideo.play().catch(() => {});
          });
        }, 100);
      }
    }
  }, [currentIndex, reels]);

  const lastReelRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchReels(nextPage);
          }
        },
        {
          root: null,
          rootMargin: '100px',
          threshold: 0.1,
        }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page]
  );

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    await fetchReels(1);
    setRefreshing(false);
  };

  const handleLike = async (postId) => {
    if (likingPost === postId) return; 
    
    try {
      setLikingPost(postId);
      
      // Optimistically update the UI
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });
      
      // Update the reel's like count
      setReels(prev => 
        prev.map(reel => 
          reel._id === postId 
            ? { ...reel, likes: likedPosts.has(postId) ? reel.likes - 1 : reel.likes + 1 }
            : reel
        )
      );
      
      await likePost(postId);
    } catch (error) {
      
      
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });
      
      setReels(prev => 
        prev.map(reel => 
          reel._id === postId 
            ? { ...reel, likes: likedPosts.has(postId) ? reel.likes + 1 : reel.likes - 1 }
            : reel
        )
      );
    } finally {
      setLikingPost(null);
    }
  };

  const getActionButtons = (reel) => [
    { 
      icon: ThumbsUp, 
      label: reel.likes || '0', 
      action: 'like',
      isLiked: likedPosts.has(reel._id),
      isLoading: likingPost === reel._id
    },
    { icon: ThumbsDown, label: 'Dislike', action: 'dislike' },
    { icon: MessageCircle, label: '45', action: 'comment' },
    { icon: Share, label: 'Share', action: 'share' },
    { icon: Flag, label: 'Report', action: 'report' },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-y-auto hide-scrollbar snap-y snap-mandatory"
      style={{ scrollBehavior: 'smooth', height: 'calc(100vh - 4rem)' }}
    >
      {/* Floating Mute Button */}
      <motion.button
        onClick={toggleMute}
        className="fixed top-20 md:top-24 right-4 z-30 bg-white border border-gray-200 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.5 }}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-gray-600" />
        ) : (
          <Volume2 className="w-5 h-5 text-blue-600" />
        )}
      </motion.button>

      {reels.map((reel, index) => (
        <motion.div
          key={reel._id}
          className="relative w-full flex items-center justify-center snap-start bg-gradient-to-br from-gray-100 to-gray-200"
          style={{ height: 'calc(100vh - 4rem)' }}
          ref={index === reels.length - 3 ? lastReelRef : null}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 20,
            delay: index * 0.1
          }}
        >
          {/* Video Container with 9:16 aspect ratio */}
          <div className="relative w-full sm:max-w-[400px] mx-auto h-full sm:h-auto sm:aspect-[9/16]">
            <div className="absolute inset-0 bg-black sm:rounded-2xl shadow-2xl overflow-hidden">
              <Video
                reel={reel}
                isMuted={isMuted}
                isPlaying={currentReelId === reel._id}
                videoRef={(el) => {
                  if (el) videoRefs.current[reel._id] = el;
                }}
              />

              {/* Action Buttons - Right Side (All Devices) */}
              <div className="absolute bottom-20 right-3 flex flex-col gap-3 z-30">
                {getActionButtons(reel).slice(0, 4).map((btn, btnIndex) => (
                  <motion.button
                    key={btn.action}
                    className="group flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 25,
                      delay: 0.3 + btnIndex * 0.1
                    }}
                    onClick={() => {
                      if (btn.action === 'like') {
                        handleLike(reel._id);
                      }
                      // Add other action handlers here
                    }}
                    disabled={btn.isLoading}
                  >
                    <div className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center shadow-lg border transition-colors ${
                      btn.isLiked 
                        ? 'bg-red-500 border-red-500' 
                        : 'bg-white/95 border-gray-200 hover:bg-white'
                    }`}>
                      <btn.icon className={`w-5 h-5 ${btn.isLiked ? 'text-white' : 'text-gray-700'}`} />
                    </div>
                    <span className="text-xs font-semibold mt-1 text-white drop-shadow-lg bg-black/50 px-2 py-0.5 rounded-full">
                      {btn.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {loading && (
        <motion.div 
          className="flex flex-col items-center justify-center"
          style={{ height: 'calc(100vh - 4rem)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <Loader />
          <p className="text-gray-500 text-sm mt-4">Loading more videos...</p>
        </motion.div>
      )}

      {!hasMore && reels.length > 0 && (
        <motion.div 
          className="flex flex-col items-center justify-center text-center"
          style={{ height: 'calc(100vh - 4rem)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-500 text-sm">You've reached the end of the feed</p>
          <p className="text-gray-400 text-xs mt-1">Pull to refresh for new content</p>
        </motion.div>
      )}

      {reels.length === 0 && !loading && (
        <motion.div 
          className="flex flex-col items-center justify-center"
          style={{ height: 'calc(100vh - 4rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-gray-500 text-lg mb-2">No videos available</p>
          <p className="text-gray-400 text-sm">Check back later for new content</p>
        </motion.div>
      )}
    </div>
  );
};

export default Feed;
