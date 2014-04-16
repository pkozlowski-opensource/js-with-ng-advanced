var connect = require('connect');
var send = require('send');
var http = require('http');
var path = require('path');

var request = require('request');
var mongolabProxy = require('./mongolab-proxy');

var port = 8010;
var rootDir = path.join(__dirname, 'app');
var mongoLabApiKey = '4fb51e55e4b02e56a67b0b66';
var mongoLabUrl = 'https://api.mongolab.com/api/1/databases';

var app = connect();
app.use(connect.cookieParser());
app.use(connect.session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
app.use(connect.bodyParser());

//static resources: JS, CSS, templates
app.use('/static', connect.static(rootDir));

//access to data: MongoLab proxing and security checks
var dbProxy = mongolabProxy(mongoLabUrl, mongoLabApiKey);
app.use('/db', function (req, res, next) {

  if (req.method !== 'GET') {
    //allow only if a user is authenticated
    if (!req.session.user) {
      res.statusCode = 401;
      res.end();
      return;
    }
  }

  //in all other cases proxy call to MongoLab
  dbProxy(req, res, next);
});

//authentication
app.use('/security/signin', function (req, res, next) {

  var credentials = req.body;
  var queryParams = {
    login: credentials.login
  };

  req.session.user = undefined;

  var mongoUrl = mongoLabUrl + '/roche/collections/users?apiKey=' + mongoLabApiKey + '&q=' + JSON.stringify(queryParams);
  request.get(mongoUrl, function (error, response, body) {

      if (!error && response.statusCode == 200) {
        var mongoRes = JSON.parse(body);
        if (mongoRes.length > 0) {
          req.session.user = mongoRes[0];
          return res.end(JSON.stringify(mongoRes[0]));
        }
      }

      res.statusCode = 403;
      res.end('Authentication error');
    });
});

//HTML5 mode handling
app.use(function (req, res, next) {
  send(req, 'index.html').root(rootDir).pipe(res);
});

//finally, create a server
http.createServer(app).listen(port);
