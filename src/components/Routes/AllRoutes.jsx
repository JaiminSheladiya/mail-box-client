import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom'
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import HomePage from '../Pages/HomePage'
import Inbox from '../Pages/Inbox';
import Mail from '../Pages/Mail';
import SendMail from '../Pages/SendMail';
import SentMail from '../Pages/SentMail';

const AllRoutes = () => {
  const {isLogin,isLoginPage} = useSelector(state => state.auth)
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inbox" element={<Inbox />} />
      <Route path="/sent" element={<SentMail/>} />
      <Route path="/inbox/:id" element={<Mail />} />
      <Route path="/sendmail" element={<SendMail />} />
      <Route path="/auth" element={!isLoginPage ? <Signup /> : <Login />} />
    </Routes>
  );
}

export default AllRoutes