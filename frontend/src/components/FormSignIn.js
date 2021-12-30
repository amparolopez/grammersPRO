import React, { useRef, useState } from 'react';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const FormSignIn = (props) => {

    const [signInUser, setSignInUser] = useState ({
        email: "", 
        password: "",
        googleFlag: false
    })

    const email = useRef();
    const password = useRef();

    const inputHandler = (ref, input) => {
        setSignInUser({
            ...signInUser,
            [input]: ref.current.value
        })
    };


    const handleSubmit = async (e) => {

        e.preventDefault()
        const user = await props.userSignIn(signInUser)
        
        if (!user) {
            
            // console.log(user.answer)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Welcome!!',
                text: 'You succesfully logged in!', 
                timer: 1500,
              })

        }
} 
            
 

    const responseGoogle = (res) => {
        let googleUser = {
            email: res.profileObj.email,
            password: res.profileObj.googleId,
            googleFlag: true,
        };
        props.userSignIn(googleUser)
    };

    return(
        <>
        <div className="formSignIn-container">
            <div className="app-wrapper" >
                <div>
                    <h2 className='title'>Sign In</h2>
                </div>
                <form className="form-wrapper" onSubmit={handleSubmit}>
                    <div className='form-inputs'>
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            className='form-input'
                            placeholder='Enter your email'
                            onChange={() => inputHandler(email, "email")} ref={email}
                        />
                    </div>
                    <div className='form-inputs'>
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            name='password'
                            className='form-input'
                            placeholder='Enter your password'
                            onChange={() => inputHandler(password, "password")} ref={password}
                        />
                    </div>

                    <button className="form-input-btn" type="submit">
                        Sign in
                    </button>
                    <div>
                        <span className="form-input-login">
                            You don't have an account? Sign up <a href="/signUp">here</a>
                        </span>
                    </div>
                    <GoogleLogin
                        clientId="574668222379-d66arovv4jaa96l8s98rk9ad85snbgsc.apps.googleusercontent.com"
                        buttonText="SignIn with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                    />
                </form>
            </div>
        </div>
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