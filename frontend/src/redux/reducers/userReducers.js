
const initialState = {
    userData: { email:"", imgUrl:"", firstName:"", token: "", _id:"", userAdmin:"" },
    usersArray:[],
    user:false,
    errors: '', 
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'user':
            console.log(action.payload)
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
                userData: action.payload,
                user:false
            };
        case 'getAllUser':
            return{
                ...state,
                usersArray:action.payload
            }
        default:
            return state;
    }
};
export default userReducer;