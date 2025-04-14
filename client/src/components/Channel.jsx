import Nav from "./Nav";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import Videos from "./Videos";

const Channel = () => {
    return (
        <div className="flex flex-col h-screen font-roboto">
            <div className="fixed top-0 w-full  z-10">
                <Nav />
            </div>
            <div className="flex flex-1 pt-[53px] md:pt-[89px]">
                <div className="fixed w-full flex flex-col items-center md:h-[calc(100vh-89px)] md:w-[227px]">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-scroll custom-scrollbar ml-0 md:ml-[227px] pt-6 px-5">
                    <Profile />
                    <Videos />
                </div>
            </div>
        </div>
    );
};

export default Channel;
