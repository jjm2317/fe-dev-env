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
  module: {
    rules: [
      {
        test: /\.css$/, // 로더가 처리할 파일의 패턴
        use: ['style-loader', 'css-loader'], // 사용할 로더 명시
      },
      {
        test: /\.png|jpg|gif|svg$/,
        loader: 'url-loader',
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 20000, // 20kb 미만은 url loader, 이상은 file loader
        },
      },
    ],
  },
};
