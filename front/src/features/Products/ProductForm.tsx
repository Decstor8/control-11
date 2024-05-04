import React, {useState} from 'react';
import {ProductTypes} from '../../types';
import {Box, Button, Grid, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import Input from '../../components/InputF';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {selectUser} from '../Users/usersSlice';
import {addProduct} from './productsThunks';

const ProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [state, setState] = useState<ProductTypes>({
    title: '',
    description: '',
    price: 0,
    image: null,
    category: '',
  });

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(addProduct(state));
    navigate('/');

  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectChange = (e: SelectChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };


  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
      <>
        {user && <Box component="form" onSubmit={formSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                  required
                  label="title"
                  name="title"
                  autoComplete="title"
                  value={state.title}
                  onChange={inputChange}
                  fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  required
                  label="description"
                  name="description"
                  autoComplete="description"
                  value={state.description}
                  onChange={inputChange}
                  fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  required
                  type="number"
                  label="price"
                  name="price"
                  autoComplete="price"
                  value={state.price}
                  onChange={inputChange}
                  fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                  label="Категория"
                  id="category"
                  name="category"
                  value={state.category}
                  onChange={selectChange}
                  fullWidth
              >
                <MenuItem value="other">Other</MenuItem>
                <MenuItem value="computers">computers</MenuItem>
                <MenuItem value="cars">cars</MenuItem>
                <MenuItem value="household">Household</MenuItem>
              </Select>
            </Grid>
            <Input label="image" name="image" onChange={fileInputChangeHandler}/>
          </Grid>
          <Button type="submit">Create item</Button>
        </Box>}
      </>
  );
};

export default ProductForm;