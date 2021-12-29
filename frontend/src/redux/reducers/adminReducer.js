const initialState = {
    users : [],
    post: []
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'users':
            return {
                ...state,
                users: action.payload,
            };
        case 'post': 
        return {
            ...state,
            post: action.payload
        }
        default:
            return state;
    }
};
export default userReducer;