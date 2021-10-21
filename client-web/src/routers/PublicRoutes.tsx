import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

const PublicRoutes = (props:any) => {

    if (props.auth === false) return <Redirect to={'/home'} />

    return <Route {...props} />

};

interface mapStateToPropsTypes {
    auth:any
}

const mapStateToProps = (state:any) => {
    return {
        auth: state.auth.checking
    }
}

export default connect<mapStateToPropsTypes>(mapStateToProps)(PublicRoutes);