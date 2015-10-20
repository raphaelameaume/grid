require('babel/register')({
  	stage: 1
});

var requireDir = require('require-dir');
requireDir('./gulp/tasks', { recurse: true });