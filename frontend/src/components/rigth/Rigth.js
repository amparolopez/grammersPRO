import "./Rigth.css"
import { FaRegBell, FaCloudUploadAlt } from "react-icons/fa";
const Rigth = () => {
    return (
        <div className="rigthUsers">
            <div className="Searchs">
            <input placeholder=" 🔍 Search" className="inputSearch" type="text"></input>
           <FaRegBell className="bell"/>
            <FaCloudUploadAlt className="bell"/>

            </div>
            
            
        </div>
    )
}

export default Rigth
