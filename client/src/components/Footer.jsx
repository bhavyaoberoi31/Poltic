import img from "../assets/LogoWhite.png"
const Footer = () => {
    return (
        <div className="bg-[#032347] p-5 md:p-20 text-white grid grid-cols-1 md:grid-cols-3">
            <div>
                <img src={img} alt="" />
                <p className="py-2">Craft stunning sites <br />
                    effortlessly while enjoying <br />
                    real-time customer support.</p>
            </div>
            <div>
                <div>

                </div>
                <div></div>
                <div></div>
            </div>
            <div>
                <p className="md:m-2 my-2 font-semibold">Want to receive news and updates?</p>
                <form>
                    <input type="email" placeholder="Email" className="bg-[#FFFFFF1A] px-3 py-2 rounded-xl md:m-2 my-2 mr-2" />
                    <button type="submit" className="px-3 py-2 bg-[#77ACF4] text-[#032347] rounded-xl">Stay in the loop</button>
                </form>
            </div>
        </div>
    )
}

export default Footer