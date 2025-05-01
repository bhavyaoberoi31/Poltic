import { SubscribedChannels } from "../constants/SubscribedChannels"
import Nav from "./Nav"
import ProfileSidebar from "./ProfileSidebar"
import Sidebar from "./Sidebar"
import UserProfile from "./UserProfile"
import img from "../assets/profileimg.png"
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserCircle } from "react-icons/fa";

const Subscriptions = () => {

    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-screen font-roboto">
            <div className="z-50 fixed top-0 w-full ">
                <Nav />
            </div>
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="z-50 fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-5">
                    <UserProfile />
                    <hr className="my-5 w-full" />
                    <div className="flex sm:gap-10">
                    <div className="hidden md:flex">
                        <ProfileSidebar/>
                        </div>
                        <div className="w-full">
                            <div className="mx-auto font-inter w-full flex flex-col items-center justify-center">
                                <p className="text-center md:text-start font-semibold text-[20px] pb-4 font-inter">All Followed  Channels</p>
                                <div className="grid w-full sm:grid-cols-2 sm:mb-10 gap-4 sm:gap-10 items-center mx-auto  sm:max-w-7xl">
                                <div className="flex w-full justify-between items-center">
                                         <div className="flex gap-3 w-full"
                                         onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(
                                               "/creator-profile",
                                              {
                                                state: {
                                                  creatorId: "680708485777a65baa93dfd0",
                                                  firstName: "Poltic",
                                                  lastName: "",
                                                  userId: "680708485777a65baa93dfd0",
                                                  userImage: "https://poltic.in/api/uploads/profiles/1746077435270-958671623.jpg"
                                                },
                                              }
                                            );
                                          }}
                                         >
                                            <div>
                                                <img src={"https://poltic.in/api/uploads/profiles/1746077435270-958671623.jpg"} alt="" className="h-[75px] w-[75px] rounded-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-[18px] ">PolTic Official</p>
                                                <p className="text-[13px] text-[#B7B7B7]">@polticofficial</p>
                                                <p className="text-[13px] text-[#065FD4]">10<span className="text-[#B7B7B7]">Followers</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="bg-[#F0F0F0] rounded-md text-[#717171] text-[12px] px-3 py-2">Followed</button>
                                        </div>
                                       </div>
                                       <div className="flex gap-12 w-full">
                                         <div className="flex gap-3 w-full"
                                         onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(
                                               "/creator-profile",
                                              {
                                                state: {
                                                  creatorId: "680701825777a65baa93dfb3",
                                                  firstName: "Bhavya",
                                                  lastName: "",
                                                  userId: "680701825777a65baa93dfb3",
                                                  userImage: "https://poltic.in/api/uploads/profiles/1746076372338-391794571.jpg"
                                                },
                                              }
                                            );
                                          }}
                                         >
                                            <div>
                                                <img src={"https://poltic.in/api/uploads/profiles/1746076372338-391794571.jpg"} alt="" className="h-[75px] w-[75px] rounded-full object-cover" />
                                                {/* <FaUserCircle size={60} className="text-black"/> */}
                                            </div>
                                            <div>
                                                <p className="text-[18px] ">Bhavya Oberoi</p>
                                                <p className="text-[13px] text-[#B7B7B7]">@bhavya</p>
                                                <p className="text-[13px] text-[#065FD4]">10<span className="text-[#B7B7B7]">Followers</span></p>
                                            </div>
                                        
                                        </div>
                                        <div>
                                            <button className="bg-[#F0F0F0] rounded-md text-[#717171] text-[12px] px-3 py-2">Followed</button>
                                        </div>
                                       </div>
                                    {SubscribedChannels.map((channel) => (
                                       <div className="flex justify-between w-full">
                                         <div className="flex gap-3 w-full">
                                            <div>
                                                <FaUserCircle size={60} className="text-black"/>
                                            </div>
                                            <div>
                                                <p className="text-[18px] ">{channel.name}</p>
                                                <p className="text-[13px] text-[#B7B7B7]">{channel.attherate}</p>
                                                <p className="text-[13px] text-[#065FD4]">{channel.Followers} <span className="text-[#B7B7B7]">Followers</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="bg-[#F0F0F0] rounded-md text-[#717171] text-[12px] px-3 py-2">Followed</button>
                                        </div>
                                       </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscriptions