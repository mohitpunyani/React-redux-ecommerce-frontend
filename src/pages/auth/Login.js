import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { auth } from '../../firebase.js'
import { getIdTokenResult, sendSignInLinkToEmail } from 'firebase/auth'
import { Button } from 'antd'
import { MailOutlined, GoogleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { googleAuthProvider } from '../../firebase.js'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { redirect } from 'react-router-dom'
import { createOrUpdateUser } from '../../functions/auth.js'

const Login = ({history}) => {
  const [email, setEmail] = useState('mohitpunyani916@gmail.com')
  const [password, setPassword] = useState('mohit916@')
  const [loading, setLoading] = useState(false)
  const [size, setSize] = useState('large')
  const { user } = useSelector((state) => ({ ...state }))
  let dispatch=useDispatch();
  let navigate=useNavigate();
  const roleBasedRedirect = (res) => {
    // check if intended
    
    if (res.data.role === "admin") {
      navigate("/admin/dashboard")
      // <Navigate to="/admin/dashboard" replace={true} />
    } else {
      // <Navigate to="/admin/dashboard" replace={true} />
      navigate("/user/history")
    }
  }
  useEffect(() => {
    if (user && user.token) {
      navigate('/')
    }
  }, [user])

  //  const roleBasedRedirect = (res) => {
  //   if (res.data.role === "admin") {
  //     navigate("/admin/dashboard")
  //     // <Navigate to="/admin/dashboard" replace={true} />
  //   } else {
  //     // <Navigate to="/admin/dashboard" replace={true} />
  //     navigate("/user/history")
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.table(email, password)
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log(result)
      // dispatch from redux store
      const { user } = result
      const idTokenResult = await getIdTokenResult(user)
      // console.log(user, 'user', idTokenResult, 'idTokenResult')
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err))

    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    }
  }
  const googleLogin = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        const { user } = result
        const idTokenResult = await getIdTokenResult(user)
        console.log(user, 'user', idTokenResult, 'idTokenResult')
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            })
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err))
        // navigate('/')
        // role based redirect
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.message)
      })
  }
  const LoginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => {
            console.log(e.target.value)
            setEmail(e.target.value)
          }}
          autoFocus
          placeholder="your email"
        />
      </div>
      <div className="form-grpup">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => {
            console.log(e.target.value)
            setPassword(e.target.value)
          }}
          placeholder="Enter your password"
          autoFocus
        />
      </div>

      <br />
      <Button
        type="primary"
        shape="round"
        icon={<MailOutlined />}
        size={size}
        onClick={handleSubmit}
        className="mb-3"
        block
        disabled={!email || password.length < 6}
      >
        Login with email/password
      </Button>

      <Button
        type="primary"
        danger
        shape="round"
        icon={<GoogleOutlined />}
        size={size}
        onClick={googleLogin}
        className="mb-3"
        block
      >
        Login with Google
      </Button>
    </form>
  )

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {LoginForm()}
          <Link to="/forgot/password" className="float-end text-danger">
            Forgotpassword
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
