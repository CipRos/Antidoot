var path = require("path");
const app = require("express").Router();
  
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
 
const adapter = new FileSync('db.json')
const db = low(adapter)
const main = `${__dirname} + ../../pages/`

db.defaults({ settings: {}}).write()
//console.log(maintenance)

module.exports = app;