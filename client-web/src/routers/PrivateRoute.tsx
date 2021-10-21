import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props:any) {

  if (!props.isAuthenticated) return <Redirect to={"/Login"} />

  return <Route {...props} />

}

export default PrivateRoute;