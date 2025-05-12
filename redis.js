const net = require("net");
const dataBaseOperation = require("./utils/databaseOperation");

const server = net.createServer(connection => {
    console.log("Client connected");

    connection.on('data', (data) => {
        const commandData = data.toString().trim();  // Remove leading/trailing whitespace

        if (!commandData || commandData === null || commandData === undefined) {
            connection.write("-ERR key does not exist\r\n");
            return;
        }

        if (typeof commandData !== "string") {
            connection.write("-ERR Invalid command format\r\n");
            return;
        }

        try {
            dataBaseOperation(commandData, connection);
        } catch (err) {
            console.error("Error processing command:", err);
            connection.write("-ERR Failed to process command\r\n");
        }
    });

    connection.on('end', () => {
        console.log("Client disconnected");
    });

    connection.on('error', (err) => {
        console.error("Connection error:", err);
    });
});

server.listen(8000, () => console.log("Redis running on port 8000"));
