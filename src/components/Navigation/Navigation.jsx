import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import { UserMenu } from '../UserMenu/UserMenu';
import css from './Navigation.module.css';

export const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      <div className={css.container}>
        <div className={css.navLinks}>
          <Link to="/" className={css.navLink}>
            Home
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/register" className={css.navLink}>
                Register
              </Link>
              <Link to="/login" className={css.navLink}>
                Login
              </Link>
            </>
          )}
          {isLoggedIn && (
            <Link to="/contacts" className={css.navLink}>
              Contacts
            </Link>
          )}
        </div>
        {isLoggedIn && <UserMenu />}
      </div>
    </nav>
  );
};
