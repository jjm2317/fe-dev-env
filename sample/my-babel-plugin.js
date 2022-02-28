module.exports = function myBabelPlugin() {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name;

        console.log(name);

        path.node.name = name.split('').reverse().join('');
      },
      VariableDeclaration(path) {
        console.log('VariableDeclaration() kind:', path.node.kind); // const

        if (path.node.kind === 'const') {
          path.node.kind = 'var';
        }
      },
    },
  };
};
