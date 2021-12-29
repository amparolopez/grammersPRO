import { connect } from "react-redux";
import { useState, useEffect } from "react";
import postsActions from "../../redux/actions/postsActions";

const Profile = (props) => {
  const [posts, setPosts] = useState([]);
  const [postsAux, setPostsAux] = useState([]);
  const { userData, getAllPosts, user } = props;
  const id = props.userData.id;
  
  useEffect(() => {
    getAllPosts().then((res) => {
      setPosts(res.response);
      setPostsAux(res.response);
    });
  }, []);
  console.log(userData);
  const postProfile = posts.filter((posts) => posts.user === id);
  return (
    <div className="CenterContent">
      <div className="ContenedorCenter">
        <div className="ContenedorSecCenter">
          {userData ? (
            <>
              <div className="ProfileRelativeUse">
                <div className="ProfileFondoImgAbsolute"></div>
                <div className="OcupadorDeEspacio"></div>
                <div className="ContenedorUserDates">
                  <div
                    className="ContainerUserImgNice"
                    style={{
                      backgroundImage: `url("${userData.imgUrl}")`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="ContainerDataUserNice">
                    <h1>{userData.name ? userData.name : userData.userName}</h1>
                    <p>{userData.job}</p>
                    <p>{userData.country}</p>
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
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </>
          ) : (
            <h2> You must be logged</h2>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
