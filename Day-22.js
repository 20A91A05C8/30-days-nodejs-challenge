const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/productdata')
.then(()=>console.log('connection Successful..'))
.catch((err)=>console.log('unable to connect..'))
const ProductSchema=new mongoose.Schema({
  name:String,
  price:Number,
  quantity:Number
})

const Product=new mongoose.model('product',ProductSchema)

async function createProduct(product) {
  // Your implementation here
  const newproduct=new Product(product)
  const result=await newproduct.save()
  console.log(result)
}

/**
 * Retrieves all products from MongoDB
 * @returns {Array} - Array of product objects
 */
async function getAllProducts() {
  // Your implementation here
  const allproduct=await Product.find()
  console.log(allproduct)
}

/**
 * Updates a product in MongoDB
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product object
 */
async function updateProduct(productId, updatedProduct) {
  // Your implementation here
  try{
  const result=await Product.find(productId);
  result=updateProduct;
  console.log('product is updated successfully')
  }
  catch(err){
    console.log('No Such product with id')
  }
}

/**
 * Deletes a product from MongoDB
 * @param {string} productId - ID of the product to delete
 */
function deleteProduct(productId) {
  // Your implementation here
  try{
  const result=Product.findByIdAndDelete(productId)
  console.log('product deleted succesfully..')
  }
  catch(err){
    console.log('No such product with id..')
  }
}

// createProduct({name:'Chocolate',price:100,quantity:10})
// createProduct({name:'biscuits',price:50,quantity:20})
// createProduct({name:'laddu',price:30,quantity:50})

getAllProducts()
updateProduct('65d75ed4addbc86f9acfd2f7',{name:'sweet',price:90,quantity:60})
deleteProduct('65d75ed4addbc86f9acfd2f7')