import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.goit.global';

// Utility to add JWT token
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT token
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Helper to get token from state and set header
const getTokenAndSetHeader = thunkAPI => {
  const state = thunkAPI.getState();
  const token = state.auth.token;
  if (token) {
    setAuthHeader(token);
  }
  return token;
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    const token = getTokenAndSetHeader(thunkAPI);
    if (!token) {
      return thunkAPI.rejectWithValue('No token available');
    }
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch contacts'
      );
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    const token = getTokenAndSetHeader(thunkAPI);
    if (!token) {
      return thunkAPI.rejectWithValue('No token available');
    }
    try {
      const response = await axios.post('/contacts', contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to add contact'
      );
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    const token = getTokenAndSetHeader(thunkAPI);
    if (!token) {
      return thunkAPI.rejectWithValue('No token available');
    }
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to delete contact'
      );
    }
  }
);
