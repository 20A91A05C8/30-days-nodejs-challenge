const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/productdata')
.then(()=>console.log('connection Successful..'))
.catch((err)=>console.log('unable to connect..'))

const productSchema=new mongoose.Schema({
  name:String,
  price:Number,
  quantity:Number
})

const Product = mongoose.model('Product', productSchema);

async function createProductRoute(req, res) {
  // Your implementation here
  try {
    const { name, description, price } = req.body;
    const product = new Product({ name, description, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

app.post('/products', createProductRoute);

async function getAllProductsRoute(req, res) {
  // Your implementation here
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

app.get('/products', getAllProductsRoute);

async function updateProductRoute(req, res) {
  // Your implementation here
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = await Product.findByIdAndUpdate(id, { name, description, price }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

app.put('/products/:id',updateProductRoute);

async function deleteProductRoute(req, res) {
  // Your implementation here
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
app.delete('/products/:id',deleteProductRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
