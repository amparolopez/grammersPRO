import {connect} from 'react-redux'

const Browser = () => {
    return (
        <div className="CenterContent">
            <div className="ContenedorCenter">
                <div className="ContenedorSecCenter ScrollBarFollorProfile">
                    <div className="ContenedorFollowProfile">
                        <div className="ProfileImgFollow"></div>
                        <div className="ContainerProfileFollowData">
                            <h2>Dean Scheiner</h2>
                            <p>@DeanScheiner</p>
                        </div>
                        <p className="buttonFollowProfile">Follow</p>
                    </div>
                    
                </div>
            </div>
            <div className="vertical-line"></div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        usersArray: state.userReducers.usersArray
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Browser)
