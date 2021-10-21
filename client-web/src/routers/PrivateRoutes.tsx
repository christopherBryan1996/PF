import { Route, Redirect } from 'react-router-dom';

import { connect } from "react-redux";

const PrivateRoutes = (props:any) => {

    if (props.auth === false) return <Redirect to={'/Login'} />

    return <Route {...props} />
}

interface mapStateToPropsTypes {
    auth:any
}


const mapStateToProps = (state:any) => {
    return {
        auth: state.auth.checking
    }
}

export default connect<mapStateToPropsTypes>(mapStateToProps)(PrivateRoutes);


