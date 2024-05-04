import {FormEvent, useState} from 'react';
import {RegisterMutation} from '../../types';
import React from 'react';
import {Avatar, Box, Button, Container, Grid, TextField, Typography, Link} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {selectRegisterError} from './usersSlice';
import {newUser} from './usersThunks';
const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);

  const navigate = useNavigate();

  const [user, setUser] = useState<RegisterMutation>({
    username: '',
    password: '',
    displayName: '',
    phone: '',
  });

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(newUser(user)).unwrap();
      navigate('/');
    } catch (err) {

    }
  };
  return (
      <Container component="main" maxWidth="xs">
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#0a8a3b', // Зеленый текст
            }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#34a853' }}> // Более темный зеленый для аватара
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="green">
            Sign up
          </Typography>
          <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                    required
                    label="Username"
                    name="username"
                    value={user.username}
                    onChange={inputChangeHandler}
                    autoComplete="new-username"
                    error={Boolean(getFieldError('username'))}
                    helperText={getFieldError('username')}
                    fullWidth
                    sx={{ input: { color: '#0a8a3b' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    name="password"
                    label="Password"
                    type="password"
                    value={user.password}
                    onChange={inputChangeHandler}
                    autoComplete="new-password"
                    error={Boolean(getFieldError('password'))}
                    helperText={getFieldError('password')}
                    fullWidth
                    sx={{ input: { color: '#0a8a3b' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    name="displayName"
                    label="displayName"
                    value={user.displayName}
                    onChange={inputChangeHandler}
                    autoComplete="your name"
                    error={Boolean(getFieldError('displayName'))}
                    helperText={getFieldError('displayName')}
                    fullWidth
                    sx={{ input: { color: '#0a8a3b' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    required
                    name="phone"
                    label="phone"
                    value={user.phone}
                    onChange={inputChangeHandler}
                    autoComplete="your phone"
                    error={Boolean(getFieldError('phone'))}
                    helperText={getFieldError('phone')}
                    fullWidth
                    sx={{ input: { color: '#0a8a3b' } }}
                />
              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#34a853', '&:hover': { bgcolor: '#0a8a3b' } }} // Зеленые кнопки
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2" sx={{ color: '#0a8a3b' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
};

export default Register;