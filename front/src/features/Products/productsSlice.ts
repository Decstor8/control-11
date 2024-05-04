import {ProductsItem} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getProducts} from './productsThunks';
import {RootState} from '../../App/store';

interface Products {
  products: ProductsItem[],
  isLoading: boolean;
}

const initialState: Products = {
  products: [],
  isLoading: false,
};

export const productsSlice = createSlice({
  name: 'products/slice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, {payload: items}) => {
      state.isLoading = false;
      state.products = items;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.products;
export const selectLoadingProducts = (state: RootState) => state.products.isLoading;