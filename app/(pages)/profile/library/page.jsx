'use client';

import { useState, useEffect } from 'react';
import { uploadReel, reelsApi } from '@/app/services/api.service';
import { useRouter } from 'next/navigation';

const captureFrameFromVideo = (videoUrl) =>
  new Promise((resolve) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = () => {
      video.currentTime = Math.random() * video.duration;
    };

    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/png'));
    };

    video.onerror = () => resolve('/assets/thumb.png');
  });

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState({});
  const router = useRouter();

  const fetchReels = async () => {
    try {
      setLoading(true);
      const data = await reelsApi({ page: 1 });
      setReels(data.posts);
    } catch (error) {
      console.error('Failed to fetch reels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  useEffect(() => {
    const fetchThumbnails = async () => {
      const generatedThumbnails = {};
      for (let reel of reels) {
        if (!reel.thumbnailUrl) {
          const thumb = await captureFrameFromVideo(reel.videoUrl);
          generatedThumbnails[reel._id] = thumb;
        }
      }
      setThumbnails(generatedThumbnails);
    };

    if (reels.length > 0) {
      fetchThumbnails();
    }
  }, [reels]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setSelectedFile(null);
    setThumbnail(null);
    setTitle('');
    setDescription('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleThumbnailSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title || !description) {
      alert('Please fill all required fields.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', title);
      formData.append('description', description);
      if (thumbnail) {
        formData.append('img', thumbnail);
      }

      await uploadReel(formData);
      toggleModal();
      await fetchReels(); // refresh list
    } catch (error) {
      alert('Error in uploading reel.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen font-roboto p-4 md:p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Video Library</h1>
        <button
          className="bg-[#065FD4] text-white py-2 px-4 rounded-md text-sm md:text-base"
          onClick={toggleModal}
        >
          Upload Video
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-2 sm:px-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-4 sm:p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">Upload News</h2>
              <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-red-500 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* File Input */}
            <div className="border border-dashed border-[#065FD4] rounded-lg p-4 mb-4 text-center">
              <input
                type="file"
                accept="video/mp4,video/mov"
                onChange={handleFileChange}
                className="mx-auto text-sm"
              />
              <p className="text-gray-500 text-sm mt-2">
                Supported formats: .mp4, .mov
              </p>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#065FD4]"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#065FD4]"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Thumbnail Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Thumbnail (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailSelect}
                className="text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-[#065FD4] text-white font-medium py-2 rounded-lg hover:bg-[#054bb0] transition disabled:bg-gray-400"
            >
              {uploading ? 'Uploading...' : 'Upload News'}
            </button>
          </div>
        </div>
      )}

      {/* Reels Grid */}
      {loading ? (
        <p className="text-center text-gray-500 mt-5">Loading reels...</p>
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
    </div>
  );
}
