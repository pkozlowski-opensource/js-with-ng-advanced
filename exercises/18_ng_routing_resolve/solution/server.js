var connect = require('connect');
var send = require('send');
var http = require('http');
var path = require('path');

var port = 8010;
var rootDir = __dirname;

var app = connect();
app.use('/lib', connect.static(path.join(rootDir, '..', '..', 'lib')));
app.use('/css', connect.static(path.join(rootDir, '..', '..', 'css')));
app.use('/static', connect.static(rootDir));

//HTML5 mode handling
app.use(function (req, res, next) {
  console.log('HTML5 ', req.url);
  send(req, 'index.html').root(rootDir).pipe(res);
});

http.createServer(app).listen(port);
