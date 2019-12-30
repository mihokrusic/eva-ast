class Environment {
    constructor(records = {}) {
        this.records = records;
    }

    define(name, value) {
        this.records[name] = value;
        return value;
    }

    lookup(name) {
        if (typeof this.records[name] === 'undefined') {
            return new ReferenceError(`Variable "${name}" is not defined.`);
        }

        return this.records[name];
    }
}

module.exports = Environment;
