const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
const secreat='screat-key'

function authenticationMiddleware(req, res, next) {
  // Your implementation here
  const token =req.headers.authorization
  if(!token) return res.status(401).json({error:'No Token provided'})
  try{
    const decoded=jwt.verify(token,secreat)
    req.user=decoded
    next()
  }
  catch(err){
   return  res.status(401).json({error:'Invalid Token'})
  }
}

app.get('/protected',authenticationMiddleware, (req, res) => {
  res.json({ message: 'Access granted!', user: req.user });
});

function generateToken(user) {
  return jwt.sign(user, secreat); 
}
const user = {
  id: 123,
  username: 'example_user'
};
const token = generateToken(user);
console.log('your token is:',token);
app.listen(3000,()=>console.log('running on port 3000..'))