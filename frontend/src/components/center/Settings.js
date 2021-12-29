import {useState} from "react"
import Edit from "./settings/Edit"
import Pass from "./settings/Pass"
import Admin from "./settings/Admin"
import Help from "./settings/Help"
const Settings = () => {

    const [tipos, setTipos] = useState("Edit")

    return (
        <div className="CenterContentSettings">
            <div className="ContenedorCenterSettings">
                <div className="SettignsUsedProfile">
                    <p onClick={()=>{setTipos("Edit")}}>Edit profile</p>
                    <span>-</span>
                    <p onClick={()=>{setTipos("Pass")}}>Change the password</p>
                    <span>-</span>
                    <p onClick={()=>{setTipos("Admin")}}>Admin</p>
                    <span>-</span>
                    <p onClick={()=>{setTipos("Help")}}>Help</p>
                    <span>-</span>
                    <p>Log Out</p>
                </div>
                <div className="horizontal-line"></div>
                <div className="TiposSettignsUser">
                    {tipos === "Edit" ? <Edit />:null}
                    {tipos === "Pass" ? <Pass />:null}
                    {tipos === "Admin" ? <Admin />:null}
                    {tipos === "Help" ? <Help />:null}
                </div>
            </div>
        </div>
    )
}

export default Settings
