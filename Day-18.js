const express=require('express')
const app=express()
const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/userdatabase')
.then(()=>console.log('connection successful..'))
.catch(err=>console.log('error establishing Connection..',err))

const userSchema=new mongoose.Schema({
    name:String,
    email:String
})

const User=new mongoose.model('User',userSchema)

async function getAllUsers(req, res) {
    // Your implementation here
    const data=await User.find() 
    res.send(data)
  }
  async function adduser(user){
        const newuser=User(user)
        const result=await newuser.save()
        console.log('user added successfully:',result)
  }
// adduser({name:'Luffy',email:'onepiece@gmail.com'})
// adduser({name:'Naruto',email:'naruto@gmail.com'})
// adduser({name:'jinwoo',email:'sololeveling@gmail.com'})

app.get('/user',getAllUsers);

app.listen(3000,()=>console.log('Running on port 3000..'))
