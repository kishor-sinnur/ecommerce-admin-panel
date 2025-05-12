// components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { AddBox, ListAlt, ShoppingCart, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <Toolbar />
      <List>
        <ListItem button onClick={() => navigate('/dashboard/add-product')}>
          <ListItemIcon><AddBox /></ListItemIcon>
          <ListItemText primary="Add Product" />
        </ListItem>
        <ListItem button onClick={() => navigate('/dashboard/manage-products')}>
          <ListItemIcon><ListAlt /></ListItemIcon>
          <ListItemText primary="Manage Products" />
        </ListItem>
        <ListItem button onClick={() => navigate('/dashboard/manage-orders')}>
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Manage Orders" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
