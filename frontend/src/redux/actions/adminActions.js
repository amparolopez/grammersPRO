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
                        url: user.imgUrl
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
    
}

export default adminActions;