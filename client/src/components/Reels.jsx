import React, { useRef, useEffect, useState } from "react";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoUnmute } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import ReelPage from "./ReelPage";
import { useDispatch, useSelector } from "react-redux";
import { getReels } from "../features/reel/reelThunk";
import { Loader } from "./Loader";
import { reportReel } from "../features/report/reportThunk";

const Modal = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-[500px] p-6">
        {children}
      </div>
    </div>
  );
};

const Reels = () => {
  const { data: reels, loading: reelsLoading, error: reelsError } = useSelector((state) => state.reels);
  const [isMuted, setIsMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [thumbnails, setThumbnails] = useState({});
  const videoRefs = useRef([]);
  const [currentReelId, setCurrentReelId] = useState(null);
  const [creatorId, setCreatorId] = useState()
  const [reporterId, setReporterId] = useState()
  const [reelId, setReelId] = useState()
  const dispatch = useDispatch();
  const { data: user, error: userError } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      if(user){
        dispatch(getReels(user._id));
      }
    }, 100)
  }, [dispatch]);

  const observerRef = useRef(null);

  useEffect(() => {
    if (reels && reels.length > 0) {
      if (!observerRef.current) {
        const options = { root: null, threshold: 0.6 };
        observerRef.current = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) {
              video.play().catch((error) => {
                console.warn("Autoplay blocked:", error.message);
                video.muted = true;
                video.play();
              });
              setCurrentReelId(video.dataset.reelId);
            } else {
              video.pause();
            }
          });
        }, options);
      }

      videoRefs.current.forEach((video) => {
        if (video) observerRef.current.observe(video);
      });

      return () => {
        videoRefs.current.forEach((video) => {
          if (video) observerRef.current.unobserve(video);
        });
      };
    }
  }, [reels]);


  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleReport = async (reel) => {
    try {
      setCreatorId(reel?.userId)
      setReporterId(user?._id)
      setReelId(reel?._id)
      console.log(creatorId, reporterId, reelId)
      dispatch(reportReel({ creatorId, reporterId, reelId })).unwrap().then(() => {

        console.log(creatorId, reporterId, reelId);

      }).catch((error) => {
      })
    } catch (error) {
      console.error("Error creating channel", error);
    }
  };

  if (reels && reels.length === 0) {
    return <div>No Reels uploaded yet</div>
  }

  if (reelsLoading) {
    return <Loader />;
  }

  return (
    <div
      className="reels-container custom-scrollbar flex flex-col items-center justify-center h-auto overflow-y-scroll snap-y snap-mandatory"
      style={{ scrollBehavior: "smooth" }}
    >
      <button
        onClick={toggleMute}
        className="fixed top-24 right-8 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75 z-10"
      >
        {isMuted ? <IoVolumeMuteOutline size={24} /> : <GoUnmute size={24} />}
      </button>

      <div>
        {reels && reels?.length > 0 && reels?.map((reel, index) => (
          <div key={reel._id} className="flex sm:gap-2">
            <div>
              <ReelPage
                reel={reel}
                isMuted={isMuted}
                reelI={reel._id}
                isPlaying={currentReelId === reel._id}
                vid={(el) => (videoRefs.current[index] = el || videoRefs.current[index])}
              />
            </div>
            <div className="hidden sm:flex flex-col justify-end gap-4 items-center bottom-2 my-2">
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
            <CiMenuKebab size={28} className="m-2" onClick={() => setModalOpen(true)} />

            </div>
            <Modal isOpen={modalOpen}  >
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
            <button className="" onClick={() => handleReport(reel)}>
              Report Video
            </button>
          </div>
        </div>
      </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;