import React from 'react'; 
import Footer from "./Footer"
import HeroSection from "./HeroSection"
import Navbar from "./Navbar"
import SecNav from "./SecNav"

const LandingPage = () => {
    return (
        <div className="overflow-hidden font-inter">
            <Navbar/>
            <div className="md:hidden">
                <SecNav/>
            </div>
            <HeroSection/>
            <Footer/>
        </div>       
    )
}

export default LandingPage