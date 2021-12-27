
const initialState = {
    userData: { email:"", img:"", firstName:"", token: "", _id:"", },
    user:false,
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
                userData: action.payload,
                user:true
            };
            
        case 'logOut':
            return {
                ...state,
                userData: '',
                user:false
            };
        default:
            return state;
    }
};
export default userReducer;