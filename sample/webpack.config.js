const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js',
    // main2: './src/app2.js',
  },
  output: {
    path: path.resolve('./dist'),
    // main으로 치환된다. entry 가 여러개 있을 수도 있는데, 그에맞는 output 이름을 동적으로 만들 수 있다.
    filename: '[name].js',
  },
};
