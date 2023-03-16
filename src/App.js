import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { BrowserRouter,  Routes, Route } from 'react-router-dom'
import Header from './components/nav/Header.js'
import React from 'react'
import "react-toastify/dist/ReactToastify.css"
import {ToastContainer} from 'react-toastify'
import RegisterComplete from './pages/auth/RegisterCompleter'
import { useEffect } from 'react'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { currentUser } from './functions/auth.js'
import { getIdTokenResult, onAuthStateChanged } from 'firebase/auth'
import ForgotPassword from './pages/auth/ForgotPassword.js'
import AdminDashboard from './pages/admin/AdminDashboard.js'

import CategoryCreate from './pages/admin/category/CategoryCreate.js'
import CategoryUpdate from './pages/admin/category/CategoryUpdate.js'
import SubCreate from './pages/admin/sub/SubCreate.js'
import SubUpdate from './pages/admin/sub/SubUpdate.js'
import ProductCreate from './pages/admin/product/ProductCreate.js'
import History from './pages/users/History.js'
import AllProducts from './pages/admin/product/AllProducts.js'
import Product from './pages/Product.js'
import UserRoute from './components/routes/UserRoute.js'
import AdminRoute from './components/routes/AdminRoute.js'
import ProductUpdate from './pages/admin/product/ProductUpdate.js'
import Password from './pages/users/Password.js'
import Wishlist from './pages/users/Wishlist.js'
import CategoryList from './components/category/CategoryList.js'
import CategoryHome from './pages/category/CategoryHome.js'
import SubHome from './pages/sub/SubHome'
import Shop from './pages/Shop.js'
import Cart from './pages/Cart.js'
import Checkout from './pages/Checkout'
import CreateCouponPage from './pages/admin/coupon/CreateCouponPage.js'
import Payment from './pages/Payment.js'
const App = () => {
  const dispatch=useDispatch();
  useEffect(() =>{
    const unsubscribe=onAuthStateChanged(auth,async(user)=>{
      if(user){
        const idTokenResult=await getIdTokenResult(user);
        console.log(user,'user')
      
        currentUser(idTokenResult.token).then((res)=>{
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
        .catch(err => console.log(err));
      }
    })
    return ()=>unsubscribe();
  },[]);
  return (
    <React.Fragment>
      <BrowserRouter>
      <Header />
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/register/complete' element={<RegisterComplete/>}/>
          <Route path='/forgot/password' element={<ForgotPassword/>}/>
          <Route path='/user/history' element={<History/>}/>
          <Route path='/user/password' element={<Password/>}/>
          <Route path='/user/wishlist' element={<Wishlist/>}/>
          {/* <Route path='/user/history' element={<UserRoute/>}/> */}
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          <Route path='/admin/category' element={<CategoryCreate/>}/>
          <Route path='/admin/category/:slug' element={<CategoryUpdate/>}/>
          <Route path='/admin/sub' element={<SubCreate/>}/>
          <Route path='/admin/sub/:slug' element={<SubUpdate/>}/>
          <Route path='/admin/product' element={<ProductCreate/>}/>
          <Route path='/admin/products' element={<AllProducts/>}/>
          <Route path='/admin/product/:slug' element={<ProductUpdate/>}/>
          <Route path='/product/:slug' element={<Product/>}/>
          <Route path='/category/:slug' element={<CategoryHome/>}/>
          <Route path='/sub/:slug' element={<SubHome/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/admin/coupon' element={<CreateCouponPage/>}/>
          <Route path='/payment' element={<Payment/>}/>

        </Routes>
      </BrowserRouter>
    </React.Fragment>

  );
}

export default App;
