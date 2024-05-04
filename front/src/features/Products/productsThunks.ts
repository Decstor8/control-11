import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {ProductsItem, ProductTypes} from '../../types';
import {RootState} from '../../App/store';

export const addProduct = createAsyncThunk<void, ProductTypes, {state: RootState}>(
  'add/product',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.user?.token;

      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      };

      await axiosApi.post<ProductTypes>('/products', data, {headers});
    } catch (err) {
      throw err;
    }
  },
);

export const getProducts = createAsyncThunk<ProductsItem[]>(
  'get/products',
  async () => {
    try {
      const response = await axiosApi.get<ProductsItem[]>('/products');

      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

export const deleteOneProduct = createAsyncThunk<void, string, {state: RootState}>(
  'delete/product',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().users.user?.token;

      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      await axiosApi.delete<ProductsItem>('/product/' + id, {headers});
    } catch (err) {
      throw err;
    }
  },
);