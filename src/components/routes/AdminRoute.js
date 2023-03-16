import React ,{useState,useEffect} from "react";
import LoadingToRedirect from "./LoadingToRedirect.js";
import {Link,Route} from "react-router-dom"
import { useSelector } from "react-redux";
import { currentAdmin } from "../../functions/auth.js";
const AdminRoute=({children, ...rest})=>{
    const {user}=useSelector((state)=>({... state}));
    const [ok,setOk]=useState(false);
    useEffect(()=>{
        if(user && user.token){
            currentAdmin(user.token).then(res=>{
                console.log('Current admin res',res);
                setOk(true);
            }).catch(err=>{
                console.log('admin route err',err)
                setOk(false);
            })
        }
    },[user])
    return ok ? (
        <Route {...rest} />
    ):(
        // <h1 className="text-danger">Loading...</h1>
        <LoadingToRedirect/>
    )
    
}
export default AdminRoute;