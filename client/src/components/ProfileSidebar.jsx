import React, { useState } from "react";
import { UserFunctions } from "../constants/UserFunctions";
import { Link, useLocation } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateProfile } from "../features/auth/authThunk";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { uploadFileToS3 } from "../utils/uploadReels";

const ProfileSidebar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { data: user, loading, error } = useSelector((state) => state.auth);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loadingUpload, setLoadingUpload] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        try {
            await dispatch(logout())
                .unwrap()
                .then(() => {
                    window.location.href = "/";
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpdate = async () => {
        setLoadingUpload(true);
        if (selectedFile) {
            console.log("Selected file:", selectedFile);
            const url = await uploadFileToS3(selectedFile);
            console.log(url);
            let updates = {
                profileImage: url,
            };
            dispatch(updateProfile({ id: user._id, updates }))
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
        setLoadingUpload(false);
        setIsPopupOpen(false);
    };

    return (
        <>
            <div className="bg-[#F1F8FF] w-[227px] h-fit rounded-[7px] overflow-hidden">
                {UserFunctions.map((func, index) => (
                    <Link
                        to={func.link}
                        key={index}
                        className={`flex items-center px-4 gap-3 font-light py-3 ${
                            isActive(func.link) ? "bg-[#065FD4] text-white" : ""
                        }`}
                    >
                        {func.icon}
                        <span>{func.title}</span>
                    </Link>
                ))}

                {/* Update Profile Image Trigger */}
                <button
                    onClick={() => setIsPopupOpen(true)}
                    className="flex items-center py-3 gap-3 px-4 hover:text-blue-500"
                >
                    <MdOutlinePhotoCamera className="text-xl" />
                    <span>Update Profile Image</span>
                </button>

                {/* Logout Button */}
                <button className="flex py-3 gap-3 px-4" onClick={handleLogout}>
                    <RiLogoutCircleRLine className="text-xl" />
                    Logout
                </button>
            </div>

            {/* Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-4">Update Profile Image</h2>
                        <label className="mb-4 w-full border border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:bg-gray-50">
                            <span className="text-gray-600">📁 Click here to upload</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
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
        </>
    );
};

export default ProfileSidebar;
