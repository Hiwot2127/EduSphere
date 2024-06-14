const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Cart model
const cartSchema = new Schema({
  userId: { type: String, required: true },  // User ID associated with the cart, required field
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },  // Reference to the Product model, required field
      quantity: { type: Number, required: true }  // Quantity of the product in the cart, required field
    }
  ]
}, {
  timestamps: true  // Automatically add createdAt and updatedAt fields to the schema
});

// Create and export the Cart model based on the schema
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
