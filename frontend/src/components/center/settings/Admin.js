import { connect } from "react-redux";
import adminActions from "../../../redux/actions/adminActions";
import {useEffect, useState} from "react"
import {BsFillPersonCheckFill}  from "react-icons/bs";
import {BsFillBookmarkXFill}  from "react-icons/bs";
import {BsFillPersonXFill}  from "react-icons/bs";
const Swal = require('sweetalert2');

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
    
    const banUser = async(e) => {
        e.preventDefault()
        const response = await props.adminBan(email)
        if(response.success){
            props.fetchUsers()
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })

                Toast.fire({
                icon: 'success',
                title: 'banned user'
})
        }
    }

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const admins = {
            idUser : admin,
            userAdmin : true
        }
        const response = await props.obtenerAdmin(admins)
        if(response.success){
            props.fetchUsers()
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Successful Admin'
              })
        }
    }
    const banPost= async(e)=> {
        e.preventDefault()
        const response = await props.banedPost(post)
            if(response.success){
                props.fetchPost()
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'banned post'
                  })
            }
    }
    console.log(props.posts)
    return (
        <>
            <div className="AdminUserDeleteContent">
                <h1>Change the rol user</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <select onChange={(e) => setAdmin(e.target.value)}>
                            <option>Users</option>
                            {props.users.map((user, index) => {
                                return(
                                    <option key={index} value={user.email}>{user.email}</option>
                                )
                            })}
                        </select>
                        <button type="submit" class="noselect"><span class='text'>Change</span><span class="icon"><BsFillPersonCheckFill /></span></button>
                    </form>
                </div>
                <div className="AdminUserDelImg">
                {props.users.map(user => {
                    return(
                        admin === user.email ? <img src={user.url}/> : null
                        )
                    })}
                </div>
            </div>
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
                        <button type="submit" class="noselect"><span class='text'>Ban</span><span class="icon"><BsFillPersonXFill /></span></button>
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
            <div className="AdminUserDeleteContent">
                <h1>ban post</h1>
                <div>
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
                        <button type="submit" class="noselect"><span class='text'>Ban Post</span><span class="icon"><BsFillBookmarkXFill /></span></button>
                    </form>
                </div>
                <div className="AdminUserDelImg">
                {props.posts.map(posts => {
                    return(
                        post === posts._id ? <img src={require(`../../../images/${posts.postImage}`)}/> : null
                        )
                    })}
                </div>
            </div>
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
