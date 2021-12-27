import Center from "../components/center/Center"
import Left from "../components/left/Left"
import Rigth from "../components/rigth/Rigth"


const Home = (props) => {
    console.log(props)
    return (
        <div className="containerHome">
            <Left location={props.location.pathname}/>
            {props.location.pathname === "/" ? <Center /> : null}
            <Rigth />
        </div>
    )
}

export default Home
