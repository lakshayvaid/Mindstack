
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
};

export function PrivateRoute({children}:PrivateRouteProps){

    const token=localStorage.getItem("token");

    if(token){
        return <> {children} </>;
  
    }
    else{
        return <Navigate to="/signup" replace/>
    }
 

}