import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card as MuiCard,
  CardContent,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from '@shared-theme/AppTheme';
import ColorModeSelect from '@shared-theme/ColorModeSelect';
import { AccessTime, CheckCircle, Delete, Edit } from '@mui/icons-material';

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(3),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const PageContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100dvh',
  padding: theme.spacing(4),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:5000/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      }
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  const handleUpdateStatus = async (orderId, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <AccessTime sx={{ color: 'orange' }} />;
      case 'Completed':
        return <CheckCircle sx={{ color: 'green' }} />;
      default:
        return null;
    }
  };

  return (
    <AppTheme>
      <PageContainer spacing={4}>
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ textAlign: 'center', fontSize: 'clamp(2rem, 6vw, 2.5rem)' }}
        >
          Manage Orders
        </Typography>

        <Card>
          <CardContent>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map(({ _id, customerName, totalPrice, status }) => (
                  <TableRow key={_id}>
                    <TableCell>{_id}</TableCell>
                    <TableCell>{customerName}</TableCell>
                    <TableCell>₹{totalPrice}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {getStatusIcon(status)}
                        <Typography variant="body2">{status}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Toggle Status">
                        <IconButton
                          onClick={() => handleUpdateStatus(_id, status)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Order">
                        <IconButton
                          onClick={() => handleDeleteOrder(_id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </PageContainer>
    </AppTheme>
  );
};

export default ManageOrders;
