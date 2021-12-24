import { connect } from 'react-redux';
import postsActions from '../redux/actions/postsActions';
import Comments from '../components/Comments';

const Posts = (props) => {

    return (
        <>
        <Comments comments={props.post.comments} postId={props.post._id}/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducers.user,
        post: state.postsReducers.post
    }
}

const mapDispatchToProps= {
    getAllPosts: postsActions.getAllPosts,
    likeDislikePost: postsActions.likeDislikePost
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);