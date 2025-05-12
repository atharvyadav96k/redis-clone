class String {
    constructor(data, exp = "(nil)") {
        const date = new Date();
        this.data = data;
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
        return "OK";
    }

    strLen() {
        return this.data.length();
    }

    getRange(start, end) {
        return this.data.slice(start, end) || "";
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
            return "Error: Invalid start or end values";
        }

        let before = this.data.slice(0, start);
        let after = this.data.slice(end);
        this.set(before + data + after);
        this.length = this.data.length;

        return "OK";
    }

    incr() {
        try {
            const parseNumber = parseInt(this.data);

            if (isNaN(parseNumber)) {
                throw new Error("-Cant increment string");
            }

            this.set(parseNumber + 1);

            return `(integer) ${this.get()}`;
        } catch (err) {
            return err.message;
        }
    }

    incrBy(range) {
        try {
            const parseRange = parseInt(range);
            const parseNumber = parseInt(this.data);

            if (isNaN(parseNumber) || isNaN(parseRange)) {
                throw new Error("-Cant increment string");
            }

            this.set(parseNumber + parseRange);

            return `(integer) ${this.get()}`;
        } catch (err) {
            return err.message;
        }
    }

    incrByFloat(range) {
        try {
            const parseNumber = parseFloat(this.data);
            const parseRange = parseFloat(range);

            if (isNaN(parseNumber) || isNaN(parseRange)) {
                throw new Error("-Cant increment string");
            }

            this.set(parseNumber + parseRange);

            return this.get();
        } catch (err) {
            return err.message;
        }
    }

    decr() {
        try {
            const parseNumber = parseInt(this.data);

            if (isNaN(parseNumber)) {
                throw new Error("-Cant decrement string");
            }

            this.set(parseNumber - 1);

            return `(integer) ${this.get()}`;
        } catch (err) {
            return err.message;
        }
    }

    decrBy(range) {
        try {
            const parseRange = parseInt(range);
            const parseNumber = parseInt(this.data);

            if (isNaN(parseNumber) || isNaN(parseRange)) {
                throw new Error("-Cant decrement string");
            }

            this.set(parseNumber - parseRange);

            return `(integer) ${this.get()}`;
        } catch (err) {
            return err.message;
        }
    }

    append(data) {
        this.set(this.get() + data);
        return `(integer) ${this.strLen()}`;
    }
}

module.exports = String;