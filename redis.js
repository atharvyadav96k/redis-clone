const net = require("net");
const filterData = require("./inputParser");

const server = net.createServer(connection =>{
    console.log("Client connected");
    connection.write("clear\n")
    connection.on('data', (data)=>{
        console.log(filterData(data));
        connection.write("+OK\r\n")
    })
});

server.listen(8000, ()=>console.log("Redis running on port 8000")); 