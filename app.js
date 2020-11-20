const app = require('express')();
const http = require('http').createServer(app);
const port = 8080;
var io = require('socket.io')(http);



app.get('/',(req,res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',(socket) => {
	console.log('a user connected'+ socket.name);
	socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});

http.listen(port,() => {
	console.log('listening on 8080');
});
