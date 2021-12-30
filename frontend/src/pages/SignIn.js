import FormSignIn from "../components/FormSignIn";
import Left from "../components/left/Left"
import Rigth from "../components/rigth/Rigth"

const SignIn = () => {
    return (
        <>
        <div className="containerHome">
            <Left />
            <FormSignIn/>
            <Rigth />
        </div>
        </>
    )
};

export default SignIn;