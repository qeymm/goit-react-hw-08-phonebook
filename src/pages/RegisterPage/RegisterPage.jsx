import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/auth/authOperations';
import { selectAuthError } from '../../redux/auth/authSelectors';
import css from './RegisterPage.module.css';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(register(formData)).unwrap();
      navigate('/contacts');
    } catch (error) {
      // Error is handled by Redux state
    }
  };

  return (
    <div className={css.container}>
      <div className={css.formBox}>
        <h1 className={css.heading}>Register</h1>
        <form onSubmit={handleSubmit} className={css.form}>
          {error && (
            <div className={css.errorAlert}>
              <span className={css.errorIcon}>⚠️</span>
              <span>{error}</span>
            </div>
          )}
          <div className={css.formGroup}>
            <label className={css.label} htmlFor="name">
              Name <span style={{ color: '#E74C3C' }}>*</span>
            </label>
            <input
              className={css.input}
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className={css.formGroup}>
            <label className={css.label} htmlFor="email">
              Email <span style={{ color: '#E74C3C' }}>*</span>
            </label>
            <input
              className={css.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={css.formGroup}>
            <label className={css.label} htmlFor="password">
              Password <span style={{ color: '#E74C3C' }}>*</span>
            </label>
            <input
              className={css.input}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              minLength={7}
              required
            />
          </div>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
