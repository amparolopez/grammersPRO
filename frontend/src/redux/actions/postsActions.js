import axios from "axios";

const postsActions = {
  getAllPosts: () => {
    return async (dispatch, getState) => {
      const res = await axios.get("http://localhost:4000/api/post");
      if (res.data.success) {
        return res.data
      } else {
        console.log('error')
      }
    };
  },
  postAPost: (postText, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/post",
          { postText },
          {
            headers: {
              Authorization: "Bearer" + token,
            },
          }
        );
        if (response.data.success) return { success: true, resonse: response };
        else throw new Error();
      } catch (error) {
        console.log(error);
      }
    };
  },
  ////////////////////

<<<<<<< HEAD
  addComment: (id, comment, token) => {
    return async () => {
      try {
        const response = await axios.put(
          "http://localhost:4000/api/comment/" + id,
          { comment, type: "addComment" },
          {
            headers: {
              Authorization: "Bearer" + token,
            },
          }
        );
        if (response.data.success) return { success: true, resonse: response };
        else throw new Error();
      } catch (error) {
        console.log(error);
      }
    };
  },

  editComment: (id, comment, token) => {
    return async () => {
      try {
        const response = await axios.put(
          "http://localhost:4000/api/comment" + id,
          { comment, type: "editComment" },
          {
            headers: {
              Authorization: "Bearer" + token,
            },
          }
        );
        if (response.data.success) return { success: true, resonse: response };
        else throw new Error();
      } catch (error) {
        console.log(error);
      }
    };
  },

  deleteComment: (id, commentId, token) => {
    return async () => {
      try {
        const response = await axios.put(
          "http://localhost:4000/api/comment" + id,
          { commentId, type: "deleteComment" },
          {
            headers: {
              Authorization: "Bearer" + token,
            },
          }
        );
        if (response.data.success) return { success: true, resonse: response };
        else throw new Error();
      } catch (error) {
        console.log(error);
      }
    };
  },

  /////////////////////////////
=======
    getAllPosts: (id) => {
        return async (dispatch, getState) => {
            const response = await axios.get('http://localhost:4000/api/post'+id)
            if (response.data.length > 0){
                dispatch({ type: "getPost", payload: response.data })
            } else {
                dispatch({ type: "getPost", payload: null })
            } 
        } 
    },
    
    ////////////////////

    addComment: (id, comment, token) => {
        return async () => {
            try {
                const response = await axios.put('http://localhost:4000/api/comments'+id, { comment, type: "addComment" }, 
                {
                    headers: {
                        Authorization: 'Bearer' + token
                    }
                })
                if (response.data.success)
                return {success: true, resonse: response}
                else throw new Error()
            } catch (error)
            {console.log(error)}
        }   
    },

    editComment: (id, comment, token) => {
        return async () => {
            try {
                const response = await axios.put('http://localhost:4000/api/comments'+id, { comment, type: "editComment" }, 
                {
                    headers: {
                        Authorization: 'Bearer' + token
                    }
                })
                if (response.data.success)
                return {success: true, resonse: response}
                else throw new Error()
            } catch (error)
            {console.log(error)}
        }   
    },

    deleteComment: (id, commentId, token) => {
        return async () => {
            try {
                const response = await axios.put('http://localhost:4000/api/comments'+id, { commentId, type: "deleteComment" }, 
                {
                    headers: {
                        Authorization: 'Bearer' + token
                    }
                })
                if (response.data.success)
                return {success: true, resonse: response}
                else throw new Error()
            } catch (error)
            {console.log(error)}
        }   
    },
>>>>>>> 7496f2865b529b5e11bed744c92f15716ac0eb80

  likeDislikePost: (token, id, userId) => {
    return async () => {
      try {
        const response = await axios.put(
          "http://localhost:4000/api/like/" + id,
          { userId },
          {
            headers: {
              Authorization: "Bearer" + token,
            },
          }
        );
        return response.data.response;
      } catch (error) {
        console.log(error);
      }
    };
  },
};

export default postsActions;
