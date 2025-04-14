import { useNavigate } from "react-router-dom"
import img from "../assets/image-Photoroom (38) 1.png"
import { useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import { LuDot } from "react-icons/lu"

const EmailConfirm = () => {

    const navigate = useNavigate()
    return (
        <div className="max-h-screen">
            <img src={img} alt="" className="m-4 h-[50px] " onClick={() => {navigate("/")}}/>
            <div className="flex flex-col justify-end my-auto p-5 md:p-0" >
            <div className="flex flex-col justify-center  h-[calc(100vh-140px)] items-center my-auto">
                <div>
                    <p className="font-semibold py-2 text-[20px] text-[#000000DE] ">Recovery Email Sent!</p>
                    <p className="font-medium text-[#000000DE] text-[14px] mb-6 ">Please check your email for next steps to reset your password.</p>
                <button className="px-4 py-2 bg-[#065FD4] text-white rounded-sm flex gap-2" type="submit" >CONTACT SUPPORT<FaArrowRight className="m-1"/></button>
                <button className="px-4 py-2 my-4 bg-black text-white rounded-sm w-full uppercase mt-24" onClick={()=> navigate("/login")} >Back To Login</button>
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

export default EmailConfirm