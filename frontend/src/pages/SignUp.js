import FormSignUp from "../components/FormSignUp";
import {Navigate} from 'react-router-dom';
import Left from "../components/left/Left"
import Rigth from "../components/rigth/Rigth"

const SignUp = () => {

    return (
        <>
        <div className="containerHome">
            <Left />
            <FormSignUp/>
            <Rigth />
        </div>
        </>
    )
}

export default SignUp;