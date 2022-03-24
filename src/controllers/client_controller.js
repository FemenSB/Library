const path = require('path');

const parentDirName = __dirname.split(path.sep).slice(0, -1).join(path.sep);

function sendIndex(req, res) {
  res.sendFile(parentDirName + '/client/index.html');
}

function sendLoadAll(req, res) {
  res.sendFile(parentDirName + '/client/loadAll.js');
}

function sendPostJS(req, res) {
  res.sendFile(parentDirName + '/client/post.js');
}

function sendPostHTML(req, res) {
  res.sendFile(parentDirName + '/client/post.html');
}

function sendPutJS(req, res) {
  res.sendFile(parentDirName + '/client/put.js');
}

function sendPutHTML(req, res) {
  res.sendFile(parentDirName + '/client/put.html');
}

function sendDeleteJS(req, res) {
  res.sendFile(parentDirName + '/client/delete.js');
}

function sendDeleteHTML(req, res) {
  res.sendFile(parentDirName + '/client/delete.html');
}

module.exports = {
  sendIndex,
  sendLoadAll,
  sendPostJS,
  sendPostHTML,
  sendPutJS,
  sendPutHTML,
  sendDeleteJS,
  sendDeleteHTML
};
