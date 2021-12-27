import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import userActions from './redux/actions/userActions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormSignUp from './components/FormSignUp';
import FormSignIn from './components/FormSignIn';


function App(props) {

  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.isAuth(localStorage.getItem("token"))
    }
  }, [])

  return (
    <></>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducers.user,
  };
}

const mapDispatchToProps = {
  isAuth: userActions.isAuth,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
