import { FaRegBell, FaCloudUploadAlt, FaEarlybirds } from "react-icons/fa";
import { useState, useRef } from "react";
import { AiFillHeart, AiFillMessage, AiFillTag } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import { connect } from "react-redux";
import postsActions from "../../redux/actions/postsActions";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";
import userActions from "../../redux/actions/userActions";

const Rigth = (props) => {
  const [open, setOpen] = useState(false);
  const [postState, setPostState] = useState();
  const postRef = useRef();
  const postTitleRef = useRef();
  const [file, setFile] = useState(null);
  const { postAPost, userData, user } = props;

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
      user: userData.id,
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

  return (
    <div className="rigthUsers">
      <div className="ContainerTotalRigthUser">
        <div className="Searchs">
          {userData.token ? (
            <>
              <input
                placeholder="Search"
                className="inputSearch"
                type="text"
              ></input>
              <FaRegBell className="bell" />
              <FaCloudUploadAlt className="bell" onClick={handleClickOpen} />
              <button onClick={() => props.logOut()}>Log Out</button>
            </>
          ) : (
            <h1>Sign In</h1>
          )}
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className="postLabel">Create a post</DialogTitle>
          <DialogContent style={{ display: "flex" }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              style={{ marginRight: "2rem", marginTop: "1rem" }}
            />
            <form onSubmit={(e) => handleSubmit(e)}>
              <TextField
                label="Title"
                inputRef={postTitleRef}
                id="standard-multiline-static"
                variant="standard"
              />
              <TextField
                label="What are you gonna tell us?"
                inputRef={postRef}
                id="standard-multiline-static"
                multiline
                rows={4}
                variant="standard"
                className="postInput"
              />
              <Button variant="contained" component="label">
                Upload File
                <input
                  type="file"
                  hidden
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Button>
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
          <div className="userFollow">
            <div className="imgText">
              <FaEarlybirds className="userImg" />
              <div className="userText">
                <h4>Pajarito Ito</h4>
                <h6 className="text">@Pajarito.Ito</h6>
              </div>
            </div>
            <button className="btn-Follow">Follow</button>
          </div>
          <div className="userFollow">
            <div className="imgText">
              <FaEarlybirds className="userImg" />
              <div className="userText">
                <h4>Pajarito Ito</h4>
                <h6 className="text">@Pajarito.Ito</h6>
              </div>
            </div>
            <button className="btn-Follow">Follow</button>
          </div>
          <div className="userFollow">
            <div className="imgText">
              <FaEarlybirds className="userImg" />
              <div className="userText">
                <h4>Pajarito Ito</h4>
                <h6 className="text">@Pajarito.Ito</h6>
              </div>
            </div>
            <button className="btn-Follow">Follow</button>
          </div>
        </div>
        <div className="horizontal-line"></div>
        <div className="latestPost">
          <h4>Latest Post Activity</h4>

          <div>
            <div className="imgActivity">
              <div className="cardPost">
                <div className="cardActivity">
                  <div className="ActivityImg"></div>
                  <div className="cardText">
                    <div className="cardIcon">
                      <h4 className="minimalStair">Minimalist Stairs</h4>
                      <div className="iconActivity">
                        <AiFillHeart />
                        <h6 className="text">12</h6>
                        <AiFillMessage />
                        <h6 className="text">9</h6>
                        <AiFillTag />
                        <h6 className="text">3</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="textAllPost">See All Post</h4>
                </div>
              </div>
            </div>
          </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Rigth);
