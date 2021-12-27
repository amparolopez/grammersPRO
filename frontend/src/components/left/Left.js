import { MdHomeFilled } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import { AiTwotoneSetting } from "react-icons/ai";
const Left = () => {
    return (
        <div className="LeftNavbar">
            <div className="LeftContainer">
                <div className="LogoLeft">
                    <img src="./assets/programmerslogo.png" alt="logo" ></img>
                </div>
                <p className="MenuTitleSecond">Menu</p>
                <div className="MenuLeft">
                    <div className="MenuLeftDirection">
                        <div>
                            <MdHomeFilled className="ActiveSvg"/> 
                            <p className="ActiveParrafo">Home</p>
                        </div>
                        <div>
                            <AiFillMessage />
                            <p>Message</p>
                        </div>
                        <div>
                            <FaUser />
                            <p>Profile</p>
                        </div>
                        <div>
                            <BsFillBookmarkDashFill />
                            <p>Saved Post</p>
                        </div>
                        <div>
                            <AiTwotoneSetting />
                            <p>Settings</p>
                        </div>
                    </div>
                </div>
                <div className="AccountLeft">
                    <p className="MenuTitleSecond">Account</p>
                    <div className="ContenedorProfileLeft">
                        <div className="ContenedorProfileLeftSec">
                            <div className="ProfileIconLeft"></div>
                            <div className="TitleProfileSecLeft">
                                <h2>Michael</h2>
                                <p>@MichaleScot</p>
                            </div>
                        </div>
                        <div className="ContenedorPublicidadLeft"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Left
