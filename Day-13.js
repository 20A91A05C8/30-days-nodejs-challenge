const express=require('express');
const app=express();
const http=require('http');
const WebSocket=require('ws');

const server=http.createServer(app);

function setupWebSocket(server) {
  // Your implementation here
  const wss=new WebSocket.Server({server});
  wss.on('connection',function connection(ws){
    console.log('Clint Connected');

  ws.on('message',function incoming(message){
    console.log('Recived Message: '+ message);
    ws.send(message);
  });
  ws.on('close',function close(){
    console.log('Disconnected..');
  });
  });
}

setupWebSocket(server);

app.get('/websocket',function (req,res){
  res.sendFile(__dirname+'/index.html');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT,()=>console.log('Running on port 3000...'))