const axios = require('axios');
const Swal = require('sweetalert2');

const userActions = {

    userSignUp: (User) => {
        return async (dispatch, getState) => {
            try {
                const user = await axios.post('http://localhost:4000/api/user/signup', { ...User });
                console.log(user)
                if (user.data.success && !user.data.error) {
                    localStorage.setItem("token", user.data.response.token);
                    dispatch({ type: 'user', payload: user.data.response.newUser })
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Congratulations! You successfully registered!',
                        text: 'Please sign in to continue.', 
                        timer: 1500,
                      })
                } else {
                    const error = user.data.answer[0].message
                    console.log(user.data)
                    if(error){
                    
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title:error,
                        showConfirmButton: true,
                        timer: 1500
                      }) 
                    } else {
                    return { errors: user.data.answer };  
                }}
            } catch (error) { }
        }
    },

    userSignIn: (userLogIn) => {
        return async (dispatch, getState) => {

            try {

                const user = await axios.post('http://localhost:4000/api/user/signin', { ...userLogIn });
                console.log(user)
                if (user.data.success) {
                 
                  localStorage.setItem('token', user.data.answer.token);
                  localStorage.setItem('userName', user.data.answer.userName);
                  console.log(user.data.answer)
                  dispatch({ type: 'user', payload: user.data.answer })
                } else {
                  const error = user.data.answer[0].message
                  console.log(user.data)
                    Swal.fire({
                        position: 'top.end',
                        icon: 'error',
                        title: error,
                        showConfirmButton: true,
                        timer: 3000
                    })

                }
            } catch (error) {

            }
        };
    },

    logOut: () => {
      return (dispatch, getState) => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'You have successfully unlogged!',
            text: 'See you soon!',
            showConfirmButton: false,
            timer: 3000
        })
        dispatch({ type: 'logOut', payload: {} })
        localStorage.removeItem("token", "userLogged")
    }
        
  },
  isAuth: () => {
    return async (dispatch, getState) => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get("http://localhost:4000/api/user/signin/token", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        
        dispatch({
          type: "user",
          payload: {
            token,
            firstName: response.data.answer.firstName,
            img: response.data.answer.imgUrl,
            _id: response.data.answer.id,
            userAdmin: response.data.answer.userAdmin,
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
