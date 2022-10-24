// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('setting/getData', async params => {
  const response = await axios.post(`${BACKEND_URL}/api/setting`, { params })
  return {
    allData: [],
    data: response.data.data.rows,
    totalPages: response.data.data.total,
    params
  }
})

export const addEvent = createAsyncThunk(
  'setting/addEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/setting/add-event`, { data })
    await dispatch(getData(getState().settings.params))
    return data
  }
)

export const updateEvent = createAsyncThunk(
  'setting/updateEvent',
  async (data, { dispatch, getState }) => {
    await axios.post(`${BACKEND_URL}/api/setting/update-event`, { data })
    await dispatch(getData(getState().settings.params))
    return data
  }
)

export const deleteEvent = createAsyncThunk('setting/deleteEvent', async (id, { dispatch, getState }) => {
  console.log('deleteEvent', id)
  await axios.post(`${BACKEND_URL}/api/setting/delete-event`, { id })
  await dispatch(getData(getState().settings.params))
  return id
})

export const settingSlice = createSlice({
  name: 'settings',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
    })
  }
})

export default settingSlice.reducer
