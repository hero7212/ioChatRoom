const ws = require("nodejs-websocket")

const PORT = 8001

let clientCount = 0

// Scream server example: "hi" -> "HI!!!"
const server = ws.createServer(conn => {
    console.log("New connection")
    clientCount++
    conn.nickname = `文帅${clientCount}号`
    broadcast(`${conn.nickname}来了`)
    conn.on("text", str => {
        console.log("Received " + str)
        broadcast(str)
    })
    conn.on("close", (code, reason) => {
        console.log("Connection closed")
        broadcast(`${conn.nickname}离开了`)
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