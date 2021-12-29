import { connect } from "react-redux";
import adminActions from "../../../redux/actions/adminActions";
import {useEffect, useState} from "react"

const Admin = (props) => {

    const [email, setEmail] = useState()
    const [admin, setAdmin] = useState()
    const [post, setPost] = useState()

    useEffect(() =>{
        props.fetchUsers()
        props.fetchPost()
    },[])

    console.log(props.users)
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const admins = {
            idUser : admin,
            userAdmin : true
        }
        props.obtenerAdmin(admins)
    }
    console.log(props.posts)
    return (
        <>
            <h1>ban user for bad behavior</h1>
            <select onChange={(e) => setEmail(e.target.value)}>
                <option>Users</option>
                {props.users.map((user, index) => {
                    return(
                        <option key={index} value={user.email}>{user.email}</option>
                    )
                })}
            </select>
            {props.users.map(user => {
                return(
                    email === user.email ? <img src={user.url}/> : null
                )
            })}
            <h2>ban post</h2>
            <select>
                {props.posts.map((post, index)=> {
                    return(<option key={index} value={post._id}>{post._id}</option>)
                })
            }
            </select>
            {/* <select>
                {props.posts.map((post)=> {

                    <option>Id post</option>
                } )
            }
            </select> */}
            <div>Foto Post Select</div>
            <h3>Change the rol user</h3>
            <form onSubmit={handleSubmit}>
                <select onChange={(e) => setAdmin(e.target.value)}>
                    {props.users.map((user, index) => {
                        return(
                            <option key={index} value={user.email}>{user.email}</option>
                        )
                    })}
                </select>
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}
const mapStateToProps = (state) =>{
    return{
        users: state.adminReducer.users,
        posts: state.adminReducer.post
    }
}
const mapDispatchToProps = {
    fetchUsers : adminActions.getUsers,
    obtenerAdmin : adminActions.obtenerAdmin,
    fetchPost : adminActions.getPost
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
