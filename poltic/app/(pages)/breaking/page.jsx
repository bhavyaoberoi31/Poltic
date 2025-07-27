'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Play, Clock, Flame } from 'lucide-react';
import { captureFrameFromVideo } from '../../utils/captureFrameFromVideo';
import Loader from '../../component/Loader';
import { feedApi } from '@/app/services/api.service';

const BreakingPage = () => {
  const router = useRouter();
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [thumbnails, setThumbnails] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('Trending');
  const [selectedReel, setSelectedReel] = useState(null);

  const tags = [
    { name: 'Trending', icon: TrendingUp },
    { name: 'Cricket', icon: Play },
    { name: 'Politics', icon: Flame },
  ];

  const observerRef = useRef(null);

  useEffect(() => {
    if (!hasMore) return;

    setLoading(true);
    setError(null);

    const fetchReels = async () => {
      try {
        const response = await feedApi({ page });
        const newReels = response.feed || [];
        setReels(prev => page === 1 ? newReels : [...prev, ...newReels]);
        setHasMore(page < response.pagination.totalPages);
      } catch (err) {
        console.error("Failed to fetch reels:", err);
        setError('Failed to load reels');
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, [page]);

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

  useEffect(() => {
    if (!observerRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      }
    );

    const refCurrent = observerRef.current;
    observer.observe(refCurrent);

    return () => {
      observer.unobserve(refCurrent);
    };
  }, [loading, hasMore, reels.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add search logic here
    }
  };

  return (
    <motion.div 
      className="h-full overflow-y-auto custom-scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border mb-8">
        <div className="px-0 py-6">
          <motion.div 
            className="text-center mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Breaking News
            </h1>
            <p className="text-muted-foreground">Stay updated with the latest happening around the world</p>
          </motion.div>

          <motion.div 
            className="mb-6 px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for your favorite news..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </form>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-3 px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {tags.map((tag, index) => (
              <motion.button
                key={tag.name}
                onClick={() => setSelectedTag(tag.name)}
                className={`
                  group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                  ${selectedTag === tag.name 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <tag.icon className="w-4 h-4" />
                <span className="font-medium">{tag.name}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-4 pb-8">
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {reels.map((reel, index) => (
            <motion.div
              key={reel._id}
              onClick={() => setSelectedReel(reel)}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-border/20">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={reel.thumbnailUrl || thumbnails[reel._id] || '/assets/thumb.png'}
                    alt={reel.title || 'reel thumbnail'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white text-sm font-medium line-clamp-2 mb-2">
                        {reel.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/80 text-xs">
                        <Clock className="w-3 h-3" />
                        <span>2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full glass border border-white/20 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div ref={observerRef} className="h-10" />

        {loading && (
          <motion.div 
            className="flex justify-center items-center my-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Loader size="lg" />
          </motion.div>
        )}

        {!hasMore && reels.length > 0 && (
          <motion.p 
            className="text-center text-muted-foreground mt-8 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            You've reached the end of breaking news
          </motion.p>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
  {selectedReel && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => setSelectedReel(null)} // allow click outside to close
    >
      <motion.div
        className="
          relative w-full max-w-md md:max-w-lg lg:max-w-xl
          rounded-2xl shadow-2xl bg-gradient-to-b from-neutral-900/95 to-neutral-900/80
          overflow-hidden px-0 py-0
        "
        initial={{ y: 40, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.96, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        onClick={e => e.stopPropagation()} // prevent closing when clicking inside modal
      >

        {/* Close Button w/ hover/focus states */}
        <button
          className="absolute top-3 right-3 z-10 flex items-center justify-center
            bg-black/70 hover:bg-black/90 focus-visible:ring-2 focus-visible:ring-primary focus:outline-none
            p-2 rounded-full shadow-lg transition group"
          title="Close"
          type="button"
          aria-label="Close"
          onClick={() => setSelectedReel(null)}
          tabIndex={0}
        >
          <svg className="h-5 w-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="none">
            <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Title + Info */}
        <div className="px-6 pt-7 pb-4 flex flex-col gap-2">
          <h2 className="text-lg font-bold text-white truncate">{selectedReel.title}</h2>
        </div>

        {/* Actual Video */}
        <div className="px-4 pb-5 flex items-center justify-center">
          <video
            src={selectedReel.videoUrl}
            controls={false}
            autoPlay
            className="w-full rounded-lg  max-h-[60vh] shadow-xl "
          />
        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </motion.div>
  );
};

export default BreakingPage;
