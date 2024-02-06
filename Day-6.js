const express=require('express')
const app=express()
function greetHandler(req, res) {
    // Your implementation here
        const name=req.query.name ||'Guest';
        res.send(`Hello ${name}!`)
  }
app.listen(3000,()=>console.log('port:3000'))

greetHandler({query :{name:'john'}},{
    send:(message)=>console.log(message)
});
greetHandler({query:{}},{
    send:(message)=>console.log(message)
});
app.get('/greet',greetHandler);
app.get('/greet?name',greetHandler);