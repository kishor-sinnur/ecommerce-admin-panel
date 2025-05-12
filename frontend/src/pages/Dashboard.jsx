import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Card as MuiCard,
    CardActionArea,
    CardContent,
    Stack,
    AppBar,
    Toolbar,
    IconButton,
    Button
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet';
import MenuIcon from '@mui/icons-material/Menu';

const Card = styled(MuiCard)(({ theme }) => ({
    padding: theme.spacing(3),
    height: '100%',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const DashboardContainer = styled(Stack)(({ theme }) => ({
    minHeight: '100dvh',
    padding: theme.spacing(4),
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        backgroundImage:
            theme.palette.mode === 'dark'
                ? 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'
                : 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
    },
}));

const Dashboard = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('light');

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
        },
    }), [mode]);

    const toggleColorMode = () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const cards = [
        { title: 'Manage Products', description: 'Edit or remove products in the store', path: '/manage-products' },
        { title: 'Manage Orders', description: 'View and update customer orders', path: '/manage-orders' },
        { title: 'Add Product', description: 'Add new products to the catalog', path: '/add-product' },
    ];

    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>Admin Dashboard | MyStore</title>
                <meta name="description" content="Admin dashboard to manage products, orders, and analytics." />
            </Helmet>

            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Admin Dashboard</Typography>

                    {/* 🌗 Toggle Button for Light/Dark Mode */}
                    <Button 
    variant="outlined" 
    size="small" 
    sx={{
        marginLeft: 'auto', 
        borderRadius: '20px',
        color: mode === 'light' ? 'black' : 'white', // Ensure text is visible
        borderColor: mode === 'light' ? 'black' : 'white', // Adjust the border color
        '&:hover': {
            borderColor: mode === 'light' ? 'grey' : 'white', // Adjust border color on hover
        },
    }} 
    onClick={toggleColorMode}
>
    {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
</Button>

                </Toolbar>
            </AppBar>

            <DashboardContainer spacing={4}>
                <Typography variant="h2" fontWeight="bold" sx={{ textAlign: 'center', fontSize: 'clamp(2rem, 6vw, 2.5rem)' }}>
                    Admin Dashboard
                </Typography>

                <Typography variant="body1" sx={{ textAlign: 'center', mb: 3 }}>
                    Welcome! Choose an action below
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Total Sale</Typography>
                                <Typography variant="body2" color="text.secondary">$45,000</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Total Profit</Typography>
                                <Typography variant="body2" color="text.secondary">$12,000</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {cards.map((card, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardActionArea onClick={() => navigate(card.path)}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>{card.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">{card.description}</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </DashboardContainer>
        </ThemeProvider>
    );
};

export default Dashboard;
