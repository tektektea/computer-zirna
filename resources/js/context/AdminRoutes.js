import React from "react";
import {Route,Redirect} from "react-router-dom";


const AdminRoute = ({ component: Component, ...rest }) => {

    const token = localStorage.getItem('token');

    const checkStaff=(props)=>{
        if(token){
            return <Component {...props} />
        }else {
            return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        }
    }
    React.useEffect(()=>{

    },[])
    return (
        <Route
            {...rest}
            render={props =>
                checkStaff(props)
            }
        />
    )
}
export default AdminRoute;
