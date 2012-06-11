
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , dbconnect = require('./util/dbconnect')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/admin/public'));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/pages/:pageId', function(req, res) {
	routes.pages( req.params.pageId, req, res );
});

app.get('/admin/:page', function( req, res ) {
  routes.admin( req.params.page, req, res );
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});




/*
 * Websockets
 */
var io = require('socket.io').listen( app )
  , websockets = require('./admin/websocket')

io.sockets.on('connection', websockets);
