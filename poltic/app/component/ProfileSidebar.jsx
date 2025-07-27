'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Video,
  AlertCircle,
  Users,
  Settings,
  Camera,
  LogOut,
} from 'lucide-react';
import { uploadProfileImg } from '../services/api.service';

const NAV_LINKS = [
  { label: 'Dashboard', href: '/profile/dashboard', icon: LayoutDashboard },
  { label: 'Video Library', href: '/profile/library', icon: Video },
  { label: 'Reported Videos', href: '/profile/reported', icon: AlertCircle },
  { label: 'Followers', href: '/profile/subscriptions', icon: Users },
  { label: 'Settings', href: '/profile/settings', icon: Settings },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [fileError, setFileError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
  if (isPopupOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}, [isPopupOpen]);

  const isActive = (path) => pathname === path;

  const handleLogout = () => {
    alert('Logged out!');
    localStorage.removeItem('tokenExpiry');
    router.push('/');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('Please upload a valid image');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError('Maximum file size is 10MB.');
      return;
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setFileError('');
  };

  const handleUpdate = async () => {
    if (!selectedFile) {
      setFileError('Please select an image file');
      return;
    }
    setLoadingUpload(true);
    try {
      const formData = new FormData();
      formData.append('img', selectedFile);
      await uploadProfileImg(formData);
      alert('Profile image updated!');
      resetPopup();
    } catch (error) {
      setFileError('Upload failed. Please try again.');
    } finally {
      setLoadingUpload(false);
    }
  };

  const resetPopup = () => {
    setSelectedFile(null);
    setImagePreview('');
    setFileError('');
    setIsPopupOpen(false);
  };

  return (
    <>
      {/* Sidebar (responsive: horizontal menu on mobile, vertical on desktop) */}
      <nav className="w-full max-w-[280px] lg:max-w-full mx-auto h-fit lg:p-0">

        {/* Desktop vertical sidebar */}
        <div className="flex flex-col bg-white shadow-lg rounded-xl w-full max-w-[280px] overflow-hidden border border-gray-200 h-fit">
          {/* Navigation Links */}
          {NAV_LINKS.map(({ label, href, icon: Icon }) => (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`flex items-center w-full px-7 py-3 gap-3 text-sm font-medium transition-all ${
                isActive(href)
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
          <div className="border-t border-gray-200 my-2"></div>
          {/* Update Image Button */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center w-full px-7 py-3 gap-3 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            <Camera className="w-5 h-5" />
            Update Profile Image
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-7 py-3 gap-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      {/* Upload Modal */}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-[2147483647] border flex items-center justify-center bg-black/60 p-4" style={{ backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-200">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Update Profile Image</h2>
              <p className="text-gray-500 text-sm mt-1">JPG, PNG under 10MB</p>
            </div>
            {/* Upload Area */}
            <label className="block w-full border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50">
              <div>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto h-24 w-24 rounded-full object-cover border mb-2"
                  />
                ) : (
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                )}
                <span className="text-gray-600 font-medium">Click to upload</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </label>
            {/* Error Message */}
            {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={resetPopup}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loadingUpload}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingUpload ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
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
    </>
  );
};

export default ProfileSidebar;
