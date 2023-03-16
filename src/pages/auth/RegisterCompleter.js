import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { getIdTokenResult, signInWithEmailLink, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios';
import { createOrUpdateUser } from "../../functions/auth.js";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => ({ ...state }))
  let dispatch = useDispatch();
  let navigate=useNavigate();
  useEffect(() => {
    // console.log(window.localStorage.getItem("emailForRegistration"))
    // console.log(window.location.href)
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if(!email || !password){
      toast.error("email and password are required")
      return ;
    }
    if(password.length<6){
      toast.error("password must be at least 6 characters")
      return ;
    }
    try{
        const result=await signInWithEmailLink(auth,email,window.location.href);
        console.log("RESULT" ,result)
        if(result.user.emailVerified){
            // update the password and remove user email from local storage
            window.localStorage.removeItem('emailForRegistration')
            // get user id token
            let user=auth.currentUser
            await updatePassword(user,password)
            const idTokenResult=await getIdTokenResult(user)
            // redux
            console.log('user',user)
            console.log('tojen',idTokenResult)
            //redirect
            createOrUpdateUser(idTokenResult.token).then((res)=>{
              dispatch({
              type: 'LOGGED_IN_USER',
              payload :{
                name : res.data.name,
                email : res.data.email,
                token :idTokenResult.token,
                role : res.data.role,
                _id : res.data._id,
              },
            })
          })
          .catch();
            navigate("/");
        }
    }
    catch(error) {
        console.log(error);
        toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />

      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoComplete="username"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-primary">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;