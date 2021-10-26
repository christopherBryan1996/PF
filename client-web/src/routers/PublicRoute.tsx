import { Route, Redirect } from 'react-router-dom';

function PublicRoute(props:any) {

  console.log("AUTH",props.isAuthenticated)

  if (props.isAuthenticated) return <Redirect to={"/home"} />

  return <Route {...props} />

}
  
export default PublicRoute;