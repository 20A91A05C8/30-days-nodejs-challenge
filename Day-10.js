const express=require('express')
const app= express()
const path=require('path')
app.use(express.static('public'))

function staticFileServer(req, res) {
    // Your implementation here
    if(req.url==='/')
    return res.sendFile(path.join(__dirname,'public','index.html'))
    res.sendFile(path.join(__dirname,'public',req.url))
  }
app.get('/',staticFileServer)
app.listen(3000,()=>console.log('Running on port 3000...'))