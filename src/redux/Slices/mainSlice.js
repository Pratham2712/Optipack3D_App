import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BASE_URL, ERROR, SUCCESS} from '../../constants/constants';
import axios from 'axios';

axios.defaults.withCredentials = true;
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
export const getOrderThunk = createAsyncThunk(
  '/get_order_details',
  async data => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(`${BASE_URL}/get_order_details`, data, {
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
export const getContainerThunk = createAsyncThunk(
  '/get_container_details',
  async data => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(`${BASE_URL}/get_container_details`, data, {
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
export const get3dDataThunk = createAsyncThunk(
  '/freeOutputJson',
  async data => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post(`${BASE_URL}/freeOutputJson`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.container_inf);

      await AsyncStorage.setItem(
        'threed_paths',
        JSON.stringify(res.data?.threed_paths),
      );
      await AsyncStorage.setItem(
        'container_inf',
        JSON.stringify(res.data?.container_inf),
      );
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

const initialState = {
  loading: false,
  updateDone: false,

  errorData: {
    message: '',
    type: '',
    errors: [],
  },
  successMsg: '',
  isError: false,
  data: {
    loadplans: [],
    orderData: {},
    containerData: {},
  },
  status: {},
};

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: builders => {
    builders
      //getAllLoadplan===================================================================================
      .addCase(getAllLoadplan.pending, (state, {payload}) => {
        state.loading = true;
      })
      .addCase(getAllLoadplan.fulfilled, (state, {payload}) => {
        switch (Object.keys(payload)?.[0]) {
          case SUCCESS:
            state.successMsg = '';
            state.loading = false;
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
      })
      //getOrderThunk===================================================================================
      .addCase(getOrderThunk.pending, (state, {payload}) => {
        state.loading = true;
      })
      .addCase(getOrderThunk.fulfilled, (state, {payload}) => {
        switch (Object.keys(payload)?.[0]) {
          case SUCCESS:
            state.successMsg = '';
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.orderData = payload[SUCCESS]?.result;
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
      .addCase(getOrderThunk.rejected, (state, action) => {
        state.status.getOrderThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getContainerThunk===================================================================================
      .addCase(getContainerThunk.pending, (state, {payload}) => {
        state.loading = true;
      })
      .addCase(getContainerThunk.fulfilled, (state, {payload}) => {
        switch (Object.keys(payload)?.[0]) {
          case SUCCESS:
            state.successMsg = '';
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.containerData = payload[SUCCESS]?.result;
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
      .addCase(getContainerThunk.rejected, (state, action) => {
        state.status.getOrderThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //get3dDataThunk===================================================================================
      .addCase(get3dDataThunk.pending, (state, {payload}) => {
        state.loading = true;
      })
      .addCase(get3dDataThunk.fulfilled, (state, {payload}) => {
        switch (Object.keys(payload)?.[0]) {
          case SUCCESS:
            state.successMsg = '';
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
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
      .addCase(get3dDataThunk.rejected, (state, action) => {
        state.status.get3dDataThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default mainSlice.reducer;
export const {clearErrorSlice} = mainSlice.actions;
