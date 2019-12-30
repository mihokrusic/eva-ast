const Environment = require('./Environment');

class Eva {
    constructor(global = new Environment()) {
        this.global = global;
    }

    eval(exp, env = this.global) {
        // Self-evaluating expressions
        if (isNumber(exp)) {
            return exp;
        }

        if (isString(exp)) {
            return exp.slice(1, -1);
        }

        // Math expressions
        if (exp[0] === '+') {
            return this.eval(exp[1]) + this.eval(exp[2]);
        }
        if (exp[0] === '-') {
            return this.eval(exp[1]) - this.eval(exp[2]);
        }
        if (exp[0] === '*') {
            return this.eval(exp[1]) * this.eval(exp[2]);
        }
        if (exp[0] === '/') {
            return this.eval(exp[1]) / this.eval(exp[2]);
        }

        // Variable declaration:
        if (exp[0] === 'var') {
            const [_, name, value] = exp;
            return env.define(name, this.eval(value));
        }

        // Variable access:
        if (isVariableName(exp)) {
            return env.lookup(exp);
        }

        throw `Unimplemented: ${JSON.stringify(exp)}`;
    }
}

function isNumber(exp) {
    return typeof exp === 'number';
}

function isString(exp) {
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

function isVariableName(exp) {
    return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}

module.exports = Eva;
