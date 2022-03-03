module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '79',
          ie: '11',
        },
        useBuiltIns: 'usage', //폴리필 지원
        corejs: {
          version: 3, //corejs version
        },
      },
    ],
  ],
};
