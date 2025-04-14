import { GoHomeFill } from "react-icons/go";
import img from "../assets/Vector5.png";
import img1 from "../assets/Group.jpg";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="z-50 bg-white w-full flex md:flex-col gap-4 sm:gap-14 md:gap-4 font-roboto p-2 items-center md:items-start md:justify-normal justify-around mx-auto md:mx-0 md:bg-[#F6F6F6] h-[36px] md:h-[calc(100vh-89px)] md:w-[227px]">
            <div className="flex flex-col gap-1 md:m-2 relative">
                <Link
                    to="/home"
                    className={`flex items-center gap-2 ${isActive("/home") ? "text-blue-500" : "text-gray-700"
                        }`}>
                    <GoHomeFill className="m-1" />
                    Home
                </Link>
                {isActive("/channel") && (
                    <div className="h-[2px] bg-blue-500 w-full absolute bottom-[-2px] left-0" />
                )}
            </div>
            <div className="flex flex-col gap-1 md:mx-2 relative">
                <Link
                    to="/breaking"
                    className={`flex items-center gap-2 ${isActive("/breaking") ? "text-blue-500" : "text-gray-700"
                        }`}>
                    <img src={img1} alt="" className="m-1" />Breaking
                </Link>
                {/* {isActive("/breaking") && (
                    <div className="h-[2px] bg-blue-500 w-full absolute bottom-[-2px] left-0" />
                )} */}
            </div>
            {/* <div className="flex flex-col gap-1 md:m-2 relative">
                <Link
                    to="/subscription"
                    className={`flex items-center gap-2 ${isActive("/subscription") ? "text-blue-500" : "text-gray-700"
                        }`}>
                    <img src={img} alt="" className="m-1" /> Subscription
                </Link>
                {isActive("/subscription") && (
                    <div className="h-[2px] bg-blue-500 w-full absolute bottom-[-2px] left-0" />
                )}
            </div> */}
        </div>
    );
};

export default Sidebar;
