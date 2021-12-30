import { connect } from 'react-redux';
import postsActions from '../redux/actions/postsActions';
import Comments from '../components/Comments';
import { useEffect, useState } from "react";
import Toast from 'sweetalert2';


const Posts = (props) => {

    const token = props.user.token

    const [likeIcon, setLikeIcon] = useState(true)
    const [likePost, setLikePosts] = useState(props.post.like)
    const [likes, setLikes] = useState(props.post.like.length)
    console.log(props.post)

    const likePosts = async () => {
        setLikeIcon(false)
        if (!token) {
            Toast.fire({
                icon: 'error',
                title: "You need to be logged in to like"
            })
        } else {
            await props.likeDislikePost(token, props.post._id, props.user._id)
            .then(
                response =>{console.log(response)
                    setLikePosts(response.like)
                    setLikes(response.like.length)
                    // setLikes(response.like.includes(props.user._id) ? "❤️" : "🤍") 
                    
                })
            
        }
        setLikeIcon(true)
    };

    let like = likePost.includes(props.user._id) ? "❤️" : "🤍"
 

    

    

    return (
        <>
            <div className="CenterContent">
                <div className="ContenedorCenter">
                    <div className="ContenedorSecCenter">
                        <div className="ContenedorPublicCen">

                            <div className="ContainerTotalPublics">
                                <div className="publicContainerProfil">
                                    {/* {post.postImage && <img className="ContainerImgPublic" alt="hola" src={require(`../../images/${post.postImage}`)} />} */}
                                    <div className="publicProfilContainer">
                                        <div className="ProfilePublicTotal">
                                            <div></div>
                                            <p>{props.post.postTitle && props.post.postTitle}</p>
                                        </div>
                                        <div className="IconsPublicVoted">
                                            <button className="boton-like" onClick={(likeIcon ? likePosts : null)}>
                                                <p className="like"> {like}</p></button>
                                            <p>{likes}</p>
                                            {/* <p>300</p> */}
                                        </div>
                                    </div>

                                </div>
                                {/* ); */}

                                {/* : (
                                    <p>There is no post</p>
                                ) */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vertical-line"></div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.userData,
        posts: state.postsReducers.post
    }
}

const mapDispatchToProps = {
    getAllPosts: postsActions.getAllPosts,
    likeDislikePost: postsActions.likeDislikePost
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
// { <Comments comments={props.post.comments} postId={props.post._id} /> }