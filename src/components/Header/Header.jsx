import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const { allMailsCount } = useSelector(state => state.mail)
  return (
    <div className=" d-flex justify-content-around p-3 bg-secondary">
      <Link className="text-white" to="/">
        HOME
      </Link>
      <Link className="text-white" to="/inbox">
        INBOX <b className=' text-dark mx-1'>{allMailsCount ? allMailsCount : 0}</b>
      </Link>
      <Link className="text-white" to="/auth">
        SIGNUP
      </Link>
    </div>
  );
}

export default Header