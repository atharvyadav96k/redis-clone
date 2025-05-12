const net = require("net");
const dataBaseOperation = require("./utils/databaseOperation");

const server = net.createServer(connection =>{
    console.log("Client connected");
    connection.write("clear\n")
    connection.on('data', (data)=>{
        dataBaseOperation(data, connection);
    })
});

server.listen(8000, ()=>console.log("Redis running on port 8000")); 