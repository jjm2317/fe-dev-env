module.exports = function myWebpackLoader(content) {
  console.log('myWebpack loader');
  return content.replace('console.log(', 'alert(');
};
