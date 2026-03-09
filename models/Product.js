const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  unit: { 
    type: String, 
    required: true,
    enum: ['pcs', 'kg', 'ltr', 'gm', 'doz', 'box', 'pkt'],
    default: 'pcs'
  },
  barcode: { 
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
  imageUrl: { 
    type: String,
    default: ''
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
