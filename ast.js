const fs = require('fs');
const babelParser = require('@babel/parser');

const code = fs.readFileSync(__dirname + '/test.js', 'utf8');

const ast = babelParser.parse(code, {
  sourceType: 'module'
});

console.log(JSON.stringify(ast, null, 2))