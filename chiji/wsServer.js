const app = require('http').createServer();
const io = require('socket.io')(app);

const PORT = 4000

let clientCount = 0

app.listen(PORT)

io.on('connection',socket=>{
	clientCount++
	socket.nickname = `文帅${clientCount}号`
	io.emit('enter',socket.nickname)

	socket.on('message',str=>{
		io.emit('message',`${socket.nickname}说:${str}`)
	})

	socket.on('disconnect',()=>{
		io.emit('leave',`${socket.nickname}离开了`)
	})
})

