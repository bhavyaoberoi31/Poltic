import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useReels } from "../features/reel/customeHooks";
import { captureFrameFromVideo } from "../utils/captureFrameFromVideo";
import img from '../assets/thumb.png';
import { GoGraph } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { deleteReel } from "../features/reel/reelThunk";

const DeleteModel = ({ onConfirm, onCancel, loading }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-md text-center w-80">
            <p className="mb-4 text-lg">Are you sure you want to delete?</p>
            <div className="flex justify-center gap-4">
                <button
                    className={`bg-red-500 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? "Deleting..." : "Delete"}
                </button>
                <button
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const { data: user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const {
        data: reels,
        isLoading: isReelsLoading,
        isError,
        error,
        refetch,
    } = useReels(user?._id, { enabled: !!user });

    const [localReels, setLocalReels] = useState([]);
    const [thumbnails, setThumbnails] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedReelId, setSelectedReelId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // Update localReels when fetched
    useEffect(() => {
        if (reels && Array.isArray(reels)) {
            setLocalReels(reels);
        }
    }, [reels]);

    // Generate thumbnails
    useEffect(() => {
        const generateThumbnails = async () => {
            if (!localReels || localReels.length === 0) return;
            const newThumbs = {};
            await Promise.all(localReels.map(async (reel) => {
                try {
                    const thumbnail = await captureFrameFromVideo(reel.video);
                    newThumbs[reel._id] = thumbnail;
                } catch (err) {
                    console.error("Thumbnail error:", err);
                }
            }));
            setThumbnails(newThumbs);
        };
        generateThumbnails();
    }, [localReels]);

    // Handle delete
    const handleDelete = async (id) => {
        setDeleting(true);
        try {
            await dispatch(deleteReel(id)).unwrap();

            // Optimistically update local state
            setLocalReels((prev) => prev.filter(reel => reel._id !== id));

            // Remove deleted thumbnail
            setThumbnails((prev) => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });

            // Refetch latest from server
            await refetch();
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
            setSelectedReelId(null);
        }
    };

    const confirmDelete = () => {
        if (selectedReelId) {
            handleDelete(selectedReelId);
        }
    };

    if (isReelsLoading) return <p>Loading...</p>;

    return (
        <div>
            {showDeleteModal && (
                <DeleteModel
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

            <div className="flex justify-evenly sm:justify-between w-full">
                <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                    <p className="flex mt-2 text-[18px] font-semibold"><GoGraph /> Growing</p>
                    <p className="text-[17px] font-normal text-[#999999]">Total views</p>
                </div>
                <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                    <p className="text-[24px] font-semibold">{localReels.length}</p>
                    <p className="text-[17px] font-normal text-[#999999]">Total videos</p>
                </div>
                <div className="w-[108px] md:w-[258px] h-[120px] md:h-[158px] border border-[#C5C5C5] rounded-[10px] flex flex-col items-center justify-center">
                    <p className="text-[24px] font-semibold">10</p>
                    <p className="text-[17px] font-normal text-[#999999]">Followers</p>
                </div>
            </div>

            <div>
                {error?.status === 404 ? (
                    <p className="text-center w-full">Upload your first video now</p>
                ) : (
                    <div className="sm:m-4 font-roboto">
                        <p className="font-semibold text-[20px] py-2 font-inter mt-5">Top Performing News</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center items-center mx-auto max-w-7xl">
                            {localReels.slice(0, 4).slice().reverse().map((short) => (
                                <div key={short._id}>
                                    <Link to={`/short/${short._id}`} className="flex flex-col">
                                        <img
                                            src={ short.thumbnail || thumbnails[short._id] || img }
                                            alt={short.title}
                                            className="h-[265px] w-[160px] sm:w-[200px] object-cover rounded-lg"
                                            onError={(e) => {
                                                const fallback = short.thumbnail && e.currentTarget.src !== short.thumbnail ? short.thumbnail : img;
                                                if (e.currentTarget.src !== fallback) {
                                                    e.currentTarget.src = fallback;
                                                }
                                            }}
                                        />
                                    </Link>
                                    <div className="flex items-center justify-start w-fit text-center">
                                        <div className="flex flex-col items-start">
                                            <p className="font-light mt-2">{short.title}</p>
                                            <p className="text-[14px] font-light">{short.views} views</p>
                                        </div>
                                        <MdDelete
                                            onClick={() => {
                                                setSelectedReelId(short._id);
                                                setShowDeleteModal(true);
                                            }}
                                            className="ml-2 text-red-700 hover:cursor-pointer text-xl"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
