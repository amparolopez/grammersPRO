import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import userActions from './redux/actions/userActions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js'
import withRouter from './utils/withRouter'

const HomeRouter = withRouter(Home)

function App(props) {

  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.isAuth(localStorage.getItem("token"))
    }
  }, [])

  return (
    <div className="container-all">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRouter />}/>
          <Route path="/Profile" element={<HomeRouter />}/>
          <Route path="/Browser" element={<HomeRouter />}/>
        </Routes>
      </BrowserRouter>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
