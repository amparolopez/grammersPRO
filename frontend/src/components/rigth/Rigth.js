import "./Rigth.css"
import { FaRegBell, FaCloudUploadAlt, FaEarlybirds, FaAddressCard } from "react-icons/fa";
import { AiFillHeart, AiFillMessage, AiFillTag } from "react-icons/ai";
const Rigth = () => {
    return (
        
        <div className="rigthUsers">
            
                <div>
            <div className="Searchs">
            <input placeholder=" 🔍 Search" className="inputSearch" type="text"></input>
           <FaRegBell className="bell"/>
            <FaCloudUploadAlt className="bell"/>
            </div>
            <div className="Suggestions">
                <h3>Suggestions For You</h3>
                <h4>See All</h4>
            </div>
            <div className="userContainer">
            <div className="userFollow">

            <div className="imgText">
            <FaEarlybirds className="userImg"/>
            <div className="userText">
            <h4 >Pajarito Ito</h4>
            <h6 className="text">@Pajarito.Ito</h6>

            </div>
            </div>
            <button className="btn-Follow">Follow</button>

            </div>
            <div className="userFollow">

            <div className="imgText">
            <FaEarlybirds className="userImg"/>
            <div className="userText">
            <h4 >Pajarito Ito</h4>
            <h6 className="text">@Pajarito.Ito</h6>

            </div>
            </div>
            <button className="btn-Follow">Follow</button>

            </div>
            <div className="userFollow">

            <div className="imgText">
            <FaEarlybirds className="userImg"/>
            <div className="userText">
            <h4 >Pajarito Ito</h4>
            <h6 className="text">@Pajarito.Ito</h6>

            </div>
            </div>
            <button className="btn-Follow">Follow</button>

            </div>
            </div>

            <div className="latestPost">
                
            <h4>
                Latest Post Activity
            </h4>

            <div>

            <div className="imgActivity">

             <div className="cardPost">
            <div className="cardActivity">
                
            <div className="ActivityImg"></div>
            <div className="cardText">

            <div className="cardIcon">
            <h4 className="minimalStair">Minimalist Stairs</h4>

            <div className="iconActivity">

            <AiFillHeart/>
            <h6 className="text">12</h6>
            <AiFillMessage/>
            <h6 className="text">9</h6>
            <AiFillTag/>
            <h6>3</h6>
            </div>
            </div>
            
            
            </div> 


            </div>
            <div>
                <h4 className="textAllPost">See All Post</h4>
            </div>

                 </div>   
            </div>

            </div>

            </div>
            </div>
            <div>
                <h4>About - Help - Terms - Popular - Lenguage</h4>
            </div>

           
        </div>
        

    )
}

export default Rigth
