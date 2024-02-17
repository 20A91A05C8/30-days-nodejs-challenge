const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/studentdata')
.then(()=>console.log('connection Successful'))
.catch((err)=>console.log('unable to connect to data base..'))

const courseSchema=new mongoose.Schema({
  username:String,
  email:String
})
const User=mongoose.model('User',courseSchema);

async function addUserToDatabase(user) {
  // Your implementation here
  try{
  const newuser=new User(user)
  const result=await newuser.save()
  console.log('user succesfully added..',result)
  }
  catch(error){
    console.log('Error: unable to add user:',error)
  }
}
addUserToDatabase({username: 'john_doe', email: 'john@example.com'})
