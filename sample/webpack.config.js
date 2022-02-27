const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        use: [
          process.env.NODE_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
        ], // 사용할 로더 명시
      },
      {
        test: /\.png|jpg|gif|svg$/,
        loader: 'url-loader',
        // publicPath 인덱스 페이지 기준에서 소스파일의 url 의 prefix 를 달아준다.
        // index.html 이 번들에 추가되어 번들 폴더 안에 포함될 경우 prefix가 필요하지 않다.
        options: {
          // publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 20000, // 20kb 미만은 url loader, 이상은 file loader
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `배너입니다 
      빌드 시간: ${new Date().toLocaleString()}
      커밋 버전: ${childProcess.execSync('git rev-parse --short HEAD')}
      유저: ${childProcess.execSync('git config user.name')}`,
    }),
    new webpack.DefinePlugin({
      JIMAN: '123 + 123',
      JIMAN2: JSON.stringify('123 + 123'),
      'api.domain': JSON.stringify('dev.api.domain.com'),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '개발용' : '운영용',
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true, // 빈칸을 제거한다.
              removeComments: true, // 주석을 제거한다.
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    // 개발환경에서는 자바스크립트 파일 하나로 빌드하는것이 빠르게 빌드된다.
    ...(process.env.NODE_ENV === 'production'
      ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
      : []),
  ],
};

console.log(process.env.NODE_ENV);
