import { FaRegBell, FaCloudUploadAlt, FaEarlybirds } from "react-icons/fa";
import { useState, useRef } from "react";
import { AiFillHeart, AiFillMessage, AiFillTag } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import {connect} from "react-redux";
import postsActions from "../../redux/actions/postsActions";
import {Link} from 'react-router-dom'

const Rigth = (props) => {
  const [open, setOpen] = useState(false);
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const postRef = useRef();
  const postTitleRef = useRef();
  const { postAPost, user } = props;

  // const uploadImage = (e) => {
  //   const selectedFile = e.target.files[0];
  //   // uploading asset to sanity
  //   if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
  //     setWrongImageType(false);
  //     client.assets
  //       .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
  //       .then((document) => {
  //         setImageAsset(document);
  //       })
  //       .catch((error) => {
  //         console.log('Upload failed:', error.message);
  //       });
  //   } else {
  //     setWrongImageType(true);
  //   }
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postAPost(postTitleRef.current.value,postRef.current.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="rigthUsers">
      <div className="ContainerTotalRigthUser">
        <div className="Searchs">
          {user ?
            <>
          <input
            placeholder="Search"
            className="inputSearch"
            type="text"
          ></input>
          <FaRegBell className="bell" />
          <FaCloudUploadAlt className="bell" onClick={handleClickOpen} />
            </>
            :
            <Link to="/Signup">Sign Up</Link>
        }
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
    user: state.userReducers.user
  };
};

const mapDispatchToProps = {
  postAPost: postsActions.postAPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Rigth);
