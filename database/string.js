class String {
    constructor(data, exp = "(nil)") {
        const date = new Date();
        this.data = data || `(ni)`;
        this.creationTime = date.getTime();
        this.expTime = exp;
        this.length = typeof (data) === "string" ? data.length : 0;
    }

    get() {
        return this.data;
    }

    set(data) {
        this.data = data;
        this.length = data.length || 0;
        return "+OK\r\n";
    }

    strLen() {
        return this.data.length;
    }

    getRange(start, end) {
        try{
            return this.data.slice(start, end);
        }catch(err){
            return "-ERR cant get range\r\n"
        }
    }

    getSet(data) {
        const old = this.get();
        this.set(data);
        return old;
    }

    setEx(time) {
        this.expTime = time;
    }

    setRange(data, start, end) {
        if (start < 0 || end > this.data.length || start > end) {
            return "-ERR invalid start or end values\r\n";
        }
        let before = this.data.slice(0, start);
        let after = this.data.slice(end);
        this.set(before + data + after);
        this.length = this.data.length;
        return "+OK\r\n";
    }

    incr() {
        const parseNumber = parseInt(this.data);
        if (isNaN(parseNumber)) {
            throw new Error("-ERR Cant increment string\r\n");
        }
        this.set(parseNumber + 1);
        return `(integer) ${this.get()}`;
    }

    incrBy(range) {
        const parseRange = parseInt(range);
        const parseNumber = parseInt(this.data);
        if (isNaN(parseNumber) || isNaN(parseRange)) {
            throw new Error("-ERR Cant increment string\r\n");
        }
        this.set(parseNumber + parseRange);
        return `(integer) ${this.get()}`;
    }

    incrByFloat(range) {
        const parseNumber = parseFloat(this.data);
        const parseRange = parseFloat(range);
        if (isNaN(parseNumber) || isNaN(parseRange)) {
            throw new Error("-ERR Cant increment string\r\n");
        }
        this.set(parseNumber + parseRange);
        return this.get();
    }

    decr() {
        const parseNumber = parseInt(this.data);
        if (isNaN(parseNumber)) {
            throw new Error("-ERR Cant decrement string\r\n");
        }
        this.set(parseNumber - 1);
        return `(integer) ${this.get()}`;
    }

    decrBy(range) {
        const parseRange = parseInt(range);
        const parseNumber = parseInt(this.data);
        if (isNaN(parseNumber) || isNaN(parseRange)) {
            throw new Error("-ERR Cant decrement string\r\n");
        }
        this.set(parseNumber - parseRange);
        return `(integer) ${this.get()}`;
    }

    append(data) {
        this.set(this.get() + data);
        return `(integer) ${this.strLen()}`;
    }
}

module.exports = String;
