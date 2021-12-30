import { connect } from "react-redux";
import { useState, useEffect } from "react";
import postsActions from "../../redux/actions/postsActions";
import { useParams } from "react-router-dom";
import userActions from "../../redux/actions/userActions";

const Profile = (props) => {
  const [posts, setPosts] = useState([]);
  const [postsAux, setPostsAux] = useState([]);
  const [users, setUsers] = useState([]);
  const { getAllPosts, getUsers } = props;
  let { id } = useParams();

  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res.response);
      setPostsAux(res.response);
    });
    getUsers().then((res) =>
      setUsers(res.response)
    );
  }, []);
console.log(posts)
  let userProfile = users.find((user) => user._id === id);
  const postProfile = posts.filter((posts) => posts.user === id);

  return (
    <div className="CenterContent">
      <div className="ContenedorCenter">
        <div className="ContenedorSecCenter">
          {userProfile ? (
            <>
              <div className="ProfileRelativeUse">
                <div className="ProfileFondoImgAbsolute"></div>
                <div className="OcupadorDeEspacio"></div>
                <div className="ContenedorUserDates">
                  <div
                    className="ContainerUserImgNice"
                    style={{
                      backgroundImage: `url("${userProfile.imgUrl}")`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="ContainerDataUserNice">
                    <h1>
                      {userProfile.name
                        ? userProfile.name
                        : userProfile.userName}
                    </h1>
                    <p>{userProfile.job}</p>
                    <p>{userProfile.country}</p>
                  </div>
                </div>
                <div className="ContainerStaticsUser">
                  <div className="OcupadorDeEspacioVTwo"></div>
                  <div className="EstatisFollowerAndPost">
                    <div className="ContenedorEstadisticasDeTodo">
                      <h2>{postProfile.length}</h2>
                      <p>Post</p>
                    </div>
                    <div className="vertical-lines"></div>
                    <div className="ContenedorEstadisticasDeTodo">
                      <h2>256</h2>
                      <p>Follower</p>
                    </div>
                    <div className="vertical-lines"></div>
                    <div className="ContenedorEstadisticasDeTodo">
                      <h2>543</h2>
                      <p>Following</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="horizontal-line"></div>
              <div className="PostUserSolari">
                {postProfile &&
                  postProfile.map((post) => {
                    return <h3>post</h3>;
                  })}
              </div>
            </>
          ) : (
            <h2> This user doesnt exist</h2>
          )}
        </div>
      </div>
      <div className="vertical-line"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userReducers.userData,
  };
};

const mapDispatchToProps = {
  getAllPosts: postsActions.getAllPosts,
  getUsers: userActions.getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
