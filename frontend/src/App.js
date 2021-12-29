import { React, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import userActions from './redux/actions/userActions';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js'
import withRouter from './utils/withRouter'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home2 from './pages/Home2';


const HomeRouter = withRouter(Home)

function App(props) {

  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.isAuth(localStorage.getItem("token"))
    }
  }, [])
  console.log(props.user)
  return (
    <div className="container-all">
      <BrowserRouter>
        <Routes>
          <Route path="/Profile" element={<HomeRouter />}/>
          <Route path="/Browser" element={<HomeRouter />}/>
          <Route path="/Settings" element={<HomeRouter />}/>
          <Route path="/Signup" element={<SignUp />}/>
          <Route path="/Signin" element={<SignIn />}/>
          <Route path="/" key="home" element={<HomeRouter/>} />
          {/* <Route path="/Signup" element={<SignUp />} />
          <Route path="/Signin" element={<SignIn />} /> */}
          {props.user.token ? 
            <Route path="*" key="home" element={<Home2/>} />

          : 
            <>
              <Route path="/Signup" element={<SignUp />} />
              <Route path="/Signin" element={<SignIn />} />
            </>
          }
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducers.userData,
  };
}

const mapDispatchToProps = {
  isAuth: userActions.isAuth,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
