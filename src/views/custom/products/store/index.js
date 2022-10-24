// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '@src/configs'
// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('product/getData', async params => {
  const response = await axios.post(`${BACKEND_URL}/api/product`, { params })
  return {
    allData: [],
    data: response.data.data.rows,
    totalPages: response.data.data.total,
    params
  }
})

export const addEvent = createAsyncThunk(
  'product/addEvent',
  async (formData, { dispatch, getState }) => {
    console.log('store', formData)
    await axios({
      method: "post",
      url: `${BACKEND_URL}/api/product/add-event`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    })
    await dispatch(getData(getState().products.params))
    return data
  }
)

export const updateEvent = createAsyncThunk(
  'product/updateEvent',
  async (formData, { dispatch, getState }) => {
    await axios({
      method: "post",
      url: `${BACKEND_URL}/api/product/update-event`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" }
    })
    await dispatch(getData(getState().products.params))
    return data
  }
)

export const deleteEvent = createAsyncThunk('product/deleteEvent', async (id, { dispatch, getState }) => {
  console.log('deleteEvent', id)
  await axios.post(`${BACKEND_URL}/api/product/delete-event`, { id })
  await dispatch(getData(getState().products.params))
  return id
})

export const productSlice = createSlice({
  name: 'product',
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

export default productSlice.reducer
