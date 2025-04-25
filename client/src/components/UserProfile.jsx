import React, { useState, useRef, useEffect } from "react";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import ProfileSidebar from "./ProfileSidebar"; // Adjust the path if needed
import img from "../assets/profileimg.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateProfile } from "../features/auth/authThunk";
import { getChannelByEmail } from "../features/channel/channelThunk";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import { uploadFileToS3 } from "../utils/uploadReels";
import { FaUser, FaUserCircle } from "react-icons/fa";

const UserProfile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const { data: channel, error: channelError } = useSelector((state) => state.channel);
    const { data: user, loading, error } = useSelector((state) => state.auth);
    const sidebarRef = useRef(null);
    const [loadingUpload, setLoadingUpload] = useState(false);

    useEffect(() => {
        console.log("this is user", user);
        const fetchChannelDetails = () => {
            if (user?.email) {
                dispatch(getChannelByEmail(user?.email))
                    .unwrap()
                    .then((payload) => {})
                    .catch((error) => {});
            }
        };
        fetchChannelDetails();
    }, [user, dispatch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpdate = async () => {
        setLoadingUpload(true);
        if (selectedFile) {
            const formData = new FormData();
            formData.append("profileImage", selectedFile);
            dispatch(updateProfile({ id: user._id, formData }))
                .unwrap()
                .then((payload) => {
                    console.log(payload);
                    setIsPopupOpen(false);
                    setSelectedFile(null);
                    setLoadingUpload(false);
                })
                .catch((error) => {
                    setLoadingUpload(false);
                    console.log(error);
                    setIsPopupOpen(false);
                    setSelectedFile(null);
                });
        } else {
            setLoadingUpload(false);
            alert("Please select a file to upload.");
        }
    };

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start mx-auto p-5 relative">
            {/* Profile Image Section */}
            <div className="flex relative justify-center md:justify-start w-full md:w-fit mt-5">
                <div className="flex flex-col w-full items-center">
                    {
                        user.profileImage ? 
                        <img
                            src={user?.profileImage}
                            alt="Profile"
                            className="w-32 h-32 md:w-40 md:h-36 rounded-full object-cover "
                        /> : <FaUserCircle size={70}/>
                    }
                    
                    {/* Menu Icon for Mobile */}
                    {/* <button
                    onClick={() => setIsPopupOpen(true)}
                    className="text-white bg-sky-500 mt-4 py-1 px-4 rounded-md text-sm"
                    >
                    Update Profile Image
                    </button> */}
                </div>
                <div className="flex absolute top-0 -right-6 ml-auto sm:hidden">
                    <CiMenuKebab
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => setIsSidebarOpen((prev) => !prev)}
                    />
                </div>
            </div>

            {/* User Info Section */}
            <div className="flex flex-col w-full items-center md:items-start md:ml-6 mt-4 md:mt-0">
                <p className="md:text-[31px] text-[19px] py-1 md:py-0 font-semibold">
                    {user?.firstName || "User Name"} {user?.lastName || ""}
                </p>
                <p className="md:text-[25px] text-[16px] text-[#B7B7B7]">
                    @{channel?.channelName || "channelName"}
                </p>
                {/* Followers and News Section */}
                {/* <div className="flex md:flex-row flex-row items-center gap-4 p-2 md:p-0 mt-2">
                    <div className="text-center">
                        <p className="text-[#065FD4] md:text-[32px] text-[22px] font-medium">
                            {user?.Followers || "0"}
                        </p>
                        <p className="md:text-[20px] text-[14px]">Followers</p>
                    </div>
                    <div className="bg-gray-300 h-14 mx-8 md:mx-0 md:mt-3 w-[1px]" />
                    <div className="text-center">
                        <p className="text-[#065FD4] md:text-[32px] text-[22px] font-medium">
                            {user?.newsCount || "0"}
                        </p>
                        <p className="md:text-[20px] text-[14px]">News</p>
                    </div>
                </div>*/}
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div ref={sidebarRef} className="absolute border top-12 right-4 z-10 shadow-lg">
                    <ProfileSidebar />
                </div>
            )}

            {/* Popup for Updating Profile Image */}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-4">Update Profile Image</h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mb-4 w-full"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="py-1 px-4 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="py-1 px-4 bg-sky-500 text-white rounded"
                            >
                                {loadingUpload ? "Loading..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;