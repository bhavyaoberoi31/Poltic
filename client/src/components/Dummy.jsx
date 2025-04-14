// import { reels } from "../constants/Reels"
// import DummyPlay from "./DummyPlay"
// import React, { useRef, useEffect, useState } from "react";

// const Dummy = () => {
//     const [isMuted, setIsMuted] = useState(true);
//     const videoRefs = useRef([]);
  
//     useEffect(() => {
//       const options = {
//         root: null,
//         threshold: 0.5,
//       };
  
//       const observer = new IntersectionObserver((entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;
  
//           if (entry.isIntersecting) {
//             video.play().catch((error) => {
//               console.warn("Autoplay blocked by the browser:", error.message);
//               video.muted = true;
//               video.play();
//             });
//           } else {
//             video.pause();
//           }
//         });
//       }, options);
  
//       videoRefs.current.forEach((video) => {
//         if (video) observer.observe(video);
//       });
  
//       return () => {
//         videoRefs.current.forEach((video) => {
//           if (video) observer.unobserve(video);
//         });
//       };
//     }, []);
  
//     const toggleMute = () => {
//       setIsMuted((prev) => !prev);
//     };
  
//     return (
//         <div>
//             {reels.map((reel, index) => (
//             <div className="flex gap-2">
//               <div>
//                 <DummyPlay
//                   key={reel.id}
//                   reel={reel}
//                   isMuted={isMuted}
//                   videoRef={(el) => (videoRefs.current[index] = el)}
//                 />
//               </div>
//               <div className="hidden sm:flex flex-col justify-end my-5">
//                 <button className="flex flex-col items-center p-2">
//                   <AiOutlineHeart size={28} />
//                   <span className="text-xs">123</span>
//                 </button>
//                 <button className="flex flex-col items-center p-2">
//                   <AiOutlineComment size={28} />
//                   <span className="text-xs">45</span>
//                 </button>
//                 <button className="flex flex-col items-center p-2">
//                   <AiOutlineShareAlt size={28} />
//                   <span className="text-xs">Share</span>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//     )
// }

// export default Dummy