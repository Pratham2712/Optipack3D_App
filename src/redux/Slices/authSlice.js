import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL, ERROR, IDLE, SUCCESS} from '../../constants/constants';

axios.defaults.withCredentials = true;

export const checkEmailThunk = createAsyncThunk(
  '/check_email_loaders',
  async data => {
    try {
      const res = await axios.post(`${BASE_URL}/check_email_loaders`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

export const sendOtpThunk = createAsyncThunk(
  '/send_otp_to_email',
  async data => {
    try {
      const res = await axios.post(`${BASE_URL}/send_otp_to_email`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

export const verifyLoginThunk = createAsyncThunk(
  '/verify_loader',
  async data => {
    try {
      const res = await axios.post(`${BASE_URL}/verify_loader`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

const initialState = {
  loading: false,
  initialLoad: true,
  updateDone: false,
  isLogin: false,
  otpSend: false,
  errorData: {
    message: '',
    type: '',
    errors: [],
  },
  successMsg: '',
  isError: false,
  data: {
    user: {},
  },
  status: {
    sendOtpThunk: IDLE,
    verifyLoginThunk: IDLE,
    checkEmailThunk: IDLE,
  },
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: builders => {
    builders
      //sendOtpThunk==============================================================================================================
      .addCase(sendOtpThunk.pending, (state, {payload}) => {
        state.loading = true;
      })
      .addCase(sendOtpThunk.fulfilled, (state, {payload}) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.successMsg = '';
            state.otpSend = true;
            state.loading = false;
            state.successMsg = payload[SUCCESS];
            state.errorData.message = '';
            break;
          case ERROR:
            state.errorData.message = '';
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            state.successMsg = '';
            state.otpSend = false;
            break;
          default:
            break;
        }
      })
      .addCase(sendOtpThunk.rejected, (state, action) => {
        state.status.sendOtpThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })

      //verifyLoginThunk==============================================================================================================
      .addCase(verifyLoginThunk.pending, (state, {payload}) => {
        state.loading = true;
      })
      .addCase(verifyLoginThunk.fulfilled, (state, {payload}) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.successMsg = '';
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.errorData.message = '';
            state.isLogin = true;
            state.data.user = payload[SUCCESS];
            break;
          case ERROR:
            state.errorData.message = '';
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            state.successMsg = '';
            break;
          default:
            break;
        }
      })
      .addCase(verifyLoginThunk.rejected, (state, action) => {
        state.status.verifyLoginThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //checkEmailThunk==============================================================================================================
      .addCase(checkEmailThunk.pending, (state, {payload}) => {
        state.loading = true;
      })
      .addCase(checkEmailThunk.fulfilled, (state, {payload}) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.successMsg = '';
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.user = payload[SUCCESS]?.result;
            state.errorData.message = '';
            break;
          case ERROR:
            state.errorData.message = '';
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            state.successMsg = '';
            break;
          default:
            break;
        }
      })
      .addCase(checkEmailThunk.rejected, (state, action) => {
        state.status.checkEmailThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const {clearErrorSlice} = authSlice.actions;
