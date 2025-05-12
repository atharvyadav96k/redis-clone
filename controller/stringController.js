const stringSchema = require("../database/string");
const { isContain, newKey, getValue, delKey } = require("../database/globalStore");

exports.stringController = (commands, response) => {
    const cmd = commands[0];
    const key = commands[1];

    // Check if key exists
    const isExists = isContain(key);

    let res;

    switch (cmd) {
        case "GET":
            if (!isExists) {
                response.write("-(nil)\r\n");
                return;
            }
            res = getValue(key).get();
            response.write("+" + res + "\r\n");
            break;

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

        case "DEL":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            delKey(key);
            response.write("+OK\r\n");
            break;

        case "INCR":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            res = getValue(key).incr();
            response.write("+"+res + "\r\n");
            break;

        case "INCRBY":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            const incrByValue = parseInt(commands[2]);
            res = getValue(key).incrBy(incrByValue);
            response.write("+"+res + "\r\n");
            break;

        case "INCRBYFLOAT":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            const incrByFloatValue = parseFloat(commands[2]);
            res = getValue(key).incrByFloat(incrByFloatValue);
            response.write("+"+res + "\r\n");
            break;

        case "DECR":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            res = getValue(key).decr();
            response.write("+"+res + "\r\n");
            break;

        case "DECRBY":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            const decrByValue = parseInt(commands[2]);
            res = getValue(key).decrBy(decrByValue);
            response.write("+"+res + "\r\n");
            break;

        case "APPEND":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            const appendValue = commands[2];
            res = getValue(key).append(appendValue);
            response.write("+"+res + "\r\n");
            break;

        case "GETRANGE":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            const start = parseInt(commands[2]);
            const end = parseInt(commands[3]);
            res = getValue(key).getRange(start, end);
            response.write("+"+res + "\r\n");
            break;

        case "STRLEN":
            if (!isExists) {
                response.write("-ERR key does not exist\r\n");
                return;
            }
            res = getValue(key).strLen();
            response.write("+"+res + "\r\n");
            break;

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
