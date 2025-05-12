import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ColorModeSelect from '@shared-theme/ColorModeSelect';
import AppTheme from '@shared-theme/AppTheme';
import { SitemarkIcon } from './sign-in/components/CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const AddProductContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function AddProduct(props) {
  const [preview, setPreview] = React.useState(null);
  const [imageFile, setImageFile] = React.useState(null);
  const formRef = React.useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(formRef.current);
    const formData = new FormData();

    formData.append('name', data.get('productName'));
    formData.append('description', data.get('productDescription'));
    formData.append('price', data.get('price'));
    formData.append('quantity', data.get('quantity'));

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Product added:', res.data);
      alert('✅ Product added successfully!');
      formRef.current.reset();
      setPreview(null);
      setImageFile(null);
    } catch (error) {
      console.error('❌ Error adding product:', error);
      alert('❌ Failed to add product. Check console for details.');
    }
  };

  return (
    <AppTheme {...props}>
      <AddProductContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '2rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Add Product
          </Typography>
          <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <TextField
              name="productName"
              label="Product Name"
              variant="outlined"
              required
              fullWidth
            />

            <TextField
              name="productDescription"
              label="Product Description"
              variant="outlined"
              required
              fullWidth
              multiline
              rows={1}
            />

            <TextField
              name="price"
              label="Price"
              type="number"
              variant="outlined"
              required
              fullWidth
            />

            <TextField
              name="quantity"
              label="Quantity"
              type="number"
              variant="outlined"
              required
              fullWidth
              sx={{ '& .MuiInputBase-input': { textAlign: 'center' } }}
            />

            <Button variant="outlined" component="label">
              Upload Image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>

            {preview && (
              <Box
                component="img"
                src={preview}
                alt="Preview"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  objectFit: 'cover',
                  maxHeight: 200,
                }}
              />
            )}

            <Button type="submit" fullWidth variant="contained">
              Add Product
            </Button>
          </Box>
        </Card>
      </AddProductContainer>
    </AppTheme>
  );
}
