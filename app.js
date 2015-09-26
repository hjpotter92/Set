var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express();

app.use(function(req, res){
  var data = '<h1>hello world</h1>';
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(data);
})

app.listen(5858);
