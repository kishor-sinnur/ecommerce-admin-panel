import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
  useTheme,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  AppBar,
  Toolbar,
  Container,
  Fab,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import ColorModeSelect from '@shared-theme/ColorModeSelect';
import AppTheme from '@shared-theme/AppTheme';

const ManageProducts = () => {
  const theme = useTheme();

  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    imageUrl: '',
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Cache-Control': 'no-cache',
        },
      });
      if (!res.ok) throw new Error(res.statusText);
      setProducts(await res.json());
    } catch (err) {
      console.error('Fetch products error:', err);
    }
  };

  const openAdd = () => {
    setIsEditing(false);
    setEditingId(null);
    setForm({ name: '', description: '', price: '', quantity: '', imageUrl: '' });
    setImageFile(null);
    setOpenDialog(true);
  };

  const openEdit = (p) => {
    setIsEditing(true);
    setEditingId(p._id);
    setForm({
      name: p.name,
      description: p.description || '',
      price: p.price,
      quantity: p.quantity,
      imageUrl: p.imageUrl || '',
    });
    setImageFile(null);
    setOpenDialog(true);
  };

  const close = () => {
    setOpenDialog(false);
    setIsEditing(false);
    setImageFile(null);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onFile = (e) => setImageFile(e.target.files[0]);

  const save = async () => {
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('description', form.description);
    fd.append('price', form.price);
    fd.append('quantity', form.quantity);
    if (imageFile) fd.append('image', imageFile);

    const url = isEditing
      ? `http://localhost:5000/api/products/${editingId}`
      : 'http://localhost:5000/api/products';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: fd,
      });
      if (!res.ok) throw new Error(res.statusText);
      const saved = await res.json();
      setProducts((prev) =>
        isEditing
          ? prev.map((p) => (p._id === editingId ? saved : p))
          : [...prev, saved]
      );
      close();
    } catch (err) {
      console.error(isEditing ? 'Update error:' : 'Add error:', err);
    }
  };

  const remove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!res.ok) throw new Error(res.statusText);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <AppTheme>
      <AppBar position="sticky" sx={{ bgcolor: theme.palette.background.paper, height: 80 }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 2, mt: 1 }}>
            Manage Products
          </Typography>
          <ColorModeSelect sx={{ color: 'text.primary' }} />
        </Toolbar>
      </AppBar>

      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 4 }}>
        <Container maxWidth={false} sx={{ px: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            {products.map((p) => (
              <Grid item key={p._id} xs={12} sm={6} md={3} lg={2}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    boxShadow: theme.shadows[4],
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' },
                  }}
                >
                  <CardMedia
                    component="img"
                    src={p.imageUrl || '/default-image.jpg'}
                    alt={p.name}
                    sx={{
                      height: 150,
                      width: 300,
                      objectFit: 'cover',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{p.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{p.price} &middot; Qty: {p.quantity}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => openEdit(p)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => remove(p._id)} color="error">
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Fab color="primary" sx={{ position: 'fixed', bottom: 40, right: 40 }} onClick={openAdd}>
          <Add />
        </Fab>

        <Dialog open={openDialog} onClose={close}>
          <DialogTitle>{isEditing ? 'Edit Product' : 'Add Product'}</DialogTitle>
          <DialogContent>
            <TextField
              placeholder="Name"
              name="name"
              value={form.name}
              onChange={onChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={onChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              placeholder="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={onChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              placeholder="Quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={onChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <input type="file" accept="image/*" onChange={onFile} style={{ marginBottom: 16 }} />
            {isEditing && (
              imageFile ? (
                <img src={URL.createObjectURL(imageFile)} alt="New" width={100} />
              ) : (
                form.imageUrl && <img src={form.imageUrl} alt="Current" width={100} />
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button variant="contained" onClick={save}>
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AppTheme>
  );
};

export default ManageProducts;
