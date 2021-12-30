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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Rigth = (props) => {
  const [open, setOpen] = useState(false);
  const [postState, setPostState] = useState();
  const [lastPost, setLastPost] = useState([]);
  const [userSuggest, setUserSuggest] = useState();
  const [allUsers, setAllUsers] = useState();
  const postRef = useRef();
  const postTitleRef = useRef();
  const [file, setFile] = useState(null);
  const { postAPost, userData, getAllPosts, getUsers } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    const newPost = {
      title: postTitleRef.current.value,
      body: postRef.current.value,
      user: userData._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("http://localhost:4000/api/upload", data);
      } catch (err) {}
    }
    postAPost(newPost).then((res) => setPostState(res.success));
    console.log(postState);
    if (postState) {
      console.log("su post se a subido exitosamente");
      handleClose();
    } else {
      console.log("error al subir post");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeSelectedImage = () => {
    setFile();
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
                <div style={{ display: "flex", width: "100%" }}>
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
              <Link to={"/Signup"}>Sign Up</Link>
              <Link to={"/Signin"}>Sign In</Link>
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
              <Button variant="contained" component="label" color="secondary">
                <AiFillFolderAdd />
                Upload File
                <input
                  type="file"
                  hidden
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Button>
              {file && (
                <>
                  <img
                    alt="uploaded"
                    src={URL.createObjectURL(file)}
                    className="ContainerImgPublic"
                  />
                  <IconButton
                    onClick={removeSelectedImage}
                    style={{ color: "red" }}
                  >
                    <AiTwotoneDelete />
                    delete
                  </IconButton>
                </>
              )}
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
                  <button className="btn-Follow">Follow</button>
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
                    {/* {lastPost.postImage && (
                      <img
                        alt={lastPost.postTitle}
                        // src={require(`../../images/${lastPost.postImage}`)}
                        className="ActivityImg"
                      ></img>
                    )} */}
                    <div className="cardText">
                      <div className="cardIcon">
                        <h4 className="minimalStair">{lastPost.postTitle}</h4>
                        <div className="iconActivity">
                          <AiFillHeart />
                          <h6 className="text">{lastPost.comment}</h6>
                          <AiFillMessage />
                          <h6 className="text">{lastPost.comment}</h6> */}
                        </div>
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
