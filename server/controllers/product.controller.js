const Product = require('../models/product.model');
const path = require('path');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    // Handle the image if it exists
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Path for the image

    const product = new Product({
      name,
      description,
      price,
      quantity,
      imageUrl // Save the image URL
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all products
// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // Ensure the image URL is fully formed for frontend consumption
    const productsWithFullImageUrl = products.map((product) => ({
      ...product.toObject(),
      imageUrl: product.imageUrl ? `http://localhost:5000${product.imageUrl}` : '' 
       /// Prepend the full URL path to the image
    }));
    // console.log(imageUrl)

    // Set cache control headers
    res.setHeader('Cache-Control', 'no-store'); // Prevent caching
    
    res.json(productsWithFullImageUrl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    // Prepend the full URL to the image URL if it exists
    const productWithFullImageUrl = {
      ...product.toObject(),
      imageUrl: product.imageUrl ? `http://localhost:5000${product.imageUrl}` : ''
    };
    
    res.json(productWithFullImageUrl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity
    };

    // Update image URL if a new image is uploaded
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Prepend the full URL to the image URL if it exists
    const updatedProductWithFullImageUrl = {
      ...updatedProduct.toObject(),
      imageUrl: updatedProduct.imageUrl ? `http://localhost:5000${updatedProduct.imageUrl}` : ''
    };

    res.json(updatedProductWithFullImageUrl);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
