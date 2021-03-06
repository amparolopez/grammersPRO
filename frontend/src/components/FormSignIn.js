import React, { useRef, useState } from "react";
import userActions from "../redux/actions/userActions";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import Swal from "sweetalert2";

const FormSignIn = (props) => {
  const [signInUser, setSignInUser] = useState({
    email: "",
    password: "",
    googleFlag: false,
  });

  const email = useRef();
  const password = useRef();

  const inputHandler = (ref, input) => {
    setSignInUser({
      ...signInUser,
      [input]: ref.current.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await props.userSignIn(signInUser);
    console.log(user)
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Welcome!!",
        text: "You succesfully logged in!",
        timer: 1500,
      });
    }
  };

  const responseGoogle = (res) => {
    let googleUser = {
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      googleFlag: true,
    };
    props.userSignIn(googleUser);
  };

  return (
    <>
      <div className="CenterContent">
        <div className="ContenedorCenter">
          <div className="userForm">
            <div>
              <h3>Sign In</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={() => inputHandler(email, "email")}
                  ref={email}
                />

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={() => inputHandler(password, "password")}
                  ref={password}
                />
              </div>
              <div className="sign-Btn">
                <button className="btn-sign" type="submit">
                  Sign in
                </button>

                <GoogleLogin
                  clientId="574668222379-d66arovv4jaa96l8s98rk9ad85snbgsc.apps.googleusercontent.com"
                  buttonText="Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <h4 className="form-input-login">
                You don't have an account? Sign up <a href="/signUp">here</a>
              </h4>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducers.user,
  };
};

const mapDispatchToProps = {
  userSignIn: userActions.userSignIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormSignIn);
