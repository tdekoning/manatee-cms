var pageService = require('../util/dbconnect').page
	, moduleloader = require('../util/moduleloader')
	, menuModule = moduleloader('menu')

var menu = new menuModule();
menu.init();

/*
 * GET home page.
 */
exports.index = function(req, res){
	res.render('index', { title: 'Express' })
};

/*
 * GET cms page.
 */
exports.pages = function( pageId, res ) {
	pageService.getpages({ pid: pageId }, function( err, pages ) {
		var page = pages[0];
		page.renderedcomponents = [];
		for( var i = 0; i < page.componenten.length; i++ ) {
			var component = page.componenten[i];
			console.log('component: ', component);
			if( component == undefined || component.name == undefined || component.name.length == 0 ) { continue; }

			var module = moduleloader( component.name );
			module = new module( component );
			page.renderedcomponents[i] = module.render();
		}
		console.log('componenten: ' + page.renderedcomponents);
		res.render('index', {page: page, menu: menu.render(), title: page.title, pageId: page.pid});
	});

}