// import { useNavigate } from "react-router-dom"
import img from "../assets/Vector.png"
import img1 from "../assets/v1.jpg"
import { ItemList } from "../constants/ItemList";

const HeroSection = () => {
  return (
    <div className="font-inter bg-no-repeat bg-right-bottom md:h-[1200px]" 
    style={{ backgroundImage: `url(${img1})` }}>
      <div className="p-4 md:p-10 flex flex-col md:flex-row md:justify-between">
        <div className="md:w-[40%] md:p-10">
          <div className="flex justify-center md:justify-normal">
          <span className=" bg-gradient-to-b from-transparent via-transparent text-[38px] md:text-[60px] font-medium to-[#A6CCFF]">
            News by You
          </span>
          </div>
          <p className="text-[38px] text-center md:text-start md:text-[60px] font-medium">In just 1 Minute of Video!</p>
          <p className="text-[18px] text-center md:text-start py-4 text-[#23291FCC]">
            Share and Discover the Latest Political Opinions, Trending Issues, and Breaking News. All in Quick Videos from Everyday Citizens!
          </p>
          <div className="flex justify-center md:justify-normal mr-6">
            <div className="text-sm font-medium py-4">
              <button className="px-6 p-3 bg-[#032347] rounded-md text-white">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="md:py-10 rounded-md">
          <div className="w-[351px] md:w-[587px] h-[244px] md:h-[358px] bg-[#F8E8E8] rounded-md" />
        </div>
      </div>
      <div
        className="flex flex-col items-center bg-left bg-no-repeat py-8"
        style={{ backgroundImage: `url(${img})` }}>
        <p className="text-center text-[15px] font-medium pt-16">Short Form Video News</p>
        <p className="text-center text-[44px] font-medium">Why PolTic?</p>
        <p className="text-center text-[16px] text-[#000000E5] md:w-[30%] py-1 px-5 md:px-0">
          Join a community where your voice matters! At #PolTic, everyone shapes the news that impacts our lives.
        </p>
      </div>
      <div className="grid grid-cols-2 px-2 md:grid-cols-4 p-5 md:px-24 gap-2 sm:gap-10 bg-no-repeat bg-right-bottom">
        {ItemList.map((item, index)=>(
            <div className="bg-[#F3F8FF] p-2 sm:p-4 sm:w-[275px]">
                <div className="bg-[#D9D9D9] h-[20px] sm:h-[31px] w-[20px] sm:w-[31px] rounded-full"/>
                <p className="py-2 sm:text-[18px] font-medium sm:font-semibold">{item.title}</p>
                <p className="text-[12px] sm:text-[14px] text-[#3D3C3C]">{item.description}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
