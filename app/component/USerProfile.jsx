'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { UserCircle, MoreVertical } from 'lucide-react';
import ProfileSidebar from './ProfileSidebar';
import { uploadProfileImg, getProfile } from '../services/api.service';

const UserProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
  });
  const [channelName, setChannelName] = useState('');
  const sidebarRef = useRef(null);

  // Fetch user on mount
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const data = await getProfile();
        console.log(data);
        
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          profileImage: data.profileImgUrl,
        });
        setChannelName(
          data.channelName ||
            `${(data.firstName || '').toLowerCase()}${(data.lastName || '').toLowerCase()}`
        );
      } catch (err) {
        setUser({
          firstName: 'Harsh',
          lastName: 'Gupta',
          email: 'harsh@example.com',
          profileImage: '',
        });
        setChannelName('harshgupta');
      }
    }
    fetchUserProfile();
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdate = async () => {
    if (!selectedFile) return alert('Please select an image');
    setLoadingUpload(true);
    try {
      const formData = new FormData();
      formData.append('img', selectedFile);
      await uploadProfileImg(formData);
      // Refresh from server to get new image
      const updated = await getProfile();
      setUser({
        firstName: updated.firstName,
        lastName: updated.lastName,
        email: updated.email,
        profileImage: updated.profileImage,
      });
      setChannelName(
        updated.channelName ||
          `${(updated.firstName || '').toLowerCase()}${(updated.lastName || '').toLowerCase()}`
      );
      setSelectedFile(null);
      setImagePreview('');
      setIsPopupOpen(false);
    } catch {
      alert('Upload failed. Please try again.');
    } finally {
      setLoadingUpload(false);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start relative">
      {/* Profile Image */}
      <div className="flex relative justify-center md:justify-start w-full md:w-fit">
        <div className="flex flex-col w-full items-center">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt="Profile"
              className="rounded-full object-cover w-28 h-24 md:w-36 md:h-32 border-4 border-blue-100"
            />
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center border-4 border-blue-100">
              <span className="text-white text-2xl md:text-3xl font-bold">
                {user.firstName[0] || ''}{user.lastName[0] || ''}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label="Open sidebar"
          className="absolute top-0 -right-3 ml-auto md:hidden"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <MoreVertical
            className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-800"
          />
        </button>
      </div>

      {/* User Info */}
      <div className="flex flex-col w-full items-center justify-center md:items-start md:ml-8 mt-6 md:mt-0">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            {user.firstName} {user.lastName}
          </h1>
          <span className="flex items-center gap-1 text-lg font-semibold text-gray-800">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </span>
        </div>
        <p className="text-lg md:text-xl text-gray-600 mb-4">@{channelName}</p>
          {/* <div className="flex gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Active now
            </span>
          </div> */}
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="absolute border top-12 right-4 z-10 shadow-lg bg-white"
        >
          <ProfileSidebar />
        </div>
      )}

      {/* Update Profile Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4" style={{ backdropFilter: 'blur(8px)' }}>
          <div className="bg-white rounded-3xl z-50 shadow-2xl w-full max-w-md p-8 border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Update Profile Image</h2>
              <p className="text-gray-600">Choose a new profile picture</p>
            </div>

            <div className="mb-6">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors" 
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="New profile preview"
                  className="mt-4 rounded-full mx-auto w-24 h-24 object-cover border-2 border-blue-200"
                />
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsPopupOpen(false);
                  setImagePreview('');
                  setSelectedFile(null);
                }}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loadingUpload}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingUpload ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </div>
                ) : (
                  'Update Image'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating edit button for profile avatar */}
      {/* <button
        type="button"
        aria-label="Edit profile image"
        className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-2 shadow-md hover:bg-blue-700 transition md:top-20"
        style={{ zIndex: 60 }}
        onClick={() => setIsPopupOpen(true)}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15.232 5.232l3.536 3.536M4 20h7a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H4v9z"
          />
        </svg>
      </button> */}
    </div>
  );
};

export default UserProfile;
