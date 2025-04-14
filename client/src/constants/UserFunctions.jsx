import { AiFillDashboard, AiFillVideoCamera, AiFillSetting } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { MdSubscriptions } from "react-icons/md";

export const UserFunctions = [
    {
        title: "Dashboard",
        link: "/user-profile",
        icon: <AiFillDashboard className="text-xl" />,
    },
    {
        title: "Video Library",
        link: "/user-library",
        icon: <AiFillVideoCamera className="text-xl" />,
    },
    {
        title: "Reported Videos",
        link: "/user-reports",
        icon: <RiVideoAddLine className="text-xl" />,
    },
    {
        title: "Followers",
        link: "/user-subscriptions",
        icon: <MdSubscriptions className="text-xl" />,
    },
    {
        title: "Settings",
        link: "/user-settings",
        icon: <AiFillSetting className="text-xl" />,
    },
];
