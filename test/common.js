/*  eslint-disable global-require, prefer-template */
global.rootPath = function(fileName) {
  return __dirname + '/../' + fileName;
};

global.rootRequire = function(fileName) {
  return require(global.rootPath(fileName));
};
