'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Link from 'next/link';
// import Nav from '@/components/Nav';
// import Sidebar from '@/components/Sidebar';
import { captureFrameFromVideo } from '@/app/utils/captureFrameFromVideo';
import { User2, X } from 'lucide-react';
import { getUser, getUserReels, likePost } from '@/app/services/api.service';
import { motion, AnimatePresence } from 'framer-motion';
import Video from '@/app/component/Video';
// import { FaUserCircle } from 'react-icons/fa';

const ProfilePage = () => {
  let { creatorId } = useParams();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    userImage: '',
    userId: '', 
  });

  const [isSubscribed, setIsSubscribe] = useState(false);
  const [optimisticFollow, setOptimisticFollow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reels, setReels] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [reelsLoading, setReelsLoading] = useState(true);
  const [selectedReel, setSelectedReel] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [likingPost, setLikingPost] = useState(null);

  // Fetch profile details & reels
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setReelsLoading(true);

        // Assuming backend endpoint gives full creator info + reels
        const [userRes, reels] = await Promise.all([
          getUser(creatorId),
          getUserReels({ userId: creatorId }),
        ]);
        console.log(reels);
        

        setUser({
          firstName: userRes.firstName,
          lastName: userRes.lastName,
          userImage: userRes.profileImgUrl,
          userId: userRes._id, // change based on your backend
        });
        setReels(reels.posts || []);

        setIsLoading(false);
        setReelsLoading(false);
      } catch (err) {
        console.error('Error loading profile:', err);
        setIsLoading(false);
        setReelsLoading(false);
      }
    };

    if (creatorId) fetchProfile();
  }, [creatorId]);

  // Check if user is followed
  // useEffect(() => {
  //   const checkFollow = async () => {
  //     try {
  //       const res = await axios.get(`/api/follow/status?creatorId=${creatorId}&userId=${user.userId}`);
  //       setIsSubscribe(res.data.isFollowed);
  //     } catch (err) {
  //       console.error('Follow check failed:', err);
  //     }
  //   };
  //   if (creatorId && user.userId) checkFollow();
  // }, [creatorId, user.userId]);

  // Generate thumbnails
  useEffect(() => {
    const generateThumbnails = async () => {
      for (const reel of reels) {
        try {
          if (!reel.thumbnailUrl && !thumbnails[reel._id]) {
            const frame = await captureFrameFromVideo(reel.videoUrl);
            setThumbnails((prev) => ({ ...prev, [reel._id]: frame }));
          }
        } catch (err) {
          console.error(`Error capturing frame for ${reel._id}:`, err);
        }
      }
    };
    generateThumbnails();
  }, [reels]);

  const handleFollow = async () => {
    try {
      setLoading(true);
      // setOptimisticFollow(true);
      // await axios.post('/api/follow', { creatorId, userId: user.userId });
      setIsSubscribe(true);
    } catch (err) {
      console.error('Follow failed:', err);
      // setOptimisticFollow(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUnFollow = async () => {
    try {
      setLoading(true);
      // await axios.post('/api/unfollow', { creatorId, userId: user.userId });
      setIsSubscribe(false);
    } catch (err) {
      console.error('Unfollow failed:', err);
      setIsSubscribe(true);
    } finally {
      setLoading(false);
    }
  };

  const openReelPopup = (reel) => {
    setSelectedReel(reel);
    setIsPopupOpen(true);
  };

  const closeReelPopup = () => {
    setSelectedReel(null);
    setIsPopupOpen(false);
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
      // Rollback on error
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

  if(!creatorId) return <div>
    No User found. {creatorId}
  </div>

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Loading profile...</p>
    </div>
  );


  return (
    <div>
      <div className="fixed top-0 w-full z-50">
        {/* <Nav /> */}
      </div>
      <div className="flex flex-1 pt-[53px] md:pt-[89px]">
        <div className="z-50 fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
          {/* <Sidebar /> */}
        </div>
        <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-5">
          <div className="w-full flex flex-col items-center justify-center mx-auto p-5">
            <div>
              {user.userImage ? (
                <img
                  src={user.userImage}
                  alt="Profile"
                  className="w-32 h-32 md:w-40 md:h-36 rounded-full object-cover"
                />
              ) : (
                <User2 size={120} className="text-black" />
              )}
            </div>
            <div className="flex flex-col items-center">
              <p className="md:text-[31px] text-[19px] uppercase">
                {user.firstName} {user.lastName}
              </p>
              <p className="md:text-[25px] text-[16px] text-[#B7B7B7]"></p>

              {isSubscribed || optimisticFollow ? (
                <button
                  className={`px-6 py-2 m-3 text-white rounded-md ${
                    loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500'
                  }`}
                  onClick={handleUnFollow}
                  disabled={loading}
                >
                  {loading ? 'Unfollowing...' : 'Unfollow'}
                </button>
              ) : (
                <button
                  className={`px-6 py-2 m-3 text-white rounded-md ${
                    loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#065FD4]'
                  }`}
                  onClick={handleFollow}
                  disabled={loading}
                >
                  {loading ? 'Following...' : 'Follow'}
                </button>
              )}
            </div>
          </div>
          <hr />
          
          {/* Reels Grid Section */}
          {reelsLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading reels...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
          {reels.map((reel) => (
            <div
              className="flex flex-col  items-center justify-center rounded-xl overflow-hidden w-full"
              key={reel._id}
            >
              <div className=" w-full aspect-[9/16] rounded-2xl overflow-hidden">
                <img
                  src={reel.thumbnailUrl || thumbnails[reel._id] || '/assets/thumb.png'}
                  alt={reel.title || 'reel thumbnail'}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>
              <p className="absolute bottom-2 left-2 text-sm truncate text-left text-white bg-black/40 px-2 rounded">
                {reel.title}
              </p>
            </div>
              ))}
            </div>
          )}
          
          {/* Reel Popup Modal */}
          <AnimatePresence>
            {isPopupOpen && selectedReel && (
              <motion.div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeReelPopup}
                style={{ backdropFilter: 'blur(8px)' }}
              >
                <motion.div
                  className="relative w-full max-w-md h-[80vh] bg-black rounded-2xl overflow-hidden"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <button
                    onClick={closeReelPopup}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Video Component */}
                  <div className="w-full h-full">
                    <Video 
                      reel={selectedReel} 
                      isMuted={isMuted}
                      videoRef={() => {}}
                    />
                  </div>

                  {/* Action Buttons Overlay */}
                  <div className="absolute bottom-20 right-4 flex flex-col gap-3 z-10">
                    <motion.button
                      className="group flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLike(selectedReel._id)}
                      disabled={likingPost === selectedReel._id}
                    >
                      <div className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center shadow-lg border transition-colors ${
                        likedPosts.has(selectedReel._id) 
                          ? 'bg-red-500 border-red-500' 
                          : 'bg-white/95 border-gray-200 hover:bg-white'
                      }`}>
                        <svg className={`w-5 h-5 ${likedPosts.has(selectedReel._id) ? 'text-white' : 'text-gray-700'}`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                      <span className="text-xs font-semibold mt-1 text-white drop-shadow-lg bg-black/50 px-2 py-0.5 rounded-full">
                        {selectedReel.likes || '0'}
                      </span>
                    </motion.button>

                    <motion.button
                      className="group flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg border border-gray-200 hover:bg-white transition-colors">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold mt-1 text-white drop-shadow-lg bg-black/50 px-2 py-0.5 rounded-full">
                        Comment
                      </span>
                    </motion.button>

                    <motion.button
                      className="group flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg border border-gray-200 hover:bg-white transition-colors">
                        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold mt-1 text-white drop-shadow-lg bg-black/50 px-2 py-0.5 rounded-full">
                        Share
                      </span>
                    </motion.button>

                    <motion.button
                      className="group flex flex-col items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg border border-gray-200 hover:bg-white transition-colors">
                        {isMuted ? (
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs font-semibold mt-1 text-white drop-shadow-lg bg-black/50 px-2 py-0.5 rounded-full">
                        {isMuted ? 'Unmute' : 'Mute'}
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
