import { useRef, useState, useEffect } from "react";
import { AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt, AiOutlinePause } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reportReel } from "../features/report/reportThunk";
import { Loader } from "./Loader";
import { FaUser, FaUserCircle } from "react-icons/fa";

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

const ReelPage = ({ reel, isMuted, videoRef }) => {
  const navigate = useNavigate();
  const { data: user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const localRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (localRef.current) {
      if (localRef.current.paused) {
        localRef.current.play();
        setIsPlaying(true);
      } else {
        localRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (localRef.current) {
      localRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (localRef.current && videoRef) {
      videoRef(localRef.current);
    }
  }, [videoRef]);

  if (!reel) return <Loader />;

  return (
    <div key={reel._id} className="reel w-[100vw] md:w-[400px] md:h-[calc(100vh-83px)] flex items-center justify-center snap-start relative my-2 sm:my-0 sm:rounded-xl overflow-hidden">
      <video
        ref={localRef}
        data-reel-id={reel._id}
        src={reel.video}
        loop
        muted={isMuted}
        onClick={togglePlayPause}
        className="w-full md:rounded-xl h-[calc(100vh-97px)] object-cover cursor-pointer"
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <AiOutlinePause size={80} className="text-white opacity-80 transition duration-300" />
        </div>
      )}
      <div className="absolute bottom-8 flex gap-3 left-4 text-white">
        {
            reel.user.profileImage ? 
              <img
              src={reel.user?.profileImage }
              alt="Profile"
              className="h-12 w-12 rounded-full my-2 cursor-pointer object-cover"
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  user?._id !== reel.user?._id ? "/creator-profile" : "/user-profile",
                  {
                    state: {
                      creatorId: reel.user?._id,
                      firstName: reel.user?.firstName,
                      lastName: reel.user?.lastName,
                      userId: user?._id,
                      userImage: reel.user?.profileImage,
                    },
                  }
                );
              }}
            /> 
            : <FaUserCircle size={48} className="text-black" 
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                user?._id !== reel.user?._id ? "/creator-profile" : "/user-profile",
                {
                  state: {
                    creatorId: reel.user?._id,
                    firstName: reel.user?.firstName,
                    lastName: reel.user?.lastName,
                    userId: user?._id,
                    userImage: reel.user?.profileImage,
                  },
                }
              );
            }}
            />
        }
        <div>
          <p className="font-bold mt-1">{`${reel.user?.firstName || ""} ${reel.user?.lastName || ""}`}</p>
          <p>{reel.description}</p>
        </div>
      </div>

      <div className="absolute sm:hidden h-full text-white right-4 flex flex-col justify-end my-2">
        <button className="flex flex-col items-center p-2">
          <AiOutlineHeart size={28} />
          <span className="text-xs">123</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <AiOutlineComment size={28} />
          <span className="text-xs">45</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <AiOutlineShareAlt size={28} />
          <span className="text-xs">Share</span>
        </button>
        <CiMenuKebab size={28} onClick={() => setModalOpen(true)} className="m-2 items-center" />
      </div>

      <Modal isOpen={modalOpen}>
        <div className="flex flex-col">
          <div className="flex justify-end">
            <button className="mb-4 text-xl" onClick={() => setModalOpen(false)}>✕</button>
          </div>
          <div>
            <hr />
            <button onClick={() => dispatch(reportReel({ creatorId: reel.userId, reporterId: user._id, reelId: reel._id }))}>Report Video</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReelPage;
