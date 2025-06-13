import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const matchedUser = existingUsers.find(
        (user) => user.email === userCredentials.email && user.password === userCredentials.password
      );
      if (!matchedUser) {
        return rejectWithValue('Invalid email or password');
      }
      const token = JSON.stringify(matchedUser);
      localStorage.setItem('authToken', token);
      return token;
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  }
);

const initialState = {
  token: JSON.parse(localStorage.getItem('authToken')) || null,
  isAuthenticated: Boolean(localStorage.getItem('authToken')),
  users: JSON.parse(localStorage.getItem('users')) || null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('authToken');
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        const token = action.payload;
        state.token = token;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.error(action.payload);
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
