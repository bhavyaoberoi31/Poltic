import { useNavigate } from "react-router-dom"
import img1 from "../assets/Picture1.png"
import { NavButtons } from "../constants/NavButtons"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCurrentUser } from "../features/auth/authThunk";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const { currentUser, status } = useSelector((state) => state.auth);
  
    // Fetch current user on component mount
    useEffect(() => {
      if (status === "idle") {
        dispatch(fetchCurrentUser());
      }
    }, [status, dispatch]);
  
    return (
        <div className="sticky rounded-2xl flex justify-between h-[81px] ">
            <div className="flex items-center ml-6">
                <button onClick={() => navigate("/")}>
                    <img src={img1} alt="logo" className="h-[30px] sm:h-[40px] mr-2"/>
                </button>
            </div>
            <div className="hidden md:flex gap-[65px] text-[18px]">
                {NavButtons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(button.link)}>
                        {button.title}
                    </button>
                ))}
            </div>
            <div className="flex items-center mr-6">
                <div className="card text-sm font-medium">
                    <button className="px-5 p-3 bg-[#032347] rounded-md text-white" onClick={() => currentUser===null? navigate("/login"): navigate("/home")}>Login/SignUp</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar