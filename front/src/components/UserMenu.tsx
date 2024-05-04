import React, {useState} from 'react';
import {UserTypes} from '../types';
import {useAppDispatch} from '../App/hooks';
import {Button, Menu, MenuItem} from '@mui/material';
import {logout} from '../features/Users/usersThunks';
import {useNavigate} from "react-router-dom";

interface Props {
  user: UserTypes;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

    const navToForm = () => {
        navigate('/add/product');
    };

    return (
      <>
        <Button color="inherit" onClick={handleClick}>
          Hello, {user.username}!
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
            <MenuItem onClick={navToForm}>Добавить новый элемент</MenuItem>
          <MenuItem onClick={handleLogout}>Выйти</MenuItem>
        </Menu>
      </>
  );
};

export default UserMenu;