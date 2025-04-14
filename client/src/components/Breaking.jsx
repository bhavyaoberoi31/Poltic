import Nav from "./Nav";
import Sidebar from "./Sidebar";
import img from "../assets/thumb.png";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getReels } from "../features/reel/reelThunk";
import { Loader } from "./Loader";
import { captureFrameFromVideo } from "../utils/captureFrameFromVideo";
import { useNavigate } from "react-router-dom";

const Breaking = () => {
    const tags = ["Trending", "Cricket", "Politics"];
    const { data: reels, loading: reelsLoading, error: reelsError } = useSelector((state) => state.reels);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [thumbnails, setThumbnails] = useState({});

    useEffect(() => {
        dispatch(getReels());
    }, [dispatch]);

    const fetchThumbnails = useCallback(async () => {
        if (!reels?.length) return;
        const generatedThumbnails = {};
        const thumbnailPromises = reels.map(async (reel) => {
            if (!reel.thumbnail) {
                const frame = await captureFrameFromVideo(reel.video);
                generatedThumbnails[reel._id] = frame;
            }
        });
        await Promise.all(thumbnailPromises);
        setThumbnails((prev) => ({ ...prev, ...generatedThumbnails }));
    }, [reels]);

    useEffect(() => {
        fetchThumbnails();
    }, [fetchThumbnails]);

    if (reelsLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader />
            </div>
        );
    }

    if (reelsError) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500 text-lg">Internal Server Error</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-roboto">
            <div className="fixed top-0 w-full z-50">
                <Nav />
            </div>

            <div className="flex flex-col lg:flex-row pt-[53px] md:pt-[89px]">
                <div className="w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px] z-10">
                    <Sidebar />
                </div>

                <main className="flex-1 ml-0 md:ml-[227px] p-4 md:p-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="space-y-6 mb-8">
                            <input
                                type="text"
                                placeholder="Search for your favorite news..."
                                className="w-full max-w-md mx-auto block p-3 border border-gray-300 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    shadow-sm"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        window.location.reload();
                                    }
                                }}
                            />
                            <div className="flex flex-wrap justify-center gap-3">
                                {tags.map((tag) => (
                                    <button
                                        key={tag}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-full 
                                            hover:bg-blue-700 transition-colors duration-200
                                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                            {reels?.map((reel) => (
                                <div
                                    key={reel._id}
                                    onClick={() => navigate(`/short/${reel._id}`)}
                                    className="relative group rounded-lg overflow-hidden
                                        hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                >
                                    <img
                                        src={
                                            reel.thumbnail ||
                                            thumbnails[reel._id] ||
                                            img
                                        }
                                        alt={reel.title}
                                        className="w-full h-[280px] object-cover"
                                    />
                                    {/* <div className="p-2 bg-transparent">
                                        <p className="text-[16px] font-medium">{reel.title}</p>
                                        <p className="text-sm text-gray-500">{reel.views} views</p>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Breaking;
