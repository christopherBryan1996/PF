import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props:any) {

  console.log("AUTH", props.isAuthenticated)


  if (!props.isAuthenticated) return <Redirect to={"/Login"} />
 
  

  return <Route {...props} />

}

export default PrivateRoute;