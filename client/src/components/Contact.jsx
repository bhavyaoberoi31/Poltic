import Footer from "./Footer"
import Navbar from "./Navbar"
import img from "../assets/bg.png"
import img1 from "../assets/Frame1.png"
import img2 from "../assets/twitter.png"
import img3 from "../assets/insta.png"
import img4 from "../assets/discord.png"
import { PiPhoneCallFill } from "react-icons/pi"
import { IoMail } from "react-icons/io5"


const Contact = () => {
    return (
        <div className="font-inter overflow-x-hidden w-[100vw]">
            <Navbar />
            <div className="h-[359px] w-full bg-no-repeat bg-cover flex items-center justify-center text-white "
                style={{ backgroundImage: `url(${img})` }}>
                <p className="text-[48px] font-semibold text-center">Contact Us</p>
            </div>
            <div className="bg-gray-100 sm:flex items-center justify-center">
                <div className="flex flex-col-reverse sm:flex-row sm:py-28">
                    <div className=" sm:h-[533px] w-full rounded-t-xl sm:rounded-t-none sm:w-[484px] bg-no-repeat  text-white p-5" style={{ backgroundImage: `url(${img1})` }}>
                        <p className="text-[28px] font-semibold p-4 ">Contact Information</p>
                        <p className="text-[18px] font-medium px-4 text-[#C9C9C9] ">Say something to start a live chat!</p>
                        <div className="p-4 mt-8 flex gap-6">
                            <PiPhoneCallFill className="w-[24px] h-[24px]" />
                            <p className="text-[16px]">+91-9418011200   |  +91-9625961200</p>
                        </div>
                        <div className="p-4 mt-8 flex gap-6">
                            <IoMail className="w-[24px] h-[24px]" />
                            <p className="text-[16px]">hello@nomadictherapies.com</p>
                        </div>
                        <div className="flex gap-5 px-4 mt-28">
                            <img src={img2} alt="" />
                            <img src={img3} alt="" />
                            <img src={img4} alt="" />
                        </div>
                    <hr className="my-4"/>
                    </div>
                    <form className="md:p-10 bg-white rounded-md sm:rounded-e-md">
                        <div className="flex flex-col md:flex-row gap-2 md:gap-10 m-5 md:m-10">
                            <div className="flex flex-col">
                                <label htmlFor="" className="text-[12px] text-[#8D8D8D] py-2">First Name</label>
                                <input type="text" placeholder="" className="border border-x-0 border-t-0 focus:outline-none border-[#8D8D8D]" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="text-[12px] text-[#8D8D8D] py-2">Last Name</label>
                                <input type="text" placeholder="" className="border border-x-0 border-t-0 focus:outline-none border-[#8D8D8D]" />
                            </div>
                        </div>
                        <div className="flex flex-col m-5 md:m-10">
                            <label htmlFor="" className="text-[12px] text-[#8D8D8D] py-2">Email</label>
                            <input type="text" placeholder="" className="border border-x-0 border-t-0 w-full focus:outline-none border-[#8D8D8D]" />
                        </div>
                        <div className="flex flex-col m-5 md:m-10">
                            <label htmlFor="" className="text-[12px] text-[#8D8D8D] py-2">Message</label>
                            <input type="text" placeholder="Write your message." className="border border-x-0 border-t-0 p-1 w-full focus:outline-none border-[#8D8D8D]" />
                        </div>
                        <div className="flex items-end justify-end m-5 md:m-10">
                            <button className="px-4 py-2 bg-[#065FD4] text-white rounded-md " type="submit">Send Message</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact