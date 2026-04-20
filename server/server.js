const http = require("http");
const app = require("./config/express.config")

const server = http.createServer(app);

const PORT = 9005;
const HOST = "localhost";

server.listen(PORT, HOST, (e)=> {
    if (!e) {
        console.log("Server is running on"+PORT+", and Host "+HOST);
        console.log("***Press Ctrl + C to disconnect the server***");
        
        
        
    }

})
