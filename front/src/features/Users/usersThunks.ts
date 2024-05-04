import {createAsyncThunk} from '@reduxjs/toolkit';
import {MainErr, LoginMutation, RegisterMutation, RegisterResponse, ValidationError} from '../../types';
import {isAxiosError} from 'axios';
import {RootState} from '../../App/store';
import {unsetUser} from './usersSlice';
import axiosApi from '../../axiosApi';

export const newUser = createAsyncThunk<RegisterResponse, RegisterMutation, {rejectValue: ValidationError}>(
    'users/register',
    async (registerMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post('/users', registerMutation);
            return response.data;
        } catch (err) {
            if (isAxiosError(err) && err.response && err.response.status === 422) {
                return rejectWithValue(err.response.data);
            }

            throw err;
        }
    }
);

export const loginUser = createAsyncThunk<RegisterResponse, LoginMutation, {rejectValue: MainErr}>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('users/sessions', loginMutation);
            return response.data;
        } catch (err) {
            if (isAxiosError(err) && err.response && err.response.status === 422) {
                return rejectWithValue(err.response.data);
            }

            throw err;
        }
    },
);

export const logout = createAsyncThunk<void, undefined, {state: RootState}>(
    'users/logout',
    async (_, {getState, dispatch},) => {
        const token = getState().users.user?.token;

        axiosApi.delete('users/sessions', {
            headers: {'Authorization': 'Bearer ' + token}
        }
        );
        dispatch(unsetUser());
    },
);