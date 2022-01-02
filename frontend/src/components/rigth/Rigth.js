import {  FaCloudUploadAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { AiFillHeart, AiFillMessage } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import { connect } from "react-redux";
import postsActions from "../../redux/actions/postsActions";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import userActions from "../../redux/actions/userActions";
import { Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const Rigth = (props) => {
  const [open, setOpen] = useState(false);
  const [postState, setPostState] = useState();
  const [lastPost, setLastPost] = useState([]);
  const [userSuggest, setUserSuggest] = useState();
  const [allUsers, setAllUsers] = useState();
  const postRef = useRef();
  const postTitleRef = useRef();
  const postImg = useRef();
  const { postAPost, userData, getAllPosts, getUsers } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title: postTitleRef.current.value,
      body: postRef.current.value,
      user: userData._id,
      imageUrl: postImg.current.value
    }
    postAPost(newPost).then((res) => setPostState(res.success));
    console.log(postState);
    if (postState) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Successfully Posted!', 
        timer: 1500,
      })
      handleClose();
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        text: 'Error trying to post', 
        timer: 1500,
      })
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllPosts().then((res) => {
      const lastPostes = res.response[res.response.length - 1];
      setLastPost(lastPostes);
    });
    getUsers().then((res) => {
      setAllUsers(res.response);
      setUserSuggest(res.response.slice(0, 3));
    });
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  function handleChange(e) {
    const idUser = allUsers.find((user) => user.email === e.target.innerText);
    navigate(`/Profile/${idUser._id}`);
  }
  return (
    <div className="rigthUsers">
      <div className="ContainerTotalRigthUser">
        <div className="Searchs">
          {userData.token ? (
            <>
              {allUsers && (
                <div style={{ display: "flex", width: "100%", alignItems: "flex-end" }}>
                  <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    fullWidth
                    onChange={(e) => handleChange(e)}
                    options={allUsers.map((option) => option.email)}
                    renderInput={(user, key) => (
                      <TextField {...user} key={key} label="Search users" />
                    )}
                  />
                  <FaCloudUploadAlt
                    className="bell"
                    onClick={handleClickOpen}
                  />
                </div>
              )}
            </>
          ) : (
            <div>
            </div>
          )}
        </div>
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
        <div className="Suggestions">
          <h3>Suggestions For You</h3>
          <Link to="/Browser">See All</Link>
        </div>
        <div className="userContainer">
          {userSuggest &&
            userSuggest.map((user, key) => {
              return (
                <div className="userFollow" key={key}>
                  <div className="imgText">
                    <Link
                      to={`/Profile/${user._id}`}
                      style={{ display: "flex", textDecoration: "none" }}
                    >
                      <Avatar
                        alt={user.username && user.username}
                        src={user.imgUrl}
                        className="userImg"
                      />
                      <div className="userText">
                        <h4>{user.userName + " " + user.lastName}</h4>
                        <h6 className="text">{user.email}</h6>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="horizontal-line"></div>
        <div className="latestPost">
          <h4>Latest Post Activity</h4>
          {lastPost && (
            <div>
              <div className="imgActivity">
                <div className="cardPost">
                  <div className="cardActivity">
                      {lastPost.postImage && <img alt={lastPost.postTitle} className="ActivityImg" src={lastPost.postImage} />}
                    <div className="cardText">
                      <div className="cardIcon">
                        <h4 className="minimalStair">{lastPost.postTitle}</h4>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link to="/" className="textAllPost">
                      See All Post
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="InfoRigthApp">
        <h4>About - Help - Terms - Popular - Language</h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userReducers.userData,
  };
};

const mapDispatchToProps = {
  postAPost: postsActions.postAPost,
  logOut: userActions.logOut,
  getAllPosts: postsActions.getAllPosts,
  getUsers: userActions.getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rigth);