import React, { useState ,useEffect} from "react";
import {toast,ToastContainer} from 'react-toastify'
import {auth} from "../../firebase.js";
import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendSignInLinkToEmail } from "firebase/auth";
const Register = () => {
  const [email, setEmail] = useState("");
  let navigate=useNavigate();
  const { user } = useSelector((state) => ({ ...state }))
  useEffect(() => {
    if (user && user.token) {
        navigate('/');
    }
},[user])
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log('env -->' ,process.env.REACT_APP_REGISTER_REDIRECT_URL)
     console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config={
      // url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }
    await sendSignInLinkToEmail(auth, email, config);
    toast.success(`email is sent to ${email} .
    click the link to complete your registration`)
    // save user email in local storage
    window.localStorage.setItem('emailForRegistration', email)
    // clear email
    setEmail("")
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) =>
        {
          console.log(e.target.value);
          setEmail(e.target.value)}
        } 
        autoFocus
      />
      
      <button type="submit" className="btn btn-raised">
        Register/{email}
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {/* <ToastContainer/> */}
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;

