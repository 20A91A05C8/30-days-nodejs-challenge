const express=require('express')
const app=express()

function requestLoggerMiddleware(req, res, next) {
    // Your implementation here
    const time=new Date().toISOString()
    const method=req.method
    console.log(`${time}- ${method} request recived`)
    next()
  }

  app.use(requestLoggerMiddleware)

  app.get('/',(req,res)=>{
    res.send('Hello!')
  })

  app.listen(3000,()=>{
    console.log('running on port 3000')
  })