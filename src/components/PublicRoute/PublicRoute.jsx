import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';

export const PublicRoute = ({ component: Component, restricted = false }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // If route is restricted and user is logged in, redirect to contacts
  // If route is not restricted, allow access
  return isLoggedIn && restricted ? (
    <Navigate to="/contacts" replace />
  ) : (
    <Component />
  );
};
