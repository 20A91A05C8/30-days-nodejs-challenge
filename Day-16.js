const express=require('express')
const mongoose=require('mongoose')
const app=express()

function connectToMongoDB() {
  // Your implementation here
mongoose.connect('mongodb://localhost/testdatabase')
.then(()=>console.log('connection successful'))
.catch(err=>console.error('error connecting',err))
}

connectToMongoDB()

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});