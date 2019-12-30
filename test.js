const assert = require('assert');
const Eva = require('./src/Eva');
const Environment = require('./src/Environment');

const eva = new Eva(
    new Environment({
        null: null,
        true: true,
        false: false,
    }),
);

// Self-evaluating expressions
assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval('"Hello"'), 'Hello');
assert.strictEqual(eva.eval('"Hello"'), 'Hello');

// Math expressions
assert.strictEqual(eva.eval(['+', 1, 5]), 6);
assert.strictEqual(eva.eval(['+', ['+', 1, 4], 5]), 10);
assert.strictEqual(eva.eval(['-', 11, 5]), 6);
assert.strictEqual(eva.eval(['-', ['+', 1, 4], 5]), 0);
assert.strictEqual(eva.eval(['*', 2, 5]), 10);
assert.strictEqual(eva.eval(['*', ['+', 1, 4], 5]), 25);
assert.strictEqual(eva.eval(['/', 10, 5]), 2);
assert.strictEqual(eva.eval(['/', ['+', 1, 4], 5]), 1);

// Built-in variables
assert.strictEqual(eva.eval('null'), null);
assert.strictEqual(eva.eval('true'), true);
assert.strictEqual(eva.eval('false'), false);

// Variables
assert.strictEqual(eva.eval(['var', 'x', 10]), 10);
assert.strictEqual(eva.eval('x'), 10);
assert.strictEqual(eva.eval(['var', 'isUser', 'true']), true);
assert.strictEqual(eva.eval(['var', 'z', ['*', 2, 4]]), 8);
assert.strictEqual(eva.eval('z'), 8);

console.log('All assertions pass!');
