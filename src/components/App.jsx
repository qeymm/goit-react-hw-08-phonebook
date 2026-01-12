import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation } from './Navigation/Navigation';
import { HomePage } from '../pages/HomePage/HomePage';
import { RegisterPage } from '../pages/RegisterPage/RegisterPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { ContactsPage } from '../pages/ContactsPage/ContactsPage';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { PublicRoute } from './PublicRoute/PublicRoute';
import { refreshUser } from '../redux/auth/authOperations';
import { selectIsRefreshing } from '../redux/auth/authSelectors';
import css from './App.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    // Refresh user data - this will set the token header if token exists
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div className={css.app}>
      <Navigation />
      {isRefreshing ? (
        <div className={css.loadingContainer}>
          <div className={css.spinner}></div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={<PublicRoute component={RegisterPage} restricted />}
          />
          <Route
            path="/login"
            element={<PublicRoute component={LoginPage} restricted />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute component={ContactsPage} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </div>
  );
};
