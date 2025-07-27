'use client';

import { useState, useEffect } from 'react';
import { Pencil, UserCircle } from 'lucide-react';

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-[500px] p-6 relative">
        <button className="absolute top-2 right-3 text-xl" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  );
};

const UserSettings = () => {
  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const [basicInfo, setBasicInfo] = useState({ location: '', phone: '', gender: '' });
  const [channelData, setChannelData] = useState({ channelName: '', niche: '', language: '' });

  const [modals, setModals] = useState({ basic: false, channel: false, create: false });

  useEffect(() => {
    // Simulate async fetch
    setTimeout(() => {
      const dummyUser = {
        _id: 'user123',
        email: 'johndoe@example.com',
        location: 'New Delhi',
        phone: '9876543210',
        gender: 'Male',
      };
      setUser(dummyUser);
      setBasicInfo({
        location: dummyUser.location,
        phone: dummyUser.phone,
        gender: dummyUser.gender,
      });
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (user?.email) {
      // Simulate fetching channel data
      setTimeout(() => {
        const dummyChannel = {
          _id: 'channel123',
          channelName: 'My Awesome Channel',
          niche: 'Technology',
          language: 'English',
          email: user.email,
        };
        setChannel(dummyChannel);
        setChannelData(dummyChannel);
      }, 800);
    }
  }, [user]);

  const saveBasicInfo = async () => {
    setLoading(true);
    setTimeout(() => {
      console.log('Basic info saved:', basicInfo);
      setModals((prev) => ({ ...prev, basic: false }));
      setLoading(false);
    }, 1000);
  };

  const saveChannelInfo = async () => {
    setLoading(true);
    setTimeout(() => {
      console.log('Channel info updated:', channelData);
      setChannel(channelData);
      setModals((prev) => ({ ...prev, channel: false }));
      setLoading(false);
    }, 1000);
  };

  const createUserChannel = async () => {
    setLoading(true);
    setTimeout(() => {
      console.log('Channel created:', channelData);
      setChannel(channelData);
      setModals((prev) => ({ ...prev, create: false }));
      setLoading(false);
    }, 1000);
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="w-full flex-col p-6 max-w-4xl font-sans">
      <h1 className="text-2xl font-bold mb-6">User Settings</h1>

      <div className=" flex flex-col md:flex-row ">
                                <div className="p-4 lg:p-10 flex flex-col items-center justify-center border border-b-0 md:border-b-[1px] md:border-r-0 border-[#9C9C9C] rounded-t-[16px] md:rounded-e-none md:rounded-s-[16px]">
                                    <div className="border border-[#9C9C9C] rounded-full p-1">
                                        {user?.profileImage ? (
                                            <img src={user.profileImage} className="w-[112px] h-[112px] " alt="" />
                                        ) : (
                                            
                                            <UserCircle className="w-25 h-25" />
                                        )}
                                    </div>
                                    <p className="pt-2 text-[#1C1C1C] text-[20px] "></p>
                                </div>
                                <hr />
                                <div className="w-[90vw] sm:w-fit border border-t-0 md:border-t-[1px] border-[#9C9C9C] rounded-b-[16px] md:rounded-s-none md:rounded-e-[16px] p-5">
                                    <div className="flex gap-5">
                                        <p className="pt-2 text-[#1C1C1C] text-[20px] ">Basic Information</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 md:12 lg:mr-20">
                                        <div className="py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">Email ID</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.email || " "}</p>
                                        </div>
                                        <div className="md:py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">Location</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.location || " "}</p>
                                        </div>
                                        <div className="py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">phone</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.phone || " "}</p>
                                        </div>
                                        <div className="md:py-4">
                                            <p className="text-[10px] text-[#1C1C1C99] py-1">Gender</p>
                                            <p className="text-[#1C1C1CCC] text-[14px] ">{user?.gender || " "}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

         <button
          className="bg-red-600 text-white px-4 py-2 rounded-md mt-2"
          onClick={() => setModals((m) => ({ ...m, create: true }))}
        >
          Create Channel
        </button>                               
      {/* {!channel ? (
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md mt-2"
          onClick={() => setModals((m) => ({ ...m, create: true }))}
        >
          Create Channel
        </button>
      ) : (
        <div className="border p-4 rounded-md mt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Channel Information</h2>
            <Pencil className="text-blue-600 cursor-pointer" onClick={() => setModals({ ...modals, channel: true })} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">Channel Name</p>
              <p>{channel.channelName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Niche</p>
              <p>{channel.niche}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Language</p>
              <p>{channel.language}</p>
            </div>
          </div>
        </div>
      )} */}

      <Modal isOpen={modals.basic} onClose={() => setModals({ ...modals, basic: false })}>
        <h3 className="text-lg font-bold mb-4">Edit Basic Information</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveBasicInfo();
          }}
        >
          {['location', 'phone', 'gender'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-medium capitalize">{field}</label>
              <input
                name={field}
                value={basicInfo[field]}
                onChange={(e) => setBasicInfo({ ...basicInfo, [field]: e.target.value })}
                className="w-full border rounded-md p-2"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </Modal>

      {/* Channel Edit/Create Modal */}
      <Modal
        isOpen={modals.channel || modals.create}
        onClose={() => setModals({ basic: false, channel: false, create: false })}
      >
        <h3 className="text-lg font-bold mb-4">
          {modals.create ? 'Create Channel' : 'Edit Channel'}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            modals.create ? createUserChannel() : saveChannelInfo();
          }}
        >
          {['channelName', 'niche', 'language'].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-medium capitalize">{field}</label>
              <input
                name={field}
                value={channelData[field]}
                onChange={(e) => setChannelData({ ...channelData, [field]: e.target.value })}
                className="w-full border rounded-md p-2"
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default UserSettings;
