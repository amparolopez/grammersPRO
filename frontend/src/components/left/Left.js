import { MdHomeFilled } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BsFillBookmarkDashFill } from "react-icons/bs";
import { AiTwotoneSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Left = ({ location, userData }) => {
  return (
    <div className="LeftNavbar">
      <div className="LeftContainer">
        <Link to="/" className="LogoLeft">
          <img src="./assets/programmerslogo.png" alt="logo"></img>
        </Link>
        <p className="MenuTitleSecond">Menu</p>
        <div className="MenuLeft">
          <div className="MenuLeftDirection">
            <div>
              <MdHomeFilled className={location === "/" ? "ActiveSvg" : null} />
              <Link to="/">Home</Link>
            </div>
            <div>
            {userData.token.length > 0 ? <><FaUser
                className={location === "/Profile" ? "ActiveSvg" : null}
              />
               <Link to={`/Profile/${userData._id}`}>Profile</Link></> : null}
            </div>
            <div>
            {userData.token.length > 0 ? <>
              <AiTwotoneSetting />
              <Link to="/Settings">Settings</Link>
            </>:null }
              
            </div>
          </div>
        </div>
        <div className="AccountLeft">
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userReducers.userData,
  };
};

export default connect(mapStateToProps, null)(Left);
