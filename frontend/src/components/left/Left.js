import { MdHomeFilled } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { AiTwotoneSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";

const Left = ({ location, userData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="LeftNavbar">
      <div className="LeftContainer">
        <Link to="/" className="LogoLeft">
          <img src="./assets/programmerslogo.png" alt="logo"></img>
        </Link>
        <p className="MenuTitleSecond">Menu</p>
        <div className="MenuLeft">
          <div className="MenuLeftDirection">
            {!userData.token ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <BsFillPersonLinesFill />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to={"/Signup"}>Sign Up</Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to={"/Signin"}>Sign In</Link>
                  </MenuItem>
                </Menu>
              </div>
            ) : null}
            <div>
              <MdHomeFilled className={location === "/" ? "ActiveSvg" : null} />
              <Link to="/">Home</Link>
            </div>
            {userData.token.length > 0 ? (
              <>
                <div>
                  <FaUser
                    className={location === "/Profile" ? "ActiveSvg" : null}
                  />
                  <Link to={`/Profile/${userData._id}`}>Profile</Link>
                </div>
              </>
            ) : null}
            {userData.token.length > 0 ? (
              <>
                <div>
                  <AiTwotoneSetting />
                  <Link to="/Settings">Settings</Link>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className="AccountLeft"></div>
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
