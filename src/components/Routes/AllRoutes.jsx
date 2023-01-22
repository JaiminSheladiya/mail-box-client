import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom'
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import HomePage from '../Pages/HomePage'

const AllRoutes = () => {
  const {isLogin,isLoginPage} = useSelector(state => state.auth)
 console.log(isLoginPage)
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={!isLoginPage ? <Signup /> : <Login />} />
    </Routes>
  );
}

export default AllRoutes