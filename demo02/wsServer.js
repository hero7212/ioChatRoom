const ws = require("nodejs-websocket")

const PORT = 8001

// Scream server example: "hi" -> "HI!!!"
const server = ws.createServer(conn => {
    console.log("New connection")
    conn.on("text", str => {
        console.log("Received " + str)
        conn.sendText(str.toUpperCase() + "!!!")
    })
    conn.on("close", (code, reason) => {
        console.log("Connection closed")
    })
    conn.on("error",err=>{
        console.log('ws报错');
        console.log(err)
    })
}).listen(PORT)