import Posts from "../Posts";
import postsActions from "../../redux/actions/postsActions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const Center = (props) => {
  const [posts, setPosts] = useState([]);
  const [postsAux, setPostsAux] = useState([]);
  const { getAllPosts } = props;

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
    const postFilter = postsAux.filter((post) => post.user === props.user);
  };

  return (
    <>
      <div className="CenterContent">
        <div className="ContenedorCenter">
          <div className="ContenedorSecCenter">
            <div className="ContenedorPublicCen">
              <div className="ContenedorFilerCent">
                <p>Feeds</p>
                <div>
                  <p
                    onClick={() => setPosts(postsAux)}
                    className="filtActiveCen"
                  >
                    All
                  </p>
                  <p onClick={handleFilterFollowing}>Following</p>
                  <p onClick={handleFilterNewest}>Newest</p>
                  <p onClick={handleFilterPopular}>Popular</p>
                </div>
              </div>
              <div className="ContainerTotalPublics">
                {props.posts.map((post, key) => {
                  return <Posts post={post} key={key} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="vertical-line"></div>
      </div>
    </>
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
  likeDislikePost: postsActions.likeDislikePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
