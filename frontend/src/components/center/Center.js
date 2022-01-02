import Posts from "../Posts";
import postsActions from "../../redux/actions/postsActions";
import { connect } from "react-redux";
import { useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Avatar } from "@mui/material";
import Swal from "sweetalert2";
import { FaCloudUploadAlt } from "react-icons/fa";

const Center = (props) => {
  const [posts, setPosts] = useState([]);
  const [postsAux, setPostsAux] = useState([]);
  const [open, setOpen] = useState(false);
  const postRef = useRef();
  const postTitleRef = useRef();
  const postImg = useRef();
  const { getAllPosts, postAPost, userData } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title: postTitleRef.current.value,
      body: postRef.current.value,
      user: userData._id,
      imageUrl: postImg.current.value,
    };
    postAPost(newPost).then((res) => {
      if (res.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          text: "Successfully Posted!",
          timer: 1500,
        });
        getAllPosts().then((res) => {
          setPosts(res.response);
          setPostsAux(res.response);
        });
        handleClose();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          text: "Error trying to post",
          timer: 1500,
        });
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res.response);
      setPostsAux(res.response);
    });
    // eslint-disable-next-line
  }, []);
  console.log(posts)
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
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="postLabel">Create a post</DialogTitle>
        <DialogContent style={{ display: "flex" }}>
          <Avatar
            alt={userData.username && userData.username}
            src={userData.imgUrl}
            style={{ marginRight: "2rem", marginTop: "1rem" }}
          />
          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              label="Title"
              inputRef={postTitleRef}
              id="standard-multiline-static"
              variant="standard"
              required
            />
            <TextField
              label="What are you gonna tell us?"
              inputRef={postRef}
              id="standard-multiline-static"
              multiline
              rows={4}
              variant="standard"
              className="postInput"
              required
            />
            <TextField
              label="Image URL"
              inputRef={postImg}
              variant="standard"
              required
            />
            <DialogActions>
              <button onClick={handleClose} className="btn-Follow">
                Cancel
              </button>
              <button type="submit" className="btn-Follow">
                Public
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <div className="CenterContent">
        <div className="ContenedorCenter">
          <div className="ContenedorSecCenter">
            <div className="ContenedorPublicCen">
              <div className="ContenedorFilerCent">
                {userData.token && (
                  <FaCloudUploadAlt
                    className="bell"
                    onClick={handleClickOpen}
                  />
                )}
                <p>Feeds</p>
                <div>
                  <p
                    onClick={() => setPosts(postsAux)}
                    className="filtActiveCen"
                  >
                    All
                  </p>
                  <p onClick={handleFilterNewest}>Newest</p>
                  <p onClick={handleFilterPopular}>Popular</p>
                </div>
              </div>
              <div className="ContainerTotalPublics">
                {posts &&
                  posts.map((post, key) => {
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
    userData: state.userReducers.userData,
  };
};
const mapDispatchToProps = {
  getAllPosts: postsActions.getAllPosts,
  likeDislikePost: postsActions.likeDislikePost,
  postAPost: postsActions.postAPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Center);
