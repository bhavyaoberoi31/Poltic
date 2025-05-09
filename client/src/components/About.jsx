import Navbar from "./Navbar";
import img from "../assets/bg.png";
import img1 from "../assets/intro.png";
import img2 from "../assets/login.png";
import Footer from "./Footer";
import { IoCheckmarkSharp } from "react-icons/io5";

const About = () => {
    return (
        <div className="font-inter">
            <Navbar />

            {/* Header Section */}
            <div 
                className="h-[200px] md:h-[359px] bg-no-repeat bg-cover flex items-center justify-center text-white" 
                style={{ backgroundImage: `url(${img})` }}
            >
                <p className="text-[24px] md:text-[48px] font-semibold text-center">PolTic: News for the <br className="hidden md:block" /> Next Generation</p>
            </div>

            {/* About Sectionc */}
            <div className="p-4 md:p-20">
                <span className="px-4 py-2 my-2 rounded-xl bg-[#F3F5F7] text-[#032347] text-[12px] md:text-[15px] font-medium">About PolTic</span>
                <p className="bg-gradient-to-b from-transparent via-transparent text-[16px] md:text-[44px] font-medium to-[#A6CCFF] w-fit my-2">Introduction</p>
                <div className="flex flex-col md:flex-row gap-5 justify-between">
                    <div className="w-full md:w-[45%]">
                        <p className="text-[#23291FCC] text-[14px] md:text-[18px] py-4">PolTic is a unique social media platform dedicated to the voices of everyday citizens on political opinions, Trending Issues, and Breaking News. Users post quick, under-1-minute videos where they discuss their views on a wide range of topics that affect their lives. The platform emphasizes transparency, aiming to avoid bias, toxicity, and hidden agendas often present in some media.</p>

                        {/* Key Features */}
                        {[
                            {
                                title: "Credible, Curated News",
                                description: "Every story on Poltic is sourced and verified, ensuring you receive news you can trust."
                            },
                            {
                                title: "Engaging Format",
                                description: "Our short-form videos make complex topics easy to understand, keeping you both informed and entertained."
                            },
                            {
                                title: "Effortless Access",
                                description: "Access the news that matters with just a few taps, wherever and whenever it suits you."
                            },
                            {
                                title: "Inclusivity",
                                description: "Open to people from all walks of life across India, representing diverse regional, linguistic, and cultural perspectives."
                            }
                        ].map((item, index) => (
                            <div key={index} className="flex gap-2 py-2">
                                <IoCheckmarkSharp className="my-1" />
                                <p className="font-semibold text-[14px] md:text-[16px]">
                                    {item.title} – <span className="font-medium text-[#23291FCC]">{item.description}</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Image */}
                    <div className="relative mx-auto md:mx-10 w-full md:w-auto">
                        <img 
                            src={img2} 
                            alt="" 
                            className="relative z-10 w-full max-w-[300px] md:max-w-[558px] mx-auto"
                        />
                        <div 
                            className="w-full max-w-[300px] md:max-w-[558px] h-[300px] md:h-[526px] bg-[#F3F5F7] rounded-lg absolute top-4 md:top-[50px] left-4 md:left-[50px]"
                        ></div>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-10 m-4 md:m-20 my-10 md:my-36">
                <div className="relative mx-auto w-full md:w-auto">
                    <img 
                        src={img1} 
                        alt="" 
                        className="relative z-10 w-full max-w-[300px] md:max-w-[558px] mx-auto"
                    />
                    <div 
                        className="w-full max-w-[300px] md:max-w-[558px] h-[300px] md:h-[526px] bg-[#F3F5F7] rounded-lg absolute top-4 md:top-[50px] left-4 md:left-[-50px]"
                    ></div>
                </div>

                <div className="w-full md:w-[40%] text-center md:text-left">
                    <span className="px-4 py-2 my-2 rounded-xl bg-[#F3F5F7] text-[#032347] text-[12px] md:text-[15px] font-medium">Our Mission</span>
                    <br />
                    <span className="bg-gradient-to-b from-transparent via-transparent to-[#A6CCFF] text-[16px] md:text-[44px] font-medium">Empowering </span>
                    <span className="text-[16px] md:text-[44px] font-medium">You With News That Matters</span>
                    <p className="text-[#23291FCC] text-[14px] md:text-[18px] py-4">To empower people with quick, credible, and impactful news stories that keep them connected to the world around them. We aim to bridge the gap between complex issues and everyday audiences, making news more relatable, insightful, and meaningful.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;
