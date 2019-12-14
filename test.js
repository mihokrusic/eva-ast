const assert = require('assert');
const Eva = require('./Eva');

const eva = new Eva();

assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval('"Hello"'), 'Hello');
assert.strictEqual(eva.eval('"Hello"'), 'Hello');
assert.strictEqual(eva.eval(['+', 1, 5]), 6);
assert.strictEqual(eva.eval(['+', ['+', 1, 4], 5]), 10);

console.log('All assertions pass!');
