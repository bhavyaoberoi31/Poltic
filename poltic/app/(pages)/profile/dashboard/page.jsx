'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChartLine, Eye, Mail, Trash2, Video } from 'lucide-react';
import Image from 'next/image';
import { deleteReelApi, reelsApi } from '@/app/services/api.service';

const DeleteModal = ({ onConfirm, onCancel, loading }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4" style={{ backdropFilter: 'blur(8px)' }}>
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-200">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Content</h2>
        <p className="text-gray-600">Are you sure you want to delete this content? This action cannot be undone.</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Deleting...' : 'Delete Forever'}
        </button>
      </div>
    </div>
  </div>
);

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
  const router = useRouter();
  const [reels, setReels] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReelId, setSelectedReelId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReels = async () => {
    try {
      setLoading(true);
      const data = await reelsApi({ page: 1 });
      setReels(data.posts);
    } catch (err) {
      console.error('Error fetching reels:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  useEffect(() => {
    const generateThumbnails = async () => {
      const generated = {};
      for (let reel of reels) {
        if (!reel.thumbnailUrl) {
          const thumb = await captureFrameFromVideo(reel.videoUrl);
          generated[reel._id] = thumb;
        }
      }
      setThumbnails(generated);
    };

    if (reels.length) generateThumbnails();
  }, [reels]);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await deleteReelApi(id);
      setReels((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error('Failed to delete reel:', err);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setSelectedReelId(null);
    }
  };

  const confirmDelete = () => {
    if (selectedReelId) handleDelete(selectedReelId);
  };

  return (
    <div className="flex flex-col w-full h-full">
      {showDeleteModal && (
        <DeleteModal
          onConfirm={confirmDelete}
          onCancel={() => {
            if (!deleting) {
              setShowDeleteModal(false);
              setSelectedReelId(null);
            }
          }}
          loading={deleting}
        />
      )}

      {/* Summary Cards */}
      <div className="flex flex-row gap-4 w-full">
  <div className="rounded-xl bg-white p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition flex-1">
    <div className="rounded-full bg-blue-500 p-3">
      <Eye className="h-6 w-6 text-white" />
    </div>
    <p className="mt-3 flex items-center gap-1 text-lg font-semibold text-gray-800">
      <ChartLine className="h-5 w-5" /> Growing
    </p>
    <p className="text-sm text-gray-500">Total views</p>
  </div>

  <div className="rounded-xl text-center bg-white p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition flex-1">
    <div className="rounded-full bg-blue-500 p-3">
      <Video className="h-6 w-6 text-white" />
    </div>
    <p className="mt-3 text-2xl font-bold text-gray-800">{reels.length}</p>
    <p className="text-sm text-gray-500">Total videos</p>
  </div>

  <div
    className="rounded-xl bg-white p-6 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition flex-1"
    onClick={() => router.push('/user-subscriptions')}
  >
    <div className="rounded-full bg-blue-500 p-3">
      <Mail className="h-6 w-6 text-white" />
    </div>
    <p className="mt-3 text-2xl font-bold text-gray-800">10</p>
    <p className="text-sm text-gray-500">Followers</p>
  </div>
</div>


      {/* Reels Grid */}
      <div className="w-full">
        <p className="font-bold text-xl sm:text-2xl py-4 mt-5">Top Performing News</p>

        {loading ? (
          <p className="text-gray-500 text-center mt-6">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            {reels.map((reel) => (
              <div className="flex flex-col p-5 text-center items-center justify-center rounded-xl" key={reel._id}>
                <div className=" w-full max-w-[200px] aspect-[9/16] rounded-2xl overflow-hidden">
                  <img
                    src={reel.thumbnailUrl || thumbnails[reel._id] || '/assets/thumb.png'}
                    alt={reel.title || 'reel thumbnail'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className='flex justify-between w-full items-center mt-2'>
                  <p className="flex bottom-2 left-2 text-sm truncate text-left text-white bg-black/40 px-2 rounded">{reel.title}</p>
                  <div className="flex">
                    <Trash2
                      onClick={() => {
                        setSelectedReelId(reel._id);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-700 hover:cursor-pointer w-6 h-6"
                    />
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
