import { connect } from "react-redux";
import adminActions from "../../../redux/actions/adminActions";
import {useEffect, useState} from "react"

const Admin = (props) => {

    const [email, setEmail] = useState()
    const [admin, setAdmin] = useState()

    useEffect(() =>{
        props.fetchUsers()
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
                <option>Id post</option>
            </select>
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
        users: state.adminReducer.users
    }
}
const mapDispatchToProps = {
    fetchUsers : adminActions.getUsers,
    obtenerAdmin : adminActions.obtenerAdmin
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
