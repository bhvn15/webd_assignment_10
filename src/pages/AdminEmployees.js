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
    API.get('/user/getAll')
      .then((res) => {
        console.log("✅ Users response:", res.data);
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4, mx: 'auto', display: 'block' }} />;

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" sx={{ paddingTop: 2 }}>
        All Registered Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Full Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Role</strong></TableCell>
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
