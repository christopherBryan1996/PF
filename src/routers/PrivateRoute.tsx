import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props:any) {

  console.log("AUTH", props.isAuthenticated)


  if (!props.isAuthenticated) return <Redirect to={"/Login"} />
  if (!props.isAdmin) return <Redirect to={"/404"} />
  

  return <Route {...props} />

}

export default PrivateRoute;