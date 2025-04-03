import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
<AppBar position="static" sx={{ backgroundColor: '#8e24aa' }}>
<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate(user.type === 'admin' ? '/admin' : '/home')}
        >
          CareerConnect
        </Typography>
        <Box>
          {user?.type === 'employee' && (
            <>
              <Button color="inherit" onClick={() => navigate('/jobs')}>Jobs</Button>
              <Button color="inherit" onClick={() => navigate('/companies')}>Companies</Button>
              <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
              <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
            </>
          )}

          {user?.type === 'admin' && (
            <>
              <Button color="inherit" onClick={() => navigate('/employees')}>Employees</Button>
              <Button color="inherit" onClick={() => navigate('/add-job')}>Add Job</Button>
            </>
          )}

          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
