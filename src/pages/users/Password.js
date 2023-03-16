import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav.js'
import { auth } from '../../firebase.js'
import { toast } from 'react-toastify'
import { updatePassword } from 'firebase/auth'
const Password = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(password)
    let user = auth.currentUser
    await updatePassword(user, password)
      .then(() => {
        setLoading(false)
        setPassword("")
        toast.success('password updated')
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.message)
      })
  }
  const passwordUpdateForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter new password"
            disabled={loading}
            value={password}
          />
          <br />
          {/* updating password in the form of clicking the submit button  */}
          <button
            className="btn btn-primary"
            disabled={!password || password.length < 6 || loading}
          >
            submit
          </button>
        </div>
      </form>
    )
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? <h4 className='text-danger'>Loading ..</h4> : <h4>password update</h4>}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  )
}

export default Password
