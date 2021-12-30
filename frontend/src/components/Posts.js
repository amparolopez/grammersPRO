import { connect } from "react-redux";
import postsActions from "../redux/actions/postsActions";
import { useState, useEffect } from "react";
import Toast from "sweetalert2";
import userActions from "../redux/actions/userActions";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
const Posts = (props) => {
  const token = props.user.token;
  const [likeIcon, setLikeIcon] = useState(true);
  const [likePost, setLikePosts] = useState(props.post.like);
  const [likes, setLikes] = useState(props.post.like.length);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    props.getUsers().then((res) => {
      setAllUsers(res.response);
    });
    // eslint-disable-next-line
  }, []);

  const likePosts = async () => {
    setLikeIcon(false);
    if (!token) {
      Toast.fire({
        icon: "error",
        title: "You need to be logged in to like",
      });
    } else {
      await props
        .likeDislikePost(token, props.post._id, props.user._id)
        .then((response) => {
          console.log(response);
          setLikePosts(response.like);
          setLikes(response.like.length);
          // setLikes(response.like.includes(props.user._id) ? "❤️" : "🤍")
        });
    }
    setLikeIcon(true);
  };

  let like = likePost.includes(props.user._id) ? "❤️" : "🤍";
  const userPost = allUsers.find((post) => post._id === props.post.user);
  console.log(userPost);
  return (
    <>
      {props.post.postImage && <img alt={props.post.postTitle} className="ContainerImgPublicPost" src={require(`../images/${props.post.postImage}`)} />}
      <div className="publicProfilContainer">
        <Link to={`/Post/${props.post._id}`} >
          <div className="ProfilePublicTotal">
            {userPost && <Avatar src={userPost.imgUrl} alt="profile" />}
            <p>{props.post.postTitle && props.post.postTitle}</p>
          </div>
        </Link>
        <div className="IconsPublicVoted">
          <button className="boton-like" onClick={likeIcon ? likePosts : null}>
            <p className="like"> {like}</p>
          </button>
          <p>{likes}</p>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducers.userData,
    posts: state.postsReducers.post,
  };
};

const mapDispatchToProps = {
  getAllPosts: postsActions.getAllPosts,
  likeDislikePost: postsActions.likeDislikePost,
  getUsers: userActions.getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
// { <Comments comments={props.post.comments} postId={props.post._id} /> }
