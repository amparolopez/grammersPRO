const axios = require('axios');
const Swal = require('sweetalert2');

const adminActions = {
    getUsers : () => {
        return async (dispatch, getState) => {
            try{
                const users = await axios.get("http://localhost:4000/api/users");
                const modificado = []
                // eslint-disable-next-line
                users.data.response.map((user)=>{
                    const userF = {
                        email:user.email,
                        url: user.imgUrl,
                        id: user._id
                    }
                    modificado.push(userF)
                })
                dispatch({type:"users", payload:modificado})
            }catch(error){
                console.log(error)
            }
        }
    },
    obtenerAdmin : (user) => {
        return async (dispatch,getState) => {
            try{
                // eslint-disable-next-line
                const admin = await axios.put("http://localhost:4000/api/users",{...user})
            }catch(error){
                console.log(error)
            }
        }
    },
    getPost : () => {
        return async (dispatch, getState) => {
            try{
                const post = await axios.get("http://localhost:4000/api/post")
                dispatch({type:"post", payload:post.data.response})
            }catch(error){
                console.log(error)
            }
        }
    },
    banedPost : (post) => {
        return async (dispatch, getState) => {
            console.log(post)
            try{
                const banedpost = await axios.delete(`http://localhost:4000/api/admin/post/${post}`)
                console.log(banedpost)
            }catch(error){
                console.log(error)
            }
        }
    },
    adminBan : (id) => {
        return async (dispatch, getState) => {
            try{
                const banuser = await axios.delete(`http://localhost:4000/api/users/${id}`)
                console.log(banuser)
            }catch(error){
                console.log(error)
            }
        }
    }
}

export default adminActions;