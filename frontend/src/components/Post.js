import Left from "./left/Left";
import Rigth from "./rigth/Rigth";
import postsActions from "../redux/actions/postsActions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import userActions from "../redux/actions/userActions";
import { Avatar } from "@mui/material";

const Post = (props) => {
  const [posts, setPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const { getAllPosts, getUsers } = props;
  const id = props.params.id;

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res.response);
    });
    getUsers().then((res) => {
        setAllUsers(res.response);
      });
      // eslint-disable-next-line
  }, []);

  const post = posts.find((post) => post._id === id);
  const userPost = allUsers.find(user => user._id && user._id === post.user)
  
  return (
    <div className="containerHome">
      <Left />
      <div className="CenterContent">
        <div className="ContenedorCenter">
          <div className="ContenedorSecCenter">
            {post && (
              <>
              {post.postImage && <img className="ContainerImgPublicPost" src={post.postImage} alt={post.postTitle} />}
              {userPost && <Avatar src={userPost.imgUrl} alt={userPost.email}/>}
              {userPost && <h5>Author: {userPost.userName+' '+userPost.lastName}</h5>}
                <h2 className="titlePost" >{post.postTitle}</h2>
                <p className="textStyles" >{post.postText}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <Rigth />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    posts: state.postsReducers.post,
    user: state.userReducers.userData,
  };
};
const mapDispatchToProps = {
  getAllPosts: postsActions.getAllPosts,
  getUsers: userActions.getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
