
const initialState = {
    userData: { email:"", imgUrl:"", firstName:"", token: "", _id:"", userAdmin:"" },
    usersArray:[],
    user:false,
    errors: '', 
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'user':
            localStorage.setItem("userInfo", action.payload.imageURL);                 
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