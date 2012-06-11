var pageService = require('../util/dbconnect').page
	, moduleloader = require('../util/moduleloader')
	, menuModule = moduleloader('menu')

var menu = new menuModule();
menu.init();

/*
 * Pagerenderer for cms-pages.
 */
function renderpage( pageId, req, res ) {
	console.log('Rendering page: ' + pageId);

	pageService.getPages({ pid: pageId }, function( err, pages ) {
		var page = pages[0];
		page.renderedcomponents = [];
		for( var i = 0; i < page.components.length; i++ ) {

			var component = page.components[i];
			if( component == undefined || component.name == undefined || component.name.length == 0 ) { continue; }

			// Instantiate the module and retrieve the rendered content.
			var module = moduleloader( component.name );
			module = new module( component, req );
			page.renderedcomponents[i] = module.render();
		}

		// Render the page
		res.render( page.template, {page: page, menu: menu.render()});
	});
}

module.exports = renderpage;