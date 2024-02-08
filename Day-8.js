const express=require('express')
const app=express()
function positiveIntegerHandler(req, res,next) {
    // Your implementation here
    const number=parseInt(req.query.number);
    if(Number.isInteger(number) && number>0){
    res.status(200).send('Success: The number is postive number')
    }
    else {
        const error=new Error (" Number should be positive")
        error.status=400
        next(error)
    }  
  }      
function errorhandler(err,req,res,next){
    res.status(err.status || 500).send(`Error:${err.message}`)
}
app.listen(3000,()=>console.log('port:3000'))

app.get('/positive',positiveIntegerHandler);

app.use(errorhandler)