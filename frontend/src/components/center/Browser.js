import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import userActions from "../../redux/actions/userActions";
import { Link } from "react-router-dom";

const Browser = (props) => {
  const [users, setUsers] = useState([]);
  const { getUsers } = props;

  useEffect(() => {
    getUsers().then((res) =>
      setUsers(res.response.slice(10, res.response.length))
    );
  }, []);

  return (
    <div className="CenterContent">
      <div className="ContenedorCenter">
        <div className="ContenedorSecCenter ScrollBarFollorProfile">
          {users && users.length > 0 ? (
            users.map((user, key) => {
              return (
                <div className="ContenedorFollowProfile" key={key}>
                  <Link to={`/Profile/${user._id}`} style={{display:"flex", textDecoration:"none"}}>
                    <Avatar
                      alt={user.username && user.username}
                      src={user.imgUrl}
                    />
                    <div className="ContainerProfileFollowData">
                      <h2>{user.name && user.name}</h2>
                      <p>{user.userName + " " + user.lastName}</p>
                    </div>
                  </Link>

                  <p className="buttonFollowProfile">Follow</p>
                </div>
              );
            })
          ) : (
            <h2>no users</h2>
          )}
        </div>
      </div>
      <div className="vertical-line"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    usersArray: state.userReducers.usersArray,
  };
};

const mapDispatchToProps = {
  getUsers: userActions.getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Browser);
