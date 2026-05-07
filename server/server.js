const http = require("http");
const app = require("./config/express.config")

const server = http.createServer(app);

const { Server } = require("socket.io")

//creating socket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true, 
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join user room
  socket.on("join", (userId) => {
    socket.join(userId);
  });

  // send message
  socket.on("send_message", (data) => {
    const { receiverId } = data;

    io.to(receiverId).emit("receive_message",{
      ...data,
      message: data.message || data.text
    } );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


const PORT = 9005;
const HOST = "localhost";

server.listen(PORT, HOST, (e)=> {
    if (!e) {
        console.log("Server is running on"+PORT+", and Host "+HOST);
        console.log("***Press Ctrl + C to disconnect the server***");
        
        
        
    }

})
