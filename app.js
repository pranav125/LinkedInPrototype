
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , home = require('./routes/home')
  , signin = require('./views/signin');
  var mysql = require('./routes/mysql');
  var session = require('express-session');
  //var cookieParser = require('cookie-parser');
  var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser());
//app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.get('/search',home.search);

app.post('/afterSignup',home.afterSignup);
app.post('/afterSignin',home.afterSignin);
app.post('/logout',home.logout);
app.post('/editProfile',home.editProfile);
app.post('/updateProfile',home.updateProfile);
//app.get('/api/session',function(req,res){
//	
//	if(req.session.data){
//		res.send(JSON.stringify({"response" : req.session.data}));
//	}
//	else{
//		res.send(JSON.stringify({"response" : "No Session Data to GET"}));
//	}
//});
//app.post('/api/session',function(req,res){
//	
//	console.log(req.secret);
//	//
//	
//	if(req.session.data){
//		req.session.data = req.param("sessionData");
//		res.send(JSON.stringify({"response" : req.session.data}));
//	}
//	else{
//		
//		req.session.data = req.param("sessionData");
//		res.send(JSON.stringify({"response" : req.session.data}));
//	}
//});
//
//app.del('/api/session',function(req,res){
//
//	if(req.session.data){
//		req.session.destroy();
//		res.send(JSON.stringify({"response" : "Session Destroyed"}));
//	}else{
//		res.send(JSON.stringify({"response" : "No Session Data to DELETE"}));
//	}
//});
//app.get('/user', user.list);

//app.get('/', home.signup);
//app.post('/afterSignup',home.afterSignup);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
