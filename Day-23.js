const mongoose = require('mongoose');

// Define Category schema
const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

// Define Product schema with a reference to Category
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category
});

// Create models
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Array} - Array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
  try {
    // Populate products with category details
    const products = await Product.find().populate('category').exec();
    return products;
  } catch (error) {
    console.error('Error retrieving products with populated category:', error);
    throw error;
  }
}

// Example usage:
// Assuming MongoDB connection is already established

// Create some categories
const category1 = new Category({ name: 'Electronics', description: 'Electronic products' });
const category2 = new Category({ name: 'Clothing', description: 'Clothing items' });

// Save categories
await category1.save();
await category2.save();

// Create some products associated with categories
const product1 = new Product({ name: 'Laptop', price: 1000, category: category1._id });
const product2 = new Product({ name: 'T-shirt', price: 20, category: category2._id });

// Save products
await product1.save();
await product2.save();

// Retrieve products with populated category details
const productsWithCategory = await getProductsPopulatedWithCategory();
console.log(productsWithCategory);
