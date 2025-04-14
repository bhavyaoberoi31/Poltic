import { LuDot } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import img from "../assets/image-Photoroom (38) 1.png"
import { useState } from "react"
import { FaArrowRight } from "react-icons/fa"

const PasswordReset = () => {
const [password, setPassword] = useState('')
const [confPassword, setConfPassword] = useState('')
const navigate = useNavigate()

return (
    <div className="max-h-screen">
        <img src={img} alt="" className="m-4 h-[50px] " onClick={() => {navigate("/")}}/>
        <div className="flex flex-col justify-between h-[calc(100vh-84px)] my-auto" >
        <div className="flex flex-col justify-center items-center my-auto">
            <div>
                <p className="font-semibold py-2 text-[20px] text-[#000000DE] ">Reset your password</p>
                <p className="font-medium text-[#000000DE] text-[14px] mb-6 ">Type in your new password.</p>
            <input type="password" placeholder="New Password *" value={password} onChange={(e) => setPassword(e.target.value)} className="w-72 px-3 py-2 border border-1 my-4 border-[#0000003B] rounded-sm" />
            <br />
            <input type="password" placeholder="Confirm New Password *" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} className="w-72 px-3 py-2 border border-1 border-[#0000003B] rounded-sm" />
            <button className="px-4 py-2 bg-[#065FD4] text-white rounded-sm flex gap-2 my-8" type="submit" onClick={() => navigate("/email-confirm")} >RESET<FaArrowRight className="m-1"/></button>
            </div>
        </div>
        <div className="flex justify-center text-[#000000DE] my-4">
                <button className="text-[14px] ">Terms and conditions</button>
                <LuDot className="m-1"/>
                <button className="text-[14px] ">Privacy policy</button>
            </div>
        </div>
    </div>
)
}

export default PasswordReset