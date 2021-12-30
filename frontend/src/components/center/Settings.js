import {useState} from "react"
import Admin from "./settings/Admin"
import Help from "./settings/Help"
import { connect } from "react-redux";
import userActions from "../../redux/actions/userActions";
const Settings = (props) => {

    const [tipos, setTipos] = useState("Edit")
    console.log(props.user)
    return (
        <div className="CenterContentSettings">
            <div className="ContenedorCenterSettings">
                <div className="SettignsUsedProfile">
                    {props.user.userAdmin ? 
                    <>
                        <p onClick={()=>{setTipos("Admin")}}>Admin</p>
                        <span>-</span>
                    </>
                    : null
                    }
                    <p onClick={()=>{setTipos("Help")}}>Help</p>
                    <span>-</span>
                    <p onClick={() => props.logOut()}>Log Out</p>
                </div>
                <div className="horizontal-line"></div>
                <div className="TiposSettignsUser">
                    {tipos === "Admin" ? <Admin />:null}
                    {tipos === "Help" ? <Help />:null}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
      user: state.userReducers.userData,
    };
  }
const mapDispatchToProps = {
    logOut: userActions.logOut,
  };

export default  connect(mapStateToProps, mapDispatchToProps)(Settings)
