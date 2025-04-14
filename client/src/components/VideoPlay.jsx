import Nav from "./Nav"
import Reels from "./Reels"
import Sidebar from "./Sidebar"

const VideoPlay = () => {
    return (
        <div className="flex flex-col h-screen font-roboto">
            <div className="fixed top-0 w-full z-10 ">
                <Nav />
            </div> 
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px] z-10">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-scroll custom-scrollbar mt-[36px] sm:mt-0 ml-0 sm:ml-[227px] sm:px-5">
                    <Reels/>
                </div>
            </div>
        </div>
    )
}

export default VideoPlay