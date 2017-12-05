const ws = require("nodejs-websocket")

const PORT = 8001

let clientCount = 0

// Scream server example: "hi" -> "HI!!!"
const server = ws.createServer(conn => {
    console.log("New connection")
    clientCount++
    conn.nickname = `文帅${clientCount}号`
    let mes = {}
    mes.type = "enter"
    mes.data = `${conn.nickname}来了`
    broadcast(JSON.stringify(mes))
    conn.on("text", str => {
        console.log("Received " + str)
        let mes = {}
        mes.type = "message"
        mes.data = `${conn.nickname}说:${str}`
        broadcast(JSON.stringify(mes))
    })
    conn.on("close", (code, reason) => {
        console.log("Connection closed")
        let mes = {}
        mes.type = "leave"
        mes.data = `${conn.nickname}离开了`
        broadcast(JSON.stringify(mes))
    })
    conn.on("error",err=>{
        console.log('ws报错');
        console.log(err)
    })
}).listen(PORT)



function broadcast(str) {
    server.connections.forEach(connection=>{
        connection.sendText(str);
    })
}