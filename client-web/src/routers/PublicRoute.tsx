import { Route, Redirect } from 'react-router-dom';

function PublicRoute(props:any) {

  if (props.isAuthenticated) return <Redirect to={"/home"} />

  return <Route {...props} />

}
  
export default PublicRoute;