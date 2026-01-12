import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.goit.global';

// Utility to add JWT token
export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT token
export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      // Ensure credentials are properly formatted
      const registerData = {
        name: credentials.name?.trim(),
        email: credentials.email?.trim(),
        password: credentials.password,
      };

      // Validate password length (API typically requires min 7 characters)
      if (registerData.password && registerData.password.length < 7) {
        return thunkAPI.rejectWithValue(
          'Password must be at least 7 characters long'
        );
      }

      const response = await axios.post('/users/signup', registerData);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      // Log error for debugging
      console.error('Registration error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      // Handle different error response formats
      const status = error.response?.status;
      const data = error.response?.data;
      let errorMessage = 'Registration failed';

      const isDuplicateEmail =
        status === 409 ||
        data?.code === 11000 ||
        data?.keyPattern?.email ||
        data?.message?.toLowerCase?.().includes('duplicate key');

      if (isDuplicateEmail) {
        errorMessage = 'User with this email already exists.';
      } else if (status === 400) {
        errorMessage =
          'Invalid registration data. Please check all fields are filled correctly.';
      } else if (data?.message) {
        errorMessage = data.message;
      } else if (data?.error) {
        errorMessage = data.error;
      } else if (typeof data === 'string' && data.trim() !== '') {
        errorMessage = data;
      } else if (error.message) {
        errorMessage = error.message;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      // Ensure credentials are properly formatted
      const loginData = {
        email: credentials.email?.trim(),
        password: credentials.password,
      };

      const response = await axios.post('/users/login', loginData);
      // After successful login, add the token to the HTTP header
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      // Log error for debugging
      console.error('Login error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      // Handle different error response formats
      const status = error.response?.status;
      const data = error.response?.data;
      let errorMessage = 'Login failed';

      if (status === 400 || status === 401) {
        errorMessage = 'Invalid email or password.';
      } else if (data?.message) {
        errorMessage = data.message;
      } else if (data?.error) {
        errorMessage = data.error;
      } else if (typeof data === 'string' && data.trim() !== '') {
        errorMessage = data;
      } else if (data && Object.keys(data).length === 0) {
        errorMessage = 'Invalid email or password.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error) {
    // Even if logout fails on server, clear local state
    clearAuthHeader();
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || 'Logout failed'
    );
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue(null);
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      // If token is invalid, clear it
      clearAuthHeader();
      const status = error.response?.status;
      const data = error.response?.data;
      let errorMessage =
        data?.message || data?.error || error.message || 'Unable to fetch user';

      if (status === 401) {
        errorMessage = 'Session expired. Please log in again.';
      }

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
