// components/ProductList.js
import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Avatar, Typography, Button, Box
} from '@mui/material';

const sampleProducts = [
  { id: 1, name: 'Laptop', price: 49999, quantity: 10, image: '' },
  { id: 2, name: 'Mobile', price: 19999, quantity: 25, image: '' }
];

const ProductList = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">All Products</Typography>
        <Button variant="contained" color="primary">Add Product</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>₹{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <Avatar variant="square" src={product.image} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
