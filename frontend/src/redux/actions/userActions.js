const axios = require("axios");
// const Swal = require('sweetalert2');

const userActions = {
  userSignUp: (User) => {
    return async (dispatch, getState) => {
      try {
        const user = await axios.post("#", { ...User });
        if (user.data.success && !user.data.error) {
          localStorage.setItem("token", user.data.response.token);
          dispatch({ type: "user", payload: user.data.response });
          // Swal.fire({
          //     position: 'top-end',
          //     icon: 'success',
          //     title: 'Congratulations! You successfully registered!',
          //     text: 'Please sign in to continue.',
          //     timer: 1500,
          //   })
        } else {
          const error = user.data.error;
          if (user.data.error) {
            // Swal.fire({
            //     position: 'top-end',
            //     icon: 'error',
            //     title:error,
            //     showConfirmButton: true,
            //     timer: 1500
            //   })
          } else {
            return { errors: user.data.errors };
          }
        }
      } catch (error) {}
    };
  },

  userSignIn: (userLogIn) => {
    return async (dispatch, getState) => {
      try {
        const user = await axios.post("#", { ...userLogIn });
        if (user.data.success && !user.data.error) {
          localStorage.setItem("token", user.data.response.token);
          dispatch({ type: "user", payload: user.data.response });
        } else {
          console.log(user.data);
          const error = user.data.error;
          // Swal.fire({
          //     position: 'top.end',
          //     icon: 'error',
          //     title: error,
          //     showConfirmButton: true,
          //     timer: 3000
          // })
        }
      } catch (error) {}
    };
  },

  logOut: () => {
    return (dispatch, getState) => {
      // Swal.fire({
      //     position: 'top-end',
      //     icon: 'success',
      //     title: 'You have successfully unlogged!',
      //     text: 'See you soon!',
      //     showConfirmButton: false,
      //     timer: 3000
      // })
      dispatch({ type: "logOut", payload: {} });
      localStorage.removeItem("token", "userLogged");
    };
  },
  isAuth: (token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.get("#", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        dispatch({
          type: "user",
          payload: {
            token,
            firstName: response.data.firstName,
            img: response.data.img,
            _id: response.data._id,
          },
        });
      } catch (error) {
        // return dispatch({ type: 'logOut'})
      }
    };
  },
  getUsers: () => {
    return async (dispatch, getstate) => {
      const res = await axios.get("http://localhost:4000/api/post");
      if (res.data.success) {
        return res.data;
      } else {
        console.log("error");
      }
    };
  },
};

export default userActions;
