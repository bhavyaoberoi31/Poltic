import { useNavigate } from "react-router-dom"
import { NavButtons } from "../constants/NavButtons"

const SecNav = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="flex gap-[65px] text-[18px] justify-center bg-gray-300 p-3">
                {NavButtons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(button.link)}>
                        {button.title}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SecNav 