import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import css from './HomePage.module.css';

export const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.container}>
      <div className={css.content}>
        <h1 className={css.heading}>Welcome to Phonebook</h1>
        <p className={css.subtitle}>
          Manage your contacts efficiently and securely
        </p>
        {!isLoggedIn && (
          <div className={css.actions}>
            <Link to="/register" className={css.primaryButton}>
              Get Started
            </Link>
            <p className={css.text}>
              Already have an account?{' '}
              <Link to="/login" className={css.linkButton}>
                Login
              </Link>
            </p>
          </div>
        )}
        {isLoggedIn && (
          <Link to="/contacts" className={css.primaryButton}>
            Go to Contacts
          </Link>
        )}
      </div>
    </div>
  );
};
