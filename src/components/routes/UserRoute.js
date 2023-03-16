import React from "react";
import LoadingToRedirect from "./LoadingToRedirect.js";
import {Link,Route} from "react-router-dom"
import { useSelector } from "react-redux";
const UserRoute=({children, ...rest})=>{
    const {user}=useSelector((state)=>({... state}));
    return user && user.token ? (
        <Route {...rest} />
    ):(
        <LoadingToRedirect/>
    )
    
}
export default UserRoute;