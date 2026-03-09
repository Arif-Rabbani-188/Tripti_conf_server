const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add a new product
router.post('/', async (req, res) => {
  try {
    const { name, unit, barcode, imageUrl } = req.body;

    // Basic Validation
    if (!name || !unit || !barcode) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Upsert Product: Update if barcode exists, create if not
    const productData = { name, unit, imageUrl };
    
    // Only update imageUrl if one is provided
    if (!imageUrl) delete productData.imageUrl;

    const savedProduct = await Product.findOneAndUpdate(
      { barcode },
      { $set: productData },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json(savedProduct);

  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error while adding product' });
  }
});

// Get product by barcode
router.get('/:barcode', async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error fetching product' });
  }
});

module.exports = router;
