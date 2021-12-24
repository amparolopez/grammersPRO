import React, { userRef, useState } from 'react';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';

const FormSignIn = (props) => {

    const [signInUser, setSignInUser] = useState ({
        email: "", 
        password: "",
    })

    const email = useRef();
    const password = useRef();

    const inputHandler = (ref, input) => {
        setSignInUser({
            ...signInUser,
            [input]: ref.current.value
        })
    };

    const handleSubmit = async (
        user
    ) => {
        const errors = await props.userSignIn(
            user
        );
        console.log(errors);
    };

    const responseGoogle = (res) => {
        let googleUser = {
            email: res.profileObj.email,
            password: res.profileObj.googleId,
            google: true,
        };
        props.userSignIn(googleUser)
    };

    return(
        <>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user
    };
};

const mapDispatchToProps = {

    userSignIn: userActions.userSignIn,

};

export default connect(mapStateToProps, mapDispatchToProps)(FormSignIn);