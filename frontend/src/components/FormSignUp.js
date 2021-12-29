import React, { useRef, useState, useEffect } from 'react';
import userActions from '../redux/actions/userActions';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormSignUp = (props) => {

    const UserName = useRef();
    const LastName = useRef();
    const Email = useRef();
    const Password = useRef();
    const ImgUrl = useRef();

    const [newUser, setNewUser] = useState({
        userName: "",
        lastName: "",
        email: "",
        password: "",
        imgUrl: "",
        //job: "",
        country: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await props.userSignUp(newUser)
       
        if (user.errors) {
            
            console.log(user.answer)
            user.errors.map((e) =>
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
    }

    // if(user.success && !user.error){
    //     Swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: 'Correctly Registered!',
    //         showConfirmButton: false,
    //         timer: 8500
    //       })
    //       setNewUser({
    //         userName: "",
    //         lastName: "",
    //         email: "",
    //         password: "",
    //         imgUrl: "",
    //         // job: "",
    //         country: ""
    //       })
    //    }else{

    //     toast.fire({
    //         icon: 'error',
    //         toast: true,
    //         html:  user.response.map(
    //         e => `<p>${e.message}</p>`
    //         )
    //       })         
     
    //    }

    // const handleSubmit = async (
    //     user
    // ) => {
    //     const errors = await props.userSignUp(
    //         user
    //     );
    //     if (errors) {
    //         errors.errors.map((e) =>
    //             toast.warning(e.message, {
    //                 position: "top-left",
    //                 autoClose: 4000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //             })
    //         );
    //     }
    // };

    const inputHandler = (ref, input) => {
        setNewUser({
            ...newUser,
            [input]: ref.current.value
        })

    };

    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios.get(`https://restcountries.com/v2/all?fields=name`)
            .then(res => setCountries(res.data))

    }, [])


    const handlerSelect = (e) => {
        setNewUser({
            ...newUser,
            "country": e.target.value
        })
    }


    const responseGoogle = (res) => {
        console.log(res);
        let googleUser = {
            userName: res.profileObj.givenName,
            lastName: res.profileObj.familyName,
            email: res.profileObj.email,
            password: res.profileObj.googleId,
            country: "Argentina",
            imgUrl: res.profileObj.imageUrl,
            googleFlag: true,
        };
        props
            .userSignUp(googleUser)
            .then((response) => response.data.success)
            .catch((error) => console.log(error));
        };
        
    return (
        <>
            <div className="containerForm">
                <div className="userForm">
                    <h3>Create an Account!</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <input type="text" name="UserName" placeholder="First Name" onChange={() => inputHandler(UserName, "userName")} ref={UserName} />


                            <input type="text" name="lastName" placeholder="Last Name" onChange={() => inputHandler(LastName, "lastName")} ref={LastName} />

                            <input type="url" name="imgUrl" placeholder="Your Url picture" onChange={() => inputHandler(ImgUrl, "imgUrl")} ref={ImgUrl} />
                        </div>
                        <div className="inputs">
                            <select name="country" onChange={handlerSelect}>
                                <option>Choose your country</option>
                                {
                                    countries.map((Country, index) => {
                                        return (
                                            <option key={index} >{Country.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <select name="job" onChange={handlerSelect}>
                                <option>Choose your job</option>
                                <option>Programmer</option>
                            </select>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                autoComplete="nope"
                                onChange={() => inputHandler(Email, "email")} ref={Email}
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="nope"
                                onChange={() => inputHandler(Password, "password")} ref={Password}
                            />
                        </div>
                        <div className="sign-Btn">
                            <button className="btn-sign" type="submit">Sign Up</button>
                            {/* <button className="btn-sign">Google</button> */}

                            <GoogleLogin
                                clientId="574668222379-d66arovv4jaa96l8s98rk9ad85snbgsc.apps.googleusercontent.com"
                                buttonText="Sign Up with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </form>
                    <div className="container-Sign">
                    </div>
                </div>
            </div>
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