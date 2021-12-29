import { MdHomeFilled } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import { AiTwotoneSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'

const Left = ({location, userData}) => {
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
                            <MdHomeFilled className={location === "/" ? "ActiveSvg" : null}/> 
                            <Link to="/">Home</Link>
                        </div>
                        <div>
                            <FaUser className={location === "/Profile" ? "ActiveSvg" : null}/>
                            <Link to={`/Profile/${userData._id}`} >Profile</Link>
                        </div>
                        <div>
                            <BsFillBookmarkDashFill />
                            <Link to="/Save">Saved Post</Link>
                        </div>
                        <div>
                            <AiTwotoneSetting />
                            <Link to="/Settings">Settings</Link>
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

const mapStateToProps = (state) => {
    return {
      userData: state.userReducers.userData,
    };
  };

export default connect(mapStateToProps, null)(Left)
