/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , net = require('net')
var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}


app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))


// UDP Socket Server
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var buffer = ''

server.on("error", function (err) {
  console.log("server error:\n" + err.stack);
  server.close();
});

server.on("message", function (msg, rinfo, res) {
  console.log("server got: " + msg + " from " +
    rinfo.address + ":" + rinfo.port);
  buffer = msg;
//  res.write({data:buffer});
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(8888);


// Render
app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' ,
    data  : buffer}
  );
});

app.listen(3000)
