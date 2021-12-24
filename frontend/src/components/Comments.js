import { connect } from 'react-redux';
import postsActions from '../redux/actions/postsActions';
import Comment from './Comment';
import { useState, useRef } from 'react';
import Swal from 'sweetalert2';



const Comments = (props) => {

    const token = localStorage.getItem('token')
    const [render, setRender] = useState (false)
    const [comments, setComments] = useState (props.comments)
    const inputValue = useRef()


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
      }),


    const deleteComment = (postId, commentId, token) => {
        props.deleteComment(postId, commentId, token)
        .then(response => {
            if (response.success)
            setComments(comments.filter(comment => comment._id !== commentId ))
            else throw new Error()
        }) .catch (error)
        {console.log(error)}
    },

    const editComment = (commentId, comment, token) => {
        props.editComment(commentId, comment, token)
        .then((response) => {
            if (response.success){
                comment.forEach(commentAct => {
                    if (commentAct._id === commentId){
                        commentAct.comment = comment
                    }
                }) 
                setComments(comments)
                setRender(!render)
            }   
        } ) .catch(error)
        {console.log(error)}
    },

    const sendHandler = () => {
        const commentValue = inputValue.current.value

        props.addComment(props.postId, commentValue, token)
        .then( res  => {
            setComments(res.response.data.response)
            commentValue = ""
        }) .catch(error)
        {console.log(error)}
    }, 
    
    const handleKeyPress = (e) => {
        if(e.key === "enter"){
            sendHandler
        }       
    }

    const warning = () => {
        Toast.fire({
            icon: "error",
            title: "You need logged for comment"
        })
    },

    return (
        <>
        {comments.map((comment, index) => <Comment key={index} comment={comment} delete={deleteComment} edit={editComment} postId={props.postId} render={render}/>)}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user,
    }
}

const mapDispatchToProps = {
    addComment: postsActions.addComment,
    editComment: postsActions.editComment,
    deleteComment: postsActions.deleteComment
}

export default connect(mapDispatchToProps, mapStateToProps)(Comments);