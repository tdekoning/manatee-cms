
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
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
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
	routes.pages( req.params.pageId, res );
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var pageService = dbconnect.page;
var pages = pageService.getpages( {}, function( err, pages ) {
  for( var i in pages ) {
	  pageService.deletepage( pages[i] );
  }
  createPages();
});

function createPages() {
  var page1 =  pageService.model;
  page1.pid = 'page1';
  page1.title = 'pagina 1';
  page1.content = 'Dit is de content van pagina 1';
  pageService.createpage( page1 );

  var page2 =  pageService.model;
  page2.pid = 'page2';
  page2.title = 'pagina 2';
  page2.content = 'Dit is de content van pagina 2';
  pageService.createpage( page2 );

  var page3 =  pageService.model;
  page3.pid = 'page3';
  page3.title = 'pagina 3';
  page3.content = 'Dit is de content van pagina 3';

  pageService.createpage( page3 );
  
}