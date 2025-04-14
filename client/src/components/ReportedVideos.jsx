import { Link } from "react-router-dom"
import Nav from "./Nav"
import ProfileSidebar from "./ProfileSidebar"
import Sidebar from "./Sidebar"
import UserProfile from "./UserProfile"
import reportedVideos from "../constants/ReportedVideos"

const ReportedVideos = () => {


    return (
        <div className="flex flex-col h-screen font-roboto">
            <div className="fixed top-0 w-full z-50 shadow-md">
                <Nav />
            </div>
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="z-50 fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-5">
                    <UserProfile />
                    <hr className="my-5 w-full" />
                    <div className="flex gap-10">
                        <div className="hidden md:flex">
                            <ProfileSidebar />
                        </div>
                        <div>
                            {/* <div className="sm:mx-4 font-roboto w-[90vw] md:w-fit">
                                <p className="font-semibold text-[20px] pb-2 font-inter">Reported Videos</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center items-center mx-auto max-w-7xl">
                                    {reportedVideos.map((short) => (
                                        <Link
                                            to={`/short/${short.id}`}
                                            key={short.id}
                                            className="flex flex-col"
                                        >
                                            <img
                                                src={short.thumbnail}
                                                alt={short.title}
                                                className="h-[265px] object-cover rounded-lg w-full "
                                            />
                                            <div className="">
                                                <p className="font-light mt-2">{short.title}</p>
                                                <p className="text-[14px] font-light">{short.views}</p>
                                                <p className="font-medium text-red-600 my-1 mb-2">Reports: {short.reports}</p>
                                            </div>
                                            <button className="bg-[#065FD4] text-white py-2 px-4 mb-4 rounded-md">
                                            Submit Answer
                                        </button>
                                        </Link>
                                    ))}
                                </div>
                            </div> */}
                            <div className="text-green-600">
                                Congrats, No Videos Of Yours have been reported yet.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ReportedVideos