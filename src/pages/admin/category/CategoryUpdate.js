import React, { useState, useEffect } from 'react'
import { getCategory,updateCategory } from '../../../functions/category.js'
import AdminNav from '../../../components/nav/AdminNav.js'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useParams,useNavigate } from 'react-router-dom'
import CategoryForm from '../../../components/forms/CategoryForm.js'
const CategoryUpdate = () => {

  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false);
  let {slug} =useParams();
  let navigate=useNavigate();


  useEffect(() => {
    loadCategories();
    // console.log(slug);
    
  }, []);

  const loadCategories = () =>
    getCategory(slug).then((c) => setName(c.data.name));


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug,{ name }, user.token)
      .then(res => {
        console.log(res);
        setLoading(false);
        setName("")
        toast.success(`"${res.data.name}" is updated`)
        navigate('/admin/category')
      })
      .catech(err => {
        console.log(err);
        setLoading(false);
        // toast.error(err.message);
        if (err.response.status === 400) toast.error(err.response.data);
      })
  }

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          autoFocus
          required
          
        />
    
        <br />
        <button className='btn btn-outline-primary'>Save</button>
      </div>
    </form>
  )

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className='text-danger'>Loading ...</h4>
          ) : (
            <h4>update category</h4>
          )}
         <CategoryForm 
            handleSubmit={handleSubmit} 
           name={name}
            setName={setName}
         />
        </div>
      </div>
    </div>
  )
}

export default CategoryUpdate
