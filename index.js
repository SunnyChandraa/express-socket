const express = require('express')
const app = express()
const port = 3000
const http = require("http")
const server = http.createServer(app);
const { Server} = require("socket.io");

// Create Socket Server
const io = new Server(server)

// app.get('/', (req, res) => {
//     res.send("Acrush 😰")
// })

app.use(express.static("public"))

// method pada socket io untuk mendengarkan sebuah event lalu akan menjalankan perintah atau callback yang diberikan 
// Lalu isikan nama event yang ingin didenger, disini menmanggil event default dari socket.io yaitu "connection"
// fungsi event ini adalah bereaksi jika ada user yang men trigger ke servers
// param kedua adalah callback yang akan kita jalankan
io.on("connection", socket => {
    console.log("Socket connected ! ! !");
    socket.on("kirim-pesan", pesan => {
        // broadcast.emit adalah kirim kepada semua socket yang terkoneksi 
        // lalu kita berinama event nya pesan-baru
        socket.broadcast.emit("pesan-baru", pesan)
        
    })
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  
