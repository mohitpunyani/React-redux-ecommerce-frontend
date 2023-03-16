import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import { Menu, Badge } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
// use dispatch is used to update the data of the state and useselector is used to get the data of the state

import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import Search from '../forms/Search.js'
// const Logout= ()=>{
//   console.log('hello')
// }

// const Header = () => {

//   const [current, setCurrent] = useState('home');
//   let navigate = useNavigate()
//   let dispatch = useDispatch()
//   const handleClick = (e) => {
//     console.log('click ', e);
//     console.log(e.key)
//     setCurrent(e.key);
//   };

//   const logout = () => {
//     signOut(auth)
//     dispatch({
//       type: "LOGOUT",
//       payload: null,
//     });
//     navigate("/login");
//   };

//   const items = [
//     {
//       label: <Link to='/'  style={{textDecoration :'none'}}>Home</Link>,
//       key: 'home',
//       icon: <AppstoreOutlined />,

//     },
//     {
//       label: <Link to='/login'  style={{textDecoration :'none'}}>Login</Link>,
//       key: 'login',
//       icon: <UserOutlined/>,
//     },
//     {

//       label: <Link to='/register' style={{textDecoration :'none'}}>Register</Link>,
//       key: 'register',
//       icon: <UserAddOutlined />,
//     },

//     {
//       label: 'username',
//       key: 'username',
//       icon: <SettingOutlined />,
//       children: [
//             {
//               label: 'Option 1',
//               key: 'setting:1',
//             },
//             {
//               label: 'Option 2',
//               key: 'setting:2',
//             },
//             {
//               label: 'Logout',
//               key: 'logout',
//               icon : <LogoutOutlined/>,
//               onClick: {logout},
//             },
//           ],
//         },
//   ];

//   return <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" items={items} />;
// };
// export default Header;

const { SubMenu, Item } = Menu

const Header = () => {
  const [current, setCurrent] = useState('home')

  let dispatch = useDispatch()
  let { user, cart } = useSelector((state) => ({ ...state }))
  let navigate = useNavigate()

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key)
  }

  const logout = () => {
    signOut(auth)
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
    navigate('/login')
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          Home
          {/* -{JSON.stringify(user)}  */}
          {/* THIS method is used to get the state from the redux state */}
        </Link>
      </Item>
      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop" style={{ textDecoration: 'none' }}>
          Shop
          {/* -{JSON.stringify(user)}  */}
          {/* THIS method is used to get the state from the redux state */}
        </Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart" style={{ textDecoration: 'none' }}>
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
          {/* -{JSON.stringify(user)}  */}
          {/* THIS method is used to get the state from the redux state */}
        </Link>
      </Item>
      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register" style={{ textDecoration: 'none' }}>
            Register
          </Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login" style={{ textDecoration: 'none' }}>
            Login
          </Link>
        </Item>
      )}
      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split('@')[0]}
          className="float-end"
        >
          {user && user.role === 'subscriber' && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === 'admin' && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span className="float-end p-1">
        <Search />
      </span>
    </Menu>
  )
}
export default Header
