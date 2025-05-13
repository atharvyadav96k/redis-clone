const stringSchema = require("../database/string");
const { isContain, newKey, getValue, delKey } = require("../database/globalStore");


// get multiple values
const getMultipleValues = (commands) => {
    let result = "";
    commands.map((ele, idx) => {
        if (idx !== 0) {
            result += `${idx}) ${isContain(ele) ? getValue(ele).get() : "(nil)"}\r\n`;
        }
    });
    return result;
}

// set multiple values
const setMultipleValues = (commands) => {
    if (commands.length % 2 == 0) {
        commands = [...commands, undefined];
    }
    for (let i = 1; i < commands.length; i += 2) {
        const key = commands[i];
        const value = commands[i+1];
        const isExists = isContain(key);

        if (isExists) {
            res = getValue(key).set(value);
        } else {
            const newString = new stringSchema(value);
            newKey(key, newString);
        }
    }
    return "OK";
}

exports.stringController = (commands, response) => {
    const cmd = commands[0];
    const key = commands[1];

    // Check if key exists
    const isExists = isContain(key);

    let res;

    switch (cmd) {
        // get values
        case "GET":
            if (!isExists) {
                response.write("-(nil)\r\n");
                return;
            }
            res = getValue(key).get();
            response.write("+" + res + "\r\n");
            break;

        // get multiple values
        case "MGET":
            res = getMultipleValues(commands);
            response.write(res + "\r\n");
            break;

        // set values
        case "SET":
            const value = commands[2];
            if (isExists) {
                res = getValue(key).set(value);
                response.write("+OK\r\n");
            } else {
                const newString = new stringSchema(value);
                newKey(key, newString);
                response.write("+OK\r\n");
            }
            break;
        
        // set multiple values
        case "MSET":
            res = setMultipleValues(commands);
            response.write("+" + res + "\r\n");
            break;
        
        // delete value
        case "DEL":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            delKey(key);
            response.write("+OK\r\n");
            break;

        // Increment values by 1
        case "INCR":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            res = getValue(key).incr();
            response.write("+" + res + "\r\n");
            break;

        // Increment values by n
        case "INCRBY":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            const incrByValue = parseInt(commands[2]);
            res = getValue(key).incrBy(incrByValue);
            response.write("+" + res + "\r\n");
            break;

        // Increment vales by float 
        case "INCRBYFLOAT":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            const incrByFloatValue = parseFloat(commands[2]);
            res = getValue(key).incrByFloat(incrByFloatValue);
            response.write("+" + res + "\r\n");
            break;

        // Decrement values
        case "DECR":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            res = getValue(key).decr();
            response.write("+" + res + "\r\n");
            break;

        // Decrement values by n
        case "DECRBY":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            const decrByValue = parseInt(commands[2]);
            res = getValue(key).decrBy(decrByValue);
            response.write("+" + res + "\r\n");
            break;

        // Append values at the end of values
        case "APPEND":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            const appendValue = commands[2];
            res = getValue(key).append(appendValue);
            response.write("+" + res + "\r\n");
            break;

        // get values from range start to end
        case "GETRANGE":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            const start = parseInt(commands[2]);
            const end = parseInt(commands[3]);
            res = getValue(key).getRange(start, end);
            response.write("+" + res + "\r\n");
            break;

        // Get length of stored data
        case "STRLEN":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            res = getValue(key).strLen();
            response.write("+" + res + "\r\n");
            break;

        // Set time out
        case "SETEX":
            const expTime = commands[2];
            if (isExists) {
                getValue(key).setEx(expTime);
                response.write("+OK\r\n");
            } else {
                const newStringEx = new stringSchema(commands[3], expTime);
                newKey(key, newStringEx);
                response.write("+OK\r\n");
            }
            break;

        default:
            response.write(`-ERR unknown command '${cmd}'\r\n`);
            break;
    }
};
