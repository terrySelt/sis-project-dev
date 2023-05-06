import {connectDB} from './db.js'
import { PORT } from './config.js'
import app from './app.js'
import { Server as SocketServer } from 'socket.io'
import http from 'http'


const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

connectDB()

io.on('connection', (socket) => {
    //console.log("Clientes conectados :", io.engine.clientsCount)
    //console.log("ID del socket conectado", socket.id)
    socket.emit("event1", "hola")
})

server.listen(PORT)
console.log('server in running port', PORT)
