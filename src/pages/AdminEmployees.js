import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../services/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';

const AdminEmployees = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    API.get('/user/getAll', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log("✅ Users response:", res.data);
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Error fetching users:', err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <CircularProgress sx={{ mt: 4, mx: 'auto', display: 'block' }} />;

  return (
    <TableContainer component={Paper} sx={{ mt: 4, maxWidth: 1000, mx: 'auto' }}>
      <Typography 
        variant="h4" 
        color="primary" 
        fontWeight="bold" 
        align="center" 
        sx={{ pt: 2 }}
      >
        All Registered Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'secondary.light' }}>Full Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'secondary.light' }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'secondary.light' }}>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u._id}>
              <TableCell>{u.fullName}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminEmployees;
