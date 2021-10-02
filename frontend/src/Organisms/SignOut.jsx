import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { removeUser } from '../store/slices/user';
import { URLS } from '../utils/constants';

const SignOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(removeUser());
    history.push(URLS.login.signIn);
  }, []);

  return null;
}

export default SignOut;
