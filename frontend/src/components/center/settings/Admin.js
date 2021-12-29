import { connect } from "react-redux";
import adminActions from "../../../redux/actions/adminActions";
import {useEffect, useState} from "react"

const Admin = (props) => {

    const [email, setEmail] = useState()
    const [admin, setAdmin] = useState()
    const [post, setPost] = useState()
    const [emailpost, setEmailPost] = useState(props.users.length > 0 ? props.users[0].id : null)

    useEffect(() =>{
        props.fetchUsers()
        props.fetchPost()
    },[])

    console.log(props.users)
    
    const banUser = (e) => {
        e.preventDefault()
        props.adminBan(email)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const admins = {
            idUser : admin,
            userAdmin : true
        }
        props.obtenerAdmin(admins)
    }
    const banPost=(e)=> {
        e.preventDefault()
        props.banedPost(post)
    }
    console.log(props.posts)
    return (
        <>
        <div className="AdminUserDeleteContent">
            <h1>Ban User</h1>
            <div>
                <form onSubmit={banUser}>
                    <select onChange={(e) => setEmail(e.target.value)}>
                        <option>Users</option>
                        {props.users.map((user, index) => {
                            return(
                                <option key={index} value={user.id}>{user.email}</option>
                                )
                            })}
                    </select>
                    <button type="submit">banUser</button>
                </form>
            </div>
            <div className="AdminUserDelImg">
            {props.users.map(user => {
                return(
                    email === user.id ? <img src={user.url}/> : null
                    )
                })}
            </div>
        </div>
            <h2>ban post</h2>
            <form onSubmit={banPost}>
                <select onChange={(e) => setEmailPost(e.target.value)}>
                    {props.users.map((user,index)=> {
                        return(<option key={index} value={user.id}>{user.email}</option>)
                    } )
                }
                </select>
                <select onClick={(e)=> setPost(e.target.value)}>
                    {props.posts.map((post, index)=> {
                        return(emailpost === post.user ? <option key={index} value={post._id}>{post._id}</option> : null)
                    })
                }
                </select>
                <button type="submit">banPost</button>
            </form>
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
    fetchPost : adminActions.getPost,
    banedPost : adminActions.banedPost,
    adminBan : adminActions.adminBan
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
