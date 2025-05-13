const filterData = require("./inputParser");
const {
    isStringOperation,
    isHashOperation,
    isSetOperation,
    isSortedSetOperation,
    isListOperation // ⬅️ Add this
} = require("./commandClassifier");

const { stringController } = require('../controller/stringController');

module.exports = (command, response) => {
    const commands = filterData(command);
    const cmd = commands[0]?.toUpperCase();

    if (!cmd) {
        response.write("No command provided\n");
        return;
    }

    //   Checking for each valid operation where it belongs to...

    if (cmd === "PING") {

        response.write("+PONG\r\n");

    } else if(cmd === "EXIT"){
        response.end();
    }else if (isStringOperation(cmd)) {

        try{
            stringController(commands, response);
        }catch(err){
            response.write(err.message);
        }

    } else if (isHashOperation(cmd)) {

        response.write("Hashset\n");

    } else if (isSetOperation(cmd)) {

        response.write("Set\n");

    } else if (isSortedSetOperation(cmd)) {

        response.write("Sorted Set\n");

    } else if (isListOperation(cmd)) {

        response.write("List\n");

    } else {

        response.write(`-ERR unknown command '${cmd}'\r\n`);

    }
};
