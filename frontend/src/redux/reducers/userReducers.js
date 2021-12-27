
const initialState = {
    user: { email:"", img:"", firstName:"", token: "", _id:"", },
    errors: '', 
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'user':
            localStorage.setItem("token", action.payload.token)                  
            localStorage.setItem("firstName", action.payload.firstName)         
            localStorage.setItem("img", action.payload.img)
            localStorage.setItem("_id", action.payload._id)
            return {
                ...state,
                user: action.payload,
            };
            
        case 'logOut':
            return {
                ...state,
                user: '',
            };
        default:
            return state;
    }
};
export default userReducer;