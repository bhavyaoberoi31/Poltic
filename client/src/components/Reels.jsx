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
  const { data: reels, loading: reelsLoading } = useSelector((state) => state.reels);
  const { data: user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [isMuted, setIsMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReelId, setCurrentReelId] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    if (user) {
      dispatch(getReels(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          const reelId = video.dataset.reelId;

          if (entry.isIntersecting) {
            Object.keys(videoRefs.current).forEach((key) => {
              if (key !== reelId && videoRefs.current[key]) {
                videoRefs.current[key].pause();
              }
            });

            video.play().catch((error) => {
              video.muted = true;
              video.play();
            });

            setCurrentReelId(reelId);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [reels]);

  const toggleMute = () => setIsMuted((prev) => !prev);

  if (reelsLoading) return <Loader />;
  if (reels && reels.length === 0) return <div>No Reels uploaded yet</div>;

  return (
    <div className="reels-container custom-scrollbar flex flex-col items-center justify-center h-auto overflow-y-scroll snap-y snap-mandatory" style={{ scrollBehavior: "smooth" }}>
      <button
        onClick={toggleMute}
        className="fixed top-24 right-8 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75 z-10"
      >
        {isMuted ? <IoVolumeMuteOutline size={24} /> : <GoUnmute size={24} />}
      </button>

      {reels?.map((reel) => (
        <div key={reel._id} className="flex sm:gap-2">
          <div>
            <ReelPage
              reel={reel}
              isMuted={isMuted}
              isPlaying={currentReelId === reel._id}
              videoRef={(el) => {
                if (el) {
                  videoRefs.current[reel._id] = el;
                }
              }}
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
          <Modal isOpen={modalOpen}>
            <div className="flex flex-col">
              <div className="flex justify-end">
                <button className="mb-4 text-xl" onClick={() => setModalOpen(false)}>✕</button>
              </div>
              <div>
                <hr />
                <button onClick={() => dispatch(reportReel({
                  creatorId: reel.userId,
                  reporterId: user._id,
                  reelId: reel._id
                }))}>
                  Report Video
                </button>
              </div>
            </div>
          </Modal>
        </div>
      ))}
    </div>
  );
};

export default Reels;
