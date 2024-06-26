import React from 'react';
import { useAuthContext } from './useAuthContext';

export default function useLogout() {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
  };

  // Return just the logout function directly, not within an object
  return logout;
}
