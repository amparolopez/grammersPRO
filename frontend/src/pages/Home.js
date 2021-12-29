import Center from "../components/center/Center"
import Profile from "../components/center/Profile"
import Left from "../components/left/Left"
import Rigth from "../components/rigth/Rigth"
import Browser from "../components/center/Browser"
import Settings from "../components/center/Settings"

const Home = (props) => {
    return (
        <div className="containerHome">
            <Left location={props.location.pathname}/>
                {props.location.pathname === "/" ? <Center /> : null}
                {props.location.pathname === "/Profile" ? <Profile /> : null}
                {props.location.pathname === "/Browser" ? <Browser /> : null}
                {props.location.pathname === "/Settings" ? <Settings /> : null}
            {props.location.pathname === "/Settings" ? null : <Rigth />}
        </div>
    )
}

export default Home
