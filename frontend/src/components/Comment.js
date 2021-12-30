import { connect } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

const Comment = (props) => {
    const token = localStorage.getItem('token')
    const inputValue = useRef()
    

    const [changeInput, setChangeInput] = useState(false)
    let validUser;
    props.user && (validUser = props.comment.userId._id === props.user._id)
    
    useEffect(() => {
        setChangeInput(false)
    },[props.render])


    const Toast = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((response) => {
            if (response.isConfirmed) {
            props.delete(props.postId, props.comment._id,token)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        }

        const userComment = 
    <div className="comentario-botones">
        {!changeInput 
        ? <p className="zona-comentario">{props.comment.comment}</p> 
        :   <>
                <input className="comentario-editar" type="text"  defaultValue={props.comment.comment} ref={inputValue} />
                <button className="boton-editar-check" onClick={()=> props.edit(props.comment._id, inputValue.current.value, token)}>✔️</button>
            </> }
            <div className="botones">
                <button onClick={()=>setChangeInput(!changeInput)}>✏️</button>
                <button onClick={Toast}>🗑️</button>
            </div>    
    </div>

    const validComment = validUser ? (userComment) : <p>{props.comment.comment}</p>

    return (
        <>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user,
    }
}

export default connect(mapStateToProps)(Comment);