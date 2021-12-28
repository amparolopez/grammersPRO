import FormSignUp from "../components/FormSignUp";
import {Navigate} from 'react-router-dom';

const SignUp = () => {
    // const token = localStorage.getItem("token")
    // if(token){
    //     return <Navigate to="/"/>
    // }
    return (
        <FormSignUp/>
    )
}

export default SignUp;