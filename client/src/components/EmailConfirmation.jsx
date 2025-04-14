// import { LuDot } from "react-icons/lu"
// import img from "../assets/LogoWhite.png"

// const EmailConfirmation = () => {
//     return (
//         <div className="flex justify-center">
//             <div className="py-10 w-[50%] ">
//                 <div>
//                     <div className="bg-[#065FD4] h-[140px] flex items-center ">
//                         <img src={img} alt="" className="mx-10" />
//                     </div>
//                     <div className="bg-[#FAFAFB] p-10">
//                         <p className="font-semibold text-[28px] font-poppins p-2">Email Confirmation, before <span className="text-[#065FD4] "> we get started...</span> </p>
//                         <p className="px-2 font-poppins ">Thank you for registering on socialRepeat, to finish your registration please confirm
//                         your email by clicking on the button below:</p>
//                         <button className="px-4 py-2 mx-2 my-10 bg-[#065FD4] text-black rounded-sm flex gap-2" type="submit" >CONFIRM YOUR EMAIL</button>
//                         <p className="px-2">Didn't sign up for socialRepeat? <span className="text-[#0057FF] "> Let us know.</span></p>
//                         <hr className="my-10" />
//                         <p className="p-2 ">If you’re having trouble with the button above, copy and paste the URL below into your web browser.</p>
//                         <a href="https://app.domain.com/auth/confirm-email/7ddc6cb3-0cd1-40d5-8e62-39b5bac44841" className="text-[#0057FF] px-2 my-20">https://app.domain.com/auth/confirm-email/7ddc6cb3-0cd1-40d5-8e62-39b5bac44841</a>
//                         <br />
//                         <br />
//                         <br />
//                     </div>
//                     <div className="flex justify-between">
//                         <p className="my-4">Email send by socialRepeat</p>
//                         <div className="flex justify-center text-[#000000DE] my-4">
//                     <button className="text-[14px] ">Terms and conditions</button>
//                     <LuDot className="m-1"/>
//                     <button className="text-[14px] ">Privacy policy</button>
//                 </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default EmailConfirmation

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

const EmailConfirmationPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#fff] flex flex-col justify-center items-center text-black">
            <div className="text-center max-w-lg w-full p-8 bg-white rounded-xl shadow-lg">
                <FaEnvelope className="text-6xl mb-4 mx-auto text-indigo-600" />
                <h2 className="text-3xl font-semibold mb-4">Email Sent</h2>
                <p className="text-lg mb-6">
                    We have sent a confirmation link to your email address. Please check your inbox (and spam folder) to confirm your email.
                </p>
                <div className="space-x-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                    >
                        Back to Login
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-600 text-black font-semibold py-2 px-6 rounded-lg transition duration-200"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailConfirmationPage;

