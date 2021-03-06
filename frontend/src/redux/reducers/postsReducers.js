const initialState = {
    post: []
}

const postsReducers = (state = initialState, action) => {
    switch (action.type){
        case 'getPost':
            return {
                ...state, 
                post: action.payload
            }
            default:
                return state
    }
}

export default postsReducers;