import { IoMdSearch } from "react-icons/io"
import img from "../assets/logo1.svg"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

const Nav = () => {
    const navigate = useNavigate();
    const { data: user } = useSelector((state) => state.auth);
    console.log(user, "this is from the Nav ")
    return (
        <div className="sticky h-[53px] md:h-[89px] flex justify-between items-center bg-white font-roboto md:bg-[#F6F6F6] ">
            <div className="md:hidden bg-[#E0E9F3] h-[33px] w-[33px] rounded-full flex items-center justify-center ml-2">
                <IoMdSearch className="h-[16px] w-[16px]" />
            </div>
            <div className="md:ml-4">
                <img src={img} alt="" className="h-[30px] sm:h-[40px]" />
            </div>
            <div className=" mr-2 md:mr-12">
                <button
                    className="w-[35px] h-[35px] rounded-full overflow-hidden border border-gray-300"
                    onClick={() => navigate("/user-profile")}
                >
                    {user?.profileImage ? (
                        <img
                            src={user.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-sm text-gray-600">
                            <FaUserCircle size={50}/>
                        </div>
                    )}
                </button>

            </div>
        </div>
    )
}

export default Nav