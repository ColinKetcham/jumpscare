import React, { useEffect } from 'react';
import { logout } from '../redux/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(logout());
  navigate('/');

  useEffect(() => {});
  return <div>Logging out!</div>;
};

export default LogOut;
