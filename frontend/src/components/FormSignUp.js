import React, { useRef, useState } from 'react';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';

const FormSignUp = (props) => {

    const FirstName = useRef();
    const LastName = useRef();
    const Email = useRef();
    const Password = useRef();
    const Country = useRef();
    const Img = useRef();
    
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        img: "",
        country: ""
    })


    const handleSubmit = async (
        user
    ) => {
        const errors = await props.userSignUp(
            user
        );
        if (errors) {
            errors.errors.map((e) =>
                toast.warning(e.message, {
                    position: "top-left",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            );
        }
    };

    const inputHandler = (ref, input) => {
        setNewUser({
            ...newUser,
            [input]: ref.current.value
        })        

    };


    const responseGoogle = (res) => {
        console.log(res);
        let googleUser = {
            firstName: res.profileObj.givenName,
            lastName: res.profileObj.familyName,
            email: res.profileObj.email,
            password: res.profileObj.googleId,
            country: "Argentina",
            img: res.profileObj.imageUrl,
            google: true,
        };
        props
            .userSignUp(googleUser)
            .then((response) => response.data.success)
            .catch((error) => console.log(error));
    };

    return(
        <>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user,
    };
};

const mapDispatchToProps = {

    userSignUp: userActions.userSignUp,

};

export default connect(mapStateToProps, mapDispatchToProps)(FormSignUp);