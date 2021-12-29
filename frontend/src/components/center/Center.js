import { AiFillMessage } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import postsActions from "../../redux/actions/postsActions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
// import Comments from '../Comments';
import Autito from "../../assets/ea34ea057fd0b05696faf2791b539d47.jpg"

const Center = (props) => {
  const [posts, setPosts] = useState([]);
  const [postsAux, setPostsAux] = useState([]);
  const { getAllPosts, user, userData, likeDislikePost } = props;
  // const [likesArray, setLikeArray] = useState(posts.like);
  // const [like, setLike] = useState(
  //   user && likesArray.find((like) => like.user === userData._id)
  // );
  // const handleLike = (postId) => {
  //   if (user) {
  //     likeDislikePost(postId, userData, like).then((res) => {
  //       setLikeArray(res.response);
  //       setLike(!like);
  //     });
  //   }
  // };

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res.response);
      setPostsAux(res.response);
    });
  }, []);

  const handleFilterNewest = () => {
    const postFilter = postsAux.sort((a, b) => {
      if (new Date(b.date) < new Date(a.date)) return -1;
      else if (new Date(b.date) > new Date(a.date)) return 1;
      else return 0;
    });
    setPosts(postFilter);
  };

  const handleFilterPopular = () => {
    const postFilter = postsAux.sort((a, b) => {
      if (b.like.length < a.like.length) return -1;
      else if (b.like.length > a.like.length) return 1;
      else return 0;
    });
    setPosts(postFilter);
  };

  const handleFilterFollowing = () => {
    const postFilter = postsAux.filter((post) => post.user === user);
  };
  console.log(props)
  return (
    <div className="CenterContent">
      <div className="ContenedorCenter">
        <div className="ContenedorSecCenter">
          <div className="ContenedorPublicCen">
            <div className="ContenedorFilerCent">
              <p>Feeds</p>
              <div>
                <p className="filtActiveCen">All</p>
                <p onClick={handleFilterFollowing}>Following</p>
                <p onClick={handleFilterNewest}>Newest</p>
                <p onClick={handleFilterPopular}>Popular</p>
              </div>
            </div>
            <div className="ContainerTotalPublics">
              {props.post ? (
                props.post.map((post, key) => {
                  return (
                    <>
                      <div className="publicContainerProfil" key={key}>
                        <img className="ContainerImgPublic" src={Autito}/>
                          {/* {post.postImage && post.postImage}{" "} */}
                        <div className="publicProfilContainer">
                          <div className="ProfilePublicTotal">
                            <div></div>
                            <p>{post.postTitle && post.postTitle}</p>
                          </div>
                          <div className="ProfilePublicTotal">
                            <p>{post.postText && post.postText}</p>
                          </div>
                          <div className="IconsPublicVoted">
                            {/* {like ? (
                              <AiFillHeart
                                style={{ color: "red", cursor: "pointer" }}
                                onClick={handleLike}
                              />
                            ) : (
                              <AiFillHeart
                                onClick={handleLike}
                                style={{ cursor: "pointer" }}
                              />
                            )}
                            <p>{likesArray ? likesArray : 0}</p> */}
                            <AiFillMessage />
                            <p>300</p>
                          </div>
                        </div>
                      </div>
                      
                    </>
                  );
                })
              ) : (
                <p>There is no post</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="vertical-line"></div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    post: state.postsReducers.post,
    user: state.userReducers.userLogg,
  };
};
const mapDispatchToProps = {
  getAllPosts: postsActions.getAllPosts,
  likeDislikePost: postsActions.likeDislikePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
