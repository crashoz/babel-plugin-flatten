const importRe = /[./]+(.*)/;

function flattenImportName(importName, separator) {
  const match = importRe.exec(importName);
  if (match != null) {
    return './' + match[1].replace('/', separator);
  }
  return importName;
}

module.exports = function({ types: t }) {
  return {
    pre(state) {
      this.separator = state.opts.separator || '_';
    },

    visitor: {
      ImportDeclaration(path, state) {
        path.node.source.value = flattenImportName(path.node.source.value, this.separator);
      },

      VariableDeclarator(path, state) {
        if (
          !t.isCallExpression(path.node.init) ||
          !t.isIdentifier(path.node.init.callee) ||
          path.node.init.callee.name != 'require' ||
          !t.isStringLiteral(path.node.init.arguments[0])
        ) {
          return
        }
        path.node.init.arguments[0].value = flattenImportName(path.node.init.arguments[0].value, this.separator);
      }
    },

    post(state) {

    }
  };
};

