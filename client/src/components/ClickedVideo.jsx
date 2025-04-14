import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlinePause
} from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { getReelById } from "../features/reel/reelThunk";
import { reportReel } from "../features/report/reportThunk";

const Modal = ({ children, isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-[500px] p-6">
        {children}
      </div>
    </div>
  );
};

const ClickedVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef(null);


  const [short, setShort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchReel = async () => {
      try {
        setLoading(true);
        const response = await dispatch(getReelById(id)).unwrap(); 
        console.log(response, "he");
        
        setShort(response);
      } catch (err) {
        setError(err || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReel();
  }, [dispatch, id]);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleReport = async () => {
      try {
        // await dispatch(
        //   reportReel({
        //     creatorId: reel?.userId,
        //     reporterId: user?._id,
        //     reelId: reel?._id,
        //   })
        // ).unwrap();
      } catch (error) {
        console.error("Error reporting reel:", error);
      }
    };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!short) return <p>Short not found!</p>;

  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      <div
            key={short._id}
            className="reel w-[100vw] md:w-[400px] md:h-[calc(100vh-83px)] flex items-center justify-center snap-start relative my-2 sm:my-0 sm:rounded-xl overflow-hidden"
          >
            <video
              ref={videoRef}
              src={short.video}
              loop
              autoPlay
              onClick={togglePlayPause}
              className="w-full md:rounded-xl h-[calc(100vh-97px)] object-cover cursor-pointer"
            />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <AiOutlinePause
                  size={80}
                  className="text-black opacity-80 transition duration-300"
                />
              </div>
            )}
      
            <div className="absolute bottom-8 flex gap-3 left-4 text-black">
              <div>
                <img
                  src={
                    short.user?.profileImage ||
                    "https://img.freepik.com/premium-vector/blog-design_24877-32255.jpg?w=740"
                  }
                  alt="Profile"
                  className="h-12 w-12 rounded-full my-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      short?._id !== short.user?._id ? "/creator-profile" : "/user-profile",
                      {
                        state: {
                          creatorId: short.user?._id,
                          firstName: short.user?.firstName,
                          lastName: short.user?.lastName,
                          userId: short.user?._id,
                        },
                      }
                    );
                  }}
                />
              </div>
              <div>
                <p className="font-bold mt-1">{`${short.user?.firstName || ""} ${short.user?.lastName || ""}`}</p>
                <p>{short .description}</p>
              </div>
            </div>
      
            <div className="absolute h-full text-black right-4 bottom-4 flex flex-col justify-end my-2">
              <div>
                <button className="flex flex-col items-center p-2">
                  <AiOutlineHeart size={28} />
                  <span className="text-xs text-black">123</span>
                </button>
                <button className="flex flex-col items-center p-2">
                  <AiOutlineComment size={28} />
                  <span className="text-xs">45</span>
                </button>
                <button className="flex flex-col items-center p-2">
                  <AiOutlineShareAlt size={28} />
                  <span className="text-xs">Share</span>
                </button>
                <CiMenuKebab
                  size={28}
                  onClick={() => setModalOpen(true)}
                  className="m-2 items-center"
                />
              </div>
            </div>
      
            <Modal isOpen={modalOpen}>
              <div className="flex flex-col">
                <div className="flex justify-end">
                  <button
                    className="mb-4 text-xl"
                    onClick={() => setModalOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                <div>
                  <hr />
                  <button onClick={handleReport}>Report Video</button>
                </div>
              </div>
            </Modal>
          </div>
      <button
        onClick={() => navigate(-1)}
        className="back-button m-3 text-blue-500"
      >
        &larr; Back to Feed
      </button>
    </div>
  );
};

export default ClickedVideo;
