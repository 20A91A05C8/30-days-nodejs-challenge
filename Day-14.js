const express=require('express')
const app=express()

const cache={}
const exptime=5000;

function cachingMiddleware(req, res, next) {
  // Your implementation here
  const url=req.originalUrl ||req.url
  
  if (cache[url] && (Date.now() - cache[url].timestamp <exptime)) {
    console.log("Returning cached response for", url);
    return res.json(cache[url].data);
  }

  const originalSend = res.send;
  res.send = function (data) {
    cache[url] = {
      data: data,
      timestamp: Date.now()
    };
    originalSend.call(this, data);
  };
  next();
}

app.use(cachingMiddleware)

app.get('/api/data',(req,res)=>{
  res.json({message:'This is catched date!'})
})

app.listen(3000,()=>console.log('running on port 3000..'))