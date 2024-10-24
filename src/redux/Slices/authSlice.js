import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL, ERROR, IDLE, SUCCESS} from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const token = res.data[SUCCESS].token;
      await AsyncStorage.setItem('token', token);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

export const checkLoginThunk = createAsyncThunk(
  '/check_login_loader',
  async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/check_login_loader`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      return error.response.data;
    }
  },
);
export const getAllLoadplan = createAsyncThunk(
  '/get_loadplan_loaders',
  async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/get_loadplan_loaders`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
    loadplans: [],
  },
  status: {
    sendOtpThunk: IDLE,
    verifyLoginThunk: IDLE,
    checkEmailThunk: IDLE,
    checkLoginThunk: IDLE,
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
      })
      //checkLoginThunk===================================================================================
      .addCase(checkLoginThunk.pending, (state, {payload}) => {
        state.loading = true;
        state.initialLoad = true;
      })
      .addCase(checkLoginThunk.fulfilled, (state, {payload}) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.successMsg = '';
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.user = payload[SUCCESS];
            state.errorData.message = '';
            state.isLogin = true;
            state.initialLoad = false;
            break;
          case ERROR:
            state.errorData.message = '';
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            state.successMsg = '';
            state.isLogin = false;
            state.initialLoad = false;
            break;
          default:
            break;
        }
      })
      .addCase(checkLoginThunk.rejected, (state, action) => {
        state.status.checkLoginThunk = ERROR;
        state.loading = false;
        state.initialLoad = false;
        state.errorData.message = action.error.message;
      })
      //getAllLoadplan===================================================================================
      .addCase(getAllLoadplan.pending, (state, {payload}) => {
        state.loading = true;
      })
      .addCase(getAllLoadplan.fulfilled, (state, {payload}) => {
        console.log('promist', Object.keys(payload)[0]);

        switch (Object.keys(payload)?.[0]) {
          case SUCCESS:
            state.successMsg = '';
            state.loading = false;
            console.log(payload[SUCCESS].result, 'inside');

            state.successMsg = payload[SUCCESS]?.message;
            state.data.loadplans = payload[SUCCESS]?.result;
            state.errorData.message = '';
            break;
          case ERROR:
            state.errorData.message = '';
            state.loading = false;

            state.errorData.message = payload[ERROR];
            state.successMsg = '';

            break;
          default:
            break;
        }
      })
      .addCase(getAllLoadplan.rejected, (state, action) => {
        state.status.getAllLoadplan = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const {clearErrorSlice} = authSlice.actions;
